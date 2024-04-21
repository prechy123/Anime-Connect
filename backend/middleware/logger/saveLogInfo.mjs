import getContextData from "../../utils/getContextData.mjs";
import Log from "../../models/logModel.mjs";

const saveLogInfo = async (req, message, type) => {
  try {
    const ip = req?.clientIp;
    const useragent = req?.useragent;
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
    const email = req?.body?.email;
    const newLog = new Log({
      email,
      context,
      message,
      type,
    });
    await newLog.save();
  } catch (err) {
    console.log(err);
  }
};

export default saveLogInfo;
