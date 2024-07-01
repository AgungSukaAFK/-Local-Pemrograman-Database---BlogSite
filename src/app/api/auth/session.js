// /pages/api/auth/session.js
import { getSession } from "next-auth/react";

const anjay = async (req, res) => {
  try {
    const session = await getSession({ req });
    if (!session) {
      return res.status(401).json({ error: "Not authenticated" });
    }
    return res.status(200).json(session);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

export default anjay;
