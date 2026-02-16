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

## Phase 3

- Build "Public Website" pages (Blogs, Contact Us).
- Create "Admin Panel" with separate layout.

---

## 📰 Phase 3: Public Website (Blogs)

We added a public blog system.

### 1. Backend Resources

- **Created `Post` Model & Migration**:
    - Fields: `title`, `slug`, `content`, `image`, `user_id`.
- **Created `PostFactory`**: Generates dummy data using Faker.
- **Created `PostController`**:
    - `index()`: Returns paginated posts.
    - `show($slug)`: Returns single post.
- **API Routes**:
    - `GET /api/posts`
    - `GET /api/posts/{slug}`

### 2. Database Seeding

- Updated `DatabaseSeeder` to create 10 dummy posts.
- Ran `php artisan migrate:fresh --seed`.

### 3. Frontend Components

- **`BlogList.vue`**: Fetches and displays posts in a grid.
- **`BlogDetail.vue`**: Fetches and displays a single post based on the slug.
- **Routing**: Added `/blogs` and `/blogs/:slug` to `router.js`.
- **Navigation**: Added "Blogs" link to `App.vue`.

---

## ✅ Current Status

- [x] Authentication works.
- [x] Blog Listing works.
- [x] Single Blog View works.

## Phase 4

- Create Admin Panel (Separate Layout).
- Admin Dashboard with Charts.
- User & Blog Management (CRUD).

### 4. User Roles & Authorization

- **Admin**: `admin@example.com` / `password`
- **User**: `test@example.com` / `password`
- **Middleware**: Created `AdminMiddleware` to protecting `/api/admin` routes.
- **Middleware**: Created `AdminMiddleware` to protecting `/api/admin` routes.
- **Frontend Guard**: Updated `router.js` to redirect non-admins.

### 5. Layout Architecture

- **App.vue**: Acts as a root container.
- **PublicLayout.vue**: Contains Public Navigation and Footer. Wraps public routes.
- **AdminLayout.vue**: Contains Admin Sidebar and Header. Wraps `/admin` routes.

### 6. Blog Management Module

- **Categories**: Full CRUD for organizing posts.
- **Posts**:
    - **Create/Edit**: Managing Title, Slug, Content, and **Image Uploads**.
    - **List View**: Displays posts with thumbnails and categories.
- **Storage**: Configured `public` disk for image storage.
