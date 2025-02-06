import { JSX, useState } from "react";
import "./App.css";
import { Stats } from "./Stats";

type Animal = "Dog.svg" | "Cat.svg" | "Rabbit.svg";

interface AnimalTypeProps {
  svg: Animal;
  rate: number;
}

const animals: AnimalTypeProps[] = [
  { svg: "Dog.svg", rate: 1 },
  { svg: "Cat.svg", rate: 2 },
  { svg: "Rabbit.svg", rate: 3 },
];

interface AnimalDataProps {
  name: string;
  type: AnimalTypeProps | null;
}

function App() {
  const [animalData, setAnimalData] = useState<AnimalDataProps[]>([
    {
      name: "Coco",
      type: animals.find((a) => a.svg === "Dog.svg") || null,
    },
    {
      name: "",
      type: null,
    },
  ]);

  function Animal({ type, name }: AnimalDataProps): JSX.Element {
    const [animalName, setAnimalName] = useState(name);
    const [selectedAnimal, setSelectedAnimal] =
      useState<AnimalTypeProps | null>(null);

    function Dropdown(): JSX.Element {
      const [isOpen, setIsOpen] = useState<boolean>(false);

      return (
        <div className="dropdown" onClick={() => setIsOpen(!isOpen)}>
          {selectedAnimal ? (
            <>
              <img
                src={`/src/${selectedAnimal.svg}`}
                alt={selectedAnimal.svg}
                width="30"
                height="30"
              />
              <span>{selectedAnimal.svg.replace(".svg", "")}</span>
            </>
          ) : (
            "Select an Animal ▼"
          )}
          {isOpen && (
            <ul className="dropdown-menu">
              {animals.map((animal, index) => (
                <li
                  key={index}
                  className={`dropdown-item ${
                    selectedAnimal?.svg === animal.svg ? "selected" : ""
                  }`}
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedAnimal(animal);
                    setIsOpen(false);
                  }}
                  data-testid="menu-option"
                >
                  <img
                    src={`/src/${animal.svg}`}
                    alt={animal.svg}
                    width="30"
                    height="30"
                  />
                  <span>{animal.svg.replace(".svg", "")}</span>
                </li>
              ))}
            </ul>
          )}
        </div>
      );
    }

    return (
      <>
        <div className="animal-container">
          <h1>{animalName}</h1>
          <div className="animal-animal">
            {name && type ? (
              <>
                <img
                  src={`src/${type.svg}`}
                  alt="Your animal"
                  className="animal-image"
                />
                <Stats rate={type.rate} />
              </>
            ) : (
              <>
                <Dropdown />
                <input
                  value={animalName}
                  placeholder="Name your animal"
                  onChange={(e) => setAnimalName(e.target.value)}
                  className="input"
                />
                <button
                  className="add-animal"
                  onClick={() =>
                    animalName === "" && !selectedAnimal
                      ? alert("Please select your animal type and name!")
                      : setAnimalData((prevAnimalData) => [
                          ...prevAnimalData.map((animal, index) =>
                            index === prevAnimalData.length - 1
                              ? {
                                  ...animal,
                                  type: selectedAnimal ?? null,
                                  name: animalName,
                                }
                              : animal
                          ),
                          { type: null, name: "" },
                        ])
                  }
                >
                  Add Animal
                </button>
              </>
            )}
          </div>
        </div>
      </>
    );
  }
  return (
    <div className="animal-page">
      <div className="animal-wrapper">
        {animalData.map((animal, index) => (
          <Animal name={animal.name} type={animal.type} key={index} />
        ))}
      </div>
    </div>
  );
}

export default App;
