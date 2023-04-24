import app from "./app.js";
import functions from "firebase-functions";
// const port = 3001;

// app.listen(port, () => {
//   console.log(`API listening on port ${port}`);
// });

export default functions.region("asia-southeast1").https.onRequest(app);
