import model from "./model.js";

class UserInstance {
  constructor() {
    this.model = model;
  }

  findOneById(id) {
    return this.model.findOne({ _id: id });
  }

  findByName(nickname) {
    return this.model.findOne({ nickname });
  }

  findAll() {
    return this.model.find();
  }

  create(user) {
    const instance = new this.model(user);

    return instance.save();
  }

  updateOneById(id, user) {
    return this.model.updateOne({ _id: id }, { $set: user });
  }

  deleteOneById(id) {
    return this.model.deleteOne({ _id: id });
  }
}

export default new UserInstance();
