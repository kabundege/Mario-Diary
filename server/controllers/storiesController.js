import uuidv4 from "uuid/v4";
import responseHandler from "../helpers/responseHandler";
import Methods from "../helpers/dbMethods";
import mailer from '../helpers/mailer';

export default class staffController {
    static async createAstory(req, res) {
      const { title,content,status } = req.body;
      const storyID = uuidv4();
      
      if(title === 'Untitled Document'){
        responseHandler.error(400,new Error('You Must Enter The Title'))
        return responseHandler.send(res)
      }

      const newStr = await Methods.insert(
        "stories",
        "storyid,ownerId,owner,likes,title,content,share,image",
        "$1,$2,$3,$4,$5,$6,$7,$8",
        [storyID, req.userData.userid, req.userData.firstname +' '+ req.userData.lastname,0, title, content,status,req.userData.image],
        "*"
      );
        responseHandler.successful(201, `Story ${title} was created successful`, {
          storyID,
          owner:newStr.owner
        });
        return responseHandler.send(res);
      }
    
    static async AllUserStories(req,res){
      const stories = await Methods.select("*","stories",`ownerId='${req.user.userid}'`)
        
      if(!stories[0]){
          responseHandler.error(404,new Error('Create Your first Story'))
          return responseHandler.send(res)
      }

      responseHandler.successful(200,'Fetch Successful',stories)
      return responseHandler.send(res)
      }

    static async SpecificStory(req,res){

      let storyID = req.params.storyID

      const AllUserStories = await Methods.select("*", "stories", `ownerId='${req.user.userid}'`);

      if(!AllUserStories[0]){
        responseHandler.error(404,new Error('Create Your first Story'))
        return responseHandler.send(res)
      }

      const SpecificStory = AllUserStories.find(story=> story.storyid === storyID)

      if(!SpecificStory){
        responseHandler.error(404,new Error('Story Was NotFound'))
        return responseHandler.send(res)
      }

      responseHandler.successful(200,'Fetch was Sucessful',SpecificStory)
      return responseHandler.send(res)
      }

    static async publicStories(req,res){

      const AllUserStories = await Methods.select("*", "stories", `share='public'`);

      if(!AllUserStories[0]){
        responseHandler.error(404,new Error('No Public Stories Yet'))
        return responseHandler.send(res)
      }

      responseHandler.successful(200,'Fetch was Sucessful',AllUserStories)
      return responseHandler.send(res)
      }

    static async updateAstory(req,res){

      let storyID = req.params.storyID
      const { title,content,status } = req.body;

      const AllUserStories = await Methods.select("*", "stories", `ownerId='${req.user.userid}'`);

      if(!AllUserStories[0]){
        responseHandler.error(404,new Error('Create Your first Story'))
        return responseHandler.send(res)
      }

      const SpecificStory = AllUserStories.find(story => story.storyid === storyID)

      if(!SpecificStory){
        responseHandler.error(404,new Error('Story Was NotFound'))
        return responseHandler.send(res)
      }
      const updatedStory = await Methods.update(
        'stories',
        `title='${title}',content='${content}',share='${status}'`,
        `storyid='${storyID}'`,
        '*');
      
      responseHandler.successful(200,`Story ${title} was updated Sucessfully`,updatedStory)
      return responseHandler.send(res)
      }
      
    static async deleteAstory(req,res){
      let storyID = req.params.storyID

      const AllUserStories = await Methods.select("*", "stories", `ownerId='${req.user.userid}'`);

      if(!AllUserStories[0]){
        responseHandler.error(404,new Error('Create Your first Story'))
        return responseHandler.send(res)
      }

      const SpecificStory = AllUserStories.find(story=> story.storyid === storyID)

      if(!SpecificStory){
        responseHandler.error(404,new Error('Story Was NotFound'))
        return responseHandler.send(res)
      }
      
      const deletedStory = await Methods.delete('stories',`storyid='${storyID}'`);

      responseHandler.successful(200,`Deleted Story ${deletedStory.title} Sucessfully`)
      return responseHandler.send(res)
      }

    static async like(req,res){
      const { storyID } = req.params

      const Story = await Methods.select("*", "stories", `storyid='${storyID}'`);
      
      if(!Story[0]){
        responseHandler.error(404,new Error('Story Was NotFound'))
        return responseHandler.send(res)
      }

      const updatedStory = await Methods.update(
        'stories',
        `likes='${Story[0].likes + 1}'`,
        `storyid='${storyID}'`,
        '*');
      
      responseHandler.successful(200,`Story ${Story[0].title} was likes Sucessfully`,updatedStory)
      return responseHandler.send(res)
      }

    static async conctactUs(req,res){
      mailer.conctactUs(req.body)
      responseHandler.successful(200,'Your will Receive a Response in 2 Business Days',req.body)
      return responseHandler.send(res)
      }

}
