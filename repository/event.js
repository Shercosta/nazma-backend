const _ = require("lodash");
const { events } = require("../models");
const { factory } = require("./baseRepository");

const eventRepository = factory(events);

eventRepository.resourceToModel = async (resource) => {
  const model = _.pick(resource, [
    "title",
    "address",
    "time",
    "month",
    "date",
    "image",
    "description",
    "registration",
  ]);

  return model;
};

eventRepository.modelToResource = async (model) => {
  if (!model) return {};

  const resource = model.toJSON();
  return resource;
};

module.exports = eventRepository;
