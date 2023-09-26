import React, { useEffect, useState } from "react";
import { Html5QrcodeScanner } from "html5-qrcode";
import AddPet from "../Add-Pet Component/AddPet";
import "./QR.css";
const QRCode = () => {
  const [scanResult, setScanResult] = useState(null);
  useEffect(() => {
    const scanner = new Html5QrcodeScanner("reader", {
      qrbox: {
        width: 1000,
        height: 1000,
      },
      fps: 5,
    });
    scanner.render(
      (result) => {
        scanner.clear();

        setScanResult(result);
      },
      (error) => {
        console.log(error);
      }
    );
  }, []);

  return (
    <>
      {scanResult ? (
        <AddPet scanResult={scanResult} />
      ) : (
        <div className="qr-code-page">
          <div id="reader"></div>
        </div>
      )}
    </>
  );
};

export default QRCode;