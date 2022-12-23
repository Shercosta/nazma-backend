// GALLERY
const _ = require("lodash");
const router = require("express").Router();
const { asyncMw } = require("express-asyncmw");
const repository = require("../repository");

router.get(
  "/gallery",
  asyncMw(async (req, res) => {
    const gallery = await repository.gallery.findAll(
      {},
      req.query,
      req.filterQueryParser
    );
    res.render("gallery", {
      cssEjs: "gallery",
      galHeader: "gallery-header",
      imagesEjs: _.orderBy(gallery.rows, ["id"], ["desc"]),
    });
  })
);

router.get("/gallery-create", (req, res, next) => {
  if (!req.user) {
    res.redirect("/not-authorized");
    next();
  } else {
    res.render("admin/gallery-create");
  }
});

router.post(
  "/gallery-create",
  asyncMw(async (req, res) => {
    const newpic = {
      url: req.body.createGalleryImage,
      caption: req.body.createGalleryCaption,
    };
    // gallery.unshift(newpic);
    await repository.gallery.create(newpic);
    res.redirect("/");
  })
);

router.get(
  "/gallery-update",
  asyncMw(async (req, res, next) => {
    if (!req.user) {
      res.redirect("/not-authorized");
      next();
    } else {
      const gallery = await repository.gallery.findAll(
        {},
        req.query,
        req.filterQueryParams
      );

      res.render("admin/gallery-update", {
        gallery: _.orderBy(gallery.rows, ["id"], ["desc"]),
      });
    }
  })
);

router.post("/gallery-update", (req, res) => {
  // changeIndex = Number(req.body.arrayIndex);
  res.redirect(`/gallery-update-2?id=${req.body.id}`);
});

router.get(
  "/gallery-update-2",
  asyncMw(async (req, res, next) => {
    if (!req.user) {
      res.redirect("/not-authorized");
      next();
    } else {
      const gallery = await repository.gallery.findOne(req.query.id);
      res.render("admin/gallery-update-2", {
        inheritGalleryId: gallery.id,
        inheritGalleryImage: gallery.url,
        inheritGalleryCaption: gallery.caption,
      });
    }
  })
);

router.post(
  "/gallery-update-2",
  asyncMw(async (req, res) => {
    const newpic = {
      url: req.body.createGalleryImage,
      caption: req.body.createGalleryCaption,
    };
    // gallery[changeIndex] = newpic;
    await repository.gallery.update(req.query.id, newpic);
    res.redirect("/");
  })
);

router.get(
  "/gallery-delete",
  asyncMw(async (req, res, next) => {
    if (!req.user) {
      res.redirect("/not-authorized");
      next();
    } else {
      const gallery = await repository.gallery.findAll();
      res.render("admin/gallery-delete", { gallery: gallery.rows });
    }
  })
);

router.post(
  "/gallery-delete",
  asyncMw(async (req, res) => {
    // changeIndex = Number(req.body.arrayIndex);
    // gallery.splice(changeIndex, 1);

    await repository.gallery.delete(req.body.id);
    res.redirect("/");
  })
);

module.exports = router;
