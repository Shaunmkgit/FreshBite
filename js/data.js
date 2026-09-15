const restaurants = [
    {
        id: 1,
        name: "Spice Garden",
        cuisine: "Indian",
        rating: 4.9,
        price: "₹₹₹",
        deliveryTime: "30-35 min",
        emoji: "🍛",
        discount: "25% OFF"
    },
    {
        id: 2,
        name: "Pizza Paradise",
        cuisine: "Italian",
        rating: 4.8,
        price: "₹₹",
        deliveryTime: "25-30 min",
        emoji: "🍕",
        discount: "20% OFF"
    },
    {
        id: 3,
        name: "Burger House",
        cuisine: "American",
        rating: 4.7,
        price: "₹₹",
        deliveryTime: "20-25 min",
        emoji: "🍔",
        discount: "15% OFF"
    },
    {
        id: 4,
        name: "Dragon Wok",
        cuisine: "Asian",
        rating: 4.6,
        price: "₹₹",
        deliveryTime: "25-30 min",
        emoji: "🍜",
        discount: "10% OFF"
    },
    {
        id: 5,
        name: "Curry Corner",
        cuisine: "Indian",
        rating: 4.5,
        price: "₹",
        deliveryTime: "20-25 min",
        emoji: "🍲",
        discount: "20% OFF"
    },
    {
        id: 6,
        name: "Bella Italia",
        cuisine: "Italian",
        rating: 4.4,
        price: "₹₹₹",
        deliveryTime: "35-40 min",
        emoji: "🍝",
        discount: "15% OFF"
    },
    {
        id: 7,
        name: "Taco Fiesta",
        cuisine: "American",
        rating: 4.3,
        price: "₹",
        deliveryTime: "20-25 min",
        emoji: "🌮",
        discount: "10% OFF"
    },
    {
        id: 8,
        name: "Sushi Station",
        cuisine: "Asian",
        rating: 4.8,
        price: "₹₹₹",
        deliveryTime: "30-35 min",
        emoji: "🍣",
        discount: "20% OFF"
    }
];

