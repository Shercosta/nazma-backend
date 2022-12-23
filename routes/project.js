// PROJECTS in Home Page
const _ = require("lodash");
const router = require("express").Router();
const { asyncMw } = require("express-asyncmw");
const repository = require("../repository");

router.get(
  "/ongoingProjectEdit",
  asyncMw(async (req, res, next) => {
    if (!req.user) {
      res.redirect("/not-authorized");
      next();
    } else {
      const projects = await repository.project.findAll(
        {},
        req.query,
        req.filterQueryParser
      );

      res.render("admin/ongoing-project-edit", {
        Project1: projects?.rows?.[0]?.name,
        Project2: projects?.rows?.[1]?.name,
        Project3: projects?.rows?.[2]?.name,
        Project4: projects?.rows?.[3]?.name,
        Project5: projects?.rows?.[4]?.name,
        Project6: projects?.rows?.[5]?.name,
        projectLink1: projects?.rows?.[0]?.link,
        projectLink2: projects?.rows?.[0]?.link,
        projectLink3: projects?.rows?.[0]?.link,
        projectLink4: projects?.rows?.[0]?.link,
        projectLink5: projects?.rows?.[0]?.link,
        projectLink6: projects?.rows?.[0]?.link,
      });
    }
  })
);

router.post(
  "/ongoingProjectEdit",
  asyncMw(async (req, res) => {
    await Promise.all(
      _.range(0, 5).map((value) =>
        repository.project.update(value + 1, {
          name: req.body[`proj${value + 1}`],
          link: req.body[`projLink${value + 1}`],
        })
      )
    );

    res.redirect("/");
  })
);

module.exports = router;
