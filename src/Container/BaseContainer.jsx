import React from "react";
import TopBar from "../Components/TopBar/TopBar";
import Posts from "./Posts";
/**
 * Base Component / Dashboard
 */
export default function BaseContainer() {
  return (
    <React.Fragment>
      <TopBar />
      <Posts />
    </React.Fragment>
  );
}
