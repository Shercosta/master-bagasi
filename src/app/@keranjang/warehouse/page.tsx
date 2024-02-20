"use client";
import SelectOrDeleteAll from "@/components/SelectOrDeleteAll";

export default function Warehouse() {
  return (
    <>
      <SelectOrDeleteAll />
      <div className="flex w-full p-2 justify-center">
        <div>
          <button className="bg-blue-950 text-white p-2 rounded-lg">
            Tambah barang ke warehouse
          </button>
        </div>
      </div>
    </>
  );
}
