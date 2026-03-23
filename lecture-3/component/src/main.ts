
// VITE подгружает на страницу
import './style.css';

type Product = {
    title: string;
    price: number;
};

type Theme = 'light' | 'dark';

const priceFormatter = Intl.NumberFormat("ru-RU", {
    style: 'currency',
    currency: 'EUR',
    maximumFractionDigits: 0,
})

class ProductCard {
    public element: HTMLDivElement;

    static theme: Theme = 'dark';

    // this.product = product
    constructor(private readonly product: Product) {
        this.element = document.createElement('div');

        this.render();
    }

    private render(): void {
        this.element.insertAdjacentHTML("beforeend", this.template())
    }

    private template(): string {
        const themeClass = ProductCard.theme === 'dark' ? 'product-card--dark' : 'product-card--light';
        return `
              <div class="product-card ${themeClass}">
                <div class="product-card__eyebrow">Новая коллекция</div>
                <h2 class="product-card__title">${this.product.title}</h2>
                <p class="product-card__price">${priceFormatter.format(this.product.price)}</p>
                <button class="product-card__button" type="button">Купить</button>
            </div>
        `;
    }
}


const iphone = new ProductCard({
    title: 'Iphone 15',
    price: 999,
});

const app = document.querySelector('#app');

if (!app) {
    throw new Error('No App DOM element');
}

// app?.append(iphone.element); - Optional Chaining.
app.append(iphone.element);