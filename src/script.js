let proxies = [{
        'url': 'tg://proxy?server=pivo.shukafish.ru&port=5443&secret=ddf5199e949c0f23bc887581218ad8c1e6',
        'name': 'Щука Whitelist'
    },
    {
        'url': 'tg://proxy?server=slark.shukafish.ru&port=443&secret=ddf5199e949c0f23bc887581218ad8c1e6',
        'name': 'Щука'
    },
    {
        'url': 'tg://proxy?server=telegram.crocnet.ru&port=443&secret=eedb556b30e8aefc3443956f9a971bdcec74656c656772616d2e63726f636e65742e7275',
        'name': 'Crocnet <b>★</b>'
    },
    {
        'url': 'tg://proxy?server=telegram.crocnet.ru&port=443&secret=dddb556b30e8aefc3443956f9a971bdcec',
        'name': 'Crocnet Reserve <b>★</b>'
    },
    {
        'url': 'tg://proxy?server=92.53.65.32&port=443&secret=eedb556b30e8aefc3443956f9a971bdcec74656c656772616d2e63726f636e65742e7275',
        'name': 'Crocnet IP 1 <b>★</b>'
    },
    {
        'url': 'tg://proxy?server=92.53.65.32&port=443&secret=dddb556b30e8aefc3443956f9a971bdcec',
        'name': 'Crocnet IP 1 Reserve <b>★</b>'
    },
    {
        'url': 'tg://proxy?server=95.213.143.212&port=443&secret=eedb556b30e8aefc3443956f9a971bdcec74656c656772616d2e63726f636e65742e7275',
        'name': 'Crocnet IP 2 <b>★</b>'
    },
    {
        'url': 'tg://proxy?server=92.53.65.32&port=443&secret=dddb556b30e8aefc3443956f9a971bdcec',
        'name': 'Crocnet IP 2 Reserve <b>★</b>'
    },
    {
        'url': 'tg://proxy?server=185.82.218.79&port=777&secret=a3d05b71dceb6a361a79a9fa7183d3e8',
        'name': 'Дед VPN 1'
    },
    {
        'url': 'tg://proxy?server=185.119.58.137&port=52525&secret=dda3d05b71dceb6a361a79a9fa7183d3e8',
        'name': 'Дед VPN 2'
    }
];

window.onload = function () {
    const list = document.getElementById('proxies-list-form');

    if (!list) {
        console.error('Элемент с ID "proxies-list-form" не найден');
        return;
    }

    let htmlContent = '';
    for (let i = 0; i < proxies.length; i++) {
        htmlContent += `<label>
        <input type="radio" name="proxy" value="${i}" id="proxy-${i}">
        ${proxies[i].name}
      </label><br>`;
    }
    list.innerHTML = htmlContent;

    const firstRadio = document.querySelector('input[name="proxy"]');
    if (firstRadio) {
        firstRadio.checked = true;
    }
};

function connect() {
    const selectedRadio = document.querySelector('input[name="proxy"]:checked');

    if (!selectedRadio) {
        alert('Пожалуйста, выберите прокси-сервер');
        return;
    }

    const value = parseInt(selectedRadio.value, 10);

    if (value < 0 || value >= proxies.length) {
        console.error('Некорректный индекс выбранного прокси');
        return;
    }

    try {
        const proxyUrl = proxies[value].url;
        // Добавляем небольшую анимацию нажатия
        const btn = document.getElementById('btnConnect');
        btn.style.transform = 'scale(0.95)';
        setTimeout(() => {
            btn.style.transform = 'scale(1)';
        }, 150);

        window.open(proxyUrl, '_blank');
    } catch (error) {
        console.error('Ошибка при открытии прокси:', error);
        alert('Не удалось подключиться к выбранному прокси-серверу');
    }
}


function generateQRCode() {
    const selectedRadio = document.querySelector('input[name="proxy"]:checked');

    if (!selectedRadio) {
        alert('Пожалуйста, выберите прокси‑сервер для генерации QR‑кода');
        return;
    }

    const value = parseInt(selectedRadio.value, 10);
    if (value < 0 || value >= proxies.length) {
        console.error('Некорректный индекс выбранного прокси');
        return;
    }

    const proxy = proxies[value];
    const qrImage = document.getElementById('qr');
    // Проверка существования элементов
    if (!qrImage) {
        console.error('Необходимые элементы не найдены в DOM');
        return;
    }

    // Показываем индикатор загрузки
    document.getElementById('loadQR').style.display = 'block';
    qrImage.style.display = 'none';

    // Обновляем src изображения
    qrImage.src = `https://barcode.tec-it.com/barcode.ashx?data=${encodeURIComponent(proxy.url)}&code=QRCode&translate-esc=on&eclevel=H`;

    // Обработчик успешной загрузки
    qrImage.onload = function () {
        document.getElementById('loadQR').style.display = 'none';
        qrImage.style.display = 'block';
    };

    // Обработчик ошибки загрузки
    qrImage.onerror = function () {
        document.getElementById('loadQR').style.display = 'none';
    };
}

function copyProxyUrl() {
    const selectedRadio = document.querySelector('input[name="proxy"]:checked');
    if (!selectedRadio) {
      alert('Пожалуйста, выберите прокси‑сервер');
      return;
    }
  
    const value = parseInt(selectedRadio.value, 10);
    const proxyUrl = proxies[value].url;
  
    navigator.clipboard.writeText(proxyUrl).then(() => {
      // Визуальная обратная связь
      const btn = document.getElementById('btnCopy');
      btn.textContent = 'Скопировано!';
      setTimeout(() => {
        btn.textContent = 'Копировать ссылку';
      }, 2000);
    }).catch(err => {
      console.error('Ошибка копирования: ', err);
      alert('Не удалось скопировать. Попробуйте вручную.');
    });
  }
  