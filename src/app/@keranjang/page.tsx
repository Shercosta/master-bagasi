"use client";
import SelectOrDeleteAll from "@/components/SelectOrDeleteAll";
// import keranjangItem from "@/arrays/keranjangItem";
// import { seeItem } from "@/redux/slices/bucketsSlice";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { FaRegTrashAlt } from "react-icons/fa";
import { RiHeart2Line } from "react-icons/ri";
import { FaPlus, FaMinus } from "react-icons/fa6";
import Input from "@/components/Input";
import { storePrice, removePrice } from "@/redux/slices/priceSlice";

// new logic, semua yang ke render di homescreen, masuk ke state.

export default function Keranjang() {
  const dispatch = useDispatch();

  // test for getting both id and var of keranjangItem (using)
  const [collection, setCollection] = useState([
    {
      itemId: -1,
      var: -1,
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

  const plusCountItem = (id: any) => {
    const existsInCountItem = countItem.findIndex(
      (item) => (item.countId as unknown as number) === id
    );

    // console.log(existsInCountItem);

    if (existsInCountItem === -1) {
      addCountItem(id, 1);
    } else {
      addCountItem(id, countItem[existsInCountItem].countNum + 1);
    }
  };

  const minusCountItem = (id: any) => {
    const existsInCountItem = countItem.findIndex(
      (item) => (item.countId as unknown as number) === id
    );

    if (existsInCountItem === -1) {
      addCountItem(id, -1);
    } else {
      addCountItem(id, countItem[existsInCountItem].countNum - 1);
    }
  };

  // logic to get all the items from a global state that gets keranjangItems
  const buckets = useSelector((state: any) => state.buckets);

  const [inBucket, setInBucket] = useState(buckets);

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
      dispatchPrice(id);
    } else if (existInSelect.status !== eStatus) {
      const newSelectState = select.filter((arr) => arr.selectId !== id);
      setSelect(newSelectState);
      dispatch(removePrice(id));
    }
  };

  const currentItemsInPrice = useSelector((state: any) => state.price);

  const dispatchPrice = (id: any) => {
    // const getId = inBucket;
    // console.log(getId);
    const getVariantIndexInCollection = collection.findIndex(
      (arr) => arr.itemId === id
    );
    // console.log(getVariantIndexInCollection);

    const getIndexFromBucket = inBucket.findIndex((arr: any) => arr.id === id);
    // console.log(getIndexFromBucket);

    const getVariantIndexInBucket = inBucket[
      getIndexFromBucket
    ].variant.findIndex(
      (arr: any) => arr.var === collection[getVariantIndexInCollection]?.var
    );

    const getIndexFromCountItem = countItem.findIndex(
      (arr) => arr.countId === id
    );
    const getJumlahFromCountItem = countItem[getIndexFromCountItem]?.countNum;

    const getPrice =
      inBucket[getIndexFromBucket]?.variant[getVariantIndexInBucket]?.price;
    // console.log(getPrice);

    const getWeight =
      inBucket[getIndexFromBucket]?.variant[getVariantIndexInBucket]?.weight;
    // console.log(getWeight);

    const newPrice = {
      id: id,
      price: getPrice,
      weight: getWeight,
      multiplier: getJumlahFromCountItem,
    };

    console.log(newPrice);
    dispatch(storePrice(newPrice));
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
                    onChange={(e) =>
                      addToCollection(item.id, Number(e.target.value))
                    }
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
                  <button onClick={() => minusCountItem(item.id)}>
                    <FaMinus />
                  </button>
                  <Input
                    countItem={countItem}
                    item={item}
                    addCountItem={addCountItem}
                  />

                  <button onClick={() => plusCountItem(item.id)}>
                    <FaPlus />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}

      <div onClick={() => console.log(currentItemsInPrice)}>
        see items in price
      </div>
      {/* <div onClick={() => console.log(select)}>see select</div> */}
      {/* <div onClick={() => console.log(inBucket)}>see bucketss</div> */}
      {/* <div onClick={() => console.log(select)}>see selects</div> */}
      {/* <div onClick={() => console.log(collection)}>see Collections</div> */}
      {/* <div onClick={() => console.log(countItem)}>see CountItem</div> */}
      {/* <div onClick={() => dispatchPrice(3)}>try Dispatch Price</div> */}
      {/* <div onClick={changeFirstItemName}>Get Nasi</div> */}
    </>
  );
}
