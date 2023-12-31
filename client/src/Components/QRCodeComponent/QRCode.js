import React, { useEffect, useState } from "react";
import { Html5QrcodeScanner } from "html5-qrcode";
import AddPet from "../Add-Pet Component/AddPet";
import "./QR.css";
const QRCode = () => {
  const [scanResult, setScanResult] = useState(null);
  useEffect(() => {
    const scanner = new Html5QrcodeScanner("reader", {
      qrbox: {
        width: 200,
        height: 200,
      },
    });

    scanner.render(
      (result) => {
        scanner.clear();

        setScanResult(result);
      },
      (error) => {}
    );
  }, []);

  return (
    <>
      {scanResult ? (
        <AddPet scanResult={scanResult} />
      ) : (
        <div className="qr-code-page">
          <h1 className="qr-title">Please scan pet tag QR code to continue.</h1>
          <div id="reader"></div>
        </div>
      )}
    </>
  );
};

export default QRCode;
