const { Schema, model } = require("mongoose");
const Reactions = require("./Reactions");

const thoughtSchema = new Schema(
  {
    thoughtText: { type: String, required: true, minLength: 1, maxLength: 280 },
    createdAt: { type: Date, default: Date.now, get: dateFormat },
    username: { type: String, required: true },
    reactions: [Reactions],
  },
  {
    toJSON: {
      getters: true,
      virtuals: true,
    },
  }
);

function dateFormat(date) {
  const timeStamp = date.toLocaleString();
  console.log(timeStamp);
  return timeStamp;
  // return date.getTime();
}

thoughtSchema.virtual("reactionCount").get(function () {
  return this.reactions.length;
});

const Thoughts = model("thought", thoughtSchema);

module.exports = Thoughts;
