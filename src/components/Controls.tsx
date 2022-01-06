import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../index";
import { setColor, setTool, toggleSave, undo, redo } from "../store/actions/paint";

const Controls = () => {
  const tool = useSelector((state: RootState) => state.paint.tool);
  const dispatch = useDispatch();

  return (
    <div>
      <label>Color</label>
      <input
        type="color"
        onChange={(e) => dispatch(setColor(e.target.value))}
      />
      <select value={tool} onChange={(e) => dispatch(setTool(e.target.value))}>
        <option value="rectangle">Rectangle</option>
        <option value="rectangleOutline">Rectangle Outline</option>
        <option value="circle">Circle</option>
        <option value="circleOutline">Circle Outline</option>
        <option value="line">Line</option>
      </select>
      <button onClick={() => dispatch(toggleSave())}>Save</button>
      <button onClick={() => dispatch(undo())}>Undo</button>
      <button onClick={() => dispatch(redo())}>Redo</button>
    </div>
  );
};

export default Controls;
