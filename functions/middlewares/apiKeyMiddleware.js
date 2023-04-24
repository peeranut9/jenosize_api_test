import admin from "firebase-admin";

export default async (req, res, next) => {
  const token = req.headers["api-key"];
  if (!token) {
    return res.status(401).send("API key required");
  }
  try {
    const decodedToken = await admin.auth().verifyIdToken(token);
    if (decodedToken?.uid) {
      return next();
    } else {
      throw new Error();
    }
  } catch (error) {
    return res.status(401).send("Invalid API key");
  }
};
