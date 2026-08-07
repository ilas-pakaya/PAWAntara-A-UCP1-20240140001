const express = require("express");
const path = require("path");

const pageRoutes = require("./routes/pages");
const apiRoutes = require("./routes/api");

const app = express();
const PORT = process.env.PORT || 3000;

// View engine setup
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "view"));

// Static assets
app.use(express.static(path.join(__dirname, "public")));

// Middleware bawaan untuk parsing body (form & JSON)
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Custom middleware: request logger
app.use((req, res, next) => {
  const timestamp = new Date().toISOString();
  console.log(`[${timestamp}] ${req.method} ${req.originalUrl}`);
  next();
});

// Routes
app.use("/", pageRoutes);
app.use("/api", apiRoutes);

// 404 handler untuk route yang tidak dikenal
app.use((req, res) => {
  res.status(404).render("produknotfound", {
    title: "Halaman Tidak Ditemukan",
    message: "Halaman yang kamu cari tidak tersedia."
  });
});

app.listen(PORT, () => {
  console.log(`Server berjalan di http://localhost:${PORT}`);
});