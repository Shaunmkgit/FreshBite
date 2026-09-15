// ========================================
// FRESHBITE AUTHENTICATION
// ========================================

const USERS_KEY = "freshBiteUsers";
const CURRENT_USER_KEY = "freshBiteCurrentUser";


// ========================================
// GET USERS
// ========================================

function getUsers() {
    return JSON.parse(localStorage.getItem(USERS_KEY)) || [];
}


// ========================================
// SAVE USERS
// ========================================

function saveUsers(users) {
    localStorage.setItem(USERS_KEY, JSON.stringify(users));
}


// ========================================
// UPDATE CART COUNT
// ========================================

function updateAuthCartCount() {
    const cartCount = document.getElementById("cart-count");

    if (!cartCount) return;

    const cart = JSON.parse(
        localStorage.getItem("freshBiteCart")
    ) || [];

    const totalQuantity = cart.reduce(
        (total, item) => total + item.quantity,
        0
    );

    cartCount.textContent = totalQuantity;
}


// ========================================
// REGISTER
// ========================================

const registerForm = document.getElementById("register-form");

if (registerForm) {

    registerForm.addEventListener("submit", function(event) {

        event.preventDefault();

        const name = document
            .getElementById("register-name")
            .value
            .trim();

        const email = document
            .getElementById("register-email")
            .value
            .trim()
            .toLowerCase();

        const phone = document
            .getElementById("register-phone")
            .value
            .trim();

        const password = document
            .getElementById("register-password")
            .value;

        const confirmPassword = document
            .getElementById("register-confirm-password")
            .value;

        const message = document.getElementById(
            "register-message"
        );


        // Check password match

        if (password !== confirmPassword) {

            message.textContent =
                "Passwords do not match.";

            message.className =
                "auth-message error";

            return;
        }


        // Check password length

        if (password.length < 6) {

            message.textContent =
                "Password must contain at least 6 characters.";

            message.className =
                "auth-message error";

            return;
        }


        const users = getUsers();


        // Check existing email

        const existingUser = users.find(
            user => user.email === email
        );

        if (existingUser) {

            message.textContent =
                "An account with this email already exists.";

            message.className =
                "auth-message error";

            return;
        }


        // Create user

        const newUser = {
            id: Date.now(),
            name: name,
            email: email,
            phone: phone,
            password: password
        };


        users.push(newUser);

        saveUsers(users);


        message.textContent =
            "Account created successfully! Redirecting to login...";

        message.className =
            "auth-message success";


        registerForm.reset();


        setTimeout(function() {

            window.location.href = "login.html";

        }, 1200);

    });
}


// ========================================
// LOGIN
// ========================================

const loginForm = document.getElementById("login-form");

if (loginForm) {

    loginForm.addEventListener("submit", function(event) {

        event.preventDefault();

        const email = document
            .getElementById("login-email")
            .value
            .trim()
            .toLowerCase();

        const password = document
            .getElementById("login-password")
            .value;

        const message = document.getElementById(
            "login-message"
        );


        const users = getUsers();


        const user = users.find(
            user =>
                user.email === email &&
                user.password === password
        );


        if (!user) {

            message.textContent =
                "Invalid email or password.";

            message.className =
                "auth-message error";

            return;
        }


        // Store logged-in user

        const currentUser = {
            id: user.id,
            name: user.name,
            email: user.email,
            phone: user.phone
        };

        localStorage.setItem(
            CURRENT_USER_KEY,
            JSON.stringify(currentUser)
        );


        message.textContent =
            "Login successful! Redirecting...";

        message.className =
            "auth-message success";


        setTimeout(function() {

            window.location.href = "account.html";

        }, 800);

    });
}


// ========================================
// CART COUNT
// ========================================

updateAuthCartCount();