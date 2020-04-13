import React from "react";
import { Provider } from "react-redux";
import Posts from "../Container/Posts";
import renderer from "react-test-renderer";
import { store } from "../Redux/Store";

describe("Posts Component", () => {
  it("should render without throwing an error", async () => {
    const rendered = renderer.create(
      <Provider dispatch={jest.fn} store={store}>
        <Posts />
      </Provider>
    );
    expect(rendered.toJSON()).toMatchSnapshot();
  });
});
