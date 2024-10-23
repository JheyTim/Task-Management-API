require('dotenv').config();
const express = require('express');
const taskRouter = require('./routes/task');

const app = express();

app.use(express.json());

app.use('/', taskRouter);

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
