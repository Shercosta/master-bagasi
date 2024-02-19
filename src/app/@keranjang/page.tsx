"use client";
import SelectOrDeleteAll from "@/components/SelectOrDeleteAll";
// import keranjangItem from "@/arrays/keranjangItem";
import { seeItem } from "@/redux/slices/bucketsSlice";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";

// new logic, semua yang ke render di homescreen, masuk ke state.

export default function Keranjang() {
  // test for getting both id and var of keranjangItem (using)
  const [collection, setCollection] = useState([
    {
      itemId: -1,
      var: 3,
    },
  ]);

  const addToCollection = (cId: number, cVar: any) => {
    const collect: { itemId: number; var: any } = { itemId: cId, var: cVar };

    const existsInCollection = collection.find(
      (item) => (item.itemId as unknown as number) === cId
    );

    if (!existsInCollection) {
      setCollection((prevCollection) => [
        ...prevCollection,
        { ...collect, itemId: collect.itemId as number },
      ]);
    } else if (existsInCollection.var !== cVar) {
      setCollection((prevCollection) =>
        prevCollection.map((item) =>
          item.itemId === cId ? { ...item, var: cVar } : item
        )
      );
    }

    console.log(existsInCollection);
  };

  // logic to get all the items from a global state that gets keranjangItems
  const buckets = useSelector((state: any) => state.buckets);

  const [inBucket, setInBucket] = useState(buckets);

  const changeFirstItemName = () => {
    setInBucket((prevInBucket: any) => ({
      ...prevInBucket,
      // [prevInBucket[0].id - 1]: { ...prevInBucket[0], id: "33" },
      [prevInBucket[0].id - 1]: { ...prevInBucket[0], name: "Nasi" },
      // [prevInBucket[0].id]: { ...prevInBucket[1], name: "Nasi" },
    }));
  };

  return (
    <>
      <SelectOrDeleteAll />
      {buckets.map((item: any) => (
        <div
          className="flex border-b items-center w-full pl-3 pr-2"
          key={item.id}
        >
          <div className="w-1/12">
            <input type="checkbox" name="" id="" />
          </div>
          <div className="flex flex-col items-center w-11/12">
            <div className="flex flex-row items-center w-full">
              <div className="w-1/4">
                <img
                  src={item.pictUrl}
                  className="aspect-square"
                  alt={item.name}
                />
              </div>
              <div className="flex flex-col w-3/4">
                <div>
                  {item.name.length > 20
                    ? item.name[19] === " "
                      ? item.name.slice(0, 19) + "..."
                      : item.name.slice(0, 20) + "..."
                    : item.name}
                </div>
                <div>
                  <select
                    name={item.name}
                    id="haze"
                    onChange={(e) => addToCollection(item.id, e.target.value)}
                  >
                    {item.variant.map((variant: any) => (
                      <option value={variant.var} key={variant.var}>
                        {variant.type}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="flex flex-row justify-between">
                  <div>price: {buckets[item.id - 1].variant[0].type}</div>
                  <div>weight</div>
                </div>
              </div>
            </div>
            <div>F</div>
          </div>
        </div>
      ))}
      <div onClick={() => console.log(inBucket)}>see bucketss</div>
      <div onClick={changeFirstItemName}>Get Nasi</div>
    </>
  );
}
