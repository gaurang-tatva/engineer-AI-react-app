import React from "react";
import { BrowserRouter } from "react-router-dom";
import BaseContainer from "./Container/BaseContainer";
import { APP_PATH } from "./Helpers/Constants";

class App extends React.Component {
  render() {
    return (
      <BrowserRouter basename={APP_PATH}>
        <BaseContainer />
      </BrowserRouter>
    );
  }
}

export default App;
