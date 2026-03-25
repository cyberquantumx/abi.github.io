let proxies;

window.addEventListener('load', async () => {
    proxies = await loadProxiesFromFile();
    console.log(proxies)

    const list = document.getElementById('proxies-list-form');

    if (!list) {
        console.error('Элемент с ID "proxies-list-form" не найден');
        return;
    }

    list.innerHTML = proxies.map((proxy, i) => `
  <label>
    <input type="radio" name="proxy" value="${i}" id="proxy-${i}">
    <span class="proxy-status ${proxy.status === 'online' ? 'status-online' : 'status-unknown'}"></span>
    ${proxy.name} <a data-tooltip="${proxies[i].url}" class="has-tooltip">🔗</a>
  </label>
`).join('');


    document.querySelector('input[name="proxy"]').checked = true;
});

const connect = () => {
    const selected = document.querySelector('input[name="proxy"]:checked');

    if (!selected) {
        alert('Пожалуйста, выберите прокси-сервер');
        return;
    }

    const value = parseInt(selected.value, 10);

    if (value < 0 || value >= proxies.length) {
        console.error('Некорректный индекс выбранного прокси');
        return;
    }

    const proxyUrl = proxies[value].url;
    const btn = document.getElementById('btnConnect');

    btn.style.transform = 'scale(0.95)';
    setTimeout(() => btn.style.transform = 'scale(1)', 150);

    try {
        window.open(proxyUrl, '_blank');
    } catch (error) {
        console.error('Ошибка при открытии прокси:', error);
        alert('Не удалось подключиться к выбранному прокси-серверу');
    }
};

const generateQRCode = () => {
    const selected = document.querySelector('input[name="proxy"]:checked');

    if (!selected) {
        alert('Пожалуйста, выберите прокси‑сервер для генерации QR‑кода');
        return;
    }

    const value = parseInt(selected.value, 10);

    if (value < 0 || value >= proxies.length) {
        console.error('Некорректный индекс выбранного прокси');
        return;
    }

    const proxy = proxies[value];
    const qrImage = document.getElementById('qr');

    if (!qrImage) {
        console.error('Необходимые элементы не найдены в DOM');
        return;
    }

    document.getElementById('loadQR').style.display = 'block';
    qrImage.style.display = 'none';

    qrImage.src = `https://barcode.tec-it.com/barcode.ashx?data=${encodeURIComponent(proxy.url)}&code=QRCode&translate-esc=on&eclevel=H`;

    qrImage.onload = () => {
        document.getElementById('loadQR').style.display = 'none';
        qrImage.style.display = 'block';
    };

    qrImage.onerror = () => document.getElementById('loadQR').style.display = 'none';
};

const copyProxyUrl = () => {
    const selected = document.querySelector('input[name="proxy"]:checked');

    if (!selected) {
        alert('Пожалуйста, выберите прокси‑сервер');
        return;
    }

    const value = parseInt(selected.value, 10);
    const proxyUrl = proxies[value].url;

    navigator.clipboard.writeText(proxyUrl)
        .then(() => {
            const btn = document.getElementById('btnCopy');
            btn.textContent = 'Скопировано!';
            setTimeout(() => btn.textContent = 'Копировать ссылку', 2000);
        })
        .catch((err) => {
            console.error('Ошибка копирования: ', err);
            alert('Не удалось скопировать. Попробуйте вручную.');
        });
};

async function loadProxiesFromFile() {
    try {
        const response = await fetch('./src/cats.txt');
        if (!response.ok) throw new Error('Файл не найден');
        let p = await response.text();
        return JSON.parse(p);
    } catch (error) {
        console.error('Ошибка загрузки файла:', error);
        alert('Не удалось загрузить файл с прокси');
        return null;
    }
}