import { test, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";
import App from "./App";
import "@testing-library/jest-dom";

test("users should be able to name animals", async () => {
  render(<App />);
  const user = userEvent.setup();

  const input = await screen.findByPlaceholderText("Name your animal");
  expect(input).toHaveProperty("value", "");

  await user.type(input, "Lou");
  expect(input).toHaveProperty("value", "Lou");
});

test("animals should start neutral on all metrics, playing with animals makes them happy, feeding animals makes them less hungry and resting animals makes them less sleepy", async () => {
  render(<App />);
  const user = userEvent.setup();

  const hungerPercentageCoco = await screen.getAllByTestId("percentage0")[0];
  const happinessPercentageCoco = await screen.getAllByTestId("percentage1")[0];
  const sleepinessPercentageCoco = await screen.getAllByTestId(
    "percentage2"
  )[0];

  const feedButton = screen.getAllByText("Feed")[0];
  const playButton = screen.getAllByText("Play")[0];
  const restButton = screen.getAllByText("Rest")[0];

  const initialHunger = parseFloat(hungerPercentageCoco.style.width);
  const initialHappiness = parseFloat(happinessPercentageCoco.style.width);
  const initialSleepiness = parseFloat(sleepinessPercentageCoco.style.width);

  expect(initialHunger).toBe(50);
  expect(initialHappiness).toBe(50);
  expect(initialSleepiness).toBe(50);

  await user.click(feedButton);
  expect(parseFloat(hungerPercentageCoco.style.width)).toBe(initialHunger - 5);

  await user.click(playButton);
  expect(parseFloat(happinessPercentageCoco.style.width)).toBe(
    initialHappiness + 5
  );

  await user.click(restButton);
  expect(parseFloat(sleepinessPercentageCoco.style.width)).toBe(
    initialSleepiness - 5
  );
});

test("Happiness should decrease over time, Hunger should increase over time and Sleepiness should increase over time", async () => {
  render(<App />);
  const hungerPercentageCoco = await screen.getAllByTestId("percentage0")[0];
  const happinessPercentageCoco = await screen.getAllByTestId("percentage1")[0];
  const sleepinessPercentageCoco = await screen.getAllByTestId(
    "percentage2"
  )[0];

  await new Promise((resolve) => setTimeout(resolve, 3000));

  expect(parseFloat(hungerPercentageCoco.style.width)).toBe(51);
  expect(parseFloat(happinessPercentageCoco.style.width)).toBe(49);
  expect(parseFloat(sleepinessPercentageCoco.style.width)).toBe(51);
});

test("Happiness should decrease faster when sleep or hunger is full", async () => {
  render(<App />);
  const happinessPercentageCoco = await screen.getAllByTestId("percentage1")[0];

  await new Promise((resolve) => setTimeout(resolve, 2000));
  expect(parseFloat(happinessPercentageCoco.style.width)).toBe(49.5); // went down by 0.5% in 2 seconds

  const hungerPercentageCoco = await screen.getAllByTestId("percentage0")[0];
  hungerPercentageCoco.style.width = "100%";

  await new Promise((resolve) => setTimeout(resolve, 2000));
  expect(parseFloat(happinessPercentageCoco.style.width)).toBe(48.5); // then went down by 1% in 2 seconds
});

test("Users should be able to have multiple animals of different types, each animal type should have metrics which increase/decrease at different rates", async () => {
  render(<App />);

  const input = await screen.getByRole("textbox");
  const dropdown = screen.getByText("Select an Animal ▼");
  const addButton = screen.getByText("Add Animal");
  const user = userEvent.setup();

  // add another animal

  await user.click(dropdown);
  await user.click(screen.getByText("Rabbit"));
  await user.type(input, "Daisy");
  await user.click(addButton);
  expect(screen.getByText("Daisy")).toBeInTheDocument();

  // check that there's multiple different types of animals

  expect(screen.getByAltText("Dog.svg")).toBeInTheDocument();
  expect(screen.getByAltText("Cat.svg")).toBeInTheDocument();
  expect(screen.getByAltText("Rabbit.svg")).toBeInTheDocument();

  // reset all metrics back to 50% (neutral)

  const hungerBars = screen.getAllByTestId("percentage0");
  const happinessBars = screen.getAllByTestId("percentage1");
  const sleepinessBars = screen.getAllByTestId("percentage2");

  hungerBars.forEach((bar) => (bar.style.width = "50%"));
  happinessBars.forEach((bar) => (bar.style.width = "50%"));
  sleepinessBars.forEach((bar) => (bar.style.width = "50%"));

  // check initial hunger and happiness values for all

  const initialHungerDog = parseFloat(hungerBars[0].style.width);
  const initialHungerCat = parseFloat(hungerBars[1].style.width);
  const initialHungerRabbit = parseFloat(hungerBars[2].style.width);

  const initialHappinessDog = parseFloat(happinessBars[0].style.width);
  const initialHappinessCat = parseFloat(happinessBars[1].style.width);
  const initialHappinessRabbit = parseFloat(happinessBars[2].style.width);

  await new Promise((resolve) => setTimeout(resolve, 2000));

  // check updated hunger values are greater than initial values

  const updatedHungerDog = parseFloat(hungerBars[0].style.width);
  const updatedHungerCat = parseFloat(hungerBars[1].style.width);
  const updatedHungerRabbit = parseFloat(hungerBars[2].style.width);

  expect(updatedHungerDog).toBeGreaterThan(initialHungerDog);
  expect(updatedHungerCat).toBeGreaterThan(initialHungerCat);
  expect(updatedHungerRabbit).toBeGreaterThan(initialHungerRabbit);

  // check updated happiness values are less than initial values

  const updatedHappinessDog = parseFloat(happinessBars[0].style.width);
  const updatedHappinessCat = parseFloat(happinessBars[1].style.width);
  const updatedHappinessRabbit = parseFloat(happinessBars[2].style.width);

  expect(updatedHappinessDog).toBeLessThan(initialHappinessDog);
  expect(updatedHappinessCat).toBeLessThan(initialHappinessCat);
  expect(updatedHappinessRabbit).toBeLessThan(initialHappinessRabbit);

  // check that hunger and sleepiness values are the same

  const updatedSleepDog = parseFloat(sleepinessBars[0].style.width);
  const updatedSleepCat = parseFloat(sleepinessBars[1].style.width);
  const updatedSleepRabbit = parseFloat(sleepinessBars[2].style.width);

  expect(updatedHungerDog).toEqual(updatedSleepDog);
  expect(updatedHungerCat).toEqual(updatedSleepCat);
  expect(updatedHungerRabbit).toEqual(updatedSleepRabbit);

  // check that hunger for each animal increases at different rates. should be the same with sleepiness as hunger and sleepiness are the same as proved above

  expect(updatedHungerCat - initialHungerCat).not.toEqual(
    updatedHungerDog - initialHungerDog
  );
  expect(updatedHungerRabbit - initialHungerRabbit).not.toEqual(
    updatedHungerCat - initialHungerCat
  );

  // check that happiness for each animal decreases at different rates

  expect(initialHappinessCat - updatedHappinessCat).not.toEqual(
    initialHappinessDog - updatedHappinessDog
  );
  expect(initialHappinessRabbit - updatedHappinessRabbit).not.toEqual(
    initialHappinessCat - updatedHappinessCat
  );
});
