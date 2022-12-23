const _ = require("lodash");
const { galleries } = require("../models");
const { factory } = require("./baseRepository");

const galleryRepository = factory(galleries);

galleryRepository.resourceToModel = async (resource) => {
  const model = _.pick(resource, ["url", "caption"]);

  return model;
};

galleryRepository.modelToResource = async (model) => {
  if (!model) return {};

  const resource = model.toJSON();
  return resource;
};

module.exports = galleryRepository;
