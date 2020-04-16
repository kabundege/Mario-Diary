import Validator from "../helpers/validation";
import responseHandler from "../helpers/responseHandler";
 
export default class userValidatorMid {
  static Story(req, res, next) {
    const { error } = Validator.story(req.body);
    if (error) {
      const newMessage = error;
      responseHandler.error(400, new Error(newMessage));
      return responseHandler.send(res);
    }
    return next();
  }  
}
