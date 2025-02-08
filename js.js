const form = document.getElementById('zadanieform');
const trescWynikow = document.getElementById('trescWynikow');
const filtrujBtn = document.getElementById('filtruj');
const resetFiltrowBtn = document.getElementById('resetFiltrow');
const dataFilter = document.getElementById('datafilter');

let dane = [];

// Добавление задачи
form.addEventListener("submit", (e) => {
    e.preventDefault();

    const textForm = document.getElementById('textForm').value;
    const dataForm = document.getElementById('dataForm').value;

    // Добавляем новую задачу в массив
    dane.push({
        textForm: textForm,
        dataForm: dataForm
    });

    // Отображаем все задачи
    pokaDane();
    form.reset();
});

// Функция удаления задачи (объявлена в глобальной области)
function usunWiersz(index) {
    dane.splice(index, 1);
    pokaDane();
}

// Функция отображения задач
function pokaDane() {
    trescWynikow.innerHTML = "";
    let displayIndex = 1; // Порядковый номер для отображения (начинается с 1)

    dane.forEach((zadanie, index) => {
        const wiersz = document.createElement("tr");
        wiersz.classList.add('row', 'row2');

        wiersz.innerHTML = `
            <td>${displayIndex++}</td>
            <td>${zadanie.dataForm}</td>
            <td>${zadanie.textForm}</td>
            <td>
                <button onclick="usunWiersz(${index})">Usuń</button>
            </td>
        `;

        trescWynikow.appendChild(wiersz);
    });
}

// Обработчик для кнопки "filtruj"
filtrujBtn.addEventListener('click', (e) => {
    e.preventDefault();
    const selectedDate = dataFilter.value;
    if (selectedDate) {
        trescWynikow.innerHTML = "";
        let displayIndex = 1;
        // Перебираем глобальный массив и отображаем только те задачи,
        // дата которых совпадает с выбранной
        dane.forEach((zadanie, index) => {
            if (zadanie.dataForm === selectedDate) {
                const wiersz = document.createElement("tr");
                wiersz.classList.add('row', 'row2');
                wiersz.innerHTML = `
                    <td>${displayIndex++}</td>
                    <td>${zadanie.dataForm}</td>
                    <td>${zadanie.textForm}</td>
                    <td>
                        <button onclick="usunWiersz(${index})">Usuń</button>
                    </td>
                `;
                trescWynikow.appendChild(wiersz);
            }
        });
    }
});

// Обработчик для кнопки "resetFiltrow"
resetFiltrowBtn.addEventListener('click', (e) => {
    e.preventDefault();
    // Сбрасываем фильтр: отображаем все задачи
    pokaDane();
    // Очистка поля фильтра (при необходимости)
    dataFilter.value = "";
});

