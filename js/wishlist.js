const WISHLIST_KEY = "freshBiteWishlist";
const CART_KEY = "freshBiteCart";


// ==========================================
// FOOD IMAGES
// ==========================================

const wishlistFoodImages = {

    101: "https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?auto=format&fit=crop&w=900&q=80",

    102: "https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?auto=format&fit=crop&w=900&q=80",

    103: "https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?auto=format&fit=crop&w=900&q=80",

    104: "https://images.unsplash.com/photo-1589302168068-964664d93dc0?auto=format&fit=crop&w=900&q=80",

    201: "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?auto=format&fit=crop&w=900&q=80",

    202: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&w=900&q=80",

    203: "https://images.unsplash.com/photo-1579751626657-72bc17010498?auto=format&fit=crop&w=900&q=80",

    204: "https://images.unsplash.com/photo-1573140247632-f8fd74997d5c?auto=format&fit=crop&w=900&q=80",

    301: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=900&q=80",

    302: "https://images.unsplash.com/photo-1606755962773-d324e0a13086?auto=format&fit=crop&w=900&q=80",

    303: "https://images.unsplash.com/photo-1520072959219-c595dc870360?auto=format&fit=crop&w=900&q=80",

    401: "https://images.unsplash.com/photo-1552611052-33e04de081de?auto=format&fit=crop&w=900&q=80",

    402: "https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=900&q=80",

    403: "https://images.unsplash.com/photo-1603133872878-684f208fb84b?auto=format&fit=crop&w=900&q=80",

    501: "https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=900&q=80",

    502: "https://images.unsplash.com/photo-1626132647523-66f5bf380027?auto=format&fit=crop&w=900&q=80",

    503: "https://images.unsplash.com/photo-1601050690117-94f5f6fa8bd7?auto=format&fit=crop&w=900&q=80",

    601: "https://images.unsplash.com/photo-1473093295043-cdd812d0e601?auto=format&fit=crop&w=900&q=80",

    602: "https://images.unsplash.com/photo-1551892374-ecf8754cf8b0?auto=format&fit=crop&w=900&q=80",

    701: "https://images.unsplash.com/photo-1551504734-5ee1c4a1479b?auto=format&fit=crop&w=900&q=80",

    702: "https://images.unsplash.com/photo-1565299585323-38d6b0865b47?auto=format&fit=crop&w=900&q=80",

    801: "https://images.unsplash.com/photo-1579871494447-9811cf80d66c?auto=format&fit=crop&w=900&q=80",

    802: "https://images.unsplash.com/photo-1553621042-f6e147245754?auto=format&fit=crop&w=900&q=80"
};


// ==========================================
// LOAD WISHLIST
// ==========================================

let wishlist = [];


// ==========================================
// PAGE START
// ==========================================

document.addEventListener("DOMContentLoaded", function () {

    loadWishlist();

    updateCartCount();

    renderWishlist();

});


// ==========================================
// LOAD SAVED WISHLIST
// ==========================================

function loadWishlist() {

    try {

        const saved =
            JSON.parse(
                localStorage.getItem(WISHLIST_KEY)
            );

        wishlist =
            Array.isArray(saved)
                ? saved
                : [];

    } catch (error) {

        wishlist = [];

    }

}


// ==========================================
// SAVE WISHLIST
// ==========================================

function saveWishlist() {

    localStorage.setItem(
        WISHLIST_KEY,
        JSON.stringify(wishlist)
    );

}


// ==========================================
// NORMALIZE WISHLIST ITEMS
// ==========================================
//
// This is the important fix.
//
// It supports:
//
// 1. Full food objects
// 2. Objects containing only an id
// 3. String IDs
// 4. Number IDs
//
// Then it matches them against menuItems from data.js.
//

