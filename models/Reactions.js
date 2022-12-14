const { Schema } = require("mongoose");
const Mongoose = require("mongoose");

const reactionSchema = new Schema(
  {
    reactionId: {
      type: Schema.Types.ObjectId,
      default: function () {
        return new Mongoose.Types.ObjectId();
      },
    },
    reactionBody: { type: String, required: true, maxLength: 280 },
    username: { type: String, required: true },
    createdAt: { type: Date, default: Date.now, get: dateFormat },
  },
  {
    toJSON: {
      getters: true,
    },
  }
);

function dateFormat(date) {
  return date.toLocaleString();
}

module.exports = reactionSchema;
