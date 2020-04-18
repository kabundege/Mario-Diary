import Joi from '@hapi/joi';

export default class UserValidator {
  static signup(user) {
    const schema = Joi.object().keys({
      firstName: Joi.string().required().trim().error(new Error("Enter the firstName")),
      lastName: Joi.string().required().trim().error(new Error("Enter the LastName")),
      email: Joi.string().email().required().trim().error(new Error("Email must be valid")),
      password: Joi.string().required().min(5).trim().error(new Error("Enter the password")),
      confirmPassword: Joi.string().required().min(5).trim().error(new Error("Enter the confirm password"))
    });
    return schema.validate(user, { abortEarly: false });
  }

  static signin(user) {
    const schema = Joi.object().keys({
      email: Joi.string().email().required().trim().error(new Error("Email must be valid")),
      password: Joi.string().required().min(5).trim().error(new Error("Enter the password")),
    });
    return schema.validate(user, { abortEarly: false });
  }

  static email(user) {
    const schema = Joi.object().keys({
      email: Joi.string().email().required().trim().error(new Error("Email must be valid"))
    });
    return schema.validate(user, { abortEarly: false });
  }

  static reset(user) {
    const schema = Joi.object().keys({
      password: Joi.string().required().min(5).trim().error(new Error("Enter the password")),
      confirmPassword: Joi.string().required().min(5).trim().error(new Error("Enter the confirm password"))
    });
    return schema.validate(user, { abortEarly: false });
  }

  static story(user) {
    const schema = Joi.object().keys({
      title: Joi.string().min(5).required().trim().error(new Error("Minimum Title is 5 words")),
      content: Joi.string().min(50).required().error(new Error("Minimum Content is 50 words")),
      status:  Joi.string().required().trim().error(new Error("Missing Share createria"))
    });
    return schema.validate(user, { abortEarly: false });
  }

  static contactUS(user) {
    const schema = Joi.object().keys({
      subject: Joi.string().min(5).required().trim().error(new Error("Minimum subject is 5 words")),
      content: Joi.string().min(10).required().error(new Error("Minimum Content is 10 words")),
      authorEmail: Joi.string().email().required().trim().error(new Error("Email must be valid"))
    });
    return schema.validate(user, { abortEarly: false });
  }

}
