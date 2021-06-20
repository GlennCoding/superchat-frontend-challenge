import KVdb from "kvdb.io";
import { v4 as uuidv4 } from "uuid";

import { NextApiRequest, NextApiResponse } from "next";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const bucket = KVdb.bucket("TxcuiQGRNy6E2JGa6RmfG3");
  const data = req.body;

  while (true) {
    const newID = uuidv4().slice(0, 7);
    try {
      await bucket.get(newID);
    } catch {
      try {
        await bucket.set(newID, JSON.stringify(data));
        res.status(200).json({ repoID: newID });
        false;
      } catch {
        res.status(500);
      }
    }
  }
};

export default handler;
