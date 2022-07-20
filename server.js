const { app } = require('./app');

const { initModels } = require('./models/initModels');

// Utils
const { db } = require('./utils/database.util');

db.authenticate()
  .then(() => console.log('Db authenticated'))
  .catch((err) => console.log(err));

// Establish model's relations
initModels();

db.sync()
  .then(() => console.log('Db synced'))
  .catch((err) => console.log(err));

app.listen(4000, () => {
  console.log('Express app running!!');
});
