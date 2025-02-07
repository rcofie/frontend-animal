import { useState } from "react";
import { animals, AnimalTypeProps } from "./data/animals";
import { Animal } from "./Animal.tsx";
import "./App.css";

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
      name: "Lydia",
      type: animals.find((a) => a.svg === "Cat.svg") || null,
    },
    {
      name: "",
      type: null,
    },
  ]);

  function handleAddAnimal(
    name: string,
    selectedAnimal: AnimalTypeProps | null
  ) {
    if (name === "" || !selectedAnimal) {
      alert("Please select an animal type and enter a name!");
      return;
    }

    setAnimalData((prevData) => [
      ...prevData.map((animal, index) =>
        index === prevData.length - 1
          ? { ...animal, type: selectedAnimal, name }
          : animal
      ),
      { type: null, name: "" },
    ]);
  }

  return (
    <div className="animal-page">
      <div className="animal-wrapper">
        {animalData.map((animal, index) => (
          <Animal
            key={index}
            name={animal.name}
            type={animal.type}
            handleAddAnimal={handleAddAnimal}
          />
        ))}
      </div>
    </div>
  );
}

export default App;
