import db from "../../database/index.js";

const courseSchema = new db.Schema({
  title: {
    type: String,
    maxLength: 255,
    minLength: 3,
    required: true,
  },
  src: {
    type: String,
    required: true,
  },
  description: {
    type: db.Mixed,
    required: true,
  },
  created: {
    type: Date,
    default: Date.now(),
  },
  author: {
    type: db.Schema.Types.ObjectId,
    ref: "User",
  },
});

export default db.model("Course", courseSchema);
