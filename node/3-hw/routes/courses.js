import mongoose from "mongoose";

import { courseInstance } from "../entities/course/index.js";
import { commentInstance } from "../entities/comment/index.js";

export default (app) => {
  app.get("/course/new", (req, res) => {
    res.render("courses/new");
  });

  app.get("/course/mine", async (req, res) => {
    const { userId } = req.session;
    const id = new mongoose.Types.ObjectId(userId);
    const courses = await courseInstance.findByAuthorId(id);

    res.render("courses/mine", { courses });
  });

  app.post("/course/new", async (req, res) => {
    const { userId } = req.session;
    await courseInstance.create({ ...req.body, author: userId });

    res.status(201).render("courses/new");
  });

  app.put("/course/new", async (req, res) => {
    const { courseId } = req.body;
    await courseInstance.updateOneById(courseId, req.body);

    res.status(201).redirect(`/course/${courseId}`);
  });

  app.get("/course/update/:id", async (req, res) => {
    const { id } = req.params;
    const course = await courseInstance.findOneById(id);

    res.status(201).render("courses/new", { course });
  });

  app.delete("/course/delete/:id", async (req, res) => {
    const { id } = req.params;
    await courseInstance.deleteOneById(id).exec();

    res.status(204).redirect("back");
  });

  app.get("/course/:id", async (req, res) => {
    const { id } = req.params;
    const course = await courseInstance.findOneById(id);
    const comments = await commentInstance.findByCourseId(id);

    res.status(200).render("courses/course", { course, comments });
  });
};
