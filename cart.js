window.onload = function() {
    loadCart();
};

function loadCart() {
    let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    let cartContent = document.getElementById("cart-item");
    let totalPrice = document.getElementById("total-price");
    let total = 0;

    cartContent.innerHTML = "";

    if (cartItems.length === 0) {
        totalPrice.innerHTML = "$0.00";
    } else {
        cartItems.forEach((item, index) => {
            let price = parseFloat(item.price.replace(/[^0-9.]/g, ""));
            let quantity = parseInt(item.quantity) || 1;

            if (isNaN(price)) {
                price = 0;
            }

            let itemDiv = document.createElement("div");
            itemDiv.classList.add("cart-item");
            itemDiv.setAttribute("data-index", index);

            let itemHTML = `
            <div class="cart-box">
                <div class="image">
                    <img src="${item.imgSrc}" alt="${item.title}" class="main-img">
                    <img src="${item.imgSrc}" alt="${item.title} Hover" class="hover-img">
                    <div class="icons">
                        <span onclick="heartCheck(this)"><i class='heart-icon bx bx-heart'></i></span>
                        <span class="sale">Sale</span>
                    </div>
                </div>
                <div class="cart-info">
                    <span class="cart-name">${item.title}</span>
                    <span class="cart-type">${item.type}</span>
                    <span class="cart-price">$${price.toFixed(2)}</span>
                    <input type="number" value="${quantity}" class="cart-quantity" onchange="updateQuantity(${index}, this.value)" min="1">
                    <i class='bx bxs-trash cart-remove' onclick="removeItem(${index})"></i>
                </div>
            </div>
        `;

            itemDiv.innerHTML = itemHTML;
            cartContent.appendChild(itemDiv);
            total += price * quantity;
        });

        totalPrice.innerHTML = `$${total.toFixed(2)}`;
    }
    updateBuyButtonState();
}

function updateQuantity(index, value) {
    let cartItems = JSON.parse(localStorage.getItem('cartItems'));
    let quantity = parseInt(value);

    if (isNaN(quantity) || quantity < 1) {
        quantity = 1;
    }
    cartItems[index].quantity = quantity;
    localStorage.setItem('cartItems', JSON.stringify(cartItems));

    loadCart();
}

function removeItem(index) {
    let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    cartItems.splice(index, 1);
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
    loadCart();
}

function updateBuyButtonState() {
    let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    let buyButton = document.getElementById("buy-button");

    if (cartItems.length === 0) {
        buyButton.classList.add("disabled");
        buyButton.disabled = true;
    } else {
        buyButton.classList.remove("disabled");
        buyButton.disabled = false;
    }
}

function heartCheck(element) {
    if (!element) {
        console.error("Element not found.");
        return;
    }

    const iconHeart = element.querySelector('i');
    if (!iconHeart) {
        console.error("Heart icon not found.");
        return;
    }

    // تبديل الأيقونة بين bx-heart و bxs-heart
    if (iconHeart.classList.contains('bx-heart')) {
        iconHeart.classList.remove('bx-heart');
        iconHeart.classList.add('bxs-heart');
    } else {
        iconHeart.classList.remove('bxs-heart');
        iconHeart.classList.add('bx-heart');
    }
}

