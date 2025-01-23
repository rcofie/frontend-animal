import "./App.css";

const Animal = () => {
  return (
    <>
      <div className="animal-container">
        <h1>Poodle</h1>
        <div className="animal-animal">
          <img
            src="src/poodle.svg"
            alt="Your animal"
            className="animal-image"
          />
          <h2>Animal Name</h2>
        </div>
        <div className="animal-stats">
          <div className="stat">
            <strong>Hunger:</strong>
            <div className="meter">
              <div className="meter-fill" style={{ width: "60%" }}></div>
            </div>
            <button className="action-button">Feed</button>
          </div>
          <div className="stat">
            <strong>Happiness:</strong>
            <div className="meter">
              <div className="meter-fill" style={{ width: "80%" }}></div>
            </div>
            <button className="action-button">Play</button>
          </div>
          <div className="stat">
            <strong>Sleep:</strong>
            <div className="meter">
              <div className="meter-fill" style={{ width: "50%" }}></div>
            </div>
            <button className="action-button">Rest</button>
          </div>
        </div>
      </div>
    </>
  );
};

function App() {
  return (
    <div className="animal-page">
      <button>Add Animal</button>

      <div className="animal-wrapper">
        <Animal />
      </div>
    </div>
  );
}

export default App;
