import { useState, useRef } from "react";
import jsQR from "jsqr";

export default function Home() {
  const [rawQRIS, setRawQRIS] = useState("");
  const [amount, setAmount] = useState("");
  const [result, setResult] = useState(null);
  const canvasRef = useRef(null);

  // Read QR File
  const handleUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (ev) => {
      const img = new Image();

      img.onload = () => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext("2d");

        canvas.width = img.width;
        canvas.height = img.height;
        ctx.drawImage(img, 0, 0);

        const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const qr = jsQR(imgData.data, canvas.width, canvas.height);

        if (!qr || !qr.data) return alert("QR tidak terbaca!");

        setRawQRIS(qr.data);
      };

      img.src = ev.target.result;
    };

    reader.readAsDataURL(file);
  };

  // API call
  const handleGenerate = async () => {
    if (!rawQRIS) return alert("Upload QRIS dulu");
    if (!amount) return alert("Nominal wajib diisi");

    const res = await fetch("/api/generate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ qris_raw: rawQRIS, amount }),
    });

    const data = await res.json();
    setResult(data);

    if (!data.status) alert("Error: " + data.error);
  };

  return (
    <div className="row justify-content-center">
      <div className="col-lg-7">
        {/* MAIN CARD */}
        <div
          className="card shadow-sm p-4 px-5 border-0"
          style={{ borderRadius: "18px" }}
        >
          <h2 className="fw-bold text-center mb-4">
            Generate QRIS Dinamis (Nominal)
          </h2>

          <label className="form-label fw-semibold">Upload Gambar QRIS</label>
          <input
            type="file"
            className="form-control mb-4"
            accept="image/*"
            onChange={handleUpload}
          />

          <canvas ref={canvasRef} style={{ display: "none" }} />

          {rawQRIS && (
            <>
              <label className="form-label fw-semibold">RAW QRIS</label>
              <textarea
                className="form-control mb-4"
                rows="7"
                readOnly
                value={rawQRIS}
                style={{ fontFamily: "monospace", padding: "12px" }}
              />

              <label className="form-label fw-semibold">Nominal</label>
              <input
                type="number"
                className="form-control mb-4"
                placeholder="contoh: 15000"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
              />

              <button
                className="btn btn-primary w-100 fw-bold py-3 fs-5"
                onClick={handleGenerate}
              >
                Generate QR Dinamis
              </button>
            </>
          )}
        </div>

        {/* RESULT */}
        {result?.status && (
          <div
            className="card shadow-sm mt-4 p-4 border-0"
            style={{ borderRadius: "18px" }}
          >
            <h4 className="fw-bold text-center mb-3">QRIS Dinamis</h4>

            <div className="text-center">
              <img
                src={result.qr_png}
                className="img-fluid mb-3"
                style={{ maxWidth: "240px" }}
                alt="QRIS"
              />

              <div className="fw-bold mb-3" style={{ opacity: 0.85 }}>
                Rp {amount}
              </div>

              <textarea
                className="form-control"
                rows="5"
                value={result.qris_dynamic}
                readOnly
                style={{ fontFamily: "monospace" }}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
