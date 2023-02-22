import express from 'express';
import cors from 'cors';
import axios from 'axios';

const app = express();
app.use(express.json());
app.use(cors({ origin: true }));

app.post("/authenticate", async (req, res) => {
  const { username, secret } = req.body;
  console.log(username, secret);
  try {
    const userRes = await axios.put(
      "https://api.chatengine.io/users/",
      { username, secret },
      {
        headers: {
          "private-key": "cf8bca27-fb9d-4678-9889-1608841d6082"
        }
      }
    )
    return res.status(userRes.status).json(userRes.data);
  } catch (error) {
    console.log(error);
    // return res.status(error.response.status).json(error.response.data);
  }
});

app.listen(3001);

// Project ID: 21763269-bc5a-433d-81d4-fdd501760a96
// Private Key: 