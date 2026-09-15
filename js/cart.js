/* =========================================
   FRESHBITE - SHOPPING CART
========================================= */

const CART_KEY = "freshBiteCart";

const DELIVERY_FEE = 40;
const DISCOUNT_LIMIT = 500;
const DISCOUNT_PERCENT = 10;

let cart = [];


/* =========================================
   FOOD IMAGES
========================================= */

const foodImages = {
    101: "https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?auto=format&fit=crop&w=500&q=80",
    102: "https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?auto=format&fit=crop&w=500&q=80",
    103: "https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=500&q=80",
    104: "https://images.unsplash.com/photo-1589302168068-964664d93dc0?auto=format&fit=crop&w=500&q=80",

    201: "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?auto=format&fit=crop&w=500&q=80",
    202: "https://images.unsplash.com/photo-1579751626657-72bc17010498?auto=format&fit=crop&w=500&q=80",
    203: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&w=500&q=80",
    204: "https://images.unsplash.com/photo-1573140401552-3fab0b24306f?auto=format&fit=crop&w=500&q=80",

    301: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=500&q=80",
    302: "https://images.unsplash.com/photo-1606755962773-d324e0a13086?auto=format&fit=crop&w=500&q=80",
    303: "https://images.unsplash.com/photo-1520072959219-c595dc870360?auto=format&fit=crop&w=500&q=80",

    401: "https://images.unsplash.com/photo-1552611052-33e04de081de?auto=format&fit=crop&w=500&q=80",
    402: "https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?auto=format&fit=crop&w=500&q=80",
    403: "https://images.unsplash.com/photo-1603133872878-684f208fb84b?auto=format&fit=crop&w=500&q=80",

    501: "https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=500&q=80",
    502: "https://images.unsplash.com/photo-1626132647523-66f5bf380027?auto=format&fit=crop&w=500&q=80",
    503: "https://images.unsplash.com/photo-1631452180519-c014fe946bc7?auto=format&fit=crop&w=500&q=80",

    601: "https://images.unsplash.com/photo-1473093295043-cdd812d0e601?auto=format&fit=crop&w=500&q=80",
    602: "https://images.unsplash.com/photo-1551892374-ecf8754cf8b0?auto=format&fit=crop&w=500&q=80",

    701: "https://images.unsplash.com/photo-1551504734-5ee1c4a1479b?auto=format&fit=crop&w=500&q=80",
    702: "https://images.unsplash.com/photo-1565299585323-38d6b0865b47?auto=format&fit=crop&w=500&q=80",

    801: "https://images.unsplash.com/photo-1579871494447-9811cf80d66c?auto=format&fit=crop&w=500&q=80",
    802: "https://images.unsplash.com/photo-1553621042-f6e147245754?auto=format&fit=crop&w=500&q=80"
};


/* =========================================
   GET CART FROM LOCAL STORAGE
========================================= */

function getCart() {

    try {

        const savedCart = JSON.parse(
            localStorage.getItem(CART_KEY)
        );

        if (Array.isArray(savedCart)) {
            return savedCart;
        }

    } catch (error) {
        console.error("Could not read cart.");
    }

    return [];
}


/* =========================================
   SAVE CART
========================================= */

function saveCart() {

    localStorage.setItem(
        CART_KEY,
        JSON.stringify(cart)
    );

}


/* =========================================
   UPDATE HEADER CART COUNT
========================================= */

function updateCartCount() {

    const cartCount =
        document.getElementById("cart-count");

    if (!cartCount) return;

    const totalItems = cart.reduce(
        (total, item) =>
            total + Number(item.quantity || 0),
        0
    );

    cartCount.textContent = totalItems;

}


/* =========================================
   CALCULATE SUBTOTAL
========================================= */

function calculateSubtotal() {

    return cart.reduce(
        (total, item) => {

            const price = Number(item.price) || 0;

            const quantity =
                Number(item.quantity) || 0;

            return total + price * quantity;

        },
        0
    );

}


