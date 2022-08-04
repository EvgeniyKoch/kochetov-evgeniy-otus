import db from "../../database/index.js";

const roleSchema = new db.Schema({
  value: { type: String, unique: true, required: true },
});

export default db.model("Role", roleSchema);
