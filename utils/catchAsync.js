// used to wrap async callsbacks in routes to handle errors
module.exports = (func) => {
  return (req, res, next) => {
    func(req, res, next).catch(next);
  };
};
