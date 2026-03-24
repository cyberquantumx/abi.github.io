document.addEventListener('DOMContentLoaded', () => {
    // Обработчики кнопок
    document.querySelector('#genQR').addEventListener('click', () => {
        generateQRCode();
    });

    document.querySelector('#btnConnect').addEventListener('click', connect);

    // Обработчик закрытия модального окна
    const modal = document.getElementById('exampleModal');
    modal.addEventListener('hidden.bs.modal', () => {
        // Сбрасываем QR‑код при закрытии модального окна
        const qrImage = document.getElementById('qr');
        if (qrImage) {
            qrImage.style.display = 'none';
            qrImage.src = '';
        }
    });
});