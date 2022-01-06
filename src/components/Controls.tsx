import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../index";
import { setColor, setTool } from "../store/actions/paint";

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
        <option value="Rectangle">Rectangle</option>
        <option value="Circle">Circle</option>
      </select>
    </div>
  );
};

export default Controls;
