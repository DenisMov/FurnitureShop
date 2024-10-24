import { Dispatch, SetStateAction, FC } from "react";

import "./counter.scss";

interface ICounterProps {
  value: number;
  onChange: Dispatch<SetStateAction<number>>;
}

const Counter: FC<ICounterProps> = ({ value, onChange }) => {
  //@ts-ignore
  const handleChangeValue = (e) => {
    const inputValue = e.target.value;
    if (!isNaN(inputValue) && inputValue.trim() !== "") {
      onChange(Number(inputValue));
    } else if (inputValue.trim() === "") {
      onChange(1);
    }
  };

  const handleAdd = () => {
    onChange((prevValue) => prevValue + 1);
  };

  const handleRemove = () => {
    if (value > 1) {
      onChange((prevValue) => prevValue - 1);
    }
  };

  return (
    <div className="counter">
      <span className="down" onClick={handleRemove}>
        -
      </span>
      <input type="text" value={value} onChange={handleChangeValue} />
      <span className="up" onClick={handleAdd}>
        +
      </span>
    </div>
  );
};

export default Counter;
