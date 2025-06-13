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

// ===================== КОД ДЛЯ ГРАФИКА =====================
const graphContainer = document.getElementById("graph");

const sgdDates = [
  "03.06.2025", "02.06.2025", "01.06.2025", "31.05.2025", "30.05.2025",
  "29.05.2025", "28.05.2025", "27.05.2025", "26.05.2025", "25.05.2025",
  "24.05.2025", "23.05.2025", "22.05.2025", "21.05.2025", "20.05.2025",
  "19.05.2025", "18.05.2025", "17.05.2025", "16.05.2025", "15.05.2025",
  "14.05.2025", "13.05.2025", "12.05.2025", "11.05.2025", "10.05.2025",
  "09.05.2025", "08.05.2025", "07.05.2025", "06.05.2025", "05.05.2025",
  "04.05.2025"
];

const sgdRates = [
  61.3209, 61.0104, 61.0189, 61.0144, 60.6764,
  61.7226, 62.0268, 62.1460, 61.8088, 61.0004,
  61.8009, 61.8490, 61.7857, 62.0231, 61.9281,
  62.3690, 62.3798, 62.3698, 61.8414, 61.6631,
  61.7857, 62.2170, 62.4151, 62.6151, 62.7090,
  62.7151, 62.6151, 62.5981, 63.3664, 62.3180,
  62.2080
];

// 5-7) Создание графика
function renderGraph() {
  // Находим максимальное значение для масштабирования
  const maxValue = Math.max(...sgdRates);
  
  // Очищаем контейнер
  graphContainer.innerHTML = '';
  
  // Создание столбиков для каждой даты
  for (let i = 0; i < sgdDates.length; i++) {
    const barContainer = document.createElement('div');
    barContainer.className = 'bar-container';
    
    // Создаем столбик
    const bar = document.createElement('div');
    bar.className = 'bar';
    
    // Вычисляем высоту столбика
    const height = (sgdRates[i] / maxValue) * 200;
    bar.style.height = `${height}px`;
    
    // Создаем элемент для значения курса
    const valueLabel = document.createElement('div');
    valueLabel.className = 'value-label';
    valueLabel.textContent = sgdRates[i].toFixed(2);
    
    // Создаем элемент для даты
    const dateLabel = document.createElement('div');
    dateLabel.className = 'date-label';
    dateLabel.textContent = sgdDates[i].slice(0, 5); // "дд.мм"
    
    // Добавляем элементы в контейнер
    bar.appendChild(valueLabel);
    barContainer.appendChild(bar);
    barContainer.appendChild(dateLabel);
    
    // Добавляем контейнер в график
    graphContainer.appendChild(barContainer);
  }
}

// Запуск при загрузке страницы
document.addEventListener("DOMContentLoaded", () => {
  getCurrencies(); // Для конвертера
  renderGraph();   // Для график
});