function getWishlistItems() {

    if (
        !Array.isArray(wishlist) ||
        !Array.isArray(menuItems)
    ) {

        return [];

    }


    const result = [];


    wishlist.forEach(function (savedItem) {

        let itemId = null;


        // If wishlist contains:
        // { id: 101 }

        if (
            savedItem &&
            typeof savedItem === "object" &&
            savedItem.id !== undefined
        ) {

            itemId = Number(savedItem.id);

        }


        // If wishlist contains:
        // 101

        else if (
            typeof savedItem === "number" ||
            typeof savedItem === "string"
        ) {

            itemId = Number(savedItem);

        }


        if (!itemId || Number.isNaN(itemId)) {
            return;
        }


        // Find the real item in data.js

        const realItem =
            menuItems.find(function (item) {

                return Number(item.id) === itemId;

            });


        if (!realItem) {
            return;
        }


        // Find restaurant

        const restaurant =
            restaurants.find(function (restaurant) {

                return Number(restaurant.id) ===
                    Number(realItem.restaurantId);

            });


        result.push({

            ...realItem,

            restaurantName:
                restaurant
                    ? restaurant.name
                    : "FreshBite",

            restaurantCuisine:
                restaurant
                    ? restaurant.cuisine
                    : "",

            restaurantRating:
                restaurant
                    ? restaurant.rating
                    : ""

        });

    });


    return result;

}


// ==========================================
// RENDER WISHLIST
// ==========================================

function renderWishlist() {

    const container =
        document.getElementById(
            "wishlist-container"
        );


    if (!container) {
        return;
    }


    const items =
        getWishlistItems();


    // No items

    if (items.length === 0) {

        container.innerHTML = `

            <div class="empty-wishlist">

                <div class="empty-icon">
                    ❤️
                </div>

                <h2>
                    Your wishlist is empty
                </h2>

                <p>
                    Save your favorite dishes here
                    and find them easily later.
                </p>

                <a
                    href="restaurants.html"
                    class="browse-button"
                >
                    Browse Restaurants
                </a>

            </div>

        `;

        return;
    }


    // Render cards

    let html = `

        <div class="wishlist-grid">

    `;


    items.forEach(function (item) {

        html += createWishlistCard(item);

    });


    html += `

        </div>

    `;


    container.innerHTML = html;


    // Add remove button listeners

    document
        .querySelectorAll(".remove-button")
        .forEach(function (button) {

            button.addEventListener(
                "click",
                function () {

                    const id =
                        Number(
                            this.dataset.id
                        );

                    removeFromWishlist(id);

                }
            );

        });


    // Add cart button listeners

    document
        .querySelectorAll(".cart-button")
        .forEach(function (button) {

            button.addEventListener(
                "click",
                function () {

                    const id =
                        Number(
                            this.dataset.id
                        );

                    addToCart(id);

                }
            );

        });

}


// ==========================================
// CREATE WISHLIST CARD
// ==========================================

function createWishlistCard(item) {

    const image =
        wishlistFoodImages[item.id];


    const restaurantName =
        item.restaurantName ||
        "FreshBite";


    const description =
        item.description ||
        "Delicious food from FreshBite.";


    const dietary =
        item.dietary ||
        "Food";


    const category =
        item.category ||
        "Menu";


    const emoji =
        item.emoji ||
        "🍽️";


    const imageHTML = image

        ? `

            <img
                src="${image}"
                alt="${escapeHTML(item.name)}"
                onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';"
            >

            <div
                class="emoji-fallback"
                style="display:none;"
            >
                ${emoji}
            </div>

        `

        : `

            <div class="emoji-fallback">
                ${emoji}
            </div>

        `;


    return `

        <article class="wishlist-card">

            <div class="food-image">

                ${imageHTML}

                <button
                    class="remove-button"
                    data-id="${item.id}"
                    title="Remove from wishlist"
                    aria-label="Remove ${escapeHTML(item.name)} from wishlist"
                >
                    ♥
                </button>

            </div>


            <div class="wishlist-content">

                <div class="restaurant-name">
                    ${escapeHTML(restaurantName)}
                </div>


                <h2>
                    ${escapeHTML(item.name)}
                </h2>


                <p class="description">
                    ${escapeHTML(description)}
                </p>


                <div class="food-meta">

                    <span class="tag">
                        ${escapeHTML(dietary)}
                    </span>

                    <span class="tag">
                        ${escapeHTML(category)}
                    </span>

                    ${
                        item.restaurantRating
                            ? `
                                <span class="tag">
                                    ⭐ ${item.restaurantRating}
                                </span>
                            `
                            : ""
                    }

                </div>


                <div class="price">
                    ₹${Number(item.price || 0)}
                </div>


                <div class="card-actions">

                    <a
                        href="product.html?id=${item.id}"
                        class="details-button"
                    >
                        View Details
                    </a>


                    <button
                        type="button"
                        class="cart-button"
                        data-id="${item.id}"
                    >
                        Add to Cart
                    </button>

                </div>

            </div>

        </article>

    `;

}


