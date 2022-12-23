// READ for Blog Reading

const router = require("express").Router();

router.get("/read/:blogParams", (req, res) => {
  const requestedPost = req.params.blogParams;

  article.forEach((news) => {
    if (requestedPost === news.title) {
      res.render("read", {
        cssEjs: "read",
        blogTitle: news.title,
        blogImage: news.image,
        blogContent: news.content,
      });
    }
  });
});

module.exports = router;
