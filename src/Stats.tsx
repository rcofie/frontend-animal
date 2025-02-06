import { useEffect, useState } from "react";

interface StatsProps {
  rate: number;
}

// rate prop is so animals of different types increase/decrease at different rates

export const Stats = ({ rate }: StatsProps) => {
  const [stats, setStats] = useState([
    { stat: "Hunger", fill: 50, action: "Feed" },
    { stat: "Happiness", fill: 50, action: "Play" },
    { stat: "Sleepiness", fill: 50, action: "Rest" },
  ]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      // hunger and sleepiness should increase over time, happiness should decrease over time
      setStats((prevStats) =>
        prevStats.map((stat) =>
          stat.stat === "Hunger" || stat.stat === "Sleepiness"
            ? { ...stat, fill: Math.min(stat.fill + 0.5 * rate, 100) } // Increase by 0.5
            : { ...stat, fill: Math.max(stat.fill - 0.5 * rate, 0) }
        )
      );

      // happiness should decrease faster when sleep or hunger is full
      if (
        stats.some(
          (stat) =>
            (stat.stat === "Hunger" || stat.stat === "Sleepiness") &&
            stat.fill === 100
        )
      ) {
        // set value for happiness to go down by 1 every minute instead - faster
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

  const handleClick = (actionStat: string) => {
    setStats((prevStats) =>
      prevStats.map((stat) =>
        stat.stat === "Happiness" && stat.stat === actionStat
          ? { ...stat, fill: Math.min(stat.fill + 5 * rate, 100) }
          : (stat.stat === "Hunger" && stat.stat === actionStat) ||
            (stat.stat === "Sleepiness" && stat.stat === actionStat)
          ? { ...stat, fill: Math.max(stat.fill - 5 * rate, 0) }
          : stat
      )
    );
  };
  return (
    <div className="animal-stats">
      {stats.map((stat, index) => (
        <div className="stat" key={index}>
          <strong>{stat.stat}</strong>
          <div className="meter">
            <div
              data-testid={`percentage${index}`}
              className="meter-fill"
              style={{
                width: `${stat.fill}%`,
              }}
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
};
