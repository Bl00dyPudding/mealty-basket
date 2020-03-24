import {catalog, categoryPrice} from './db.js'

let cart = {
    currency: 'RUR',
    amount: 0,
    products: []
};

const saveToLocalStorage = (cart) => {
    localStorage.setItem('cart', JSON.stringify(cart));
};

const loadFromLocalStorage = () => {
    if (localStorage.length > 0) {
        return JSON.parse(localStorage.getItem('cart'));
    }
};

const createCart = () => {
    const lS = loadFromLocalStorage();
    if (lS !== undefined && lS !== null && lS.hasOwnProperty('products')) {
        cart = lS;
    }
};

const categoryPriceFindElement = category =>
    categoryPrice.find(element => element.category === category);

const replacePrice = (element, html = false) =>
    html ? `<span>${element.price}</span> руб` : `${element.price} руб`;

const createProductCard = product => {
    let div = document.createElement('div'),
        img = document.createElement('div'),
        name = document.createElement('p'),
        price = document.createElement('p'),
        button = document.createElement('button');

    div.classList.add('products');
    img.classList.add('card-img');
    img.style.backgroundImage = `url(img/${product.image}.jpeg)`;
    name.innerText = product['name'];
    name.classList.add('card-name');
    price.insertAdjacentHTML('afterbegin', replacePrice(categoryPriceFindElement(product['category']), true));
    price.classList.add('card-price');
    button.classList.add('card-button');


    if(cart.products.findIndex(element => element.id === product.id) === -1) {
        button.innerText = 'В корзину';
        button.id = `add-${product.id}`;
    } else {
        button.innerText = 'Удалить';
        button.id = `delete-${product.id}`;
    }

    div.append(...[img, name, price, button]);

    return div;
};

const renameButton = (id, action) => {
    let button = document.querySelector(`#${action}-${id}`);
    switch (action) {
        case 'add':
            button.innerText = 'Удалить';
            button.id = `delete-${id}`;
            break;
        case 'delete':
            button.innerText = 'В корзину';
            button.id = `add-${id}`;
            break;
    }
};

const renderProducts = () => {
    document.querySelector('.catalog').append(
        ...catalog.map(element => createProductCard(element))
    );
};

const createProductInBasketCard = product => {
    let productCard = document.createElement('div'),
        img = document.createElement('div'),
        nameQuantity = document.createElement('div'),
        name = document.createElement('p'),
        buttons = document.createElement('div'),
        buttonPlus = document.createElement('button'),
        quantity = document.createElement('div'),
        buttonMinus = document.createElement('button'),
        deleteProduct = document.createElement('button');

    productCard.classList.add('basket-products');
    img.classList.add('cart-img');
    img.style.backgroundImage = `url(img/${product.image}.jpeg)`;
    nameQuantity.classList.add('name-quantity');
    name.innerText = product['name'];
    buttons.classList.add('buttons');
    buttonPlus.classList.add('button-plus');
    buttonPlus.id = `plus-${product.id}`;
    quantity.classList.add('quantity');
    quantity.innerText = product['quantity'];
    buttonMinus.classList.add('button-minus');
    buttonMinus.id = `minus-${product.id}`;
    deleteProduct.classList.add('delete');
    deleteProduct.id = `deleteFromBasket-${product.id}`;

    buttons.append(...[buttonMinus, quantity, buttonPlus]);
    nameQuantity.append(...[name, buttons]);
    productCard.append(...[deleteProduct, img, nameQuantity]);

    return productCard;
};

const getProductQuantity = () =>
    cart.products.reduce((accumulator, currentValue) =>
        accumulator + currentValue.quantity, 0);

const renderCart = () => {
    cart.amount = cart.products.reduce((accumulator, currentValue) =>
        accumulator + currentValue.price * currentValue.quantity, 0);

    let price = document.querySelector('.price');
    if (price !== null) {
        price.innerText = `Итого: ${replacePrice({price: cart.amount, currency: cart.currency})}`;
    } else {
        let tag = document.createElement('p');
        tag.classList.add('price');
        tag.innerText = `Итого: ${replacePrice({price: cart.amount, currency: cart.currency})}`;
        document.querySelector('.modal-window').append(tag);
    }

    let cartProducts = document.querySelector('.cart-products');

    if (cartProducts.children.length > 0) {
        cartProducts.innerHTML = '';
    }

    cart.products.forEach(element => cartProducts.append(createProductInBasketCard(element)));
    document.querySelector('.count').innerText = getProductQuantity();
    document.querySelector('.cart-amount').innerText = `${cart.amount} руб.`;
};

const addProduct = (id) => {
    const index = cart.products.findIndex(element => element.id === id); // есть ли такой продукт в корзине или нет?
    if (index === -1) {
        const productInCatalog = catalog.find(element => element.id === id);
        const price = categoryPriceFindElement(productInCatalog.category);
        const product = {
            id: id,
            name: productInCatalog.name,
            category: productInCatalog.category,
            image: productInCatalog.image,
            price: price.price,
            currency: price.currency,
            quantity: 1
        };
        cart.products.push(product);
    } else {
        cart.products[index].quantity++;
    }
    renderCart();
};

const deleteProduct = (id) => {
    const index = cart.products.findIndex(element => element.id === id);
    cart.products.splice(index, 1);
    renderCart();
};

const minusProduct = (id) => {
    let product = cart.products.find(element => element.id === id);
    if (product.quantity !== 1) {
        product.quantity--;
        renderCart();
    }
};

const plusProduct = (id) => {
    let product = cart.products.find(element => element.id === id);
    product.quantity++;
    renderCart();
};

const modalWindowToggle = () => {
    document.querySelector('.modal-window-background').classList.toggle('hidden');
    document.querySelector('.modal-window').classList.toggle('hidden');
};


//const newObj = () => {
//  let arr = catalog.map(element => ({
//          cat: 'meow',
//    id: element.id
//   }
//    )
//  );
//  console.log(arr);
// console.log(catalog);
//};


const eventListener = () => {
    // newObj();
    document.addEventListener('click', (e) => {
        if (e.target['id'] !== undefined) {
            const arr = e.target['id'].split('-');
            const obj = {
                value: arr[0],
                id: +arr[1]
            };
            switch (obj.value) {
                case 'plus':
                    plusProduct(obj.id);
                    saveToLocalStorage(cart);
                    break;
                case 'minus':
                    minusProduct(obj.id);
                    saveToLocalStorage(cart);
                    break;
                case 'delete':
                    deleteProduct(obj.id);
                    renameButton(obj.id, 'delete');
                    saveToLocalStorage(cart);
                    break;
                case 'add':
                    addProduct(obj.id);
                    renameButton(obj.id, 'add');
                    saveToLocalStorage(cart);
                    break;
                case 'deleteFromBasket':
                    deleteProduct(obj.id);
                    renameButton(obj.id, 'delete');
                    saveToLocalStorage(cart);
                    break;
                case 'slider':
                    console.log(obj.id);
                    break;
                case 'open':
                    modalWindowToggle();
                    break;
                case 'close':
                    modalWindowToggle();
                    break;
            }
        }
    });
};

const run = () => {
    createCart();
    renderCart();
    renderProducts();
    eventListener();
};

export {run as basket}