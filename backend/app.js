import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import bodyParser from 'body-parser';

import { uploadOutputToIPFS, getOutputFromIPFS } from './libs/ipfs.js';

dotenv.config();

const app = express();
const PORT = 3001;

app.use(cors());
app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.send('Hello World!!!!');
});

app.get('/download-from-ipfs/', async (req, res) => {
  const { path } = req.query;

  const output = await getOutputFromIPFS(path);

  res.send(JSON.stringify({ output }));
});

app.post('/upload-output-to-ipfs', async (req, res) => {
  const { output } = req.body;
  const { path } = await uploadOutputToIPFS(output);

  console.log({ path });
  res.send(JSON.stringify({ path }));
});

app.listen(PORT, () => {
  console.log(`Server listening on PORT ${PORT}`);
});
