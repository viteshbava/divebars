const joi = require("joi");

const divebarSchema = joi.object({
  divebar: joi
    .object({
      title: joi.string().required(),
      capacity: joi.number().integer().required().min(0),
      description: joi.string().required(),
      location: joi.string().required(),
      image: joi.string().optional().allow(""),
      map: joi.string().optional().allow(""),
    })
    .required(),
});

const reviewSchema = joi.object({
  review: joi
    .object({
      title: joi.string().required(),
      body: joi.string().required(),
      rating: joi.number().required().min(1).max(5),
    })
    .required(),
});

module.exports = { divebarSchema, reviewSchema };
