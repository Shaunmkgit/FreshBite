/* =========================================
   FRESHBITE - PRODUCT DETAILS
========================================= */

const CART_KEY = "freshBiteCart";
const WISHLIST_KEY = "freshBiteWishlist";

let product = null;
let restaurant = null;
let quantity = 1;


/* =========================================
   IMAGE DATA
========================================= */

const foodImages = {
    101: "https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?auto=format&fit=crop&w=1000&q=80",
    102: "https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?auto=format&fit=crop&w=1000&q=80",
    103: "https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=1000&q=80",
    104: "https://images.unsplash.com/photo-1589302168068-964664d93dc0?auto=format&fit=crop&w=1000&q=80",

    201: "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?auto=format&fit=crop&w=1000&q=80",
    202: "https://images.unsplash.com/photo-1579751626657-72bc17010498?auto=format&fit=crop&w=1000&q=80",
    203: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&w=1000&q=80",
    204: "https://images.unsplash.com/photo-1573140401552-3fab0b24306f?auto=format&fit=crop&w=1000&q=80",

    301: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=1000&q=80",
    302: "https://images.unsplash.com/photo-1606755962773-d324e0a13086?auto=format&fit=crop&w=1000&q=80",
    303: "https://images.unsplash.com/photo-1520072959219-c595dc870360?auto=format&fit=crop&w=1000&q=80",

    401: "https://images.unsplash.com/photo-1552611052-33e04de081de?auto=format&fit=crop&w=1000&q=80",
    402: "https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?auto=format&fit=crop&w=1000&q=80",
    403: "https://images.unsplash.com/photo-1603133872878-684f208fb84b?auto=format&fit=crop&w=1000&q=80",

    501: "https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=1000&q=80",
    502: "https://images.unsplash.com/photo-1626132647523-66f5bf380027?auto=format&fit=crop&w=1000&q=80",
    503: "https://images.unsplash.com/photo-1631452180519-c014fe946bc7?auto=format&fit=crop&w=1000&q=80",

    601: "https://images.unsplash.com/photo-1473093295043-cdd812d0e601?auto=format&fit=crop&w=1000&q=80",
    602: "https://images.unsplash.com/photo-1551892374-ecf8754cf8b0?auto=format&fit=crop&w=1000&q=80",

    701: "https://images.unsplash.com/photo-1551504734-5ee1c4a1479b?auto=format&fit=crop&w=1000&q=80",
    702: "https://images.unsplash.com/photo-1565299585323-38d6b0865b47?auto=format&fit=crop&w=1000&q=80",

    801: "https://images.unsplash.com/photo-1579871494447-9811cf80d66c?auto=format&fit=crop&w=1000&q=80",
    802: "https://images.unsplash.com/photo-1553621042-f6e147245754?auto=format&fit=crop&w=1000&q=80"
};


/* =========================================
   GET PRODUCT ID FROM URL
   Example:
   product.html?id=101
========================================= */

function getProductId() {

    const params = new URLSearchParams(window.location.search);

    const id = Number(params.get("id"));

    return id;
}


/* =========================================
   GET CART
========================================= */

function getCart() {

    try {

        const cart = JSON.parse(
            localStorage.getItem(CART_KEY)
        );

        return Array.isArray(cart) ? cart : [];

    } catch (error) {

        return [];
    }
}


/* =========================================
   SAVE CART
========================================= */

function saveCart(cart) {

    localStorage.setItem(
        CART_KEY,
        JSON.stringify(cart)
    );
}


/* =========================================
   GET WISHLIST
========================================= */

function getWishlist() {

    try {

        const wishlist = JSON.parse(
            localStorage.getItem(WISHLIST_KEY)
        );

        return Array.isArray(wishlist) ? wishlist : [];

    } catch (error) {

        return [];
    }
}


/* =========================================
   SAVE WISHLIST
========================================= */

function saveWishlist(wishlist) {

    localStorage.setItem(
        WISHLIST_KEY,
        JSON.stringify(wishlist)
    );
}


/* =========================================
   UPDATE CART COUNT
========================================= */

function updateCartCount() {

    const cart = getCart();

    const totalQuantity = cart.reduce(
        (total, item) => total + Number(item.quantity || 1),
        0
    );

    const cartCount = document.getElementById("cart-count");

    if (cartCount) {

        cartCount.textContent = totalQuantity;

    }
}


/* =========================================
   SHOW TOAST
========================================= */

