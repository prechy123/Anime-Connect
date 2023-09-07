import getContextData from "../../utils/getContextData.mjs";
import Log from "../../models/logModel.mjs";

const saveLogInfo = async (req, res, next) => {
  try {
    const ip = req.clientIp;
    const useragent = req.useragent;
    const {
      ipaddress,
      city,
      country,
      deviceType,
      browser,
      version,
      os,
      platform,
    } = getContextData(ip, useragent);
    const context = `IP: ${ipaddress}, CITY: ${city}, COUNTRY: ${country}, DEVICETYPE: ${deviceType}, BROWSER: ${browser}, VERSION: ${version}, OS: ${os}, PLATFORM: ${platform}`;

    const newLog = new Log({
      email: req.body.email,
      context,
      message: "User is attempting logging in",
      type: "sign in",
      level: "Login information",
    });
    await newLog.save();
    next();
  } catch (err) {
    console.log(err);
    next();
  }
};

export default saveLogInfo;
