export default function Checkout() {
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
              <div>Rp. Jumlah</div>
            </div>

            <div>
              <button className="bn15-checkout p-2">Checkout (3)</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
