import React from "react";
import classes from "./App.module.css";
import Canvas from "./components/Canvas";
import Controls from "./components/Controls";

function App() {
  return (
    <div className={classes.App}>
      <Controls />
      <Canvas />
    </div>
  );
}

export default App;
