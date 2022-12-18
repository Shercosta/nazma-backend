const _ = require("lodash");
const { blogs } = require("../models");
const { factory } = require("./baseRepository");

const blogRepository = factory(blogs);

blogRepository.resourceToModel = async (resource) => {
  const model = _.pick(resource, ["title", "picture", "content"]);

  return model;
};

blogRepository.modelToResource = async (model) => {
  if (!model) return {};

  const resource = model.toJSON();
  return resource;
};

module.exports = blogRepository;
