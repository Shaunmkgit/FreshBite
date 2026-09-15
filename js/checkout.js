const CART_KEY = "freshBiteCart";
const LAST_ORDER_KEY = "freshBiteLastOrder";
const ORDERS_KEY = "freshBiteOrders";
const COUPON_KEY = "freshBiteCoupon";

const DELIVERY_FEE = 40;
const DISCOUNT_LIMIT = 500;
const DISCOUNT_PERCENT = 10;

const coupons = {
    WELCOME10: {
        code: "WELCOME10",
        type: "percentage",
        value: 10,
        minOrder: 300,
        maxDiscount: 100
    },

    FRESH20: {
        code: "FRESH20",
        type: "fixed",
        value: 20,
        minOrder: 200,
        maxDiscount: null
    }
};


let cart = [];
let appliedCoupon = null;


// ==============================
// INITIALIZE
// ==============================

document.addEventListener("DOMContentLoaded", function () {

    loadCart();
    updateCartCount();

    if (cart.length === 0) {
        showEmptyCart();
        return;
    }

    restoreCoupon();
    renderSummary();

    document
        .getElementById("applyCouponBtn")
        .addEventListener("click", applyCoupon);

    document
        .getElementById("removeCouponBtn")
        .addEventListener("click", removeCoupon);

    document
        .getElementById("couponCode")
        .addEventListener("keydown", function (event) {

            if (event.key === "Enter") {
                event.preventDefault();
                applyCoupon();
            }
        });

    document
        .getElementById("orderForm")
        .addEventListener("submit", placeOrder);
});


// ==============================
// CART
// ==============================

function loadCart() {

    try {
        cart = JSON.parse(localStorage.getItem(CART_KEY)) || [];
    } catch (error) {
        cart = [];
    }
}


function updateCartCount() {

    const countElement = document.getElementById("cart-count");

    if (!countElement) {
        return;
    }

    const count = cart.reduce(function (total, item) {
        return total + Number(item.quantity || 0);
    }, 0);

    countElement.textContent = count;
}


function showEmptyCart() {

    const container = document.querySelector(".checkout-container");

    if (container) {
        container.innerHTML = `
            <div class="empty-message" style="grid-column:1/-1;">
                <h2>Your cart is empty 🛒</h2>

                <p style="margin:12px 0 20px;">
                    Add some delicious food before checking out.
                </p>

                <a
                    href="restaurants.html"
                    style="
                        display:inline-block;
                        background:#FF6B35;
                        color:white;
                        padding:12px 20px;
                        border-radius:8px;
                        font-weight:600;
                    "
                >
                    Browse Restaurants
                </a>
            </div>
        `;
    }
}


// ==============================
// PRICE CALCULATION
// ==============================

function calculateSubtotal() {

    return cart.reduce(function (total, item) {

        return total +
            Number(item.price || 0) *
            Number(item.quantity || 0);

    }, 0);
}


function calculateAutomaticDiscount(subtotal) {

    if (subtotal >= DISCOUNT_LIMIT) {
        return Math.round(
            subtotal * (DISCOUNT_PERCENT / 100)
        );
    }

    return 0;
}


function calculateCouponDiscount(baseAmount) {

    if (!appliedCoupon) {
        return 0;
    }

    let discount = 0;

    if (appliedCoupon.type === "percentage") {

        discount =
            baseAmount *
            (appliedCoupon.value / 100);

        if (appliedCoupon.maxDiscount !== null) {
            discount = Math.min(
                discount,
                appliedCoupon.maxDiscount
            );
        }

    } else if (appliedCoupon.type === "fixed") {

        discount = appliedCoupon.value;
    }

    discount = Math.min(discount, baseAmount);

    return Math.round(discount);
}


function calculateTotals() {

    const subtotal = calculateSubtotal();

    const automaticDiscount =
        calculateAutomaticDiscount(subtotal);

    const amountAfterAutomaticDiscount =
        subtotal - automaticDiscount;

    const couponDiscount =
        calculateCouponDiscount(
            amountAfterAutomaticDiscount
        );

    const totalDiscount =
        automaticDiscount + couponDiscount;

    const total =
        Math.max(
            0,
            subtotal +
            DELIVERY_FEE -
            totalDiscount
        );

    return {
        subtotal,
        automaticDiscount,
        couponDiscount,
        totalDiscount,
        deliveryFee: DELIVERY_FEE,
        total
    };
}


