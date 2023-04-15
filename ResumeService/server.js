const dotenv = require("dotenv");
dotenv.config({ path: "./config.env" });

const app = require("./app");

const port = process.env.port || 8000;

app.main.listen(port, () => {
  console.log(`Server started on port ${port}`);
});