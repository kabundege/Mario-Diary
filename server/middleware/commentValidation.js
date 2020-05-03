import Validator from "../helpers/validation";
import responseHandler from "../helpers/responseHandler";
import Methods from "../helpers/dbMethods";
 
export default class commentValidatorMid {
  static comment(req, res, next) {
    const { error } = Validator.comment(req.body);
    if (error) {
      const newMessage = error;
      responseHandler.error(400, new Error(newMessage));
      return responseHandler.send(res);
    }
    return next();
  } 
  static async storyCheck(req, res, next){
    const { storyID } = req.params;

    const story = await Methods.select("*", "stories", `storyid='${storyID}'`);

    if(!story[0]){
      responseHandler.error(404,new Error('Story NotFound'))
      return responseHandler.send(res)
    }
    
    return next();
  }
}
