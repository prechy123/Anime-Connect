import Relationship from "../models/relationshipModel.mjs";


/**
 * JSDoc
 * @route PATCH /users/:id/follow
 * @param {string} req.userId - The ID of the current user
 * @param {string} req.params.id - The ID of the user to follow 
 */
export const followUser = async (req, res) => {
  try {
    const followerId = res.userId;
    const followingId = req.params.id;

    const relationshipExist = await Relationship.exists({
      follower: followerId,
      following: followingId,
    });
    if (relationshipExist) {
      return res.status(400).json({ message: "Already following this user" });
    }

    await Promise.all([
      User.findByIdAndUpdate(followingId, {
        $addToSet: { followers: followerId },
      }),
      User.findByIdAndUpdate(followerId, {
        $addToSet: { following: followingId },
      }),
    ]);
    await Relationship.create({ follower: followerId, following: followingId });
    res.status(200).json({ message: "User followe successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Some error occurred while following the user" });
  }
};
export const unFollowUser = (req, res) => {

};
