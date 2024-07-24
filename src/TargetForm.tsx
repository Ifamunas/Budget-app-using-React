import { ChangeEvent, useState } from "react";

const TargetForm = (props: { savingAmount: number }) => {
  const [target, setTarget] = useState(0);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setTarget(Number(e.target.value));
  };

  const handleReset = () => {
    setTarget(0);
  };

  const renderPercentage = () => {
    if (target) {
      return (props.savingAmount / target) * 100;
    } else {
      return 0;
    }
  };

  return (
    <div className="grid-item3">
      <form onReset={handleReset}>
        <div>
          <label htmlFor="targetAmount">Set Target:</label>
          <input
            type="number"
            min="0"
            name="targetAmount"
            id="targetAmount"
            value={target}
            onChange={handleChange}
            required
          />
          <button type="reset" className="reset-btn">
            Reset
          </button>
        </div>
        <div>
          <p>Current Saving: {props.savingAmount}</p>
          <p>Target: {target}</p>
        </div>
        <div>
          <p>Progress: {renderPercentage()}%</p>
          <progress max={target} value={props.savingAmount}></progress>
        </div>
      </form>
    </div>
  );
};

export default TargetForm;
