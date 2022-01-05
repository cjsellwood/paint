import React from "react";
import classes from "./App.module.css";
import Canvas from "./components/Canvas";

function App() {
  return (
    <div className="App">
      <h1 className={classes.title}>Paint</h1>
      <div className={classes.canvasContainer}>
        <Canvas />
      </div>
      <div className={classes.controls}></div>
    </div>
  );
}

export default App;
