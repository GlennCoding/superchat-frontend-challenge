import KVdb from "kvdb.io";

import { NextApiRequest, NextApiResponse } from "next";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const bucket = KVdb.bucket("TxcuiQGRNy6E2JGa6RmfG3");
  const id = req.query.id;
  // const id = "abc";

  let data;
  try {
    data = await bucket.get(id);
    res.status(200).json(data);
  } catch {
    res.status(404).json({ message: "Not Found" });
  }
};

export default handler;
