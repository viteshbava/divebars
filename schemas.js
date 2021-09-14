const joi = require("joi");

const divebarSchema = joi.object({
  divebar: joi
    .object({
      title: joi.string().required(),
      // capacity: joi.optional(),
      capacity: joi.optional().allow(null),
      // capacity: joi.number().optional().integer().min(0).allow(null),
      // capacity: joi.number().integer().min(0),
      description: joi.string().required(),
      location: joi.string().required(),
      // rating: joi.number().integer().allow(null).optional(),
      image: joi.string().optional().allow(""),
      map: joi.string().optional().allow(""),
    })
    .required(),
  // .when(joi.object({ capacity: joi.exist() }), {
  //   then: joi.object({ capacity: joi.number().integer().min(0) }),
  // }),
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
