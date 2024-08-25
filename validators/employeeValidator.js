const Joi = require("joi");
const Response = require('../helper/response');

const regularExpression = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/;

const createEmployeeValidator = async (req, res, next) => {
  try {
    const bodySchema = Joi.object({
      name: Joi.string()
        .trim()
        .pattern(/^[0-9a-zA-Z ,/-]+$/)
        .messages({
          "string.pattern.base": `HTML tags & Special letters are not allowed!`,
        }),
      email: Joi.string().email().required(),
      password: Joi.string()
        .pattern(regularExpression)
        .messages({
          "string.pattern.base": `Password min 8 letter, with at least a symbol, upper and lower case letters and a number!`,
        })
        .min(8)
        .max(15)
        .required(),
      role: Joi.string().valid('USER', 'ADMIN').required() // Validate role
    });

    await bodySchema.validateAsync(req.body);

    next();
  } catch (error) {
    console.log(error);
    return Response.errorResponse(req, res, error, 400); // Return bad request status code
  }
};

//VIEW EMPLOYEE VALIDATOR
const viewSingleEmployeeValidator = async (req, res, next) => {
  try {
    const paramsSchema = Joi.object({
      id: Joi.string().trim().alphanum().required(),
    });
    await paramsSchema.validateAsync(req.params);
    next();
  } catch (error) {
    console.log(error);
    return Response.errorResponse(req, res, error, 200);
  }
};


// EDIT EMPLOYEE VALIDATOR
const editEmployeeValidator = async (req, res, next) => {
  try {
    const bodySchema = Joi.object({
      name: Joi.string().trim().pattern(/^[0-9a-zA-Z ,/-]+$/)
      .messages({
          "string.pattern.base": `HTML tags & Special letters are not allowed!`,
        }),
      email: Joi.string().email(),
      designation: Joi.string(),
      department: Joi.string()
     
    });
    console.log("bodySchema--", bodySchema);
    const paramsSchema = Joi.object({
      id: Joi.string().trim().alphanum().required(),
    });
    await paramsSchema.validateAsync(req.params);
    await bodySchema.validateAsync(req.body);

    next();
  } catch (error) {
    console.log(error);
    return Response.errorResponse(req, res, error, 200);
  }
};
//DELETE EMPLOYEE VALIDATOR
const deleteEmployeeValidator = async (req, res, next) => {
  try {
    const paramsSchema = Joi.object({
      id: Joi.string().trim().alphanum().required(),
    });
    await paramsSchema.validateAsync(req.params);
    next();
  } catch (error) {
    console.log(error);
    return Responses.errorResponse(req, res, error);
  }
};

//LSIT EMPLOYEE VALIDATOR
const listEmployesValidator = async (req, res, next) => {
try {
  const bodySchema = Joi.object({
    searchKey: Joi.string()
      .trim()
      .pattern(/^[0-9a-zA-Z ,/-]+$/)
      .messages({
        "string.pattern.base": `HTML tags & Special letters are not allowed!`,
      }),
  });
  const paramsSchema = Joi.object({
    limit: Joi.number(),
    page: Joi.number(),
    order: Joi.number(),
  });
  await bodySchema.validateAsync(req.body);
  await paramsSchema.validateAsync(req.query);

  next();
} catch (error) {
  console.log(error);
  return Responses.errorResponse(req, res, error, 200);
}
};


module.exports = {
  createEmployeeValidator,
  viewSingleEmployeeValidator,
  editEmployeeValidator,
  deleteEmployeeValidator,
  listEmployesValidator
};
