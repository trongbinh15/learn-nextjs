import withSession from "../../lib/withSession"

export default withSession(async (req, res) => {
  req.session.destroy();
  res.json(true)
})
