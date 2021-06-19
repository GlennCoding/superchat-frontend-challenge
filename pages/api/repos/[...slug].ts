import type { NextApiRequest, NextApiResponse } from "next";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { slug } = req.query;

  const url = `https://api.github.com/repos/${slug[0]}/${slug[1]}`;

  try {
    const response = await fetch(url);
    const data = await response.json();
    res.status(200).json(data);
  } catch {
    res.status(404).json({ message: "Repository not found" });
  }
};

export default handler;
