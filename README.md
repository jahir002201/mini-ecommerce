# Mini E-Commerce

A modern full-stack mini e-commerce application built with **Laravel, React, Inertia.js, MySQL, and Tailwind CSS**. It includes separate **customer and admin authentication**, product management, cart, wishlist, inventory, order management, and **SSLCommerz payment integration**.

## Tech Stack

* **Backend:** Laravel
* **Frontend:** React
* **SPA Bridge:** Inertia.js
* **Database:** MySQL
* **Styling:** Tailwind CSS
* **Authentication:** Laravel Authentication
* **Payment:** SSLCommerz
* **Build Tool:** Vite

## Features

* Customer registration and login
* Admin authentication
* Customer account management
* Product and category management
* Product images and thumbnails
* Shopping cart and wishlist
* Inventory management
* Order management
* **SSLCommerz payment gateway**
* Responsive design
* Reusable React layouts and components
* Scalable e-commerce structure

## Installation

```bash
git clone https://github.com/jahir002201/mini-ecommerce.git
cd mini-ecommerce

composer install
npm install

cp .env.example .env
php artisan key:generate
```

Configure your **MySQL database** and **SSLCommerz credentials** in `.env`, then run:

```bash
php artisan migrate
```

## Run the Project

```bash
composer run dev
```

The application will be available at:

```text
http://localhost:8000
```

## Project Structure

```text
app/
├── Http/
│   └── Controllers/
├── Models/

resources/
└── js/
    ├── Layouts/
    └── Pages/

database/
├── migrations/
└── seeders/

routes/
└── web.php
```

## Future Improvements

* Product reviews and ratings
* Coupon system
* Order tracking
* Advanced product filtering
* Customer profile management
* Admin dashboard analytics
* Additional payment gateway integrations

## License

This project is created for **learning and development purposes**.
