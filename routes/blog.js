// BLOG
const _ = require("lodash");
const router = require("express").Router();
const { asyncMw } = require("express-asyncmw");
const repository = require("../repository");

router.get(
  "/blog",
  asyncMw(async (req, res) => {
    const article = await repository.blog.findAll(
      {},
      req.query,
      req.filterQueryParser
    );

    res.render("blog", {
      cssEjs: "blog",
      articlesEjs: _.orderBy(article.rows, ["id"], ["desc"]),
    });
  })
);

router.get("/blog-create", (req, res, next) => {
  if (!req.user) {
    res.redirect("/not-authorized");
    next();
  } else {
    res.render("admin/blog-create");
  }
});

router.post(
  "/blog-create",
  asyncMw(async (req, res) => {
    const newpost = {
      title: req.body.createBlogTitle,
      picture: req.body.createBlogImage,
      content: req.body.createBlogContent,
    };

    await repository.blog.create(newpost);

    res.redirect("/");
  })
);

router.get(
  "/blog-update",
  asyncMw(async (req, res, next) => {
    if (!req.user) {
      res.redirect("/not-authorized");
      next();
    } else {
      const articles = await repository.blog.findAll(
        {},
        req.query,
        req.filterQueryParams
      );

      res.render("admin/blog-update", {
        articles: _.orderBy(articles.rows, ["id"], ["desc"]),
      });
    }
  })
);

router.get(
  "/blog-delete",
  asyncMw(async (req, res, next) => {
    if (!req.user) {
      res.redirect("/not-authorized");
      next();
    } else {
      const articles = await repository.blog.findAll();

      res.render("admin/blog-delete", { articles: articles.rows });
    }
  })
);

router.post(
  "/blog-delete",
  asyncMw(async (req, res) => {
    await repository.blog.delete(req.body.id);

    res.redirect("/");
  })
);

router.post("/blog-update", (req, res) => {
  res.redirect(`/blog-update-2?id=${req.body.id}`);
});

router.get(
  "/blog-update-2",
  asyncMw(async (req, res, next) => {
    if (!req.user) {
      res.redirect("/not-authorized");
      next();
    } else {
      const article = await repository.blog.findOne(req.query.id);

      res.render("admin/blog-update-2", {
        inheritBlogId: article.id,
        inheritBlogTitle: article.title,
        inheritBlogImage: article.picture,
        inheritBlogContent: article.content,
      });
    }
  })
);

router.post(
  "/blog-update-2",
  asyncMw(async (req, res) => {
    const newpost = {
      title: req.body.createBlogTitle,
      picture: req.body.createBlogImage,
      content: req.body.createBlogContent,
    };

    await repository.blog.update(req.query.id, newpost);

    res.redirect("/");
  })
);

module.exports = router;
