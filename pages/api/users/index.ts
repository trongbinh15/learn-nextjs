import { jsonServerAPI } from '../../../constant/index';
import axios from "axios"
import { NextApiRequest, NextApiResponse } from "next"
import { cors } from "../../../lib/init-middleware"

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await cors(req, res)
  const { method } = req;

  switch (method) {
    case 'GET':
      const result = await axios.get(jsonServerAPI + '/users');
      res.status(200).json(result.data);
      break;
    case 'POST':
      const { body } = req;
      const resultPost = await axios.post(jsonServerAPI + '/users', body);
      res.status(200).json(resultPost.data);
      break;
    case 'DELETE':
      const { id } = req.query;
      const resultDelete = await axios.delete(jsonServerAPI + '/users/' + id);
      res.status(200).json(resultDelete.data);
      break;

    default:
      break;
  }
}