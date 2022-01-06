import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../index";
import { setColor, setTool, toggleSave } from "../store/actions/paint";

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
      </select>
      <button onClick={() => dispatch(toggleSave())}>Save</button>
    </div>
  );
};

export default Controls;
