import encrypt from "../services/encrypt.js";
import { userInstance } from "../entities/user/index.js";

export default (app) => {
  app.get("/users/new", (_req, res) => {
    res.render("users/new", { form: {}, errors: {} });
  });

  app.post("/users", async (req, res) => {
    const { nickname, password } = req.body;
    const errors = {};

    if (!nickname) {
      errors.nickname = "Can't be blank";
    } else {
      const uniq = await userInstance.findByName(nickname);

      if (uniq) {
        errors.nickname = "Already exist";
      }
    }

    if (!password) {
      errors.password = "Can't be blank";
    }

    if (Object.keys(errors).length === 0) {
      const user = await userInstance.create({
        nickname,
        passwordDigest: encrypt(password),
      });

      req.session.userId = user.id;
      res.redirect("/");
      return;
    }

    res.status(422).render("users/new", { form: req.body, errors });
  });
};
