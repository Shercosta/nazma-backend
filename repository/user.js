const _ = require("lodash");
const { users } = require("../models");
const { factory } = require("./baseRepository");

const userRepository = factory(users);

userRepository.resourceToModel = async (resource) => {
  const model = _.pick(resource, ["userName", "role"]);

  if (resource.password) model.password = await hashText(resource.password);

  return model;
};

userRepository.modelToResource = async (model) => {
  if (!model) return {};

  const resource = model.toJSON();
  return _.omit(resource, ["password", "createdAt", "updatedAt"]);
};

module.exports = userRepository;
