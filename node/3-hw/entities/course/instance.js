import mongoose from "mongoose";
import model from "./model.js";

class CourseInstance {
  constructor() {
    this.model = model;
  }

  findOneById(id) {
    if (mongoose.Types.ObjectId.isValid(id)) {
      return this.model.findOne({ _id: id });
    }
  }

  findByAuthorId(id) {
    if (mongoose.Types.ObjectId.isValid(id)) {
      return this.model.find({ author: id });
    }
  }

  findAll() {
    return this.model.find();
  }

  create(course) {
    const instance = new this.model(course);

    return instance.save();
  }

  updateOneById(id, course) {
    if (mongoose.Types.ObjectId.isValid(id)) {
      return this.model.updateOne({ _id: id }, { $set: course });
    }
  }

  deleteOneById(id) {
    if (mongoose.Types.ObjectId.isValid(id)) {
    return this.model.deleteOne({ _id: id });

    }
  }
}

export default new CourseInstance();
