import db from "mongoose";

db.connect("mongodb://localhost:27017/courses", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

export default db;
