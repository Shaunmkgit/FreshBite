const LAST_ORDER_KEY = "freshBiteLastOrder";
const ORDERS_KEY = "freshBiteOrders";
const TRACKING_KEY = "freshBiteTrackingStatus";
const CART_KEY = "freshBiteCart";

const statuses = [
    {
        name: "Order Confirmed",
        icon: "✓",
        description: "Your order has been received successfully."
    },
    {
        name: "Preparing",
        icon: "👨‍🍳",
        description: "The restaurant is preparing your delicious food."
    },
    {
        name: "Out for Delivery",
        icon: "🛵",
        description: "Your order is on its way to you."
    },
    {
        name: "Delivered",
        icon: "🏠",
        description: "Your order has been delivered. Enjoy your meal!"
    }
];

const trackingContent = document.getElementById("tracking-content");
const cartCount = document.getElementById("cart-count");

function getCart() {
    return JSON.parse(localStorage.getItem(CART_KEY)) || [];
}

function updateCartCount() {
    const cart = getCart();

    const count = cart.reduce((total, item) => {
        return total + Number(item.quantity || 0);
    }, 0);

    if (cartCount) {
        cartCount.textContent = count;
    }
}

function getLatestOrder() {
    const lastOrder = JSON.parse(
        localStorage.getItem(LAST_ORDER_KEY)
    );

    if (lastOrder) {
        return lastOrder;
    }

    const orders = JSON.parse(
        localStorage.getItem(ORDERS_KEY)
    ) || [];

    return orders.length > 0 ? orders[0] : null;
}

function getTrackingData(order) {
    const savedTracking = JSON.parse(
        localStorage.getItem(TRACKING_KEY)
    );

    if (
        savedTracking &&
        savedTracking.orderId === order.orderId
    ) {
        return savedTracking;
    }

    const initialTracking = {
        orderId: order.orderId,
        statusIndex: 0,
        updatedAt: new Date().toISOString()
    };

    localStorage.setItem(
        TRACKING_KEY,
        JSON.stringify(initialTracking)
    );

    return initialTracking;
}

function saveTrackingData(order, statusIndex) {
    const trackingData = {
        orderId: order.orderId,
        statusIndex: statusIndex,
        updatedAt: new Date().toISOString()
    };

    localStorage.setItem(
        TRACKING_KEY,
        JSON.stringify(trackingData)
    );

    // Update the last order
    const lastOrder = JSON.parse(
        localStorage.getItem(LAST_ORDER_KEY)
    );

    if (
        lastOrder &&
        lastOrder.orderId === order.orderId
    ) {
        lastOrder.status = statuses[statusIndex].name;

        localStorage.setItem(
            LAST_ORDER_KEY,
            JSON.stringify(lastOrder)
        );
    }

    // Update the order inside order history
    const orders = JSON.parse(
        localStorage.getItem(ORDERS_KEY)
    ) || [];

    const updatedOrders = orders.map(savedOrder => {
        if (savedOrder.orderId === order.orderId) {
            return {
                ...savedOrder,
                status: statuses[statusIndex].name
            };
        }

        return savedOrder;
    });

    localStorage.setItem(
        ORDERS_KEY,
        JSON.stringify(updatedOrders)
    );
}

function formatDate(dateString) {
    if (!dateString) {
        return "Recently";
    }

    const date = new Date(dateString);

    return date.toLocaleString("en-IN", {
        day: "numeric",
        month: "short",
        year: "numeric",
        hour: "numeric",
        minute: "2-digit"
    });
}

function renderEmptyState() {
    trackingContent.innerHTML = `
        <div class="empty-state">
            <div class="emoji">📦</div>

            <h2>No Order to Track</h2>

            <p>
                You haven't placed an order yet.
                Order something delicious and track it here!
            </p>

            <a href="restaurants.html" class="button primary-btn">
                🍽️ Browse Restaurants
            </a>
        </div>
    `;
}

