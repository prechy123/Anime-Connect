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
    const followerId = req.userId;
    const followingId = req.params.id;
    // console.log(followerId)
    if (followerId === followingId) {
      return res.status(400).json({ message: "You can not follow yourself" });
    }
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
    const followerId = req.userId;
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

/**
 * Retrieves the users that the current user is following, including their name, avatar, location,
 * and the date when they were followed, sorted by the most recent follow date.
 *
 * @route GET /users/following
 * @param {String} req.userId - The ID of the current user
 */
export const getFollowingUsers = async (req, res) => {
  try {
    const { userId } = req;
    const relationships = await Relationship.find({
      follower: userId,
    })
      .populate("following", "_id username fullname profilepictureurl location")
      .lean();

    const followingUsers = relationships
      .map((relationship) => ({
        ...relationship.following,
        followingSince: relationship.createdAt,
      }))
      .sort((a, b) => b.followingSince - a.followingSince);
    res.status(200).json({ message: followingUsers });
  } catch (err) {
    res.status(500).json({
      message: "Some error occurred while retrieving the following users",
    });
  }
};

/**
 * Retrieves the users that the current user followers, including their name, avatar, location,
 * and the date when they were followed, sorted by the most recent follow date.
 *
 * @route GET /users/follower
 * @param {String} req.userId - The ID of the current user
 */
export const getFollowerUsers = async (req, res) => {
  try {
    const { userId } = req;
    const relationship = await Relationship.find({
      following: userId,
    })
      .populate("follower", "_id username fullname profilepictureurl location")
      .lean();
    const followerUser = relationship
      .map((relationship) => ({
        ...relationship.follower,
        followerSince: relationship.createdAt,
      }))
      .sort((a, b) => b.followerSince - a.followerSince);
    res.status(200).json({ message: followerUser });
  } catch (err) {
    res.status(500).json({
      message: "Some error occurred while retrieving the following users",
    });
  }
};

export const changeProfilePicture = async (req, res) => {
  try {
    const { pictureUrl, userId } = req.body;
    const existingUser = await User.findById(userId);
    if (!existingUser) {
      return res.status(404).json({ message: "Account not found" });
    }
    existingUser.profilepictureurl = pictureUrl;
    await existingUser.save();
    res.status(200).json({ message: "Updated successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const changeTheme = async (req, res) => {
  try {
    const { theme, userId } = req.body;
    const existingUser = await User.findById(userId);
    if (!existingUser) {
      return res.status(404).json({ message: "Account not found" });
    }
    existingUser.theme = theme;
    await existingUser.save();
    res.status(200).json({ message: "Updated successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
