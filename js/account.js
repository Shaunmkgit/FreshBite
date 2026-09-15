/* =========================================
   FRESHBITE - ACCOUNT
========================================= */

const CURRENT_USER_KEY = "freshBiteCurrentUser";
const ORDERS_KEY = "freshBiteOrders";
const CART_KEY = "freshBiteCart";


/* =========================================
   GET CURRENT USER
========================================= */

function getCurrentUser() {

    try {

        const user = JSON.parse(
            localStorage.getItem(CURRENT_USER_KEY)
        );

        return user || null;

    } catch (error) {

        return null;

    }

}


/* =========================================
   GET ORDERS
========================================= */

function getOrders() {

    try {

        const orders = JSON.parse(
            localStorage.getItem(ORDERS_KEY)
        );

        return Array.isArray(orders)
            ? orders
            : [];

    } catch (error) {

        return [];

    }

}


/* =========================================
   UPDATE CART COUNT
========================================= */

function updateCartCount() {

    const cartCount =
        document.getElementById("cart-count");

    if (!cartCount) return;


    try {

        const cart = JSON.parse(
            localStorage.getItem(CART_KEY)
        );

        if (!Array.isArray(cart)) {

            cartCount.textContent = "0";
            return;

        }


        const total = cart.reduce(
            (sum, item) =>
                sum + Number(item.quantity || 0),
            0
        );


        cartCount.textContent = total;

    } catch (error) {

        cartCount.textContent = "0";

    }

}


/* =========================================
   GET USER INITIAL
========================================= */

function getUserInitial(name) {

    if (!name) return "U";

    return name
        .trim()
        .charAt(0)
        .toUpperCase();

}


/* =========================================
   FORMAT DATE
========================================= */

function formatDate(dateValue) {

    if (!dateValue) {

        return "Date unavailable";

    }


    const date = new Date(dateValue);


    if (isNaN(date.getTime())) {

        return dateValue;

    }


    return date.toLocaleDateString(
        "en-IN",
        {
            day: "numeric",
            month: "short",
            year: "numeric"
        }
    );

}


/* =========================================
   FORMAT PRICE
========================================= */

function formatPrice(amount) {

    return `₹${Number(amount || 0).toLocaleString("en-IN")}`;

}


/* =========================================
   GET ORDER ITEMS
========================================= */

function getOrderItems(order) {

    if (!order) return [];


    if (
        Array.isArray(order.items)
    ) {

        return order.items;

    }


    if (
        Array.isArray(order.cart)
    ) {

        return order.cart;

    }


    return [];

}


/* =========================================
   GET ORDER STATUS
========================================= */

function getOrderStatus(order) {

    if (!order) {

        return "Order Confirmed";

    }


    if (order.status) {

        return order.status;

    }


    return "Order Confirmed";

}


/* =========================================
   GET ORDER ID
========================================= */

function getOrderId(order, index) {

    if (order && order.orderId) {

        return order.orderId;

    }


    if (order && order.id) {

        return order.id;

    }


    return `FB${100000 + index}`;

}


/* =========================================
   RENDER LOGIN REQUIRED
========================================= */

function renderLoginRequired() {

    const container =
        document.getElementById("account-container");

    if (!container) return;


    container.innerHTML = `

        <div class="login-required">

            <div class="login-required-icon">
                👤
            </div>

            <h2>
                Login Required
            </h2>

            <p>
                Please login to view your account,
                profile information and order history.
            </p>

            <a
                href="login.html"
                class="login-button"
            >
                Login
            </a>

        </div>

    `;

}


/* =========================================
   RENDER ORDERS
========================================= */