function renderTracking(order) {
    const trackingData = getTrackingData(order);

    const statusIndex = Math.min(
        trackingData.statusIndex,
        statuses.length - 1
    );

    const currentStatus = statuses[statusIndex];

    const progressPercentage =
        (statusIndex / (statuses.length - 1)) * 100;

    const items = order.items || [];

    const itemsHTML = items.map(item => `
        <div class="order-item">
            <div>
                <span class="item-name">
                    ${item.emoji || "🍽️"} ${item.name}
                </span>

                <span class="item-quantity">
                    × ${item.quantity}
                </span>
            </div>

            <div class="item-price">
                ₹${Number(item.price * item.quantity).toFixed(0)}
            </div>
        </div>
    `).join("");

    const address = order.customer
        ? `
            ${order.customer.house || ""}<br>
            ${order.customer.street || ""}<br>
            ${order.customer.city || ""}, 
            ${order.customer.state || ""} -
            ${order.customer.pin || ""}
        `
        : "Delivery address not available";

    trackingContent.innerHTML = `
        <section class="tracking-card">

            <div class="order-header">

                <div>
                    <div class="order-id">
                        Order #${order.orderId || "FB1001"}
                    </div>

                    <small>
                        Placed on ${formatDate(order.createdAt)}
                    </small>
                </div>

                <div class="status-badge">
                    ${currentStatus.name}
                </div>

            </div>

            <div class="progress-wrapper">

                <div class="progress-bar">
                    <div
                        class="progress-fill"
                        style="width: ${progressPercentage}%"
                    ></div>
                </div>

                <div class="progress-steps">

                    ${statuses.map((status, index) => {

                        let stepClass = "";

                        if (index < statusIndex) {
                            stepClass = "completed";
                        }

                        if (index === statusIndex) {
                            stepClass = "active";
                        }

                        return `
                            <div class="step ${stepClass}">

                                <div class="step-circle">
                                    ${
                                        index < statusIndex
                                            ? "✓"
                                            : status.icon
                                    }
                                </div>

                                <div class="step-label">
                                    ${status.name}
                                </div>

                                ${
                                    index === statusIndex
                                        ? `
                                            <div class="step-time">
                                                Current
                                            </div>
                                        `
                                        : ""
                                }

                            </div>
                        `;

                    }).join("")}

                </div>

            </div>

            <div class="current-status">

                <h2>
                    ${currentStatus.icon}
                    ${currentStatus.name}
                </h2>

                <p>
                    ${currentStatus.description}
                </p>

            </div>

            <div class="tracking-actions">

                <button
                    id="next-status-btn"
                    class="primary-btn"
                    ${
                        statusIndex >= statuses.length - 1
                            ? "disabled"
                            : ""
                    }
                >
                    ${
                        statusIndex >= statuses.length - 1
                            ? "✓ Order Delivered"
                            : "Update Order Status →"
                    }
                </button>

                <a
                    href="restaurants.html"
                    class="button secondary-btn"
                >
                    🍽️ Order More Food
                </a>

            </div>

        </section>

        <section class="order-card">

            <h2>📋 Order Details</h2>

            <div class="info-grid">

                <div class="info-box">
                    <h3>Delivery Address</h3>
                    <p>${address}</p>
                </div>

                <div class="info-box">
                    <h3>Payment Method</h3>
                    <p>
                        ${order.paymentMethod || "Cash on Delivery"}
                    </p>
                </div>

                <div class="info-box">
                    <h3>Estimated Delivery</h3>
                    <p>
                        ${order.deliveryTime || "30-40 minutes"}
                    </p>
                </div>

                <div class="info-box">
                    <h3>Order Status</h3>
                    <p>${currentStatus.name}</p>
                </div>

            </div>

        </section>

        <section class="order-card">

            <h2 class="items-title">
                🍴 Ordered Items
            </h2>

            ${itemsHTML}

            <div class="total-row">
                <span>Total</span>
                <span>
                    ₹${Number(order.total || 0).toFixed(0)}
                </span>
            </div>

        </section>
    `;

    const nextButton = document.getElementById(
        "next-status-btn"
    );

    if (nextButton) {
        nextButton.addEventListener("click", () => {

            if (statusIndex >= statuses.length - 1) {
                return;
            }

            const nextIndex = statusIndex + 1;

            saveTrackingData(order, nextIndex);

            renderTracking(order);
        });
    }
}

function initializeTracking() {
    updateCartCount();

    const order = getLatestOrder();

    if (!order) {
        renderEmptyState();
        return;
    }

    renderTracking(order);
}

initializeTracking();