import mongoose from "mongoose";
import model from "./model.js";

class FileInstance {
  constructor() {
    this.model = model;
  }

  findOneById(id) {
    if (mongoose.Types.ObjectId.isValid(id)) {
      return this.model.findOne({ _id: id });
    }
  }

  findByCourseId(id) {
    if (mongoose.Types.ObjectId.isValid(id)) {
      return this.model.find({ courseId: id });
    }
  }

  findAll() {
    return this.model.find();
  }

  create(file) {
    const instance = new this.model(file);

    return instance.save();
  }

  deleteOneById(id) {
    if (mongoose.Types.ObjectId.isValid(id)) {
      return this.model.deleteOne({ _id: id });
    }
  }
}

export default new FileInstance();
