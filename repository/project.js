const _ = require("lodash");
const { projects } = require("../models");
const { factory } = require("./baseRepository");

const projectRepository = factory(projects);

projectRepository.resourceToModel = async (resource) => {
  const model = _.pick(resource, ["name", "link"]);

  return model;
};

projectRepository.modelToResource = async (model) => {
  if (!model) return {};

  const resource = model.toJSON();
  return resource;
};

module.exports = projectRepository;
