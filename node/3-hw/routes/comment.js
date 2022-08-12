import { commentInstance } from "../entities/comment/index.js";
import { userInstance } from "../entities/user/index.js";

export default (app) => {
  app.post("/comment/new", async (req, res) => {
    const { userId } = req.session;
    const user = await userInstance.findOneById(userId);
    await commentInstance.create({ ...req.body, authorId: userId, nickname: user.nickname });

    res.status(204).redirect("back");
  });
};
