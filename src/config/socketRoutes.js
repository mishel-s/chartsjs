const socketRoutes = (params1, params2) => {
  const { hostname } = window.location;
  const socketAddress =
    hostname === 'mishel-s.github.io' ? `https://${hostname}/chartsjs:9876` : `http://${hostname}:9876`;
  return {
    randomNumbers: `${socketAddress}`,
  };
};

export default socketRoutes;
