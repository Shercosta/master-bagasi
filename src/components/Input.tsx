import React from "react";

interface Props {
  countItem: Array<any>;
  item: any;
  addCountItem: (itemId: number, newValue: number) => void;
}

const Input: React.FC<Props> = ({ countItem, item, addCountItem }) => {
  const IdIndex = countItem.findIndex((arr) => arr.countId === item.id);

  console.log(IdIndex);

  return (
    <>
      {IdIndex !== -1 ? (
        <input
          className="w-1/3"
          type="number"
          value={countItem[IdIndex]?.countNum}
          onChange={(e) => addCountItem(item.id, Number(e.target.value))}
        />
      ) : (
        <input
          className="w-1/3"
          type="number"
          onChange={(e) => addCountItem(item.id, Number(e.target.value))}
        />
      )}
    </>
  );
};

export default Input;
