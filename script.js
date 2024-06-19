document.addEventListener("DOMContentLoaded", () => {
    const searchBar = document.getElementById('search-bar');
    const goodsList = document.getElementById('goods-list');
    const viewCartBtn = document.getElementById('view-cart-btn');
    const cartSection = document.getElementById('cart');
    const cartItemsContainer = document.getElementById('cart-items');
    const cartCount = document.getElementById('cart-count');
    const checkoutBtn = document.getElementById('checkout-btn');

    let cart = [];

    fetch('goods/grocery-list.json')
        .then(response => response.json())
        .then(data => {
            displayGoods(data);
        });

    searchBar.addEventListener('input', (e) => {
        const searchTerm = e.target.value.toLowerCase();
        fetch('goods/grocery-list.json')
            .then(response => response.json())
            .then(data => {
                const filteredGoods = data.filter(item => item.name.toLowerCase().includes(searchTerm));
                displayGoods(filteredGoods);
            });
    });

    viewCartBtn.addEventListener('click', () => {
        cartSection.classList.toggle('hidden');
        updateCartDisplay();
    });

    checkoutBtn.addEventListener('click', () => {
        if (cart.length > 0) {
            saveCartToFirestore(cart);
            alert('Checkout successful! Your cart has been saved.');
            cart = [];
            cartCount.textContent = 0;
            updateCartDisplay();
            cartSection.classList.add('hidden');
        } else {
            alert('Your cart is empty.');
        }
    });

    function displayGoods(goods) {
        goodsList.innerHTML = '';
        goods.forEach(item => {
            const goodsItem = document.createElement('div');
            goodsItem.classList.add('goods-item');
            goodsItem.innerHTML = `
                <img src="${item.image}" alt="${item.name}">
                <h3>${item.name}</h3>
                <p>$${item.price.toFixed(2)}</p>
                <button onclick="addToCart('${item.name}', ${item.price}, '${item.image}')">Add to Cart</button>
            `;
            goodsList.appendChild(goodsItem);
        });
    }

    window.addToCart = function(name, price, image) {
        const itemIndex = cart.findIndex(item => item.name === name);
        if (itemIndex > -1) {
            cart[itemIndex].quantity += 1;
        } else {
            cart.push({ name, price, image, quantity: 1 });
        }
        cartCount.textContent = cart.reduce((acc, item) => acc + item.quantity, 0);
        updateCartDisplay();
    };

    function updateCartDisplay() {
        cartItemsContainer.innerHTML = '';
        cart.forEach(item => {
            const cartItem = document.createElement('div');
            cartItem.classList.add('goods-item');
            cartItem.innerHTML = `
                <img src="${item.image}" alt="${item.name}">
                <h3>${item.name}</h3>
                <p>$${item.price.toFixed(2)} x ${item.quantity}</p>
            `;
            cartItemsContainer.appendChild(cartItem);
        });
    }
});
