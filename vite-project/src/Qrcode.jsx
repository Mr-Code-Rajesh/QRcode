import React, { useState } from 'react';
import { FaQrcode, FaDownload } from 'react-icons/fa';
import { motion } from 'framer-motion';

export const Qrcode = () => {
  const [img, setImg] = useState('');
  const [loading, setLoading] = useState(false);
  const [qrData, setQrData] = useState('Sakthi');
  const [size, setSize] = useState(200);

  const generateQRCode = async () => {
    setLoading(true);
    try {
      const url = `https://api.qrserver.com/v1/create-qr-code/?size=${size}x${size}&data=${encodeURIComponent(qrData)}`;
      setImg(url);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const downloadQRCode = () => {
    fetch(img)
      .then((res) => res.blob())
      .then((blob) => {
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = 'qrcode.png';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-black via-gray-900 to-gray-950 px-4 py-10 overflow-hidden">
      {/* Glow Ring */}
      <div className="absolute top-1/3 left-1/2 w-[400px] h-[400px] bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 rounded-full opacity-20 blur-3xl animate-spin-slow"></div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative z-10 bg-white/10 border border-white/10 backdrop-blur-xl text-white rounded-xl p-8 shadow-2xl w-full max-w-lg flex flex-col items-center gap-6"
      >
        <h2 className="text-3xl font-extrabold text-center text-transparent bg-clip-text bg-gradient-to-r from-pink-400 via-purple-400 to-blue-400 uppercase tracking-wide">
          QR Code Generator
        </h2>

        {/* QR Preview */}
        <div className="w-full flex flex-col items-center gap-4">
          {img && (
            <motion.img
              src={img}
              alt="QR Code"
              className="w-48 h-48 border-4 border-white/20 rounded-xl"
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.4 }}
            />
          )}
          {loading && <p className="text-sm text-gray-300">Generating QR Code...</p>}
        </div>

        {/* Input Section */}
        <div className="w-full flex flex-col gap-4">
          <div className="flex flex-col">
            <label htmlFor="data" className="text-sm mb-1 text-gray-300">Enter your QR Data:</label>
            <input
              type="text"
              id="data"
              placeholder="https://example.com"
              className="px-4 py-2 rounded bg-white/10 border border-white/20 text-white outline-none focus:ring-2 focus:ring-blue-400"
              value={qrData}
              onChange={(e) => setQrData(e.target.value)}
            />
          </div>

          <div className="flex flex-col">
            <label htmlFor="size" className="text-sm mb-1 text-gray-300">Size (in pixels):</label>
            <input
              type="number"
              id="size"
              placeholder="200"
              className="px-4 py-2 rounded bg-white/10 border border-white/20 text-white outline-none focus:ring-2 focus:ring-blue-400"
              value={size}
              onChange={(e) => setSize(e.target.value)}
            />
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-4 mt-4">
          <button
            onClick={generateQRCode}
            disabled={loading}
            className="flex items-center gap-2 bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded-lg font-semibold text-white transition-all"
          >
            <FaQrcode /> Generate
          </button>
          <button
            onClick={downloadQRCode}
            disabled={!img}
            className="flex items-center gap-2 bg-green-500 hover:bg-green-600 px-4 py-2 rounded-lg font-semibold text-white transition-all"
          >
            <FaDownload /> Download
          </button>
        </div>

        <p className="mt-4 text-sm text-gray-400 text-center">
          Developed by <span className="text-pink-400">&copy; Saktrix {new Date().getFullYear()}</span>
        </p>
      </motion.div>
    </div>
  );
};




