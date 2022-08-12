import db from "../../database/index.js";

const userSchema = new db.Schema({
  nickname: {
    type: String,
    maxLength: 255,
    minLength: 3,
    required: true,
    trim: true,
  },
  passwordDigest: {
    type: db.Mixed,
    maxLength: 20,
    minLength: 3,
    required: true,
  },
  isGuest: {
    type: Boolean,
    default: false,
  },
  created: {
    type: Date,
    default: Date.now(),
  },
});

export default db.model("User", userSchema);
