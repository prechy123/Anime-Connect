//geoip to get the current location of user from IP address
import geoip from "geoip-lite";

const getContextData = (ip, useragent) => {
  const ipaddress = ip;
  const location = geoip.lookup(ip);
  const { city, country } = location;
  const { isMobile, isDesktop, isTablet, browser, version, os, platform } =
    useragent;
  const deviceType = isMobile
    ? "Mobile"
    : isDesktop
    ? "Desktop"
    : isTablet
    ? "Tablet"
    : "Unknown";

  return { ipaddress, city, country, deviceType, browser, version, os, platform };
};

export default getContextData;
