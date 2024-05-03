import Community from "../models/communityModel.mjs";

export const createCommunity = async (req, res) => {
  const { userId, username, communityName, communityDetail } = req.body;
  const existingCommunity = await Community.findOne({
    communityname: communityName,
  });
  if (existingCommunity) {
    return res
      .status(400)
      .json({ message: "Community already exist try another" });
  }
  try {
    const newCommunity = new Community({
      communityname: communityName,
      communitydetail: communityDetail,
      members: [
        {
          userId,
          username,
        },
      ],
      membersCount: 1,
    });
    await newCommunity.save();
    res.status(200).json({ message: "Community created successfully" });
  } catch (err) {
    res.status(500).json({ message: "Internal Server Erro" });
  }
};
// not tested
export const getAllCommunities = async (req, res) => {
  try {
    const communities = await Community.find({}).select("_id");
    res.status(200).json({ message: communities });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};
// not tested and finished
export const viewCommunity = async (req, res) => {
  const {communityId} = req.query;
  try {
    const community = await Community.findById(communityId)
    if (!community) {
        return res.status(400).json({message: "Community not found"})
    }
  } catch (error) {
    res.status(500).json({message: "Internal Server Error"})
  }
};
