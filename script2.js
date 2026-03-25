document.addEventListener('DOMContentLoaded', () => {
    const genQRBtn = document.getElementById('genQR');
    const connectBtn = document.getElementById('btnConnect');
    const modal = document.getElementById('exampleModal');
    const qrImage = document.getElementById('qr');

    genQRBtn?.addEventListener('click', generateQRCode);
    connectBtn?.addEventListener('click', connect);
  
    modal?.addEventListener('hidden.bs.modal', () => {
      if (qrImage) {
        qrImage.style.display = 'none';
        qrImage.src = '';
      }
    });
  });
  