function showToast(message) {

    const toast = document.getElementById("toast");

    if (!toast) return;

    toast.textContent = message;

    toast.classList.add("show");

    setTimeout(() => {

        toast.classList.remove("show");

    }, 2500);
}


/* =========================================
   CREATE PRODUCT PAGE
========================================= */

function renderProduct() {

    const container = document.getElementById(
        "product-container"
    );

    if (!container) return;


    /* -------------------------------
       INVALID PRODUCT
    -------------------------------- */

    if (!product) {

        container.innerHTML = `
            <div class="error-message">

                <h2>Food item not found 😕</h2>

                <p>
                    Sorry, we couldn't find the food item
                    you're looking for.
                </p>

                <a
                    href="restaurants.html"
                    class="add-cart-button"
                    style="display:inline-block;max-width:220px;text-decoration:none;"
                >
                    Browse Restaurants
                </a>

            </div>
        `;

        return;
    }


    /* -------------------------------
       PRODUCT INFORMATION
    -------------------------------- */

    const imageUrl = foodImages[product.id] || "";

    const dietaryClass =
        product.dietary === "Veg"
            ? "veg"
            : "non-veg";


    container.innerHTML = `

        <div class="product-card">

            <!-- IMAGE -->

            <div class="product-image-section">

                <div class="product-discount">
                    Fresh & Delicious
                </div>

                ${
                    imageUrl
                        ? `
                            <img
                                src="${imageUrl}"
                                alt="${product.name}"
                                class="product-image"
                                onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';"
                            >
                        `
                        : ""
                }

                <div
                    class="product-image-fallback"
                    style="${imageUrl ? "display:none;" : "display:flex;"}"
                >
                    ${product.emoji || "🍽️"}
                </div>

            </div>


            <!-- INFORMATION -->

            <div class="product-info">

                <div class="restaurant-name">
                    ${restaurant ? restaurant.name : "FreshBite Restaurant"}
                </div>

                <h1 class="product-title">
                    ${product.name}
                </h1>


                <div class="product-meta">

                    <span class="meta-tag ${dietaryClass}">
                        ${product.dietary === "Veg" ? "🌱" : "🍗"}
                        ${product.dietary}
                    </span>

                    <span class="meta-tag">
                        🍴 ${product.category}
                    </span>

                    ${
                        restaurant
                            ? `
                                <span class="meta-tag">
                                    ⭐ ${restaurant.rating}
                                </span>
                            `
                            : ""
                    }

                </div>


                <p class="product-description">
                    ${product.description}
                </p>


                <div class="product-price">
                    ₹${product.price}
                </div>


                <!-- QUANTITY -->

                <div class="quantity-section">

                    <span class="quantity-label">
                        Quantity:
                    </span>

                    <div class="quantity-control">

                        <button
                            class="quantity-button"
                            id="decrease-quantity"
                            type="button"
                        >
                            −
                        </button>

                        <span
                            class="quantity-value"
                            id="quantity-value"
                        >
                            1
                        </span>

                        <button
                            class="quantity-button"
                            id="increase-quantity"
                            type="button"
                        >
                            +
                        </button>

                    </div>

                </div>


                <!-- ACTIONS -->

                <div class="product-actions">

                    <button
                        class="add-cart-button"
                        id="add-to-cart"
                        type="button"
                    >
                        🛒 Add to Cart
                    </button>

                    <button
                        class="wishlist-button"
                        id="wishlist-button"
                        type="button"
                        title="Add to Wishlist"
                    >
                        ♡
                    </button>

                </div>


                ${
                    restaurant
                        ? `
                            <a
                                href="javascript:goToRestaurantMenu()"
                                class="restaurant-link"
                            >
                                View more food from ${restaurant.name} →
                            </a>
                        `
                        : ""
                }

            </div>

        </div>
    `;


    setupProductControls();

    updateWishlistButton();

}


/* =========================================
   PRODUCT CONTROLS
========================================= */

