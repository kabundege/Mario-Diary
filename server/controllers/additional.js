import responseHandler from "../helpers/responseHandler";
import Methods from "../helpers/dbMethods";

export default class Additional {
    static async search(req,res){
        const { content,searchType } = req.body;
        let Data;

        if(searchType !== 'story' && searchType !== 'people'){
            responseHandler.error(400,new Error("Something is Missing"))
            return responseHandler.send(res)
        }

        if(!content || content === " "){
            responseHandler.error(400,new Error("Must Input Search Content"))
            return responseHandler.send(res)
        }

        if(searchType === 'story'){
            const stories = await Methods.select('*',"stories")

            if(!stories[0]){
                responseHandler.error(404,new Error("No Stories Yet"))
                return responseHandler.send(res)
            }

            const GotStory = stories.filter(story=> story.content.includes(content))

            if(!GotStory[0]){
                responseHandler.error(404,new Error("No Story With That Specifications"))
                return responseHandler.send(res)
            }

            Data = GotStory.sort(()=>-1);
        } else { 
            
            const people = await Methods.select('*','users',`role='client'`);

            const gotUser = people.filter(person=>{
                const name = person.firstname + ' ' + person.lastname;
                if(name.includes(content)) return person 
            })

            if(!gotUser[0]){
                responseHandler.error(404,new Error("No User By That Name"))
                return responseHandler.send(res)
            }

            Data = gotUser.sort(()=>-1);  
        }

        responseHandler.successful(200,'Fetch Exited Succesfully',Data)
        return responseHandler.send(res)
    }
}
