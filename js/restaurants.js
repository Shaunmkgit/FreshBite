const SELECTED_RESTAURANT_KEY = "selectedRestaurant";
const CART_KEY = "freshBiteCart";

const restaurantsGrid = document.getElementById("restaurants-grid");
const searchInput = document.getElementById("restaurant-search");
const sortSelect = document.getElementById("restaurant-sort");
const filterButtons = document.querySelectorAll(".restaurant-filter");
const cartCount = document.getElementById("cart-count");

let selectedCuisine = "all";

const restaurantImages = {
    1: "https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?auto=format&fit=crop&w=800&q=80",
    2: "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?auto=format&fit=crop&w=800&q=80",
    3: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=800&q=80",
    4: "https://images.unsplash.com/photo-1552611052-33e04de081de?auto=format&fit=crop&w=800&q=80",
    5: "https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=800&q=80",
    6: "https://images.unsplash.com/photo-1473093295043-cdd812d0e601?auto=format&fit=crop&w=800&q=80",
    7: "https://images.unsplash.com/photo-1552332386-f8dd00dc2f85?auto=format&fit=crop&w=800&q=80",
    8: "https://images.unsplash.com/photo-1579871494447-9811cf80d66c?auto=format&fit=crop&w=800&q=80"
};

function updateCartCount() {

    const cart = JSON.parse(
        localStorage.getItem(CART_KEY)
    ) || [];

    const count = cart.reduce(
        (total, item) => total + Number(item.quantity || 0),
        0
    );

    if (cartCount) {
        cartCount.textContent = count;
    }
}

function renderRestaurants() {

    let list = [...restaurants];

    const search = searchInput.value
        .trim()
        .toLowerCase();

    if (selectedCuisine !== "all") {

        list = list.filter(item =>
            item.cuisine.toLowerCase() ===
            selectedCuisine.toLowerCase()
        );
    }

    if (search) {

        list = list.filter(item =>
            item.name.toLowerCase().includes(search) ||
            item.cuisine.toLowerCase().includes(search)
        );
    }

    if (sortSelect.value === "rating") {

        list.sort((a, b) =>
            b.rating - a.rating
        );
    }

    if (sortSelect.value === "delivery") {

        list.sort((a, b) =>
            parseInt(a.deliveryTime) -
            parseInt(b.deliveryTime)
        );
    }

    if (sortSelect.value === "price-low") {

        list.sort((a, b) =>
            a.price.length - b.price.length
        );
    }

    if (sortSelect.value === "price-high") {

        list.sort((a, b) =>
            b.price.length - a.price.length
        );
    }

    if (list.length === 0) {

        restaurantsGrid.innerHTML = `
            <p>No restaurants found.</p>
        `;

        return;
    }

    restaurantsGrid.innerHTML = list.map(restaurant => {

        return `
            <article class="restaurant-card">

                <img
                    class="restaurant-card-image"
                    src="${restaurantImages[restaurant.id]}"
                    alt="${restaurant.name}"
                >

                <div class="restaurant-card-body">

                    <div class="restaurant-offer">
                        ${restaurant.discount}
                    </div>

                    <h3>
                        ${restaurant.emoji}
                        ${restaurant.name}
                    </h3>

                    <div class="restaurant-cuisine">
                        ${restaurant.cuisine}
                    </div>

                    <div class="restaurant-meta">
                        <span>⭐ ${restaurant.rating}</span>
                        <span>🕐 ${restaurant.deliveryTime}</span>
                        <span>${restaurant.price}</span>
                    </div>

                    <button
                        class="view-menu-btn"
                        data-restaurant-id="${restaurant.id}"
                    >
                        View Menu
                    </button>

                </div>

            </article>
        `;

    }).join("");
}

filterButtons.forEach(button => {

    button.addEventListener("click", () => {

        filterButtons.forEach(item =>
            item.classList.remove("active")
        );

        button.classList.add("active");

        selectedCuisine =
            button.dataset.cuisine;

        renderRestaurants();
    });
});

searchInput.addEventListener(
    "input",
    renderRestaurants
);

sortSelect.addEventListener(
    "change",
    renderRestaurants
);

restaurantsGrid.addEventListener(
    "click",
    event => {

        const button =
            event.target.closest(".view-menu-btn");

        if (!button) return;

        const restaurantId =
            Number(button.dataset.restaurantId);

        const restaurant =
            restaurants.find(item =>
                Number(item.id) === restaurantId
            );

        if (!restaurant) return;

        localStorage.setItem(
            SELECTED_RESTAURANT_KEY,
            JSON.stringify(restaurant)
        );

        window.location.href = "menu.html";
    }
);

updateCartCount();
renderRestaurants();