const { Users, Thoughts } = require("../models");

module.exports = {
  // GET All Thoughts
  async getAllThoughts(req, res) {
    try {
      const allThoughts = await Thoughts.find();
      return res.json(allThoughts);
    } catch (err) {
      res.status(500), json(err);
    }
  },
  // GET a single thought
  async getSingleThought(req, res) {
    try {
      const singleThought = await Thoughts.findOne({
        _id: req.params.thoughtId,
      });
      if (!singleThought) {
        return res
          .status(404)
          .json({ message: "Cannot find a thought with this ID." });
      }
      return res.json(singleThought);
    } catch (err) {
      res.status(500), json(err);
    }
  },
  //   POST a new Thought
  async createThought(req, res) {
    try {
      const newThought = await Thoughts.create(req.body);
      const thoughtUser = await Users.findOneAndUpdate(
        { username: req.body.username },
        { $addToSet: { thoughts: newThought._id } },
        { new: true }
      );
      if (!thoughtUser) {
        return res.status(404).json({
          message: "Cannot find a user to assign this thought to.",
          newThought,
        });
      }
      return res.json({ message: "New thought created!", newThought });
    } catch (err) {
      res.status(500), json(err);
    }
  },
  //   PUT to update thought
  async updateThought(req, res) {
    try {
      const thoughtToUpdate = await Users.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $set: req.body },
        { runValidators: true, new: true }
      );
      if (!thoughtToUpdate) {
        return res
          .status(404)
          .json({ message: "Cannot find a thought with this ID." });
      }
      return res.json(thoughtToUpdate);
    } catch (err) {
      res.status(500), json(err);
    }
  },
  //   DELETE thought
  async deleteThought(req, res) {
    try {
      const thoughtToDelete = await Thoughts.findOneAndDelete({
        _id: req.params.thoughtId,
      });
      if (!thoughtToDelete) {
        return res
          .status(404)
          .json({ message: "Cannot find a thought with this ID." });
      }
      const thoughtUser = await Users.findByIdAndUpdate(
        { thoughts: req.params.thoughtId },
        { $pull: { thoughts: req.params.thoughtId } },
        { new: true }
      );
      if (!thoughtUser) {
        return res
          .status(404)
          .json({ message: "Cannot find a user with this ID." });
      }
      return res.json({ message: "Thought deleted successfully." });
    } catch (err) {
      res.status(500), json(err);
    }
  },
  //   Add a Reaction
  async addReaction(req, res) {
    try {
      const newReaction = await Thoughts.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $addToSet: { reactions: req.body } },
        { runValidators: true, new: true }
      );
      if (!newReaction) {
        return res.status(404).json({
          message: "Cannot find a thought with this ID.",
        });
      }
      return res.json(newReaction);
    } catch (err) {
      res.status(500), json(err);
    }
  },
  // DELETE a reaction
  async removeReaction(req, res) {
    try {
      const reactionToRemove = await Thoughts.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $pull: { reactions: { reactionId: req.params.reactionId } } },
        { runValidators: true, new: true }
      );
      if (!reactionToRemove) {
        return res.status(404).json({
          message: "Cannot find a thought with this ID.",
        });
      }
      return res.json(reactionToRemove);
    } catch (err) {
      res.status(500), json(err);
    }
  },
};
