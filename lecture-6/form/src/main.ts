import './style.css';

const products = [
    'IPhone 15',
    'IPhone 14',
    'Dyson',
];

console.log(document.forms);

// document.forms["product-form"];
const form = document.forms[0];

console.log(form);

// form.title;
const titleInput = form.elements.namedItem("title") as HTMLInputElement | null;
const descriptionInput = form.elements.namedItem("description") as HTMLTextAreaElement | null;

const datalist = document.querySelector('#product-titles') as HTMLDataListElement;

console.log(titleInput);

titleInput?.addEventListener('input', () => {
    const value = titleInput.value.toLowerCase();

    const matched = products.filter(
        product => product.toLowerCase().includes(value)
    )

    datalist.innerHTML = matched
                            .map(p => `<option value="${p}"></option>`).join('');
});

// ------

// 1 - Валидиурем прямо на input
// 2 - Валидируем когда переключился blur
// 3 - Валидируем на событие submit

descriptionInput?.addEventListener('blur', () => {
    const has18 = descriptionInput.value.includes("lol");

    if (has18) {
        descriptionInput.parentElement?.classList.add('has-error')
    }
});


form.addEventListener('submit', (event) => {
    event.preventDefault();

    let priceInput = form.elements.namedItem("price") as HTMLTextAreaElement | null;

    if (parseInt(priceInput?.value || '0', 10) > 10000) {
        priceInput?.parentElement?.parentElement?.classList.add('has-error');
        return;
    }

    const promise = fetch(form.action, {
        method: form.method,
        body: new FormData(form),
    });

    promise
        .then((response) => {
            console.log(response);

            // response.json().then()
            // response.text().then()
            // ... 
        })
        .catch(() => {
            // Только если не получилось отправить запрос, либо получить овтет
        })
});

// По User Agent