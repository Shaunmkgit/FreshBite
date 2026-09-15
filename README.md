# 🍽️ FreshBite

FreshBite is a responsive frontend food delivery website that allows users to discover restaurants, browse menus, add food to a shopping cart, apply coupons, place simulated orders, manage a wishlist, and track orders.

This project was created using HTML5, CSS3, and JavaScript.

---

## 🌐 Live Demo

Add your deployed website link here after deployment:

**Live Website:** ` https://shaunmkgit.github.io/FreshBite/ `

---

## 📌 Project Overview

FreshBite provides a simple and user-friendly food ordering experience.

Users can:

- Browse restaurants
- Search for restaurants
- Filter restaurants by cuisine
- Sort restaurants
- View restaurant menus
- Filter food by dietary preference
- View individual food details
- Add food to the cart
- Change item quantities
- Remove items from the cart
- Apply discount coupons
- Add food to a wishlist
- Complete a simulated checkout
- Track a simulated order
- Learn more about FreshBite
- Submit a contact form

The project is frontend-only and uses browser `localStorage` instead of a backend database.

---

## ✨ Features

### 🏠 Home Page

- FreshBite branding
- Hero section
- Restaurant discovery
- Search functionality
- Cuisine filters
- Responsive navigation

### 🍴 Restaurant Listing

- Restaurant cards
- Cuisine information
- Ratings
- Price range
- Estimated delivery time
- Restaurant discounts
- Search
- Cuisine filtering
- Sorting

### 📋 Restaurant Menu

- Restaurant information
- Food categories
- Dietary information
- Food descriptions
- Food prices
- Add to cart
- Add to wishlist

### 🍕 Product Details

Each food item has its own detail page containing:

- Food image
- Name
- Description
- Price
- Restaurant
- Category
- Dietary information
- Quantity selector
- Add to cart
- Wishlist option

### 🛒 Shopping Cart

- Add and remove products
- Increase/decrease quantity
- Subtotal calculation
- Delivery fee
- Automatic discount
- Final total
- Checkout navigation

### 💳 Checkout

Users can enter:

- Name
- Phone number
- House/address
- Street
- City
- State
- PIN code
- Delivery time
- Payment method

Supported simulated payment methods:

- Cash on Delivery
- UPI
- Credit/Debit Card

### 🎟️ Coupons

Available coupon codes:

| Coupon | Discount | Minimum Order |
|---|---:|---:|
| `WELCOME10` | 10% off | ₹300 |
| `FRESH20` | ₹20 off | ₹200 |

### ❤️ Wishlist

Users can:

- Add food items to wishlist
- View saved items
- Remove items
- Add wishlist items to cart
- Open product details

### 📦 Order Tracking

Orders can be simulated through four stages:

```text
Order Confirmed
       ↓
Preparing
       ↓
Out for Delivery
       ↓
Delivered