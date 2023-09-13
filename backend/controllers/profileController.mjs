import Relationship from "../models/relationshipModel.mjs"
















export const followUser = (req, res) => {
    try {
        const followerId = res.userId
        const followingId = req.params.id

        const relationshipExist = Relationship.exists({
            follower: followerId,
            following: followingId
        })
        
        if (relationshipExist) {
            return res.status(400).json({message: "Already following this user"})
        }
    } catch(error) {

    }
  
}
export const unFollowUser = (req, res) => {

}