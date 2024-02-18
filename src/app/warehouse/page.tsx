import { FaArrowLeft } from "react-icons/fa";
import Link from "next/link";

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
        <Link className="w-1/2 p-3 text-center" href="/">
          Daftar Keranjang
        </Link>
        <Link className="w-1/2 p-3 text-center active" href="/warehouse">
          Warehouse
        </Link>
      </div>
    </>
  );
}
