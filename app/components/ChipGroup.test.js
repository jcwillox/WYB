import React from "react";
import renderer from "react-test-renderer";
import { Colors, Provider as PaperProvider } from "react-native-paper";
import ChipGroup from "./ChipGroup";
import theme from "../config/theme";

it("ensure <ChipGroup /> renders correctly", () => {
  let selected = new Set(["Shops"]);
  let categories = [
    { name: "Attractions", color: Colors.deepPurple500 },
    { name: "Shops", color: Colors.amber800 },
    { name: "Restaurants", color: Colors.green600 },
    { name: "Hotels", color: Colors.cyan600 },
  ];

  const tree = renderer
    .create(
      <PaperProvider theme={theme}>
        <ChipGroup items={categories} selected={selected} />
      </PaperProvider>
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});
