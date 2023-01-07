import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import path from 'path';

const app = express();
require('dotenv').config();
const { PORT } = process.env;
const port = PORT || 5000;

// Middlewares
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

import auth from './API/auth';
import slams from './API/slams';

// api routes
app.use('/api/auth', auth);
app.use('/api/slams', slams);

app.use(express.static(path.join(__dirname,"../client/build")));

app.get('*',(req,res)=>{
  res.sendFile(path.join(__dirname,"../client/build/indexx.html"))
})

app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`);
});
