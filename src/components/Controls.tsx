import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../index";
import {
  toggleSave,
  undo,
  redo,
  setThickness,
  toggleClear,
} from "../store/actions/paint";
import ColorSelector from "./ColorSelector";
import classes from "./Controls.module.css";
import ToolSelector from "./ToolSelector";

const Controls = () => {
  const { thickness } = useSelector((state: RootState) => state.paint);
  const dispatch = useDispatch();

  // Add keyboard shortcuts for undo and redo
  useEffect(() => {
    document.addEventListener("keypress", (e) => {
      if (e.ctrlKey && e.key === "z") {
        dispatch(undo());
      }
      if (e.ctrlKey && e.key === "y") {
        dispatch(redo());
      }
    });
  }, [dispatch]);

  return (
    <div className={classes.controls}>
      <h1 className={classes.title}>Paint</h1>
      <ToolSelector />
      <form className={classes.widthSelector}>
        <input
          type="range"
          min="1"
          max="20"
          value={thickness}
          onChange={(e) => dispatch(setThickness(Number(e.target.value)))}
        />
        <label>Width</label>
      </form>
      <ColorSelector />
      <div className={classes.buttonContainer}>
        <div className={classes.undoRedo}>
          <button onClick={() => dispatch(undo())}>Undo</button>
          <div></div>
          <button onClick={() => dispatch(redo())}>Redo</button>
        </div>
        <button onClick={() => dispatch(toggleClear())}>Clear</button>
        <button onClick={() => dispatch(toggleSave())}>Save</button>
      </div>
    </div>
  );
};

export default Controls;
