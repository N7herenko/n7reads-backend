import express from "express";
import cors from "cors";

import booksRoutes from "./routes/books.js";
import notesRoutes from "./routes/notes.js";
import historyRoutes from "./routes/history.js";
import goalRoutes from "./routes/goal.js";
import quoteRoutes from "./routes/quote.js";

const app = express();
const PORT = 5001;

app.use("/images/books", express.static("uploads/images/books"));

const corsOptions = {
  origin: "*",
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
};

app.use(cors(corsOptions));

// Set CORS headers
app.use((req, res, next) => {
  res.setHeader(
    "Access-Control-Allow-Origin",
    "*",
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, PUT, DELETE",
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});

app.use(express.json()); // For JSON payloads
// Support POSTing form data with URL encoded
app.use(express.urlencoded({ extended: true }));

app.use("/api/books", booksRoutes);
app.use("/api/notes", notesRoutes);
app.use("/api/history", historyRoutes);
app.use("/api/goal", goalRoutes);
app.use("/api/quote", quoteRoutes);

app.get("/", (req, res) => res.send("Welcome to the MyReads API!"));
app.all("*", (req, res) =>
  res.send("You've tried reaching a route that doesn't exist."),
);

app.listen(PORT, () =>
  console.log(`Server running on port: http://localhost:${PORT}`),
);
