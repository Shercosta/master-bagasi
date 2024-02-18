import { FaRegTrashAlt } from "react-icons/fa";

const SelectOrDeleteAll = () => {
  return (
    <>
      <div className="flex justify-around p-3">
        <div id="selectAll">
          <form>
            <input type="checkbox" name="selectAll" id="" />
            Pilih Semua
          </form>
        </div>
        <button type="button" className="flex delete-button items-center">
          <FaRegTrashAlt />
          Hapus Semua
        </button>
      </div>
    </>
  );
};

export default SelectOrDeleteAll;