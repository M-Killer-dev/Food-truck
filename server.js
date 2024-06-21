// app.js
const express = require("express");
const fs = require("fs");
const cors = require("cors");
const path = require("path");
const multer = require("multer");

const app = express();

// Middleware to parse JSON bodies
app.use(express.json());
app.use(cors());
app.use("/", express.static(path.join("./dist")));
app.use("/public", express.static(path.join("./public")));

// Configure Multer storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./public/");
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const extension = path.extname(file.originalname);
    cb(null, file.fieldname + "-" + uniqueSuffix + extension);
  },
});

// Initialize Multer with the storage configuration
const upload = multer({ storage });

app.post("/upload", upload.single("image"), (req, res) => {
  res.json({ status: 200, filename: req.file.path });
});

// Endpoint to read data from JSON file
app.get("/read-json", (req, res) => {
  const filePath = path.join(__dirname, "data.json");

  fs.readFile(filePath, "utf8", (err, data) => {
    if (err) {
      console.error("Error reading file:", err);
      return res.status(500).send("Error reading file");
    }

    try {
      const jsonData = JSON.parse(data);
      res.json(jsonData);
    } catch (parseErr) {
      console.error("Error parsing JSON:", parseErr);
      res.status(500).send("Error parsing JSON");
    }
  });
});

// Endpoint to write data to JSON file
app.post("/write-json", (req, res) => {
  const filePath = path.join(__dirname, "data.json");
  const newData = req.body;

  fs.writeFile(filePath, JSON.stringify(newData, null, 2), "utf8", (err) => {
    if (err) {
      console.error("Error writing file:", err);
      return res.status(500).send("Error writing file");
    }

    res.send("Data written to file");
  });
});

app.get("/api/v1/menus", (req, res) => {
  const directoryPath = path.join("./data");

  fs.readdir(directoryPath, (err, files) => {
    if (err) {
      return res.status(500).send("Unable to scan directory: " + err);
    }

    res.json(files);
  });
});

app.get("/api/v1/menu", (req, res) => {
  const filePath = path.join("./data/menu");

  fs.readFile(filePath, "utf8", (err, data) => {
    if (err) {
      return res.status(500).send("Unable to scan directory: " + err);
    }
    res.json(data);
  });

  // fs.readdir(directoryPath, (err, files) => {
  //   if (err) {
  //     return res.status(500).send("Unable to scan directory: " + err);
  //   }

  //   res.json(files);
  // });
});

app.get("/api/v1/menus/:id", (req, res) => {
  const filePath = path.join("./data/", req.params.id);

  fs.readFile(filePath, "utf8", (err, data) => {
    if (err) {
      console.error("Error reading file:", err);
      return res.status(500).send("Error reading file");
    }

    try {
      const jsonData = JSON.parse(data);
      res.json(jsonData);
    } catch (parseErr) {
      console.error("Error parsing JSON:", parseErr);
      res.status(500).send("Error parsing JSON");
    }
  });
});

app.post("/api/v1/menus", (req, res) => {
  const filePath = path.join("./data/", req.body.menu);

  fs.writeFile(filePath, "", (err) => {
    if (err) {
      return res.status(500).send("Error creating file: " + err.message);
    }
    res.json({ status: 200 });
  });
});

app.delete("/api/v1/menus/:id", (req, res) => {
  const filePath = path.join("./data/", req.params.id);

  fs.unlink(filePath, (err) => {
    if (err) {
      if (err.code === "ENOENT") {
        // File does not exist
        return res.status(404).send("File not found");
      }
      // Other errors
      return res.status(500).send("Error deleting file: " + err.message);
    }

    res.json({ status: 200 });
  });
});

app.post("/api/v1/save", (req, res) => {
  const filePath = path.join("./data/", "menu");
  const newData = req.body.menu;

  fs.writeFile(filePath, JSON.stringify(newData, null, 2), "utf8", (err) => {
    if (err) {
      console.error("Error writing file:", err);
      return res.status(500).send("Error writing file");
    }

    res.json({ status: 200 });
  });
});

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
