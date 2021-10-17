import axios from "axios"
import { cors } from "../../lib/init-middleware";
import withSession from "../../lib/withSession"
import { GithubUserModel } from "../../models/user.model";

export default withSession(async (req: any, res: any) => {
  await cors(req, res);
  const { username } = await req.query;
  const { method } = req;
  const url = `https://api.github.com/users/${username}`

  switch (method) {
    case 'GET':
      try {
        // we check that the user exists on GitHub and store some data in session
        const { login, avatar_url: avatarUrl } = (await axios.get(url)).data;
        const user: GithubUserModel = { login, avatarUrl }
        req.session.set('user', user)
        await req.session.save()
        res.json(user)
      } catch (error: any) {
        const { response } = error;
        res.status(response.status || 500).json(response.data)
      }
      break;

    default:
      break;
  }

})
