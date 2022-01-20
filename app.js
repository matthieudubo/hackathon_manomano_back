const { setupRoutes } = require('./routes');
const express = require('express');
const app = express();
const cors = require("cors");


const port = process.env.PORT || 3000;

const corsOptions = {
  origin: "*",
  credentials: true, // access-control-allow-credentials:true
  optionSuccessStatus: 200,
  maxAge: 3600
};
app.use(cors(corsOptions));

app.use(express.json());

setupRoutes(app);

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
