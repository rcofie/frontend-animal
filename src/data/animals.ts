type Animal = "Dog.svg" | "Cat.svg" | "Rabbit.svg";

export interface AnimalTypeProps {
  svg: Animal;
  rate: number;
}

export const animals: AnimalTypeProps[] = [
  { svg: "Dog.svg", rate: 1 },
  { svg: "Cat.svg", rate: 2 },
  { svg: "Rabbit.svg", rate: 3 },
];
