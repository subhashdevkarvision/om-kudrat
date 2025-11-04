import multer from "multer";
import path from "path";
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/uploads/");
  },
  filename: function (req, file, cb) {
    const ext = path.extname(file.originalname);
    const baseName = path.basename(file.originalname, ext);
    const safeName = baseName.replace(/[^a-zA-Z0-9_-]/g, "").toLowerCase();
    cb(null, `${safeName}-${Date.now()}${ext}`);
  },
});

export const upload = multer({ storage: storage });
