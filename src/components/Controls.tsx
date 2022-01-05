import { useDispatch } from "react-redux";
import { setColor } from "../store/actions/paint";

const Controls = () => {
  const dispatch = useDispatch();
  return (
    <div>
      <label>Color</label>
      <input
        type="color"
        onChange={(e) => dispatch(setColor(e.target.value))}
      />
    </div>
  );
};

export default Controls;
