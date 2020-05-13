import express from "express";
import auth from '../../middleware/auth';
import Adds from "../../controllers/comments";
import Validation from "../../middleware/commentValidation";

const route = express.Router();

route.get('/:storyID',Validation.storyCheck,Adds.getComments)

route.post('/:storyID',Validation.storyCheck,Validation.comment,Adds.createAcomment)

route.delete('/:storyID/:commentID',auth.access,Validation.storyCheck,Adds.deleteAcomment)

export default route;