// eslint-disable-next-line no-unused-vars
const dotenv = require('dotenv').config({ path: './config.env' });
const app = require('./app');

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});
