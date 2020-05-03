import Validator from "../helpers/validation";
import responseHandler from "../helpers/responseHandler";
 
export default class StoryValidatorMid {
  static Story(req, res, next) {
    const { error } = Validator.story(req.body);
    if (error) {
      const newMessage = error;
      responseHandler.error(400, new Error(newMessage));
      return responseHandler.send(res);
    }
    return next();
  }
  static contactUS(req, res, next) {
    const { error } = Validator.contactUS(req.body);
    if (error) {
      const newMessage = error;
      responseHandler.error(400, new Error(newMessage));
      return responseHandler.send(res);
    }
    return next();
  }  
}
