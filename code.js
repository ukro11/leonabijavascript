const s2_product_container = document.querySelector('.s2_prs');

class Product {
    title;
    company;
    description;
    price;
    image;

    constructor(title, company, description, price, image) {
        this.title = title;
        this.company = company;
        this.description = description;
        this.price = price;
        this.image = image;
    }
}

const registered_products = [
    // iPhone 11
    new Product('iPhone 11', 'Apple', 'Refurbished iPhone 11 128 GB - Violett (ohne Vertrag)', '499,99€', 'iphone_11.png'),
    new Product('iPhone 11 Pro', 'Apple', 'Refurbished iPhone 11 Pro 64 GB - Space Grau (ohne Vertrag)', '699,99€', 'iphone_11_pro.png'),
    new Product('iPhone 11 Pro Max', 'Apple', 'Refurbished iPhone 11 Pro Max 64 GB - Silber (ohne Vertrag)', '859,99€', 'iphone_11_pro_max.png'),
    // iPhone 12
    new Product('iPhone 12 mini', 'Apple', 'Refurbished iPhone 12 mini 128 GB - Violett (ohne Vertrag)', '599,99€', 'iphone_12_mini.png'),
    new Product('iPhone 12', 'Apple', 'Refurbished iPhone 12 128 GB - Schwarz (ohne Vertrag)', '699,99€', 'iphone_12.png'),
    new Product('iPhone 12 Pro', 'Apple', 'Refurbished iPhone 12 Pro 128 GB - Silber (ohne Vertrag)', '959,99€', 'iphone_12_pro.png'),
    new Product('iPhone 12 Pro Max', 'Apple', 'Refurbished iPhone 12 Pro Max 128 GB - Pazifikblau (ohne Vertrag)', '999,99€', 'iphone_12_pro_max.png')
];

const productsInCart = [];

function addProduct(pr) {
    const pr_html = `<div class="s2_pr"><img src="./img/${pr.image}"><div class="s2_pr_desc"><h3>${pr.company}</h3><h4>${pr.title}</h4><h5>${pr.description}</h5><h5>Ab <a>${pr.price}</a></h5></div></div>`;
    s2_product_container.innerHTML += pr_html;
}

function addProductToCart(pr, addedByStorage) {
    const pr_html = `<div class="s1_checkout_item"><div><img src="./img/${pr.image}"></div><div><h4>${pr.company}</h4><h3>${pr.title}</h3><h5>Artikel entfernen</h5></div><div><h5>${pr.price}</h5></div></div>`;
    const cart_items = document.querySelector('.s1_checkout_items');
    cart_items.innerHTML += pr_html;
    productsInCart.push(pr);
    if (!addedByStorage) {
        var value = localStorage.getItem('productsInCart') === null || localStorage.getItem('productsInCart') === undefined ? `${pr.title}` : `${localStorage.getItem("productsInCart")};${pr.title}`;
        localStorage.setItem('productsInCart', value);
    }
}

function getProductFromStorage(val) {
    return registered_products.filter(pr => pr.title === val)[0];
}

registered_products.forEach(pr => addProduct(pr));

const cart_btn = document.querySelector('.s1_cart_btn');
const cart_container = document.querySelector('.s1_checkout');
const products = document.querySelectorAll('.s2_pr');
products.forEach(pr => {
    pr.addEventListener('click', () => {
        const index = Array.from(products).indexOf(pr);
        addProductToCart(registered_products[index], false);
        cart_container.classList.toggle('hide', false);
    });
});

if (localStorage.getItem('productsInCart') !== null) {
    const saved_products = localStorage.getItem('productsInCart').split(';');
    saved_products.forEach(pr => addProductToCart(getProductFromStorage(pr), true));
}

cart_btn.addEventListener('click', () => cart_container.classList.toggle('hide', !cart_container.classList.contains('hide')));

window.addEventListener('keydown', (e) => {
    console.log(e)
    if (e.key === 'F4') {
        alert('Local storage has been deleted!');
        localStorage.clear();
    }
});

// TODO: Calculate Price, Remove Product from Cart