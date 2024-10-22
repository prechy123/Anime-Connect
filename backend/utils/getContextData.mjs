//geoip to get the current location of user from IP address
import geoip from "geoip-lite";

const getContextData = (ip, useragent) => {
  const ipaddress = ip;
  const location = geoip.lookup(ip) || false;
  //so if value is faulsy(null, undefines) it will set the value to "Unknown", false
  const city = location.city || "Unknown";
  const country = location.country || "Unknown";
  const isMobile = useragent.isMobile || false;
  const isDesktop = useragent.isDesktop || false;
  const isTablet = useragent.isTablet || false;
  const browser = useragent.browser || "Unknown";
  const version = useragent.version || "Unknown";
  const os = useragent.os || "Unknown";
  const platform = useragent.platform || "Unknown";
  const deviceType = isMobile
    ? "Mobile"
    : isDesktop
    ? "Desktop"
    : isTablet
    ? "Tablet"
    : "Unknown";

  return {
    ipaddress,
    city,
    country,
    deviceType,
    browser,
    version,
    os,
    platform,
  };
};

export default getContextData;
