import { FaArrowLeft } from "react-icons/fa";
import Link from "next/link";
import keranjangItem from "@/arrays/keranjangItem";

export default function warehouse() {
  return (
    <>
      <div className="flex items-center">
        <div className="p-3">
          <FaArrowLeft />
        </div>
        <div className="p-3">Keranjang</div>
      </div>
      <div className="flex flex-row border-b">
        <Link className="w-1/2 p-2 text-center" href="/">
          Daftar Keranjang ({keranjangItem.length})
        </Link>
        <Link className="w-1/2 p-2 text-center active" href="/warehouse">
          Warehouse
        </Link>
      </div>
    </>
  );
}
