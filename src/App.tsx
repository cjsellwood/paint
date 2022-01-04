import React from "react";
import classes from "./App.module.css";

function App() {
  return (
    <div className="App">
      <h1 className={classes.title}>Paint</h1>
      <div className={classes.canvasContainer}>
        <canvas className={classes.canvas}></canvas>
      </div>
      <div className={classes.controls}>

      </div>
    </div>
  );
}

export default App;
