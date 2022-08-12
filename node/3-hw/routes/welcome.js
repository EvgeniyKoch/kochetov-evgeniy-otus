import { courseInstance } from "../entities/course/index.js";

export default (app) => {
  app.get("/", async (req, res) => {
    const courses = await courseInstance.findAll();

    res.status(200).render("index", { courses });
  });
};
