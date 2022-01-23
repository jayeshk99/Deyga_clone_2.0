/** @format */

const app = require("./index");
const port = process.env.PORT || 5000;

const connect = require("./configs/db");

app.listen(port, async () => {
  try {
    await connect();
  } catch (error) {
    console.log("error: ", error);
  }
  console.log(`Listening to port ${port}`);
});
