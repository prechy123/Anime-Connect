import Relationship from "../models/relationshipModel.mjs";
import User from "../models/userModel.mjs";

/**
 * JSDoc
 * @route PATCH /users/:id/follow
 * @param {string} req.userId - The ID of the current user
 * @param {string} req.params.id - The ID of the user to follow
 */
export const followUser = async (req, res) => {
  try {
    const followerId = req.body.userId;
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
    res.status(200).json({ message: "User followed successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Some error occurred while following the user" });
  }
};

/**
 * JSDoc
 * @route PATCH /users/:id/unfollow
 * @param {string} req.userId -
 * @param {string} req.params.id
 */
export const unFollowUser = async (req, res) => {
  try {
    const followerId = req.body.userId;
    const followingId = req.params.id;

    const relationshipExist = await Relationship.exists({
      follower: followerId,
      following: followingId,
    });
    if (!relationshipExist) {
      return res.status(400).json({ message: "Relationship does not exist" });
    }
    await Promise.all([
      User.findByIdAndUpdate(followingId, { $pull: { followers: followerId } }),
      User.findByIdAndUpdate(followerId, { $pull: { following: followingId } }),
    ]);

    await Relationship.deleteOne({
      follower: followerId,
      following: followingId,
    });
    res.status(200).json({ message: "User unfollowed successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Some error occured while unfollowing the user" });
  }
};
