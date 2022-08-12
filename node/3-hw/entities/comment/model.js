import db from "../../database/index.js";

const commentSchema = new db.Schema({
  nickname: {
    type: String,
    required: true,
    trim: true,
  },
  text: {
    type: String,
    required: true,
    maxLength: 2550,
  },
  authorId: {
    type: db.Schema.Types.ObjectId,
    ref: "User",
  },
  courseId: {
    type: db.Schema.Types.ObjectId,
    ref: "Course",
  },
  created: {
    type: Date,
    default: Date.now(),
  },
});

export default db.model("Comment", commentSchema);
