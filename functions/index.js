import app from "./app.js";
import functions from "firebase-functions";

export default functions.region("asia-southeast1").https.onRequest(app);
