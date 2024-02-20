"use client";
import { useSelector } from "react-redux";

export default function Checkout() {
  const total = useSelector((state: any) => state.price);

  let totalRp = 0;
  for (let index = 0; index < total.length; index++) {
    const element = total[index];
    if (index === 0) {
      totalRp = 0;
    }
    totalRp = totalRp + element.price * element.multiplier;
  }

  return (
    <>
      <div className="flex flex-col px-2">
        <div className="flex flex-col">
          <div className="flex flex-row justify-between">
            <div>Keranjang yang dipilih</div>
            <div>2 Item</div>
          </div>
          <div className="flex flex-row justify-between">
            <div>Warehouse yang dipilih</div>
            <div>1 Item</div>
          </div>
          <div className="flex flex-row justify-between">
            <div className="flex flex-col">
              <div>Total Belanja</div>
              <div>Rp {totalRp}</div>
            </div>

            <div>
              <button className="bn15-checkout p-2">Checkout (3)</button>
            </div>
          </div>
        </div>
      </div>
      {/* <div onClick={() => console.log(total)}>see total</div> */}
      {/* <div onClick={() => console.log(totalRp)}>see totalRp</div> */}
    </>
  );
}
