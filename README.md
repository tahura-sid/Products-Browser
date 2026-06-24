# Product Browser Backend & Frontend

## Overview

This project implements a scalable product browsing system that supports:

* Browsing 200,000 products
* Newest-first sorting
* Category filtering
* Cursor-based pagination
* Fast database queries using indexes

The application consists of:

* Backend: Node.js, Express, MongoDB
* Frontend: React, Tailwind CSS
* Database: MongoDB Atlas

---

## Features

### Product Browsing

Products are returned in descending order of:

1. `updatedAt`
2. `productId`

This ensures a stable and deterministic ordering.

### Category Filtering

Products can be filtered by category.

Example:

`GET /api/products?category=Books`

### Cursor Pagination

Pagination is implemented using cursors instead of offset-based pagination.

The cursor contains:

* `updatedAt`
* `productId`

encoded as a Base64 string.

Example:

`GET /api/products?cursor=<cursor>`

### Why Cursor Pagination?

Offset pagination (`skip/limit`) can cause duplicate or missing products when new products are inserted or updated while a user is browsing.

Cursor pagination uses the last seen product as a bookmark, ensuring users do not see duplicate records or miss records even when the dataset changes.

---

## Database Seeding

A seed script generates 200,000 products.

Each product contains:

* productId (unique)
* name
* category
* price
* createdAt
* updatedAt

Products are inserted in batches using `insertMany()` for efficient bulk insertion.

---

## API Endpoints

### Get Products

GET `/api/products`

Returns the first page of products.

### Filter by Category

GET `/api/products?category=Electronics`

Returns products belonging to a specific category.

### Cursor Pagination

GET `/api/products?cursor=<cursor>`

Returns the next page of products.

### Category + Cursor

GET `/api/products?category=Books&cursor=<cursor>`

Returns the next page of filtered products.

---

## Database Indexes

To support fast pagination and filtering, the following indexes are used:

```js
productSchema.index({
  updatedAt: -1,
  productId: -1
});

productSchema.index({
  category: 1,
  updatedAt: -1,
  productId: -1
});
```

---

## Local Setup

### Backend

```bash
cd backend
npm install
npm run dev
```

### Frontend

```bash
cd frontend
npm install
npm run dev
```

---

## Tech Stack

* Node.js
* Express.js
* MongoDB Atlas
* Mongoose
* React
* Tailwind CSS

---

## Design Decisions

* Used MongoDB for storage and querying.
* Used cursor-based pagination for consistency under concurrent updates.
* Used compound indexes to improve query performance.
* Generated 200,000 records through a dedicated seed script using batch inserts.
