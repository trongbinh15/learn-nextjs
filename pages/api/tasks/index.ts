import { jsonServerAPI } from '../../../constant/index';
import axios from "axios"
import { NextApiRequest, NextApiResponse } from "next"
import { cors } from "../../../lib/init-middleware"

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await cors(req, res)
  const { method, body } = req;
  console.log('body:', body)
  const { id } = req.query;

  const baseUrl = jsonServerAPI + "/tasks";

  switch (method) {
    case 'GET':
      const result = await axios.get(baseUrl);
      res.status(200).json(result.data);
      break;
    case 'POST':
      const resultPost = await axios.post(`${baseUrl}`, body);
      res.status(200).json(resultPost.data);
      break;
    case 'PUT':
      const resultPut = await axios.put(`${baseUrl}/${id}`, body);
      res.status(200).json(resultPut.data);
      break;
    case 'DELETE':
      const resultDelete = await axios.delete(`${baseUrl}/${id}`);
      res.status(200).json(resultDelete.data);
      break;

    default:
      break;
  }
}