function toggleCheck(element) {
    // الحصول على العنصر الأب (product-box)
    const productBox = element.closest('.product-box');

    // استخراج بيانات المنتج
    const product = {
        imgSrc: productBox.querySelector('.main-img').src,
        title: productBox.querySelector('.product-name').textContent,
        type: productBox.querySelector('.product-type').textContent,
        price: productBox.querySelector('.product-price').textContent,
        quantity: 1 // الكمية الافتراضية
    };

    // الحصول على السلة الحالية من localStorage
    let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];

    // التحقق من وجود المنتج في السلة
    const isProductInCart = cartItems.some(item => item.title === product.title);

    if (isProductInCart) {
        // إذا كان المنتج موجودًا بالفعل، إظهار رسالة للمستخدم
        alert('هذا المنتج موجود بالفعل في السلة!');
    } else {
        // إذا لم يكن المنتج موجودًا، إضافته إلى السلة
        cartItems.push(product);
        localStorage.setItem('cartItems', JSON.stringify(cartItems));

        // تبديل الأيقونة بين bx-plus و bx-check
        const icon = element.querySelector('i');
        if (icon.classList.contains('bx-plus')) {
            icon.classList.remove('bx-plus');
            icon.classList.add('bx-check');
        } else {
            icon.classList.remove('bx-check');
            icon.classList.add('bx-plus');
        }

        // تحديث عدد العناصر في السلة
        updateCartCount();

        // إعلام المستخدم بأن المنتج قد تمت إضافته إلى السلة
        alert('تمت إضافة المنتج إلى السلة!');
    }
}

function updateCartCount() {
    const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    const cartCount = document.getElementById('cart-count');
    cartCount.textContent = cartItems.length;
}

// تحديث عدد العناصر في السلة عند تحميل الصفحة
window.onload = function() {
    updateCartCount();
};

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

document.getElementById('sort').addEventListener('change', function() {
    const sortBy = this.value ;
    const container = document.getElementById('container-boxs');
    const boxes = Array.from(container.getElementsByClassName('product-box'));

    boxes.sort((a, b) => {
        const priceA = parseFloat(a.getAttribute('data-price'));
        const priceB = parseFloat(b.getAttribute('data-price'));

        if (sortBy === 'price-low') {
            return priceA - priceB;
        } else if (sortBy === 'price-high') {
            return priceB - priceA;
        } else {
            return 0;
        }
    });

    container.innerHTML = '';
    boxes.forEach(box => container.appendChild(box));
});