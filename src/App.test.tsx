import { test, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
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

  const hungerPercentage = await screen.findByTestId("percentage0");
  const happinessPercentage = await screen.findByTestId("percentage1");
  const sleepinessPercentage = await screen.findByTestId("percentage2");

  const feedButton = screen.getByText("Feed");
  const playButton = screen.getByText("Play");
  const restButton = screen.getByText("Rest");

  const initialHunger = parseFloat(hungerPercentage.style.width);
  const initialHappiness = parseFloat(happinessPercentage.style.width);
  const initialSleepiness = parseFloat(sleepinessPercentage.style.width);

  expect(initialHunger).toBe(50);
  expect(initialHappiness).toBe(50);
  expect(initialSleepiness).toBe(50);

  await user.click(feedButton);
  expect(parseFloat(hungerPercentage.style.width)).toBe(initialHunger - 5);

  await user.click(playButton);
  expect(parseFloat(happinessPercentage.style.width)).toBe(
    initialHappiness + 5
  );

  await user.click(restButton);
  expect(parseFloat(sleepinessPercentage.style.width)).toBe(
    initialSleepiness - 5
  );
});

test("Happiness should decrease over time, Hunger should increase over time and Sleepiness should increase over time", async () => {
  render(<App />);
  const hungerPercentage = await screen.findByTestId("percentage0");
  const happinessPercentage = await screen.findByTestId("percentage1");
  const sleepinessPercentage = await screen.findByTestId("percentage2");

  await new Promise((resolve) => setTimeout(resolve, 3000));

  expect(parseFloat(hungerPercentage.style.width)).toBe(51);
  expect(parseFloat(happinessPercentage.style.width)).toBe(49);
  expect(parseFloat(sleepinessPercentage.style.width)).toBe(51);
});

test("Happiness should decrease faster when sleep or hunger is full", async () => {
  render(<App />);
  const happinessPercentage = await screen.findByTestId("percentage1");

  await new Promise((resolve) => setTimeout(resolve, 2000));
  expect(parseFloat(happinessPercentage.style.width)).toBe(49.5); // went down by 0.5% in 2 seconds

  const hungerPercentage = await screen.findByTestId("percentage0");
  hungerPercentage.style.width = "100%";

  await new Promise((resolve) => setTimeout(resolve, 2000));
  expect(parseFloat(happinessPercentage.style.width)).toBe(48.5); // then went down by 1% in 2 seconds
});
