import { useEffect, useState } from "react";

interface StatsProps {
  rate: number;
}

export function Stats({ rate }: StatsProps) {
  const [stats, setStats] = useState([
    { stat: "Hunger", fill: 50, action: "Feed" },
    { stat: "Happiness", fill: 50, action: "Play" },
    { stat: "Sleepiness", fill: 50, action: "Rest" },
  ]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setStats((prevStats) =>
        prevStats.map((stat) => {
          if (stat.stat === "Hunger" || stat.stat === "Sleepiness") {
            return { ...stat, fill: Math.min(stat.fill + 0.5 * rate, 100) };
          }
          return { ...stat, fill: Math.max(stat.fill - 0.5 * rate, 0) };
        })
      );

      const hungerFull = stats.find((s) => s.stat === "Hunger")?.fill === 100;
      const sleepinessFull =
        stats.find((s) => s.stat === "Sleepiness")?.fill === 100;

      if (hungerFull || sleepinessFull) {
        setStats((prevStats) =>
          prevStats.map((stat) =>
            stat.stat === "Happiness"
              ? { ...stat, fill: Math.max(stat.fill - 1 * rate, 0) }
              : stat
          )
        );
      }
    }, 1000);

    return () => clearInterval(intervalId);
  }, [rate, stats]);

  function handleClick(actionStat: string) {
    setStats((prevStats) =>
      prevStats.map((stat) => {
        if (stat.stat === actionStat) {
          if (stat.stat === "Happiness") {
            return { ...stat, fill: Math.min(stat.fill + 5 * rate, 100) };
          }
          return { ...stat, fill: Math.max(stat.fill - 5 * rate, 0) };
        }
        return stat;
      })
    );
  }

  return (
    <div className="animal-stats">
      {stats.map((stat, index) => (
        <div className="stat" key={index}>
          <strong>{stat.stat}</strong>
          <div className="meter">
            <div
              data-testid={`percentage${index}`}
              className="meter-fill"
              style={{ width: `${stat.fill}%` }}
            ></div>
          </div>
          <button
            onClick={() => handleClick(stat.stat)}
            className="action-button"
          >
            {stat.action}
          </button>
        </div>
      ))}
    </div>
  );
}
