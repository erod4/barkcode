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
      fps: 5,
      fileInputs: false,
    });

    console.log(scanner);

    scanner.render(
      (result) => {
        scanner.clear();
        console.log(scanner);
        setScanResult(result);
      },
      (error) => {
        console.log(error);
        console.log(scanner);
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
