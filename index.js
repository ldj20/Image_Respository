const app = require('./app')

const PORT = process.env.PORT || 8989;

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});