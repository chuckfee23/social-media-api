const Mongoose = require("mongoose");

const usernames = [
  "Kaner88",
  "Tazer19",
  "Hoss81",
  "Saadfather20",
  "Duncs2",
  "Sharpie10",
  "BRich91",
  "Steeger23",
  "Seabs7",
  "Bickell29",
  "Shawzy65",
  "Hammer4",
  "Krugs16",
  "Rozy32",
  "Oduya27",
  "Smitty28",
  "Teuvo86",
  "Carbomb13",
  "Vermette80",
  "Nordy42",
  "Desjardins11",
  "TVR57",
  "Crow50",
  "Darling33",
];

const initialThoughts = [
  "We're the champs!",
  "3 Titles in 6 Years!",
  "We're a dynasty!",
  "Is Tazer the best captain in the game?",
  "How will they reload for next year?",
  "When is the parade?",
  "Is Kane the best Blackhawk ever?",
  "I wish we still had Big Buff on the team...",
];

const initialReactions = ["Agreed!", "Easily the best!", "Amazing!", "YES!!!"];

const getRandomArrItem = (arr) => arr[Math.floor(Math.random() * arr.length)];

function getRandomUsers(int) {
  let results = [];

  for (let i = 0; i < int; i++) {
    let username = usernames[i];
    results.push({
      username: username,
      email: `${username}@email.com`,
    });
  }
  return results;
}

const getRandomThoughts = (int) => {
  let results = [];
  for (let i = 0; i < int; i++) {
    results.push({
      thoughtText: getRandomArrItem(initialThoughts),
      username: getRandomArrItem(usernames),
      reactions: [...getRandomReaction(2)],
    });
  }
  return results;
};
const getRandomReaction = (int) => {
  let results = [];
  for (let i = 0; i < int; i++) {
    results.push({
      reactionId: new Mongoose.Types.ObjectId(),
      reactionBody: getRandomArrItem(initialReactions),
      username: getRandomArrItem(usernames),
    });
  }
  return results;
};

module.exports = { getRandomUsers, getRandomThoughts };
