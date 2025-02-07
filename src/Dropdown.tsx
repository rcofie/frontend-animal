import { useState } from "react";
import { animals, AnimalTypeProps } from "./data/animals";

interface DropdownProps {
  selectedAnimal: AnimalTypeProps | null;
  setSelectedAnimal: (animal: AnimalTypeProps) => void;
}

export function Dropdown({ selectedAnimal, setSelectedAnimal }: DropdownProps) {
  const [isOpen, setIsOpen] = useState(false);

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
              className="dropdown-item"
              onClick={(e) => {
                e.stopPropagation();
                setSelectedAnimal(animal);
                setIsOpen(false);
              }}
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
