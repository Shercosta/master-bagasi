"use client";
import SelectOrDeleteAll from "@/components/SelectOrDeleteAll";
// import keranjangItem from "@/arrays/keranjangItem";
import { seeItem } from "@/redux/slices/bucketsSlice";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";

export default function Keranjang() {
  // test for receiving a change of state
  const [received, setReceived] = useState({
    id: Number,
    varian: Number,
  });
  const dispatch = useDispatch();
  const [selected, setSelected] = useState();

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

  const receive = (a: any, b: any) => {
    const objReceive = {
      id: a,
      varian: b,
    };
    setReceived(objReceive);
  };

  // check if collection exist while printing harga
  const getHarga = (itemObject: any) => {
    return itemObject.variant[0].price;
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
                  <div>
                    price:
                    {/* {item.variant[0].price} */}
                    {/* {item.variant[getHarga()].price} */}
                    {getHarga(item)}
                  </div>
                  <div>weight</div>
                </div>
              </div>
            </div>
            <div>F</div>
          </div>
        </div>
      ))}
      <div onClick={() => console.log(collection)}>see collection</div>
      <div onClick={() => console.log(getHarga(1))}>see collection</div>
    </>
  );
}
