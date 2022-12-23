const _ = require("lodash");
const { testimonies } = require("../models");
const { factory } = require("./baseRepository");

const testimonyRepository = factory(testimonies);

testimonyRepository.resourceToModel = async (resource) => {
  const model = _.pick(resource, ["cliPic", "cliName", "cliRev"]);

  return model;
};

testimonyRepository.modelToResource = async (model) => {
  if (!model) return {};

  const resource = model.toJSON();
  return resource;
};

module.exports = testimonyRepository;
