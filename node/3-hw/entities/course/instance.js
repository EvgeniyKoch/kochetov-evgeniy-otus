import model from "./model.js";

class CourseInstance {
  constructor() {
    this.model = model;
  }

  findOneById(id) {
    return this.model.findOne({ _id: id });
  }

  findByAuthorId(id) {
    return this.model.find({ author: id });
  }

  findAll() {
    return this.model.find();
  }

  create(course) {
    const instance = new this.model(course);

    return instance.save();
  }

  updateOneById(id, course) {
    return this.model.updateOne({ _id: id }, { $set: course });
  }

  deleteOneById(id) {
    return this.model.deleteOne({ _id: id });
  }
}

export default new CourseInstance();
