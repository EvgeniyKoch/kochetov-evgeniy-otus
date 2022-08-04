import model from "./model.js";

class CommentInstance {
  constructor() {
    this.model = model;
  }

  findOneById(id) {
    return this.model.findOne({ _id: id });
  }

  findByCourseId(id) {
    return this.model.find({ courseId: id });
  }

  findAll() {
    return this.model.find();
  }

  create(comment) {
    const instance = new this.model(comment);

    return instance.save();
  }

  updateOneById(id, user) {
    return this.model.updateOne({ _id: id }, { $set: user });
  }

  deleteOneById(id) {
    return this.model.deleteOne({ _id: id });
  }
}

export default new CommentInstance();