function renderOrders(orders) {

    if (!orders || orders.length === 0) {

        return `

            <div class="empty-orders">

                <div class="empty-orders-icon">
                    🍽️
                </div>

                <h3>
                    No orders yet
                </h3>

                <p>
                    You haven't placed an order yet.
                    Explore our restaurants and order
                    something delicious!
                </p>

                <a
                    href="restaurants.html"
                    class="browse-button"
                >
                    Browse Restaurants
                </a>

            </div>

        `;

    }


    /*
       Show newest orders first.
    */

    const sortedOrders = [...orders].reverse();


    const orderHTML = sortedOrders.map(
        (order, index) => {

            const items =
                getOrderItems(order);

            const orderId =
                getOrderId(
                    order,
                    orders.length - index
                );

            const status =
                getOrderStatus(order);

            const total =
                Number(
                    order.total ||
                    order.amount ||
                    0
                );


            const payment =
                order.paymentMethod ||
                order.payment ||
                "Payment information unavailable";


            const date =
                order.date ||
                order.createdAt ||
                order.orderDate;


            const itemsHTML =
                items.length > 0

                    ? items.map(item => {

                        const itemQuantity =
                            Number(
                                item.quantity || 1
                            );

                        return `

                            <div class="order-item-line">
                                ${item.name || "Food item"}
                                × ${itemQuantity}
                            </div>

                        `;

                    }).join("")

                    : `

                        <div class="order-item-line">
                            Order details unavailable
                        </div>

                    `;


            return `

                <div class="order-card">

                    <!-- TOP -->

                    <div class="order-top">

                        <div>

                            <p class="order-id">
                                ${orderId}
                            </p>

                            <p class="order-date">
                                ${formatDate(date)}
                            </p>

                        </div>

                        <span class="order-status">
                            ${status}
                        </span>

                    </div>


                    <!-- MIDDLE -->

                    <div class="order-middle">

                        <div class="order-items">

                            <div class="order-items-title">
                                Items
                            </div>

                            ${itemsHTML}

                        </div>


                        <div class="order-total">

                            <span>
                                Total
                            </span>

                            <strong>
                                ${formatPrice(total)}
                            </strong>

                        </div>

                    </div>


                    <!-- BOTTOM -->

                    <div class="order-bottom">

                        <div class="payment-info">
                            💳 ${payment}
                        </div>

                        <a
                            href="tracking.html"
                            class="track-order-button"
                        >
                            Track Order
                        </a>

                    </div>

                </div>

            `;

        }
    ).join("");


    return `

        <div class="orders-list">

            ${orderHTML}

        </div>

    `;

}


/* =========================================
   LOGOUT
========================================= */

function logout() {

    localStorage.removeItem(
        CURRENT_USER_KEY
    );

    window.location.href = "login.html";

}


/* =========================================
   RENDER ACCOUNT
========================================= */

function renderAccount(user) {

    const container =
        document.getElementById("account-container");

    if (!container) return;


    const orders =
        getOrders();


    const name =
        user.name ||
        "FreshBite User";


    const email =
        user.email ||
        "No email available";


    const phone =
        user.phone ||
        "No phone number available";


    const initial =
        getUserInitial(name);


    container.innerHTML = `

        <!-- PROFILE -->

        <section class="profile-card">

            <div class="profile-avatar">
                ${initial}
            </div>


            <div class="profile-info">

                <h2>
                    ${name}
                </h2>

                <p>
                    📧 ${email}
                </p>

                <p>
                    📱 ${phone}
                </p>

            </div>


            <button
                type="button"
                class="logout-button"
                id="logout-button"
            >
                Logout
            </button>

        </section>


        <!-- QUICK LINKS -->

        <section class="account-links">

            <a
                href="restaurants.html"
                class="account-link-card"
            >

                <div class="account-link-icon">
                    🍽️
                </div>

                <div class="account-link-text">

                    <strong>
                        Order Food
                    </strong>

                    <span>
                        Browse restaurants
                    </span>

                </div>

            </a>


            <a
                href="wishlist.html"
                class="account-link-card"
            >

                <div class="account-link-icon">
                    ❤️
                </div>

                <div class="account-link-text">

                    <strong>
                        Wishlist
                    </strong>

                    <span>
                        Your favourite foods
                    </span>

                </div>

            </a>


            <a
                href="cart.html"
                class="account-link-card"
            >

                <div class="account-link-icon">
                    🛒
                </div>

                <div class="account-link-text">

                    <strong>
                        Cart
                    </strong>

                    <span>
                        Review your order
                    </span>

                </div>

            </a>

        </section>


        <!-- ORDER HISTORY -->

        <section class="orders-section">

            <div class="section-title">

                <h2>
                    Order History
                </h2>

                <span class="orders-count">
                    ${orders.length}
                    ${orders.length === 1 ? "order" : "orders"}
                </span>

            </div>


            ${renderOrders(orders)}

        </section>

    `;


    const logoutButton =
        document.getElementById("logout-button");


    if (logoutButton) {

        logoutButton.addEventListener(
            "click",
            logout
        );

    }

}


/* =========================================
   INITIALIZE
========================================= */

function initializeAccount() {

    updateCartCount();


    const user =
        getCurrentUser();


    if (!user) {

        renderLoginRequired();

        return;

    }


    renderAccount(user);

}


/* =========================================
   START
========================================= */

document.addEventListener(
    "DOMContentLoaded",
    initializeAccount
);