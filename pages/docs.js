export default function Docs() {
  return (
    <div className="row justify-content-center">
      <div className="col-lg-8">
        <div
          className="card shadow-sm p-4 px-5 border-0"
          style={{ borderRadius: "18px" }}
        >
          <h2 className="fw-bold mb-4">Dokumentasi API QRIS Dinamis</h2>

          <h5 className="fw-bold">Endpoint</h5>
          <pre className="bg-dark text-white p-3 rounded">
            POST /api/generate
          </pre>

          <h5 className="fw-bold mt-4">Body JSON</h5>
          <pre className="bg-dark text-white p-3 rounded">
            {`{
  "qris_raw": "000201010212...",
  "amount": "15000"
}`}
          </pre>

          <h5 className="fw-bold mt-4">Contoh Response</h5>
          <pre className="bg-dark text-white p-3 rounded">
            {`{
  "status": true,
  "qris_dynamic": "000201010212...",
  "qr_png": "data:image/png;base64,..."
}`}
          </pre>

          <h5 className="fw-bold mt-4">Catatan</h5>
          <ul>
            <li>API ini menghasilkan QRIS Dinamis valid.</li>
            <li>Mendukung semua e-wallet & bank QRIS.</li>
            <li>Tidak menyimpan data apapun.</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
