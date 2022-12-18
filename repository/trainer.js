const _ = require("lodash");
const { trainers } = require("../models");
const { factory } = require("./baseRepository");

const trainerRepository = factory(trainers);

trainerRepository.resourceToModel = async (resource) => {
  const model = _.pick(resource, ["image", "name", "expertise"]);

  return model;
};

trainerRepository.modelToResource = async (model) => {
  if (!model) return {};

  const resource = model.toJSON();
  return resource;
};

module.exports = trainerRepository;
