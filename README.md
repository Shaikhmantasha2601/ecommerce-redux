# Luma — E-commerce Frontend with Redux Toolkit

A responsive, modern e-commerce frontend built with React, Vite, Redux Toolkit, React Redux, and React Router. The project uses a local JSON product catalogue and does not require a backend or API key.

## Features

- **Home page:** promotional hero, category tiles, featured products, brand story, responsive navigation.
- **Product catalogue:** responsive product grid, name search, category filters, and sorting by featured, price, and rating.
- **Product details:** description, price, rating, stock indicator, quantity selection, add-to-bag, wishlist UI, and related products.
- **Shopping bag:** add/remove products, increase/decrease quantity, persistent cart using localStorage, item count, subtotal, shipping fee, free-shipping progress, and order total.
- **State management:** Redux Toolkit store, product and cart slices, async thunk, reducers, actions, and selectors.
- **UX:** loading, error, and empty states; responsive mobile menu; animations; accessible button labels; fallback product images; not-found route.
- **Local catalogue:** product data lives in `public/products.json`; the browser fetches it locally. No third-party product API is needed.

## Tech stack

- React 18
- Vite 6
- Redux Toolkit
- React Redux
- React Router DOM
- Lucide React icons
- CSS3 with responsive breakpoints and reduced-motion support
- Static JSON data and browser localStorage

## Requirements

Install Node.js LTS (which includes npm). Check installation:

```bash
node --version
npm --version
```

## Run on Windows (CMD or VS Code terminal)

1. Extract the ZIP file.
2. Open the extracted `ecommerce-redux` folder in VS Code.
3. Open **Terminal → New Terminal**.
4. Run:

```bat
npm install
npm run dev
```

5. Open the local address Vite prints, usually `http://localhost:5173`.

To create and preview a production build:

```bat
npm run build
npm run preview
```

## Project structure

```text
ecommerce-redux/
├── public/
│   └── products.json
├── src/
│   ├── app/
│   │   └── store.js
│   ├── components/
│   │   ├── Footer.jsx
│   │   ├── Loader.jsx
│   │   ├── Navbar.jsx
│   │   ├── ProductCard.jsx
│   │   └── ProductGrid.jsx
│   ├── features/
│   │   ├── cart/
│   │   │   └── cartSlice.js
│   │   └── products/
│   │       └── productSlice.js
│   ├── pages/
│   │   ├── Cart.jsx
│   │   ├── Home.jsx
│   │   ├── NotFound.jsx
│   │   ├── ProductDetails.jsx
│   │   └── Products.jsx
│   ├── App.jsx
│   ├── main.jsx
│   └── styles.css
├── .gitignore
├── index.html
├── package.json
└── README.md
```

## Redux Toolkit overview

### Store

`src/app/store.js` configures the Redux store with `products` and `cart` reducers. `src/main.jsx` wraps the app in React Redux's `<Provider>`.

### Products slice

`src/features/products/productSlice.js` uses `createAsyncThunk` to load `/products.json`. It tracks `idle`, `loading`, `succeeded`, and `failed` states, so the UI can show a loader, product list, or retry message.

### Cart slice

`src/features/cart/cartSlice.js` exposes these actions:

- `addToCart(product)`
- `removeFromCart(productId)`
- `increaseQuantity(productId)`
- `decreaseQuantity(productId)`
- `clearCart()`

Selectors `selectCartItems`, `selectCartCount`, and `selectCartSubtotal` keep derived cart values in one place. The cart is restored from localStorage when the app starts.

## Routes

| Route | Page |
|---|---|
| `/` | Home |
| `/products` | Product listing |
| `/products?category=Home` | Listing filtered by category |
| `/products?search=watch` | Search results |
| `/products/:id` | Product details |
| `/cart` | Shopping bag |
| Any unknown route | Not found page |

## Product data

Edit `public/products.json` to add or change products. Each product object has:

```json
{
  "id": 1,
  "name": "Cloud Knit Sweater",
  "category": "Clothing",
  "price": 1899,
  "oldPrice": 2399,
  "rating": 4.8,
  "reviews": 124,
  "badge": "BESTSELLER",
  "description": "A product description.",
  "color": "Lilac",
  "image": "https://example.com/product-image.jpg"
}
```

Use unique numeric IDs. `oldPrice`, `badge`, and `reviews` are optional. Product images in this demo are hosted by Unsplash, so an internet connection is needed for those images; the catalogue and application logic remain local. If an image cannot load, a placeholder image is shown.

## Notes / demo boundaries

- Checkout and newsletter subscription are demo interactions and do not process payments or store email addresses.
- Wishlist hearts are UI-only and are not persisted.
- Shipping is simulated as ₹99 below ₹2,999 and free at/above ₹2,999.
- This is a frontend learning project, not a production store. Real orders require a secure backend, payment provider integration, authentication, validation, and privacy/security review.
- The `localStorage` cart is for convenience on the current browser/device only.

## GitHub submission

Create a repository on GitHub, then from the project folder run:

```bat
git init
git add .
git commit -m "Build Luma ecommerce frontend with Redux Toolkit"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/ecommerce-redux.git
git push -u origin main
```

Replace `YOUR_USERNAME` with your GitHub username. If the repository already has a remote, inspect it first with `git remote -v` and avoid adding `origin` twice.

## Suggested demonstration checklist

- [ ] Home page and responsive navigation work.
- [ ] Product catalogue loads from `public/products.json`.
- [ ] Search, category filter, and sort work together.
- [ ] Product details route opens for each product.
- [ ] Add to bag updates the header count.
- [ ] Quantity controls and remove button update totals.
- [ ] Cart remains after refresh.
- [ ] Empty-cart view appears after clearing/removing all items.
- [ ] Loading/error UI and retry behavior are present.
- [ ] `npm run build` completes successfully.

## License

Created for educational and minor-project submission purposes. Product photos are loaded from Unsplash URLs and remain subject to their respective usage terms.
