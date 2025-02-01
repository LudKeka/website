// script.js
document.getElementById("wifi-form").addEventListener("submit", function (e) {
    e.preventDefault();

    const ssid = document.getElementById("ssid").value;
    const password = document.getElementById("password").value;
    const encryption = document.getElementById("encryption").value;

    let qrData = `WIFI:T:${encryption};S:${ssid};P:${password};;`;
    if (encryption === "nopass") {
        qrData = `WIFI:T:nopass;S:${ssid};;`;
    }

    const qrCodeContainer = document.getElementById("qrcode");
    qrCodeContainer.innerHTML = ""; // Clear previous QR code

    QRCode.toCanvas(qrData, { errorCorrectionLevel: 'H' }, function (error, canvas) {
        if (error) {
            alert("Error generating QR Code: " + error);
            return;
        }
        qrCodeContainer.appendChild(canvas); // Add the canvas to the container
        document.getElementById("qr-container").classList.remove("hidden");
    });
});

document.getElementById("download-btn").addEventListener("click", function () {
    const canvas = document.querySelector("#qrcode canvas");
    if (!canvas) {
        alert("No QR code found! Generate one first.");
        return;
    }
    const link = document.createElement("a");
    link.download = "wifi-qr-code.png";
    link.href = canvas.toDataURL("image/png");
    link.click();
});

