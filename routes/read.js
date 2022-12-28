// READ for Blog Reading
const _ = require("lodash");
const router = require("express").Router();
const { asyncMw } = require("express-asyncmw");
const repository = require("../repository");

router.get("/read/:blogParams", async (req, res) => {
  // const requestedPost = req.params.blogParams;
  const requestedPost = await repository.blog.findOne({
    title: req.params.blogParams,
  });

  res.render("read", {
    cssEjs: "read",
    blogTitle: requestedPost.title,
    blogImage: requestedPost.picture,
    blogContent: requestedPost.content,
  });

  // article.forEach((news) => {
  //   if (requestedPost === news.title) {
  //     res.render("read", {
  //       cssEjs: "read",
  //       blogTitle: news.title,
  //       blogImage: news.image,
  //       blogContent: news.content,
  //     });
  //   }
  // });
});

module.exports = router;
