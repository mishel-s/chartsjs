const socketRoutes = (params1, params2) => {
  const { hostname } = window.location;
  // we can add here route to certain server
  const socketAddress = hostname === 'mishel-s.github.io' ? `http://localhost:9876` : `http://${hostname}:9876`;
  return {
    randomNumbers: `${socketAddress}`,
  };
};

export default socketRoutes;
