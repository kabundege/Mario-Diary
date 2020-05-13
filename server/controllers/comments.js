import uuidv4 from "uuid/v4";
import responseHandler from "../helpers/responseHandler";
import Methods from "../helpers/dbMethods";

export default class Additional{
    static async getComments(req,res){
        const { storyID } = req.params;

        const Comments = await Methods.select('*','comments',`storyid='${storyID}'`)

        if(!Comments[0]){
            responseHandler.error(404,new Error('No Comments Found'))
            return responseHandler.send(res)
        }

        responseHandler.successful(200,'Fetch was Sucessful',Comments)
        return responseHandler.send(res)
    }

    static async createAcomment(req,res){
        const { storyID } = req.params;
        const { content,author } = req.body;
        const commentID = uuidv4();

        const comment = await Methods.insert(
            "comments",
            "commentid,storyid,author,content",
            "$1,$2,$3,$4",
            [commentID, storyID, author, content],
            "*"
        );

        responseHandler.successful(201, 'Comment was created successful', comment);
        return responseHandler.send(res);
    }

    static async deleteAcomment(req,res){
        const { commentID } = req.params;

        if(req.userData.role !== 'admin'){
            responseHandler.error(403,new Error('Restricted Action'))
            return responseHandler.send(res)
        }

        const deletedComment = await Methods.delete('comments',`commentid='${commentID}'`,'*');

        if(!deletedComment){
            responseHandler.error(404,new Error('No Story With That Id'))
            return responseHandler.send(res)
        }

        responseHandler.successful(200,`Deleted ${deletedComment.author}'s Comment Sucessfully`)
        return responseHandler.send(res)
    }
    
}