// ==============================
// COUPONS
// ==============================

function restoreCoupon() {

    let savedCoupon = null;

    try {
        savedCoupon =
            JSON.parse(
                localStorage.getItem(COUPON_KEY)
            );
    } catch (error) {
        savedCoupon = null;
    }

    if (!savedCoupon || !savedCoupon.code) {
        return;
    }

    const coupon =
        coupons[savedCoupon.code];

    if (!coupon) {
        localStorage.removeItem(COUPON_KEY);
        return;
    }

    const subtotal = calculateSubtotal();

    if (subtotal < coupon.minOrder) {
        localStorage.removeItem(COUPON_KEY);
        return;
    }

    appliedCoupon = coupon;

    const input =
        document.getElementById("couponCode");

    if (input) {
        input.value = coupon.code;
    }

    showCouponSuccess(
        `${coupon.code} is already applied.`
    );
}


function applyCoupon() {

    const input =
        document.getElementById("couponCode");

    const code =
        input.value
            .trim()
            .toUpperCase();

    if (!code) {

        showCouponError(
            "Please enter a coupon code."
        );

        return;
    }

    const coupon = coupons[code];

    if (!coupon) {

        showCouponError(
            "Invalid coupon code. Try WELCOME10 or FRESH20."
        );

        return;
    }

    const subtotal = calculateSubtotal();

    if (subtotal < coupon.minOrder) {

        showCouponError(
            `${coupon.code} requires a minimum order of ₹${coupon.minOrder}.`
        );

        return;
    }

    appliedCoupon = coupon;

    localStorage.setItem(
        COUPON_KEY,
        JSON.stringify(coupon)
    );

    showCouponSuccess(
        `${coupon.code} applied successfully!`
    );

    renderSummary();
}


function removeCoupon() {

    appliedCoupon = null;

    localStorage.removeItem(COUPON_KEY);

    const input =
        document.getElementById("couponCode");

    if (input) {
        input.value = "";
    }

    const removeButton =
        document.getElementById("removeCouponBtn");

    if (removeButton) {
        removeButton.style.display = "none";
    }

    const message =
        document.getElementById("couponMessage");

    if (message) {
        message.textContent = "";
        message.className = "coupon-message";
    }

    renderSummary();
}


function showCouponSuccess(message) {

    const messageElement =
        document.getElementById("couponMessage");

    const removeButton =
        document.getElementById("removeCouponBtn");

    if (messageElement) {

        messageElement.textContent =
            "✓ " + message;

        messageElement.className =
            "coupon-message success";
    }

    if (removeButton) {
        removeButton.style.display = "inline-block";
    }
}


function showCouponError(message) {

    const messageElement =
        document.getElementById("couponMessage");

    if (messageElement) {

        messageElement.textContent =
            "✕ " + message;

        messageElement.className =
            "coupon-message error";
    }
}


// ==============================
// SUMMARY
// ==============================

function renderSummary() {

    const summary =
        document.getElementById("orderSummary");

    if (!summary) {
        return;
    }

    const totals = calculateTotals();

    let itemsHTML = "";

    cart.forEach(function (item) {

        const itemTotal =
            Number(item.price || 0) *
            Number(item.quantity || 0);

        itemsHTML += `
            <div class="summary-item">
                <span>
                    ${escapeHTML(item.name)}
                    × ${item.quantity}
                </span>

                <span>
                    ₹${itemTotal}
                </span>
            </div>
        `;
    });


    let automaticDiscountHTML = "";

    if (totals.automaticDiscount > 0) {

        automaticDiscountHTML = `
            <div class="summary-item discount-row">
                <span>Automatic Discount</span>
                <span>-₹${totals.automaticDiscount}</span>
            </div>
        `;
    }


    let couponDiscountHTML = "";

    if (
        appliedCoupon &&
        totals.couponDiscount > 0
    ) {

        couponDiscountHTML = `
            <div class="summary-item discount-row">
                <span>
                    Coupon (${appliedCoupon.code})
                </span>

                <span>
                    -₹${totals.couponDiscount}
                </span>
            </div>
        `;
    }


    summary.innerHTML = `
        ${itemsHTML}

        <hr class="summary-divider">

        <div class="summary-item">
            <span>Subtotal</span>
            <span>₹${totals.subtotal}</span>
        </div>

        ${automaticDiscountHTML}

        ${couponDiscountHTML}

        <div class="summary-item">
            <span>Delivery Fee</span>
            <span>₹${totals.deliveryFee}</span>
        </div>

        <hr class="summary-divider">

        <div class="total-row">
            <span>Total</span>
            <span>₹${totals.total}</span>
        </div>
    `;


    updateCouponUI();
}


