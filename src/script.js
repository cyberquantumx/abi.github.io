let proxies = [
    {
        'url': 'tg://proxy?server=pivo.shukafish.ru&port=5443&secret=ddf5199e949c0f23bc887581218ad8c1e6',
        'name': "Щука Whitelist"
    },
    {
        'url': 'tg://proxy?server=slark.shukafish.ru&port=443&secret=ddf5199e949c0f23bc887581218ad8c1e6',
        'name': "Щука"
    },
    {
        'url': 'tg://proxy?server=telegram.crocnet.ru&port=443&secret=eedb556b30e8aefc3443956f9a971bdcec74656c656772616d2e63726f636e65742e7275',
        'name': "Crocnet"
    },
    {
        'url': 'tg://proxy?server=telegram.crocnet.ru&port=443&secret=dddb556b30e8aefc3443956f9a971bdcec',
        'name': "Crocnet Reserve"
    },
    {
        'url': 'tg://proxy?server=92.53.65.32&port=443&secret=eedb556b30e8aefc3443956f9a971bdcec74656c656772616d2e63726f636e65742e7275',
        'name': "Crocnet IP 1"
    },
    {
        'url': 'tg://proxy?server=92.53.65.32&port=443&secret=dddb556b30e8aefc3443956f9a971bdcec',
        'name': "Crocnet IP 1 Reserve"
    },
    {
        'url': 'tg://proxy?server=95.213.143.212&port=443&secret=eedb556b30e8aefc3443956f9a971bdcec74656c656772616d2e63726f636e65742e7275',
        'name': "Crocnet IP 2"
    },
    {
        'url': 'tg://proxy?server=92.53.65.32&port=443&secret=dddb556b30e8aefc3443956f9a971bdcec',
        'name': "Crocnet IP 2 Reserve"
    },
    
]

window.onload = function() {
    for(let i = 0; i < proxies.length; i++){
        let list = document.getElementById('proxies-list-form');
        list.innerHTML = list.innerHTML + `<label>
        <input type="radio" name="proxy" value="${i}" id="proxy-${i}">
        ${proxies[i].name}
      </label><br>`;
    }
};

function connect(){
    const selectedRadio = document.querySelector('input[name="proxy"]:checked');
    const value = selectedRadio ? selectedRadio.value : null;
    window.open(proxies[value].url);
}