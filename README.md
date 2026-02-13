# Learning Vue 3 + Laravel 11 (SPA Auth)

This project is a step-by-step learning journey to build a Single Page Application (SPA) using Laravel 11 as the backend and Vue 3 as the frontend.

## 🚀 Phase 1: Setup & Foundation

### 1. Project Initialization

- Installed Laravel 11:
    ```bash
    composer create-project laravel/laravel .
    ```
- Installed Frontend Dependencies (Vue 3, Vue Router, Vite Plugin):
    ```bash
    npm install vue@latest vue-router@4 @vitejs/plugin-vue
    ```

### 2. Frontend Configuration (`vite.config.js`)

- Added the `vue()` plugin to Vite to handle `.vue` files.

### 3. Vue Setup

- Created `resources/js/App.vue` as the main entry component.
- Configured **Vue Router** in `resources/js/router.js` with basic "Home" and "About" routes.
- Updated `resources/js/app.js` to mount the Vue app.

### 4. SPA "Catch-all" Route

- Updated `routes/web.php` to hand over all requests to Vue:
    ```php
    Route::get('/{any}', function () {
        return view('app');
    })->where('any', '.*');
    ```

---

## 🔒 Phase 2: Authentication (SPA Style)

We implemented authentication using **Laravel Sanctum** (Session/Cookie based).

### 1. Backend Setup

- **Installed Sanctum** (Required for Laravel 12+ skeletons if missing):
    ```bash
    composer require laravel/sanctum
    php artisan vendor:publish --provider="Laravel\Sanctum\SanctumServiceProvider"
    ```
- **Configured `bootstrap/app.php`**:
    - Enabled `EnsureFrontendRequestsAreStateful` middleware for the API group.
- **Configured `.env`**:
    - Added `SANCTUM_STATEFUL_DOMAINS` to allow our local test domain (e.g., `learning-vue2.test`, `localhost:8000`).
- **Database**:
    - Created `learning_vue` database.
    - Ran `php artisan migrate`.

### 2. Authentication Logic

- **Created `AuthController`**:
    - Handles `/login`, `/register`, and `/logout` requests.
    - returns JSON responses.
- **Registered Routes** in `routes/web.php`:
    ```php
    Route::post('/login', [AuthController::class, 'login']);
    Route::post('/register', [AuthController::class, 'register']);
    Route::post('/logout', [AuthController::class, 'logout']);
    ```
    _(Note: We used `web.php` for these specific auth routes to leverage session-based guard easily, while other data routes will go in `api.php`)_.

### 3. Frontend logic (`useAuth.js`)

- Created a **Composable** `resources/js/composables/useAuth.js`.
- Manages `user` state and `errors`.
- handles `login()`, `register()`, and `logout()` actions using Axios.
- **Axios Config** (`bootstrap.js`):
    - Enabled `withCredentials = true` to send cookies with requests.
    - Enabled `withXSRFToken = true`.

### 4. UI Components

- Created `Login.vue` and `Register.vue`.
- Updated `App.vue` to show "Welcome, [Name]" or Login/Register links based on auth state.

---

## ✅ Current Status

- [x] Catch-all Routing working.
- [x] User can Register.
- [x] User can Login.
- [x] User remains logged in on refresh.
- [x] Logout works.

## 🔜 Next Steps (Phase 3)

- Build "Public Website" pages (Blogs, Contact Us).
- Create "Admin Panel" with separate layout.