function updateCouponUI() {

    const removeButton =
        document.getElementById("removeCouponBtn");

    if (!removeButton) {
        return;
    }

    if (appliedCoupon) {
        removeButton.style.display = "inline-block";
    } else {
        removeButton.style.display = "none";
    }
}


// ==============================
// PLACE ORDER
// ==============================

function placeOrder(event) {

    event.preventDefault();

    if (cart.length === 0) {
        alert("Your cart is empty.");
        return;
    }

    const form =
        document.getElementById("orderForm");

    if (!form.checkValidity()) {

        form.reportValidity();

        return;
    }


    const fullName =
        document.getElementById("fullName").value.trim();

    const phone =
        document.getElementById("phone").value.trim();

    const house =
        document.getElementById("house").value.trim();

    const street =
        document.getElementById("street").value.trim();

    const city =
        document.getElementById("city").value.trim();

    const state =
        document.getElementById("state").value.trim();

    const pin =
        document.getElementById("pin").value.trim();

    const deliveryTime =
        document.getElementById("deliveryTime").value;

    const paymentElement =
        document.querySelector(
            'input[name="paymentMethod"]:checked'
        );

    const paymentMethod =
        paymentElement
            ? paymentElement.value
            : "Cash on Delivery";


    const totals =
        calculateTotals();


    const orderId =
        "FB" +
        Math.floor(
            100000 +
            Math.random() * 900000
        );


    const order = {

        id: orderId,

        orderId: orderId,

        items: cart.map(function (item) {

            return {
                id: item.id,
                restaurantId: item.restaurantId,
                name: item.name,
                price: Number(item.price),
                quantity: Number(item.quantity),
                emoji: item.emoji || "🍽️"
            };

        }),

        customer: {
            name: fullName,
            phone: phone,
            address: {
                house: house,
                street: street,
                city: city,
                state: state,
                pin: pin
            }
        },

        deliveryTime: deliveryTime,

        paymentMethod: paymentMethod,

        subtotal: totals.subtotal,

        automaticDiscount:
            totals.automaticDiscount,

        coupon:
            appliedCoupon
                ? appliedCoupon.code
                : null,

        couponDiscount:
            totals.couponDiscount,

        discount:
            totals.totalDiscount,

        deliveryFee:
            totals.deliveryFee,

        total:
            totals.total,

        status: "Order Confirmed",

        createdAt:
            new Date().toISOString()
    };


    // Save latest order
    localStorage.setItem(
        LAST_ORDER_KEY,
        JSON.stringify(order)
    );


    // Save order history
    let orders = [];

    try {
        orders =
            JSON.parse(
                localStorage.getItem(ORDERS_KEY)
            ) || [];
    } catch (error) {
        orders = [];
    }

    orders.unshift(order);

    localStorage.setItem(
        ORDERS_KEY,
        JSON.stringify(orders)
    );


    // Clear cart
    localStorage.removeItem(CART_KEY);

    // Clear coupon
    localStorage.removeItem(COUPON_KEY);

    cart = [];
    appliedCoupon = null;


    updateCartCount();


    // Hide checkout
    document.querySelector(
        ".checkout-container"
    ).style.display = "none";


    // Show confirmation
    const confirmation =
        document.getElementById("confirmation");

    confirmation.style.display = "block";


    document.getElementById(
        "confirmationOrderId"
    ).textContent =
        "Order ID: " + orderId;


    document.getElementById(
        "confirmationTotal"
    ).textContent =
        `Total Paid: ₹${totals.total} • ${paymentMethod}`;


    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
}


// ==============================
// SECURITY / TEXT HELPERS
// ==============================

function escapeHTML(value) {

    return String(value)
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
}