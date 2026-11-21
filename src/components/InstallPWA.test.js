
import React from "react";
import { render, screen, fireEvent, waitFor, act } from "@testing-library/react";
import InstallPWA from "./InstallPWA";

test("Hide install button when installation is unavailable", () => {
  render(<InstallPWA />);

  expect(
    screen.queryByRole("button", { name: /add to home screen/i })
  ).not.toBeInTheDocument();
});

test("Show install button when browser supports installation", () => {
  render(<InstallPWA />);

  const event = new Event("beforeinstallprompt", {
    cancelable: true
  });

  event.prompt = jest.fn();
  event.userChoice = Promise.resolve({ outcome: "accepted" });

  act(() => {
    window.dispatchEvent(event);
  });

  expect(
    screen.getByRole("button", { name: /add to home screen/i })
  ).toBeInTheDocument();
});

test("Call installation prompt when button is clicked", async () => {
  render(<InstallPWA />);

  const promptEvent = new Event("beforeinstallprompt", {
    cancelable: true
  });

  promptEvent.prompt = jest.fn();
  promptEvent.userChoice = Promise.resolve({ outcome: "accepted" });

  act(() => {
    window.dispatchEvent(promptEvent);
  });

  fireEvent.click(
    screen.getByRole("button", { name: /add to home screen/i })
  );

  await waitFor(() => {
    expect(promptEvent.prompt).toHaveBeenCalledTimes(1);
  });

  await waitFor(() => {
    expect(
      screen.queryByRole("button", { name: /add to home screen/i })
    ).not.toBeInTheDocument();
  });
});

test("Display success message after app is installed", () => {
  render(<InstallPWA />);

  act(() => {
    window.dispatchEvent(new Event("appinstalled"));
  });

  expect(
    screen.getByText("App successfully installed!")
  ).toBeInTheDocument();
});
