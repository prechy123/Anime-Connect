const expirationTime = () => {
  return new Date().getTime() + 60 * 60 * 1000;
  // adding an hour
};

export default expirationTime;
