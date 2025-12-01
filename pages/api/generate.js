// pages/api/generate.js

import QRCode from "qrcode";
import { generateDynamicQR } from "../../core/qris";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ status: false, error: "Method not allowed" });
  }

  try {
    const { qris_raw, amount } = req.body;

    if (!qris_raw || !amount) {
      return res.status(400).json({
        status: false,
        error: "qris_raw dan amount wajib diisi",
      });
    }

    const finalQR = generateDynamicQR(qris_raw, amount);
    const qr_png = await QRCode.toDataURL(finalQR);

    return res.status(200).json({
      status: true,
      qris_dynamic: finalQR,
      qr_png: qr_png,
    });
  } catch (err) {
    return res.status(500).json({
      status: false,
      error: err.message,
    });
  }
}