/* =========================================
   CALCULATE DISCOUNT
========================================= */

function calculateDiscount(subtotal) {

    if (subtotal >= DISCOUNT_LIMIT) {

        return Math.round(
            subtotal * (DISCOUNT_PERCENT / 100)
        );

    }

    return 0;

}


/* =========================================
   FORMAT CURRENCY
========================================= */

function formatPrice(amount) {

    return `₹${Number(amount).toLocaleString("en-IN")}`;

}


/* =========================================
   RENDER EMPTY CART
========================================= */

function renderEmptyCart() {

    const container =
        document.getElementById("cart-container");

    if (!container) return;


    container.innerHTML = `

        <div class="empty-cart">

            <div class="empty-cart-icon">
                🛒
            </div>

            <h2>
                Your cart is empty
            </h2>

            <p>
                Looks like you haven't added any delicious
                food yet. Browse our restaurants and find
                something you'll love!
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


/* =========================================
   RENDER CART
========================================= */

function renderCart() {

    const container =
        document.getElementById("cart-container");

    if (!container) return;


    if (cart.length === 0) {

        renderEmptyCart();

        return;

    }


    const subtotal =
        calculateSubtotal();

    const deliveryFee =
        DELIVERY_FEE;

    const discount =
        calculateDiscount(subtotal);

    const total =
        subtotal + deliveryFee - discount;


    /* -------------------------------------
       CART ITEMS
    ------------------------------------- */

    const itemsHTML = cart.map(
        (item, index) => {

            const itemPrice =
                Number(item.price) || 0;

            const itemQuantity =
                Number(item.quantity) || 1;

            const itemTotal =
                itemPrice * itemQuantity;

            const imageUrl =
                foodImages[item.id];


            return `

                <div
                    class="cart-item"
                    data-index="${index}"
                >

                    <!-- IMAGE -->

                    <div class="cart-item-image">

                        ${
                            imageUrl
                                ? `
                                    <img
                                        src="${imageUrl}"
                                        alt="${item.name}"
                                        onerror="this.style.display='none'; this.parentElement.innerHTML='<span>${item.emoji || "🍽️"}</span>';"
                                    >
                                `
                                : `
                                    <span>
                                        ${item.emoji || "🍽️"}
                                    </span>
                                `
                        }

                    </div>


                    <!-- INFORMATION -->

                    <div class="cart-item-info">

                        <h3>
                            ${item.name}
                        </h3>

                        <p>
                            ${item.restaurantName || "FreshBite"}
                        </p>

                        <div class="cart-item-price">
                            ${formatPrice(itemPrice)}
                        </div>


                        <div class="cart-item-actions">

                            <div class="quantity-control">

                                <button
                                    class="quantity-button decrease-item"
                                    data-index="${index}"
                                    type="button"
                                >
                                    −
                                </button>

                                <span class="quantity-number">
                                    ${itemQuantity}
                                </span>

                                <button
                                    class="quantity-button increase-item"
                                    data-index="${index}"
                                    type="button"
                                >
                                    +
                                </button>

                            </div>

                            <button
                                class="remove-button remove-item"
                                data-index="${index}"
                                type="button"
                            >
                                Remove
                            </button>

                        </div>

                    </div>


                    <!-- ITEM TOTAL -->

                    <div class="item-total">
                        ${formatPrice(itemTotal)}
                    </div>

                </div>

            `;

        }
    ).join("");


    /* -------------------------------------
       COMPLETE CART
    ------------------------------------- */

    container.innerHTML = `

        <div class="cart-layout">

            <div class="cart-items">

                ${itemsHTML}

            </div>


            <aside class="cart-summary">

                <h2>
                    Order Summary
                </h2>


                <div class="summary-row">

                    <span>
                        Subtotal
                    </span>

                    <strong>
                        ${formatPrice(subtotal)}
                    </strong>

                </div>


                <div class="summary-row">

                    <span>
                        Delivery Fee
                    </span>

                    <strong>
                        ${formatPrice(deliveryFee)}
                    </strong>

                </div>


                ${
                    discount > 0
                        ? `
                            <div class="summary-row discount">

                                <span>
                                    Discount (10%)
                                </span>

                                <strong>
                                    -${formatPrice(discount)}
                                </strong>

                            </div>
                        `
                        : `
                            <div class="summary-row">

                                <span>
                                    Discount
                                </span>

                                <strong>
                                    ₹0
                                </strong>

                            </div>
                        `
                }


                ${
                    subtotal < DISCOUNT_LIMIT
                        ? `
                            <div
                                style="
                                    margin: 5px 0 15px;
                                    padding: 10px 12px;
                                    border-radius: 10px;
                                    background: #fff5eb;
                                    color: #8a6655;
                                    font-size: 12px;
                                    line-height: 1.5;
                                "
                            >
                                Add ${formatPrice(
                                    DISCOUNT_LIMIT - subtotal
                                )}
                                more to unlock 10% off.
                            </div>
                        `
                        : ""
                }


                <div class="summary-divider"></div>


                <div class="summary-total">

                    <span>
                        Total
                    </span>

                    <span>
                        ${formatPrice(total)}
                    </span>

                </div>


                <a
                    href="checkout.html"
                    class="checkout-button"
                >
                    Proceed to Checkout
                </a>


                <a
                    href="restaurants.html"
                    class="continue-shopping"
                >
                    ← Continue Shopping
                </a>

            </aside>

        </div>

    `;


    attachCartEvents();

}


/* =========================================
   ATTACH CART EVENTS
========================================= */

function attachCartEvents() {

    /* -------------------------------------
       INCREASE
    ------------------------------------- */

    document
        .querySelectorAll(".increase-item")
        .forEach(button => {

            button.addEventListener(
                "click",
                () => {

                    const index =
                        Number(button.dataset.index);

                    if (!cart[index]) return;


                    const currentQuantity =
                        Number(
                            cart[index].quantity || 1
                        );


                    if (currentQuantity < 20) {

                        cart[index].quantity =
                            currentQuantity + 1;

                        saveCart();

                        renderCart();

                        updateCartCount();

                    }

                }
            );

        });


    /* -------------------------------------
       DECREASE
    ------------------------------------- */

    document
        .querySelectorAll(".decrease-item")
        .forEach(button => {

            button.addEventListener(
                "click",
                () => {

                    const index =
                        Number(button.dataset.index);

                    if (!cart[index]) return;


                    const currentQuantity =
                        Number(
                            cart[index].quantity || 1
                        );


                    if (currentQuantity > 1) {

                        cart[index].quantity =
                            currentQuantity - 1;

                    } else {

                        cart.splice(index, 1);

                    }


                    saveCart();

                    renderCart();

                    updateCartCount();

                }
            );

        });


    /* -------------------------------------
       REMOVE
    ------------------------------------- */

    document
        .querySelectorAll(".remove-item")
        .forEach(button => {

            button.addEventListener(
                "click",
                () => {

                    const index =
                        Number(button.dataset.index);

                    if (!cart[index]) return;


                    const removedName =
                        cart[index].name;


                    cart.splice(index, 1);

                    saveCart();

                    renderCart();

                    updateCartCount();

                    showToast(
                        `${removedName} removed from cart`
                    );

                }
            );

        });

}


/* =========================================
   TOAST
========================================= */

function showToast(message) {

    const toast =
        document.getElementById("toast");

    if (!toast) return;


    toast.textContent = message;

    toast.classList.add("show");


    setTimeout(() => {

        toast.classList.remove("show");

    }, 2500);

}


/* =========================================
   INITIALIZE
========================================= */

function initializeCart() {

    cart = getCart();

    updateCartCount();

    renderCart();

}


/* =========================================
   START
========================================= */

document.addEventListener(
    "DOMContentLoaded",
    initializeCart
);