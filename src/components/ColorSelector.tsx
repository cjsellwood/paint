import React from "react";
import classes from "./ColorSelector.module.css";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../index";
import { setColor } from "../store/actions/paint";

const ColorSelector = () => {
  const dispatch = useDispatch();
  const { color, defaultColors, customColors } = useSelector(
    (state: RootState) => state.paint
  );

  return (
    <form className={classes.colorSelector}>
      <div className={classes.topColors}>
        <input
          type="color"
          title="Click for custom color"
          onChange={(e) => dispatch(setColor(e.target.value))}
          value={color}
        />
      </div>
      <div className={classes.savedColors}>
        {defaultColors.map((color, index) => (
          <div
            className={classes.color}
            key={`${color}-${index}`}
            style={{ backgroundColor: `${color}` }}
            onClick={() => dispatch(setColor(color))}
          />
        ))}
        {customColors.map((color, index) => (
          <div
            className={classes.color}
            key={`${color}-${index}`}
            style={{ backgroundColor: `${color}` }}
            onClick={() => dispatch(setColor(color))}
          />
        ))}
      </div>
    </form>
  );
};

export default ColorSelector;
