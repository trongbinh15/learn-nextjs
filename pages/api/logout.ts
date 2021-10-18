import withSession from "../../lib/withSession"

export default withSession(async (req: any, res: any) => {
  req.session.destroy();
  res.json(true)
})
