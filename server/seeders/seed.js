const db = require('../config/connection');
const { User, Board, List, Card } = require('../models');
// const userSeeds = require('./userSeeds.json');


db.once('open', async () => {
  try {
    await Card.deleteMany({});
    await List.deleteMany({});
    await Board.deleteMany({});
    await User.deleteMany({});
    

    // await User.create(userSeeds);
    // await Board.create(boardSeeds);
    // await List.create(listSeeds);
    // await Card.create(cardSeeds);

    
  } catch (err) {
    console.error(err);
    process.exit(1);
  }

  console.log('all done!');
  process.exit(0);
});
