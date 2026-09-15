const SELECTED_RESTAURANT_KEY = "selectedRestaurant";
const CART_KEY = "freshBiteCart";
const WISHLIST_KEY = "freshBiteWishlist";

const restaurantInfo =
    document.getElementById("restaurant-info");

const menuItemsContainer =
    document.getElementById("menu-items");

const dietaryButtons =
    document.querySelectorAll(".dietary-filter");

const cartCount =
    document.getElementById("cart-count");

let selectedDietary = "all";


const restaurantImages = {
    1: "https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?auto=format&fit=crop&w=1000&q=80",
    2: "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?auto=format&fit=crop&w=1000&q=80",
    3: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=1000&q=80",
    4: "https://images.unsplash.com/photo-1552611052-33e04de081de?auto=format&fit=crop&w=1000&q=80",
    5: "https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=1000&q=80",
    6: "https://images.unsplash.com/photo-1473093295043-cdd812d0e601?auto=format&fit=crop&w=1000&q=80",
    7: "https://images.unsplash.com/photo-1552332386-f8dd00dc2f85?auto=format&fit=crop&w=1000&q=80",
    8: "https://images.unsplash.com/photo-1579871494447-9811cf80d66c?auto=format&fit=crop&w=1000&q=80"
};


const foodImages = {
    101: "https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?auto=format&fit=crop&w=800&q=80",
    102: "https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?auto=format&fit=crop&w=800&q=80",
    103: "https://images.unsplash.com/photo-1601050690117-94f5f6fa8bd7?auto=format&fit=crop&w=800&q=80",
    104: "https://images.unsplash.com/photo-1563379091339-03246963d96c?auto=format&fit=crop&w=800&q=80",
    201: "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?auto=format&fit=crop&w=800&q=80",
    202: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&w=800&q=80",
    203: "https://images.unsplash.com/photo-1628840042765-356cda07504e?auto=format&fit=crop&w=800&q=80",
    204: "https://images.unsplash.com/photo-1619535860434-cf9b902a6e4b?auto=format&fit=crop&w=800&q=80",
    301: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=800&q=80",
    302: "https://images.unsplash.com/photo-1606755962773-d324e0a13086?auto=format&fit=crop&w=800&q=80",
    303: "https://images.unsplash.com/photo-1520072959219-c595dc870360?auto=format&fit=crop&w=800&q=80",
    401: "https://images.unsplash.com/photo-1552611052-33e04de081de?auto=format&fit=crop&w=800&q=80",
    402: "https://images.unsplash.com/photo-1625398407796-82650a8c135f?auto=format&fit=crop&w=800&q=80",
    403: "https://images.unsplash.com/photo-1603133872878-684f208fb84b?auto=format&fit=crop&w=800&q=80",
    501: "https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=800&q=80",
    502: "https://images.unsplash.com/photo-1626132647523-66f5bf380027?auto=format&fit=crop&w=800&q=80",
    503: "https://images.unsplash.com/photo-1631452180519-c014fe946bc7?auto=format&fit=crop&w=800&q=80",
    601: "https://images.unsplash.com/photo-1473093295043-cdd812d0e601?auto=format&fit=crop&w=800&q=80",
    602: "https://images.unsplash.com/photo-1555949258-eb67b1ef0ceb?auto=format&fit=crop&w=800&q=80",
    701: "https://images.unsplash.com/photo-1552332386-f8dd00dc2f85?auto=format&fit=crop&w=800&q=80",
    702: "https://images.unsplash.com/photo-1551504734-5ee1c4a1479b?auto=format&fit=crop&w=800&q=80",
    801: "https://images.unsplash.com/photo-1579871494447-9811cf80d66c?auto=format&fit=crop&w=800&q=80",
    802: "https://images.unsplash.com/photo-1611143669185-af224c5e3252?auto=format&fit=crop&w=800&q=80"
};


function getSelectedRestaurant() {

    try {

        const saved = JSON.parse(
            localStorage.getItem(SELECTED_RESTAURANT_KEY)
        );

        if (!saved) {
            return null;
        }

        return restaurants.find(item =>
            Number(item.id) === Number(saved.id)
        ) || saved;

    } catch (error) {

        return null;
    }
}


function getCart() {

    try {
        return JSON.parse(
            localStorage.getItem(CART_KEY)
        ) || [];
    } catch (error) {
        return [];
    }
}


function getWishlist() {

    try {
        return JSON.parse(
            localStorage.getItem(WISHLIST_KEY)
        ) || [];
    } catch (error) {
        return [];
    }
}


function updateCartCount() {

    const cart = getCart();

    const count = cart.reduce(
        (total, item) =>
            total + Number(item.quantity || 0),
        0
    );

    if (cartCount) {
        cartCount.textContent = count;
    }
}


