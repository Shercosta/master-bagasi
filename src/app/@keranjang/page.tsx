import SelectOrDeleteAll from "@/components/SelectOrDeleteAll";
import keranjangItem from "@/arrays/keranjangItem";

export default function Keranjang() {
  return (
    <>
      <SelectOrDeleteAll />
      {keranjangItem.map((item) => (
        <div className="flex border-b items-center w-full">
          <div className="w-1/12">A</div>
          <div className="flex flex-col items-center w-11/12">
            <div className="flex flex-row items-center w-full">
              <div className="w-1/4">B</div>
              <div className="flex flex-col w-3/4">
                <div>C</div>
                <div>D</div>
                <div className="flex flex-row justify-between">
                  <div>price</div>
                  <div>weight</div>
                </div>
              </div>
            </div>
            <div>F</div>
          </div>
        </div>
      ))}
    </>
  );
}
