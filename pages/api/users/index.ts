import { baseAPI } from '../../../constant/index';
import axios from "axios"
import { NextApiRequest, NextApiResponse } from "next"
import { cors } from "../../../lib/init-middleware"

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await cors(req, res)

  const { method } = req;

  switch (method) {
    case 'GET':
      const result = await axios.get(baseAPI + '/users');
      res.status(200).json(result.data);
      break;

    default:
      break;
  }
}