function renderRestaurant() {

    const restaurant =
        getSelectedRestaurant();

    if (!restaurant) {

        restaurantInfo.innerHTML = `
            <div class="restaurant-info-content">
                <h1>Restaurant not found</h1>
                <p>Please choose a restaurant first.</p>
                <a href="restaurants.html">
                    Browse Restaurants
                </a>
            </div>
        `;

        return null;
    }

    const image =
        restaurantImages[restaurant.id];

    restaurantInfo.innerHTML = `

        <img
            class="restaurant-info-image"
            src="${image}"
            alt="${restaurant.name}"
        >

        <div class="restaurant-info-content">

            <h1>
                ${restaurant.emoji}
                ${restaurant.name}
            </h1>

            <p>
                ${restaurant.cuisine}
                · ⭐ ${restaurant.rating}
                · ${restaurant.price}
            </p>

            <p>
                🕐 ${restaurant.deliveryTime}
                · ${restaurant.discount}
            </p>

        </div>
    `;

    return restaurant;
}


function renderMenu() {

    const restaurant =
        getSelectedRestaurant();

    if (!restaurant) {
        return;
    }

    let items = menuItems.filter(item =>
        Number(item.restaurantId) ===
        Number(restaurant.id)
    );

    if (selectedDietary !== "all") {

        items = items.filter(item =>
            String(item.dietary).toLowerCase() ===
            selectedDietary.toLowerCase()
        );
    }

    const wishlist = getWishlist();

    menuItemsContainer.innerHTML =
        items.map(item => {

            const liked = wishlist.some(saved =>
                Number(saved.id) === Number(item.id)
            );

            return `

                <article class="menu-card">

                    <div class="menu-image-wrapper">

                        <img
                            class="menu-card-image"
                            src="${foodImages[item.id]}"
                            alt="${item.name}"
                        >

                        <span class="menu-dietary">
                            ${item.dietary === "Veg"
                                ? "🥬 VEG"
                                : "🍗 NON-VEG"}
                        </span>

                        <button
                            class="wishlist-menu-btn"
                            data-item-id="${item.id}"
                        >
                            ${liked ? "❤️" : "♡"}
                        </button>

                    </div>

                    <div class="menu-card-body">

                        <div class="menu-category">
                            ${item.category}
                        </div>

                        <h3>${item.name}</h3>

                        <p class="menu-description">
                            ${item.description}
                        </p>

                        <div class="menu-bottom">

                            <span class="menu-price">
                                ₹${item.price}
                            </span>

                            <div class="menu-buttons">

                                <a
                                    href="product.html?id=${item.id}"
                                    class="details-btn"
                                >
                                    Details
                                </a>

                                <button
                                    class="add-cart-btn"
                                    data-item-id="${item.id}"
                                >
                                    Add +
                                </button>

                            </div>

                        </div>

                    </div>

                </article>
            `;

        }).join("");
}


function addToCart(itemId) {

    const item = menuItems.find(food =>
        Number(food.id) === Number(itemId)
    );

    if (!item) return;

    const cart = getCart();

    const existing = cart.find(cartItem =>
        Number(cartItem.id) === Number(item.id)
    );

    if (existing) {

        existing.quantity =
            Number(existing.quantity || 0) + 1;

    } else {

        cart.push({
            id: Number(item.id),
            name: item.name,
            price: Number(item.price),
            emoji: item.emoji || "🍽️",
            restaurantId: Number(item.restaurantId),
            quantity: 1
        });
    }

    localStorage.setItem(
        CART_KEY,
        JSON.stringify(cart)
    );

    updateCartCount();
}


function toggleWishlist(itemId) {

    const item = menuItems.find(food =>
        Number(food.id) === Number(itemId)
    );

    if (!item) return;

    let wishlist = getWishlist();

    const index = wishlist.findIndex(saved =>
        Number(saved.id) === Number(item.id)
    );

    if (index >= 0) {

        wishlist.splice(index, 1);

    } else {

        wishlist.push({
            id: Number(item.id),
            name: item.name,
            price: Number(item.price),
            emoji: item.emoji || "🍽️",
            restaurantId: Number(item.restaurantId),
            description: item.description || "",
            category: item.category || "",
            dietary: item.dietary || ""
        });
    }

    localStorage.setItem(
        WISHLIST_KEY,
        JSON.stringify(wishlist)
    );

    renderMenu();
}


menuItemsContainer.addEventListener(
    "click",
    event => {

        const cartButton =
            event.target.closest(".add-cart-btn");

        const wishlistButton =
            event.target.closest(".wishlist-menu-btn");

        if (cartButton) {

            addToCart(
                Number(cartButton.dataset.itemId)
            );
        }

        if (wishlistButton) {

            toggleWishlist(
                Number(wishlistButton.dataset.itemId)
            );
        }
    }
);


dietaryButtons.forEach(button => {

    button.addEventListener("click", () => {

        dietaryButtons.forEach(item =>
            item.classList.remove("active")
        );

        button.classList.add("active");

        selectedDietary =
            button.dataset.dietary || "all";

        renderMenu();
    });
});


renderRestaurant();
renderMenu();
updateCartCount();