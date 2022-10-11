const { Schema, model } = require("mongoose");
const Reactions = require("./Reactions");

const thoughtSchema = new Schema(
  {
    thoughtText: { type: String, required: true, minLength: 1, maxLength: 280 },
    createdAt: { type: Date, default: Date.now, get: dateFormat },
    username: { trype: String, required: true },
    reations: [Reactions],
  },
  {
    toJSON: {
      getters: true,
      virtuals: true,
    },
  }
);

function dateFormat(date) {
  return date.toDateString();
}

thoughtSchema.virtual("reactionCount").get(function () {
  return this.reactions.length;
});

const Thoughts = model("thought", thoughtSchema);
module.exports = Thoughts;
