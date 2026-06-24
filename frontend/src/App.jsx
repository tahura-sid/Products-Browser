import { useEffect, useState } from "react";
import axios from "axios";


const categories = [
  "",
  "Electronics",
  "Fashion",
  "Books",
  "Sports",
  "Beauty",
  "Furniture",
];

function App() {
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState("");
  const [nextCursor, setNextCursor] = useState(null);
  const [loading, setLoading] = useState(false);

  const API = "https://products-browser-2.onrender.com/api/products";

  const fetchProducts = async (selectedCategory = "") => {
    try {
      setLoading(true);

      let url = API;

      if (selectedCategory) {
        url += `?category=${selectedCategory}`;
      }

      const res = await axios.get(url);

      setProducts(res.data.products);
      setNextCursor(res.data.nextCursor);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const loadMore = async () => {
    try {
      if (!nextCursor) return;

      setLoading(true);

      let url = `${API}?cursor=${encodeURIComponent(nextCursor)}`;

      if (category) {
        url = `${API}?category=${category}&cursor=${encodeURIComponent(
          nextCursor
        )}`;
      }

      const res = await axios.get(url);

      setProducts((prev) => [...prev, ...res.data.products]);
      setNextCursor(res.data.nextCursor);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts(category);
  }, [category]);

  return (
    <div className="min-h-screen bg-slate-100">
      <div className="max-w-6xl mx-auto p-6">
        <h1 className="text-4xl font-bold mb-6">
          Product Browser
        </h1>

        <select
          className="border rounded p-2 mb-6 bg-white"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat || "All Categories"}
            </option>
          ))}
        </select>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {products.map((product) => (
            <div
              key={product.productId}
              className="bg-white rounded-xl shadow p-4"
            >
              <h2 className="font-semibold text-lg">
                {product.name}
              </h2>

              <p className="text-sm text-gray-500">
                {product.category}
              </p>

              <p className="font-bold mt-2">
                ₹{product.price}
              </p>

              <p className="text-xs text-gray-400 mt-2">
                ID: {product.productId}
              </p>
            </div>
          ))}
        </div>

        <div className="flex justify-center mt-8">
          <button
            onClick={loadMore}
            disabled={!nextCursor || loading}
            className="px-6 py-3 bg-black text-white rounded-lg disabled:opacity-50"
          >
            {loading ? "Loading..." : "Load More"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;