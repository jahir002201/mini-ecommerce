<?php

use App\Http\Controllers\Admin\Auth\AdminAuthenticatedSessionController;
use App\Http\Controllers\Admin\DashboardController;
use Illuminate\Support\Facades\Route;

use App\Http\Controllers\Customer\AccountController;
use App\Http\Controllers\Customer\Auth\CustomerAuthenticatedSessionController;
use App\Http\Controllers\Customer\Auth\CustomerRegisteredUserController;
use App\Http\Controllers\Customer\CustomerPasswordController;
use App\Http\Controllers\Customer\CustomerProfileController;

use App\Http\Controllers\HomeController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\SubcategoryController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\InventoryController;
use App\Http\Controllers\CustomerController;
use App\Http\Controllers\CouponController;
use App\Http\Controllers\OrderController;
use App\Http\Controllers\ShopController;

// Home
Route::get('/', [
    HomeController::class,
    'index',
])->name('home');

// About and Contact
Route::get('/about', function () {
    return inertia('About');
})->name('about');

Route::get('/contact', function () {
    return inertia('Contact');
})->name('contact');

// Shop
Route::get('/shop', [ ShopController::class, 'index', ])->name('shop.index'); 
Route::get('/shop/{product:slug}', [ ShopController::class, 'show', ])->name('shop.show');

Route::prefix('admin')->name('admin.')->group(function () {


    // Guest Admin Routes


    Route::middleware('guest:web')->group(function () {

        Route::get('/login', [
            AdminAuthenticatedSessionController::class,
            'create',
        ])->name('login');

        Route::post('/login', [
            AdminAuthenticatedSessionController::class,
            'store',
        ])->name('login.store');
    });

    // Authenticated Admin Routes

    Route::middleware('auth:web')->group(function () {

        Route::get('/dashboard', [
            DashboardController::class,
            'index',
        ])->name('dashboard');

        // Category
        Route::resource('categories', CategoryController::class)
            ->except(['show']);
        
        // SubCategory
        Route::resource('subcategories', SubcategoryController::class)
            ->except(['show']);

        // Product    
        Route::resource('products', ProductController::class)
            ->except(['show']);

        // Inventory
        Route::resource('inventories', InventoryController::class)
            ->except(['show']);

        // Orders
        Route::resource('orders', OrderController::class)
            ->except(['show']);
        
        // Coupon
        Route::resource('coupons', CouponController::class)
            ->except(['show']);

        // Customer
        Route::resource('customers', CustomerController::class)
            ->except(['show']);

        // Logout
        Route::post('/logout', [
            AdminAuthenticatedSessionController::class,
            'destroy',
        ])->name('logout');
    });
});


// Customer Authentication

Route::prefix('customer')->name('customer.')->group(function () {

    // Guest Customer Routes

    Route::middleware('guest:customer')->group(function () {

        // Registration
        Route::get('/register', [
            CustomerRegisteredUserController::class,
            'create',
        ])->name('register');

        Route::post('/register', [
            CustomerRegisteredUserController::class,
            'store',
        ])->name('register.store');

        // Login
        Route::get('/login', [
            CustomerAuthenticatedSessionController::class,
            'create',
        ])->name('login');

        Route::post('/login', [
            CustomerAuthenticatedSessionController::class,
            'store',
        ])->name('login.store');
    });

    // Authenticated Customer Routes

    Route::middleware('auth:customer')->group(function () {

        Route::get('/account', [
            AccountController::class,
            'index',
        ])->name('account');

        // Customer Profile

        Route::get('/profile/edit', [
        CustomerProfileController::class,
        'edit',
        ])->name('profile.edit');

        Route::put('/profile', [
            CustomerProfileController::class,
            'update',
        ])->name('profile.update');

        // Password

        Route::get('/password/edit', [
            CustomerPasswordController::class,
            'edit',
        ])->name('password.edit');

        Route::put('/password', [
            CustomerPasswordController::class,
            'update',
        ])->name('password.update');

        // Logout

        Route::post('/logout', [
            CustomerAuthenticatedSessionController::class,
            'destroy',
        ])->name('logout');
    });
});


/*use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/auth.php';
*/