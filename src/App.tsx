import React from "react";
import classes from "./App.module.css";
import Canvas from "./components/Canvas";
import Controls from "./components/Controls";

function App() {
  return (
    <div className="App">
      <h1 className={classes.title}>Paint</h1>
      <div className={classes.canvasContainer}>
        <Canvas />
      </div>
      <div className={classes.controls}>
        <Controls />
      </div>
    </div>
  );
}

export default App;
