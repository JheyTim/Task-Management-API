require('dotenv').config();
const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const authRouter = require('./routes/auth');
const taskRouter = require('./routes/task');

const app = express();

app.use(express.json());

app.use(helmet());
app.use(
  cors({
    // origin: ['https://yourapp.com'], // Only allow your trusted domain
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Authorization', 'Content-Type'],
  })
);
app.use(taskRouter);
app.use(authRouter);

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
