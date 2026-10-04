let currentIndices = {
    carousel1: 0,
    carousel2: 0
};

function moveSlide(direction, carouselId) {
    // تحديد الحاوية والعناصر
    const container = document.querySelector(`.carousel-container[data-carousel="${carouselId}"]`);
    if (!container) {
        console.error(`Carousel container with ID ${carouselId} not found.`);
        return;
    }

    const boxes = container.querySelectorAll(".product-box");
    const totalBoxes = boxes.length;
    const boxesPerView = 3; // عدد العناصر المعروضة في كل مرة

    // تحديث currentIndex بناءً على carouselId
    currentIndices[carouselId] += direction;

    // التأكد من أن currentIndex يبقى ضمن الحدود الصحيحة
    if (currentIndices[carouselId] >= totalBoxes - boxesPerView + 1) {
        currentIndices[carouselId] = 0;
    } else if (currentIndices[carouselId] < 0) {
        currentIndices[carouselId] = totalBoxes - boxesPerView;
    }

    // حساب الـ offset بناءً على عدد العناصر المعروضة
    const offset = -currentIndices[carouselId] * (100 / boxesPerView);
    container.style.transform = `translateX(${offset}%)`; // تحريك العناصر
}

function toggleCheck(element) {
    const icon = element.querySelector('i');
    if (icon.classList.contains('bx-plus')) {
        icon.classList.replace('bx-plus', 'bx-check');
    } else {
        icon.classList.replace('bx-check', 'bx-plus');
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

function cartCheck(element) {
    if (!element) {
        console.error("Element not found.");
        return;
    }

    const iconHeart = element.querySelector('i');
    if (!iconHeart) {
        console.error("Cart icon not found.");
        return;
    }

    // تبديل الأيقونة بين bx-cart و bxs-cart
    if (iconHeart.classList.contains('bx-cart')) {
        iconHeart.classList.remove('bx-cart');
        iconHeart.classList.add('bxs-cart');
    } else {
        iconHeart.classList.remove('bxs-cart');
        iconHeart.classList.add('bx-cart');
    }
}

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