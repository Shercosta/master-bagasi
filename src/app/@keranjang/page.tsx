"use client";
import SelectOrDeleteAll from "@/components/SelectOrDeleteAll";
// import keranjangItem from "@/arrays/keranjangItem";
// import { seeItem } from "@/redux/slices/bucketsSlice";
import { useSelector } from "react-redux";
import { useState } from "react";
import { FaRegTrashAlt } from "react-icons/fa";
import { RiHeart2Line } from "react-icons/ri";
import { FaPlus, FaMinus } from "react-icons/fa6";

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
  };

  // take in values from berapa banyaknya item dari yg dipilih
  const [countItem, setCountItem] = useState([{ countId: -1, countNum: -1 }]);

  const addCountItem = (id: any, eVal: number) => {
    const collect: { countId: number; countNum: number } = {
      countId: id,
      countNum: eVal,
    };

    const existsInCountItem = countItem.find(
      (item) => (item.countId as unknown as number) === id
    );

    if (!existsInCountItem) {
      setCountItem((prevCountItem) => [...prevCountItem, collect]);
    } else if (existsInCountItem.countNum !== eVal) {
      setCountItem((prevCountItem) =>
        prevCountItem.map((item) =>
          item.countId === id ? { ...item, countNum: eVal } : item
        )
      );
    }
  };

  // logic to get all the items from a global state that gets keranjangItems
  const buckets = useSelector((state: any) => state.buckets);

  const [inBucket, setInBucket] = useState(buckets);

  const changeFirstItemName = () => {
    setInBucket((prevInBucket: any) => ({
      ...prevInBucket,
      [prevInBucket[0].id - 1]: { ...prevInBucket[0], name: "Nasi" },
    }));
  };

  const [select, setSelect] = useState([
    {
      selectId: -1,
      status: false,
    },
  ]);

  const addToDipilih = (id: any, eStatus: boolean) => {
    const newSelect: { selectId: number; status: boolean } = {
      selectId: id,
      status: eStatus,
    };

    const existInSelect = select.find(
      (item) => (item.selectId as unknown as number) === id
    );

    console.log(eStatus);

    if (!existInSelect) {
      setSelect((prevSelect) => [...prevSelect, newSelect]);
    } else if (existInSelect.status !== eStatus) {
      const newSelectState = select.filter((arr) => arr.selectId !== id);
      setSelect(newSelectState);
    }
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
            <input
              type="checkbox"
              name=""
              id=""
              onChange={(e) => addToDipilih(item.id, e.target.checked)}
            />
          </div>
          <div className="flex flex-col w-11/12">
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
                  Varian:
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
                  {collection.some((arr) => arr.itemId === item.id) && (
                    <>
                      <div>
                        Rp{" "}
                        {
                          item.variant[
                            collection[
                              collection.findIndex(
                                (arr) => arr.itemId == item.id
                              )
                            ].var - 1
                          ].price
                        }
                      </div>
                      <div>
                        {
                          item.variant[
                            collection[
                              collection.findIndex(
                                (arr) => arr.itemId == item.id
                              )
                            ].var - 1
                          ].weight
                        }{" "}
                        Kg
                      </div>
                    </>
                  )}
                  {collection.some((arr) => arr.itemId === item.id) ===
                    false && (
                    <>
                      <div>Rp {item.variant[0].price}</div>
                      <div>{item.variant[0].weight} Kg</div>
                    </>
                  )}
                  {/* <div>price: {buckets[item.id - 1].variant[0].type}</div>
                  <div>weight</div> */}
                </div>
              </div>
            </div>
            <div className="flex flex-row">
              <div className="w-1/4"></div>
              <div className="w-3/4">
                <div className="flex flex-row justify-between pb-2">
                  <div>
                    <button className="p-2">
                      <RiHeart2Line />
                    </button>
                    <button className="bn15 p-2">
                      <FaRegTrashAlt />
                    </button>
                  </div>
                  <button>
                    <FaMinus />
                  </button>
                  <input
                    className="w-1/3"
                    type="number"
                    onChange={(e) =>
                      addCountItem(item.id, Number(e.target.value))
                    }
                  />
                  <button>
                    <FaPlus />
                  </button>
                  {/* <div className="flex justify-end">
                  </div> */}
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}

      {/* <div onClick={() => console.log(select)}>see select</div>
      <div onClick={() => console.log(inBucket)}>see bucketss</div>
      <div onClick={() => console.log(collection)}>see Collections</div>
      <div onClick={() => console.log(countItem)}>see CountItem</div>
      <div onClick={changeFirstItemName}>Get Nasi</div> */}
    </>
  );
}
