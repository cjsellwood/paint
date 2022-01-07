import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../index";
import {
  setColor,
  setTool,
  toggleSave,
  undo,
  redo,
  setThickness,
} from "../store/actions/paint";

const Controls = () => {
  const { tool, thickness } = useSelector((state: RootState) => state.paint);
  const dispatch = useDispatch();

  return (
    <div>
      <form>
        <label>Color</label>
        <input
          type="color"
          onChange={(e) => dispatch(setColor(e.target.value))}
        />
        <select
          value={tool}
          onChange={(e) => dispatch(setTool(e.target.value))}
        >
          <option value="rectangle">Rectangle</option>
          <option value="rectangleOutline">Rectangle Outline</option>
          <option value="circle">Circle</option>
          <option value="circleOutline">Circle Outline</option>
          <option value="line">Line</option>
          <option value="pencil">Pencil</option>
          <option value="fill">Fill</option>
        </select>
        <label>Thickness</label>
        <input
          type="range"
          min="1"
          max="20"
          value={thickness}
          onChange={(e) => dispatch(setThickness(Number(e.target.value)))}
        />
      </form>
      <button onClick={() => dispatch(toggleSave())}>Save</button>
      <button onClick={() => dispatch(undo())}>Undo</button>
      <button onClick={() => dispatch(redo())}>Redo</button>
    </div>
  );
};

export default Controls;
