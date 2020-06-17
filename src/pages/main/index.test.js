import React from "react";
import renderer from "react-test-renderer";
import Header from "../../components/Header";

it("renders correctly", () => {
  const main = renderer.create(<Header />).toJSON();
  expect(main).toMatchSnapshot();
});
