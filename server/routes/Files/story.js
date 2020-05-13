import express from "express";
import StoryController from "../../controllers/storiesController";
import auth from '../../middleware/auth';
import Validation from "../../middleware/storyValidation";

const route = express.Router();

route.post('/stories',auth.access,Validation.Story,StoryController.createAstory)

route.get('/stories',auth.access,StoryController.AllUserStories)

route.get('/public/stories',StoryController.publicStories)

route.get('/story/:storyID',auth.access,StoryController.SpecificStory)

route.patch('/like/:storyID',StoryController.like)

route.post('/contactUs',Validation.contactUS,StoryController.conctactUs)

route.patch('/story/:storyID',auth.access,Validation.Story,StoryController.updateAstory)

route.delete('/story/:storyID',auth.access,StoryController.deleteAstory)

export default route;