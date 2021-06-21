import KVdb from "kvdb.io";

import { NextApiRequest, NextApiResponse } from "next";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const bucket = KVdb.bucket("TxcuiQGRNy6E2JGa6RmfG3");
  const id = req.query.id;

  let data;
  try {
    data = await bucket.get(id);
  } catch {
    return res.status(404).json({ message: "Not Found" });
  }
  return res.status(200).json(data);
};

export default handler;
