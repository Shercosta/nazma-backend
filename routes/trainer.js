// TRAINER & CREW EDIT
const _ = require("lodash");
const router = require("express").Router();
const { asyncMw } = require("express-asyncmw");
const repository = require("../repository");

router.get("/trainerAdd", (req, res, next) => {
  if (!req.user) {
    res.redirect("/not-authorized");
    next();
  } else {
    res.render("admin/trainerAdd");
  }
});

router.post(
  "/trainerAdd",
  asyncMw(async (req, res) => {
    const trainerTemp = {
      image: req.body.trainerPic,
      name: req.body.trainerName,
      expertise: req.body.trainerExpertise,
    };

    // certifiedTrainer.unshift(trainerTemp);

    await repository.trainer.create(trainerTemp);

    res.redirect("/");
  })
);

router.get(
  "/trainerRemove",
  asyncMw(async (req, res, next) => {
    if (!req.user) {
      res.redirect("/not-authorized");
      next();
    } else {
      const trainer = await repository.trainer.findAll();
      res.render("admin/trainerRemove", {
        profile: trainer.rows,
      });
    }
  })
);

router.post(
  "/trainerRemove",
  asyncMw(async (req, res) => {
    // changeIndex = Number(req.body.trainerProfile);
    // certifiedTrainer.splice(changeIndex, 1);

    await repository.trainer.delete(req.body.id);

    res.redirect("/");
  })
);

module.exports = router;
