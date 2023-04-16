const dotenv = require("dotenv");
dotenv.config({ path: "./config.env" });

const app = require("./app");

const port = process.env.port || 4000;

app.main.listen(port, () => {
  console.log(`Frontend server started on port ${port}`);
});