function setupProductControls() {

    const decreaseButton =
        document.getElementById("decrease-quantity");

    const increaseButton =
        document.getElementById("increase-quantity");

    const addToCartButton =
        document.getElementById("add-to-cart");

    const wishlistButton =
        document.getElementById("wishlist-button");


    /* -------------------------------
       DECREASE
    -------------------------------- */

    if (decreaseButton) {

        decreaseButton.addEventListener(
            "click",
            () => {

                if (quantity > 1) {

                    quantity--;

                    updateQuantityDisplay();

                }

            }
        );

    }


    /* -------------------------------
       INCREASE
    -------------------------------- */

    if (increaseButton) {

        increaseButton.addEventListener(
            "click",
            () => {

                if (quantity < 20) {

                    quantity++;

                    updateQuantityDisplay();

                }

            }
        );

    }


    /* -------------------------------
       ADD TO CART
    -------------------------------- */

    if (addToCartButton) {

        addToCartButton.addEventListener(
            "click",
            addProductToCart
        );

    }


    /* -------------------------------
       WISHLIST
    -------------------------------- */

    if (wishlistButton) {

        wishlistButton.addEventListener(
            "click",
            toggleWishlist
        );

    }

}


/* =========================================
   UPDATE QUANTITY DISPLAY
========================================= */

function updateQuantityDisplay() {

    const quantityValue =
        document.getElementById("quantity-value");

    if (quantityValue) {

        quantityValue.textContent = quantity;

    }

}


/* =========================================
   ADD PRODUCT TO CART
========================================= */

function addProductToCart() {

    if (!product) return;


    const cart = getCart();

    const existingItem = cart.find(
        item => Number(item.id) === Number(product.id)
    );


    if (existingItem) {

        existingItem.quantity =
            Number(existingItem.quantity || 0) + quantity;

    } else {

        cart.push({

            id: product.id,

            restaurantId: product.restaurantId,

            name: product.name,

            price: product.price,

            emoji: product.emoji,

            quantity: quantity

        });

    }


    saveCart(cart);

    updateCartCount();

    showToast(
        `${product.name} added to your cart 🛒`
    );


    /* Reset quantity */

    quantity = 1;

    updateQuantityDisplay();

}


/* =========================================
   CHECK IF WISHLISTED
========================================= */

function isWishlisted() {

    if (!product) return false;

    const wishlist = getWishlist();

    return wishlist.some(
        item => Number(item.id) === Number(product.id)
    );

}


/* =========================================
   UPDATE WISHLIST BUTTON
========================================= */

function updateWishlistButton() {

    const button =
        document.getElementById("wishlist-button");

    if (!button) return;


    if (isWishlisted()) {

        button.classList.add("active");

        button.textContent = "♥";

        button.title = "Remove from Wishlist";

    } else {

        button.classList.remove("active");

        button.textContent = "♡";

        button.title = "Add to Wishlist";

    }

}


/* =========================================
   TOGGLE WISHLIST
========================================= */

function toggleWishlist() {

    if (!product) return;


    const wishlist = getWishlist();

    const existingIndex = wishlist.findIndex(
        item => Number(item.id) === Number(product.id)
    );


    /* -------------------------------
       REMOVE
    -------------------------------- */

    if (existingIndex !== -1) {

        wishlist.splice(existingIndex, 1);

        saveWishlist(wishlist);

        updateWishlistButton();

        showToast(
            `${product.name} removed from Wishlist`
        );

        return;
    }


    /* -------------------------------
       ADD
    -------------------------------- */

    wishlist.push({

        id: product.id,

        restaurantId: product.restaurantId,

        name: product.name,

        description: product.description,

        price: product.price,

        category: product.category,

        dietary: product.dietary,

        emoji: product.emoji

    });


    saveWishlist(wishlist);

    updateWishlistButton();

    showToast(
        `${product.name} added to Wishlist ❤️`
    );

}


/* =========================================
   GO TO RESTAURANT MENU
========================================= */

function goToRestaurantMenu() {

    if (!restaurant) return;


    localStorage.setItem(
        "selectedRestaurant",
        JSON.stringify(restaurant)
    );


    window.location.href = "menu.html";

}


/* =========================================
   INITIALIZE
========================================= */

function initializeProductPage() {

    updateCartCount();


    const productId = getProductId();


    /* -------------------------------
       FIND PRODUCT
    -------------------------------- */

    if (
        typeof menuItems !== "undefined" &&
        Array.isArray(menuItems)
    ) {

        product = menuItems.find(
            item => Number(item.id) === productId
        );

    }


    /* -------------------------------
       FIND RESTAURANT
    -------------------------------- */

    if (
        product &&
        typeof restaurants !== "undefined" &&
        Array.isArray(restaurants)
    ) {

        restaurant = restaurants.find(
            item =>
                Number(item.id) ===
                Number(product.restaurantId)
        );

    }


    renderProduct();

}


/* =========================================
   START
========================================= */

document.addEventListener(
    "DOMContentLoaded",
    initializeProductPage
);