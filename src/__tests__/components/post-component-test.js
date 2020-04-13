import React from "react";
import { Provider } from "react-redux";
import Post from "../../Components/Post/Post";
import renderer from "react-test-renderer";
import { store } from "../../Redux/Store";
import postData from "./../../fixture/data.json";

describe("Post Component", () => {
  it("should render without throwing an error", async () => {
    const rendered = renderer.create(
      <Provider dispatch={jest.fn} store={store}>
        <Post postData={postData} handleViewMore={jest.fn} />
      </Provider>
    );
    expect(rendered.toJSON()).toMatchSnapshot();
  });
});
