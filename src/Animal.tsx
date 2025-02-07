import { useState } from "react";
import { Stats } from "./Stats";
import { Dropdown } from "./Dropdown";
import { AnimalTypeProps } from "./data/animals";

export interface AnimalDataProps {
  name: string;
  type: AnimalTypeProps | null;
  handleAddAnimal: (
    name: string,
    selectedAnimal: AnimalTypeProps | null
  ) => void;
}

export function Animal({ name, type, handleAddAnimal }: AnimalDataProps) {
  const [animalName, setAnimalName] = useState(name);
  const [selectedAnimal, setSelectedAnimal] = useState<AnimalTypeProps | null>(
    null
  );

  return (
    <div className="animal-container">
      <h1>{animalName}</h1>
      <div className="animal-animal">
        {name && type ? (
          <>
            <img
              src={`src/${type.svg}`}
              alt={type.svg}
              className="animal-image"
            />
            <Stats rate={type.rate} />
          </>
        ) : (
          <>
            <Dropdown
              selectedAnimal={selectedAnimal}
              setSelectedAnimal={setSelectedAnimal}
            />
            <input
              value={animalName}
              placeholder="Name your animal"
              onChange={(e) => setAnimalName(e.target.value)}
              className="input"
            />
            <button
              className="add-animal"
              onClick={() => handleAddAnimal(animalName, selectedAnimal)}
            >
              Add Animal
            </button>
          </>
        )}
      </div>
    </div>
  );
}
