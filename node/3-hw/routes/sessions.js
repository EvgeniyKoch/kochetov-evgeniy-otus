import encrypt from "../services/encrypt.js";
import { userInstance } from "../entities/user/index.js";
import generateAccessToken from "../services/generateAccessToken.js";

export default (app) => {
  app.get("/session/new", (req, res) => {
    res.render("session/new", { form: {} });
  });

  app.post("/session/new", async (req, res) => {
    const { nickname, password } = req.body;
    const user = await userInstance.findByName(nickname);

    if (user?.passwordDigest === encrypt(password)) {
      const token = generateAccessToken(user.id);
      req.session.userId = user.id;
      res
        .cookie("access_token", token, {
          httpOnly: true,
        })
        .redirect("/");
      return;
    }

    res.status(422).render("session/new", {
      form: req.body,
      error: "Invalid nickname or password",
    });
  });

  app.delete("/session", (req, res) => {
    delete req.session.userId;

    res.clearCookie("access_token").redirect("/");
  });
};
