import uuidv4 from "uuid/v4";
import responseHandler from "../helpers/responseHandler";
import Methods from "../helpers/dbMethods";

export default class staffController {
    static async createAstory(req, res) {
        const { title,content,status } = req.body;
        const storyID = uuidv4();
        const user = await Methods.select("*", "users", `userid='${req.user.userid}'`);
        const newStr = await Methods.insert(
          "stories",
          "storyid,ownerId,owner,title,content,share",
          "$1,$2,$3,$4,$5,$6",
          [storyID, user[0].userid, user[0].firstname +' '+ user[0].lastname, title, content,status],
          "*"
        );
          responseHandler.successful(201, `Story ${title} successful`, {
            storyID,
            owner:newStr.owner
          });
          return responseHandler.send(res);
      }
    
    static async AllUserStories(req,res){
      const stories = await Methods.select("*","stories",`ownerId='${req.user.userid}'`)
        
      if(!stories[0]){
          responseHandler.error(404,new Error('No Stories Yet'))
          return responseHandler.send(res)
      }

      responseHandler.successful(200,'Fetch Successful',stories)
      return responseHandler.send(res)
      }

    static async SpecificStory(req,res){

      let storyID = req.params.storyID

      const AllUserStories = await Methods.select("*", "stories", `ownerId='${req.user.userid}'`);

      if(!AllUserStories[0]){
        responseHandler.error(404,new Error('No Stories Yet'))
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
        responseHandler.error(404,new Error('No Stories Yet'))
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
        responseHandler.error(404,new Error('No Stories Yet'))
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

    // static async status(req,res){
    //   let id = req.params.userid;

    //   const { status } = req.body;
      
    //   let  User = await Methods.select('*','users',`userid='${req.user.userid}'`);
    //   if(User[0].role !== 'admin'){
    //     responseHandler.error(403,new Error('Restricted Arrea'))
    //     return responseHandler.send(res)
    //   }

    //   if(status!=='active'&&status!=='dormant'){
    //     responseHandler.error(400,new Error('Invalid status'))
    //     return responseHandler.send(res)
    //   }
  
    //   let user = await Methods.select('*','users',`userid = '${id}'`)
    //   if(!user[0]){
    //     responseHandler.error(404,new Error('Account Not Found'))
    //     return responseHandler.send(res)
    //   }
    //   let Acc = await Methods.update('accounts',`status='${status}'`,`userid='${id}'`,'*');
    //   responseHandler.successful(200,`${status}ed successfully`,Acc)
    //   return responseHandler.send(res)
    //   }
}
