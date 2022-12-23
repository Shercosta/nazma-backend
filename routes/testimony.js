// TESTIMONY EDIT
const _ = require("lodash");
const router = require("express").Router();
const { asyncMw } = require("express-asyncmw");
const repository = require("../repository");

router.get(
  "/testimonyEdit",
  asyncMw(async (req, res, next) => {
    if (!req.user) {
      res.redirect("/not-authorized");
      next();
    } else {
      const testimony = await repository.testimony.findAll(
        {},
        req.query,
        req.filterQueryParser
      );

      res.render("admin/testimony-edit", {
        clientImage1: testimony?.rows?.[0].cliPic,
        clientName1: testimony?.rows?.[0].cliName,
        clientReview1: testimony?.rows?.[0].cliRev,
        clientImage2: testimony?.rows?.[1].cliPic,
        clientName2: testimony?.rows?.[1].cliName,
        clientReview2: testimony?.rows?.[1].cliRev,
        clientImage3: testimony?.rows?.[2].cliPic,
        clientName3: testimony?.rows?.[2].cliName,
        clientReview3: testimony?.rows?.[2].cliRev,
      });
    }
  })
);

router.post(
  "/testimonyEdit",
  asyncMw(async (req, res) => {
    await Promise.all(
      _.range(0, 2).map((value) =>
        repository.testimony.update(value + 1, {
          cliPic: req.body[`clientImage${value + 1}`],
          cliName: req.body[`clientName${value + 1}`],
          cliRev: req.body[`clientReview${value + 1}`],
        })
      )
    );

    // testimony[0].cliPic = req.body.clientImage1;
    // testimony[0].cliName = req.body.clientName1;
    // testimony[0].cliRev = req.body.clientReview1;
    // testimony[1].cliPic = req.body.clientImage2;
    // testimony[1].cliName = req.body.clientName2;
    // testimony[1].cliRev = req.body.clientReview2;
    // testimony[2].cliPic = req.body.clientImage3;
    // testimony[2].cliName = req.body.clientName3;
    // testimony[2].cliRev = req.body.clientReview3;

    res.redirect("/");
  })
);

module.exports = router;
