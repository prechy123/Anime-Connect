import Relationship from "../models/relationshipModel.mjs"
















export const followUser = async (req, res) => {
    try {
        const followerId = res.userId
        const followingId = req.params.id

        const relationshipExist = await Relationship.exists({
            follower: followerId,
            following: followingId
        })
        if (relationshipExist) {
            return res.status(400).json({message: "Already following this user"})
        }

        await Promise.all([
            User.findByIdAndUpdate(
                followingId,
                {$addToSet: {followers: followerId}}
            ),
            User.findByIdAndUpdate(
                followerId,
                {$addToSet: {following: followingId}}
            )
        ])

    } catch(error) {

    }
  
}
export const unFollowUser = (req, res) => {

}