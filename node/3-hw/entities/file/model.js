import db from "../../database/index.js";

const fileSchema = new db.Schema({
  name: {
    type: String,
    required: [true, "Uploaded file must have a name"],
  },
  courseId: {
    type: db.Schema.Types.ObjectId,
    ref: "Course",
  },
  storage: {
    type: String,
    required: true,
  },
  created: {
    type: Date,
    default: Date.now(),
  },
});

export default db.model("File", fileSchema);