const menuItems = [
    {
        id: 101,
        restaurantId: 1,
        name: "Butter Chicken",
        description: "Creamy tomato-based chicken curry with rich Indian spices.",
        price: 299,
        category: "Main Course",
        dietary: "Non-Veg",
        emoji: "🍛"
    },
    {
        id: 102,
        restaurantId: 1,
        name: "Paneer Tikka",
        description: "Grilled cottage cheese marinated with aromatic Indian spices.",
        price: 249,
        category: "Starters",
        dietary: "Veg",
        emoji: "🧀"
    },
    {
        id: 103,
        restaurantId: 1,
        name: "Garlic Naan",
        description: "Soft Indian flatbread topped with garlic and butter.",
        price: 99,
        category: "Breads",
        dietary: "Veg",
        emoji: "🫓"
    },
    {
        id: 104,
        restaurantId: 1,
        name: "Veg Biryani",
        description: "Fragrant basmati rice cooked with vegetables and spices.",
        price: 219,
        category: "Rice",
        dietary: "Veg",
        emoji: "🍚"
    },

    {
        id: 201,
        restaurantId: 2,
        name: "Margherita Pizza",
        description: "Classic pizza with tomato, mozzarella and fresh basil.",
        price: 249,
        category: "Pizza",
        dietary: "Veg",
        emoji: "🍕"
    },
    {
        id: 202,
        restaurantId: 2,
        name: "Farmhouse Pizza",
        description: "Loaded pizza topped with fresh vegetables and cheese.",
        price: 329,
        category: "Pizza",
        dietary: "Veg",
        emoji: "🍕"
    },
    {
        id: 203,
        restaurantId: 2,
        name: "Chicken Pepperoni",
        description: "Cheesy pizza topped with chicken pepperoni and herbs.",
        price: 399,
        category: "Pizza",
        dietary: "Non-Veg",
        emoji: "🍕"
    },
    {
        id: 204,
        restaurantId: 2,
        name: "Garlic Bread",
        description: "Crispy baked bread with garlic butter and herbs.",
        price: 149,
        category: "Sides",
        dietary: "Veg",
        emoji: "🥖"
    },

    {
        id: 301,
        restaurantId: 3,
        name: "Classic Cheeseburger",
        description: "Juicy burger with melted cheese and fresh vegetables.",
        price: 249,
        category: "Burgers",
        dietary: "Non-Veg",
        emoji: "🍔"
    },
    {
        id: 302,
        restaurantId: 3,
        name: "Chicken Burger",
        description: "Crispy chicken burger with lettuce and creamy sauce.",
        price: 229,
        category: "Burgers",
        dietary: "Non-Veg",
        emoji: "🍔"
    },
    {
        id: 303,
        restaurantId: 3,
        name: "Veggie Burger",
        description: "Delicious vegetable patty with fresh salad and sauces.",
        price: 199,
        category: "Burgers",
        dietary: "Veg",
        emoji: "🍔"
    },

    {
        id: 401,
        restaurantId: 4,
        name: "Chicken Hakka Noodles",
        description: "Stir-fried noodles with chicken and Asian vegetables.",
        price: 249,
        category: "Noodles",
        dietary: "Non-Veg",
        emoji: "🍜"
    },
    {
        id: 402,
        restaurantId: 4,
        name: "Veg Manchurian",
        description: "Crispy vegetable balls in flavorful Manchurian sauce.",
        price: 199,
        category: "Starters",
        dietary: "Veg",
        emoji: "🥢"
    },
    {
        id: 403,
        restaurantId: 4,
        name: "Schezwan Fried Rice",
        description: "Spicy fried rice with vegetables and Schezwan sauce.",
        price: 219,
        category: "Rice",
        dietary: "Veg",
        emoji: "🍚"
    },

    {
        id: 501,
        restaurantId: 5,
        name: "Dal Makhani",
        description: "Slow-cooked black lentils finished with butter and cream.",
        price: 179,
        category: "Main Course",
        dietary: "Veg",
        emoji: "🍲"
    },
    {
        id: 502,
        restaurantId: 5,
        name: "Chole Bhature",
        description: "Spicy chickpea curry served with fluffy bhature.",
        price: 199,
        category: "Main Course",
        dietary: "Veg",
        emoji: "🍛"
    },
    {
        id: 503,
        restaurantId: 5,
        name: "Paneer Butter Masala",
        description: "Soft paneer cooked in rich buttery tomato gravy.",
        price: 229,
        category: "Main Course",
        dietary: "Veg",
        emoji: "🧀"
    },

    {
        id: 601,
        restaurantId: 6,
        name: "Creamy Alfredo Pasta",
        description: "Penne pasta tossed in creamy parmesan Alfredo sauce.",
        price: 329,
        category: "Pasta",
        dietary: "Veg",
        emoji: "🍝"
    },
    {
        id: 602,
        restaurantId: 6,
        name: "Chicken Pasta",
        description: "Creamy Italian pasta with tender grilled chicken.",
        price: 379,
        category: "Pasta",
        dietary: "Non-Veg",
        emoji: "🍝"
    },

    {
        id: 701,
        restaurantId: 7,
        name: "Chicken Tacos",
        description: "Soft tacos filled with seasoned chicken and salsa.",
        price: 229,
        category: "Tacos",
        dietary: "Non-Veg",
        emoji: "🌮"
    },
    {
        id: 702,
        restaurantId: 7,
        name: "Veggie Tacos",
        description: "Fresh tacos filled with vegetables and beans.",
        price: 199,
        category: "Tacos",
        dietary: "Veg",
        emoji: "🌮"
    },

    {
        id: 801,
        restaurantId: 8,
        name: "Salmon Sushi",
        description: "Fresh salmon sushi rolls prepared with seasoned rice.",
        price: 449,
        category: "Sushi",
        dietary: "Non-Veg",
        emoji: "🍣"
    },
    {
        id: 802,
        restaurantId: 8,
        name: "Vegetable Sushi",
        description: "Fresh sushi rolls packed with crisp vegetables.",
        price: 349,
        category: "Sushi",
        dietary: "Veg",
        emoji: "🍣"
    }
];