// ==========================================
// REMOVE FROM WISHLIST
// ==========================================

function removeFromWishlist(id) {

    id = Number(id);


    wishlist =
        wishlist.filter(function (item) {

            let itemId;


            if (
                item &&
                typeof item === "object"
            ) {

                itemId =
                    Number(item.id);

            } else {

                itemId =
                    Number(item);

            }


            return itemId !== id;

        });


    saveWishlist();

    renderWishlist();


    showToast(
        "Removed from wishlist ❤️"
    );

}


// ==========================================
// ADD TO CART
// ==========================================

function addToCart(id) {

    id = Number(id);


    const item =
        menuItems.find(function (menuItem) {

            return Number(menuItem.id) === id;

        });


    if (!item) {

        showToast(
            "Food item could not be found."
        );

        return;
    }


    let cart = [];


    try {

        cart =
            JSON.parse(
                localStorage.getItem(CART_KEY)
            ) || [];

    } catch (error) {

        cart = [];

    }


    if (!Array.isArray(cart)) {
        cart = [];
    }


    const existingItem =
        cart.find(function (cartItem) {

            return Number(cartItem.id) === id;

        });


    if (existingItem) {

        existingItem.quantity =
            Number(existingItem.quantity || 0) + 1;

    } else {

        cart.push({

            id: item.id,

            restaurantId:
                item.restaurantId,

            name:
                item.name,

            price:
                Number(item.price),

            emoji:
                item.emoji || "🍽️",

            quantity: 1

        });

    }


    localStorage.setItem(
        CART_KEY,
        JSON.stringify(cart)
    );


    updateCartCount();


    showToast(
        `${item.name} added to cart 🛒`
    );

}


// ==========================================
// CART COUNT
// ==========================================

function updateCartCount() {

    const countElement =
        document.getElementById(
            "cart-count"
        );


    if (!countElement) {
        return;
    }


    let cart = [];


    try {

        cart =
            JSON.parse(
                localStorage.getItem(CART_KEY)
            ) || [];

    } catch (error) {

        cart = [];

    }


    if (!Array.isArray(cart)) {
        cart = [];
    }


    const count =
        cart.reduce(
            function (total, item) {

                return total +
                    Number(item.quantity || 0);

            },
            0
        );


    countElement.textContent =
        count;

}


// ==========================================
// TOAST
// ==========================================

function showToast(message) {

    const toast =
        document.getElementById("toast");


    if (!toast) {
        return;
    }


    toast.textContent =
        message;


    toast.classList.add("show");


    setTimeout(function () {

        toast.classList.remove("show");

    }, 2200);

}


// ==========================================
// ESCAPE HTML
// ==========================================

function escapeHTML(value) {

    return String(value)

        .replace(/&/g, "&amp;")

        .replace(/</g, "&lt;")

        .replace(/>/g, "&gt;")

        .replace(/"/g, "&quot;")

        .replace(/'/g, "&#039;");

}