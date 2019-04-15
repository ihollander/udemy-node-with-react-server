module.exports = app => {
  app.post("/api/stripe", (req, res) => {
    // req to stripe
    // update the user
    res.send(req.user);
  });
};
