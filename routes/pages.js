const express = require("express");
const router = express.Router();
const products = require("../data/product");

// GET / - Beranda
router.get("/", (req, res) => {
  const preview = products.slice(0, 3);
  res.render("index", {
    title: "Beranda - Toko Sembako Ariesta",
    preview
  });
});

// GET /produk - Daftar produk + filter kategori/search
router.get("/produk", (req, res) => {
  const { kategori, search } = req.query;
  let filtered = products;

  if (kategori) {
    filtered = filtered.filter(
      (p) => p.category.toLowerCase() === kategori.toLowerCase()
    );
  }

  if (search) {
    filtered = filtered.filter((p) =>
      p.name.toLowerCase().includes(search.toLowerCase())
    );
  }

  res.render("produk", {
    title: "Produk - Toko Sembako Ariesta",
    products: filtered,
    kategori: kategori || "",
    search: search || ""
  });
});

// GET /produk/:id - Detail produk (route dinamis)
router.get("/produk/:id", (req, res) => {
  const id = parseInt(req.params.id, 10);

  if (isNaN(id)) {
    return res.status(400).render("produknotfound", {
      title: "Produk Tidak Ditemukan",
      message: "ID produk tidak valid."
    });
  }

  const product = products.find((p) => p.id === id);

  if (!product) {
    return res.status(404).render("produknotfound", {
      title: "Produk Tidak Ditemukan",
      message: `Produk dengan ID ${id} tidak ditemukan.`
    });
  }

  res.render("produkdetail", {
    title: `${product.name} - Toko Sembako Ariesta`,
    product
  });
});

// GET /tanya-ai - Halaman chat (tampilan saja, belum ada logic)
router.get("/tanya-ai", (req, res) => {
  res.render("tanyaai", {
    title: "Tanya AI - Toko Sembako Ariesta"
  });
});

module.exports = router;