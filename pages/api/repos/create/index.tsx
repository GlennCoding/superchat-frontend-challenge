import KVdb from "kvdb.io";
import { v4 as uuidv4 } from "uuid";

import { NextApiRequest, NextApiResponse } from "next";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const bucket = KVdb.bucket("TxcuiQGRNy6E2JGa6RmfG3");
  const data = req.body;

  let newId: string | undefined;

  let uniqueIdGenerated = false;
  while (!uniqueIdGenerated) {
    newId = uuidv4().slice(0, 7);
    try {
      await bucket.get(newId);
    } catch {
      uniqueIdGenerated = true;
    }
  }
  try {
    await bucket.set(newId, JSON.stringify(data));
    return res.status(200).json({ repoId: newId });
  } catch (err) {
    return res.status(500).json({ message: err });
  }
};

export default handler;
