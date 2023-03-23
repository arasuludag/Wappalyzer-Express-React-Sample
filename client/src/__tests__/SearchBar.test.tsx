import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { Provider } from "react-redux";
import { store } from "../app/store";
import SearchBar from "../pages/Home/SearchBar";

test("tries to enter non-url input and expects disabled button", async () => {
  render(
    <Provider store={store}>
      <SearchBar />
    </Provider>
  );

  const field = screen.getByTestId("url-query-textfield");

  expect(field).toBeInTheDocument();

  fireEvent.change(field, { target: { value: "testing" } });

  expect(screen.getByTestId("analyze-button")).toBeDisabled();
});

test("tries to enter url input without http and expects disabled button", async () => {
  render(
    <Provider store={store}>
      <SearchBar />
    </Provider>
  );

  const field = screen.getByTestId("url-query-textfield");

  expect(field).toBeInTheDocument();

  fireEvent.change(field, { target: { value: "www.testing.com" } });

  expect(screen.getByTestId("analyze-button")).toBeDisabled();
});

test("tries to enter a proper url input and expects non-disabled button", async () => {
  render(
    <Provider store={store}>
      <SearchBar />
    </Provider>
  );

  const field = screen.getByTestId("url-query-textfield");

  expect(field).toBeInTheDocument();

  fireEvent.change(field, { target: { value: "https://www.testing.com" } });

  expect(screen.getByTestId("analyze-button")).not.toBeDisabled();
});
