// Объект с курсами валют
const rates = {
  RUB: { Value: 1 } // Рубль — базовая валюта, 1 к 1
};

// Элементы для отображения курса валют
const elementSGD = document.querySelector('[data-value="SGD"]');
const elementRUB = document.querySelector('[data-value="RUB"]');

// Элементы формы
const input = document.querySelector('#input');
const result = document.querySelector('#result');
const select1 = document.getElementById('exampleFormControlSelect1');
const select2 = document.getElementById('exampleFormControlSelect2');

// Получение курсов валют
async function getCurrencies() {
  try {
    const response = await fetch('https://www.cbr-xml-daily.ru/daily_json.js');
    const data = await response.json();

    // Добавляем только SGD
    rates.SGD = data.Valute.SGD;

    // Отображаем курсы
    elementSGD.textContent = rates.SGD.Value.toFixed(2);
    elementRUB.textContent = '1.00';
    
    // Выполняем начальный пересчет
    convertValue();
  } catch (error) {
    console.error('Ошибка при загрузке курсов валют:', error);
  }
}

// Обработчики
input.addEventListener('input', convertValue);
select1.addEventListener('change', convertValue);
select2.addEventListener('change', convertValue);

// Конвертация значений
function convertValue() {
  const from = select1.value;
  const to = select2.value;
  const amount = parseFloat(input.value);

  if (!rates[from] || !rates[to] || isNaN(amount)) {
    result.value = '';
    return;
  }

  if (from === to) {
    result.value = amount.toFixed(2);
  } else {
    const converted = amount * (rates[to].Value / rates[from].Value);
    result.value = converted.toFixed(2);
  }
}

// Запуск
getCurrencies();


// курсы SGD 
const sgdRates = [
  61.3209, 61.0144, 61.0144, 61.0144, 60.6764,
  61.7226, 62.0268, 62.1460, 61.8009, 61.8009,
  61.8009, 61.8490, 61.7857, 62.0231, 61.9281,
  62.3698, 62.3698, 62.3698, 61.8414, 61.6631,
  61.7857, 62.2170, 62.6151, 62.6151, 62.6151,
  62.6151, 62.6151, 62.5981, 63.3664, 62.3180,
  62.3180
];

const sgdDates = [
  "03.06.2025", "02.06.2025", "01.06.2025", "31.05.2025", "30.05.2025",
  "29.05.2025", "28.05.2025", "27.05.2025", "26.05.2025", "25.05.2025",
  "24.05.2025", "23.05.2025", "22.05.2025", "21.05.2025", "20.05.2025",
  "19.05.2025", "18.05.2025", "17.05.2025", "16.05.2025", "15.05.2025",
  "14.05.2025", "13.05.2025", "12.05.2025", "11.05.2025", "10.05.2025",
  "09.05.2025", "08.05.2025", "07.05.2025", "06.05.2025", "05.05.2025",
  "04.05.2025"
];

document.getElementById('build-graph').addEventListener('click', () => {
  const graph = document.getElementById('manual-graph');
  graph.innerHTML = '';

  const max = Math.max(...sgdRates);

  sgdRates.forEach((value, i) => {
    const bar = document.createElement('div');
    bar.classList.add('bar');
    bar.style.height = `${(value / max) * 100}%`;
    bar.title = `${sgdDates[i]}: ${value}₽`;

    // Клик по столбцу — выделить и показать инфо
    bar.addEventListener('click', () => {
      document.querySelectorAll('.bar').forEach(b => b.classList.remove('active'));
      bar.classList.add('active');

      const info = document.getElementById('graph-info');
      info.textContent = ` ${sgdDates[i]} —  ${value.toFixed(4)} ₽`;
    });

    graph.appendChild(bar);
  });
});
