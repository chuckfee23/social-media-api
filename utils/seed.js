const connection = require("../config/connection");
const { Users, Thoughts, Reactions } = require("../models");
const { getRandomUsers, getRandomThoughts } = require("./data");

connection.on("error", (err) => err);

connection.once("open", async () => {
  console.log("connected");

  await Users.deleteMany({});
  await Thoughts.deleteMany({});

  const users = getRandomUsers(10);
  const thoughts = getRandomThoughts(20);

  await Users.collection.insertMany(users);
  await Thoughts.collection.insertMany(thoughts);

  console.table(users);
  console.table(thoughts);
  console.info("Seeding complete! 🌱");
  process.exit(0);
});
