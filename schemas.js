const BaseJoi = require("joi");
const sanitizeHtml = require("sanitize-html");

const extension = (joi) => ({
  type: "string",
  base: joi.string(),
  messages: {
    "string.escapeHTML": "{{#label}} must not include HTML!",
  },
  rules: {
    escapeHTML: {
      validate(value, helpers) {
        const filtered = sanitizeHtml(value, {
          allowedTags: false,
          allowedAttributes: false,
        });
        const clean = sanitizeHtml(filtered, {
          allowedTags: [],
          allowedAttributes: {},
        });
        if (clean !== filtered) return helpers.error("string.escapeHTML");
      },
    },
  },
});

const joi = BaseJoi.extend(extension);

const divebarSchema = joi.object({
  divebar: joi
    .object({
      title: joi.string().required().escapeHTML(),
      capacity: joi.number().integer().required().min(0),
      description: joi.string().required().escapeHTML(),
      location: joi.string().required().escapeHTML(),
      image: joi.string().optional().allow(""),
    })
    .required(),
});

const reviewSchema = joi.object({
  review: joi
    .object({
      title: joi.string().required().escapeHTML(),
      body: joi.string().required().escapeHTML(),
      rating: joi.number().required().min(1).max(5),
    })
    .required(),
});

module.exports = { divebarSchema, reviewSchema };
