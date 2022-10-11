const { Users, Thoughts } = require("../models");

module.exports = {
  // GET All Users
  async getAllUsers(req, res) {
    try {
      const allUsers = await Users.find();
      return res.json(allUsers);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  // GET a single user
  async getSingleUser(req, res) {
    try {
      const singleUser = await Users.findOne({ _id: req.params.userId });
      if (!singleUser) {
        return res
          .status(404)
          .json({ message: "Cannot find a user with this ID." });
      }
      return res.json(singleUser);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  //   POST a new user
  async createUser(req, res) {
    try {
      const newUser = await Users.create(req.body);
      res.json(newUser);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  //   PUT to update user by id
  async updateUser(req, res) {
    try {
      const userToUpdate = await Users.findOneAndUpdate(
        { _id: req.params.userId },
        { $set: req.body },
        { runValidators: true, new: true }
      );
      if (!userToUpdate) {
        return res
          .status(404)
          .json({ message: "Cannot find a user with this ID." });
      }
      return res.json(userToUpdate);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  //   DELETE user by id
  async deleteUser(req, res) {
    try {
      const userToDelete = await Users.findOneAndDelete({
        _id: req.params.userId,
      });
      if (!userToDelete) {
        return res
          .status(404)
          .json({ message: "Cannot find a user with this ID." });
      }
      return res.json({ message: "User deleted successfully." });
    } catch (err) {
      res.status(500).json(err);
    }
  },
  //   Add a Friend
  async addFriend(req, res) {
    try {
      const friend1 = await Users.findOneAndUpdate(
        { _id: req.params.userId },
        { $addToSet: { friends: req.params.friendId } },
        { runValidators: true, new: true }
      );

      if (!friend1) {
        return res
          .status(404)
          .json({ message: "Cannot find a user with this ID." });
      }
      const friend2 = await Users.findOneAndUpdate(
        { _id: req.params.friendId },
        { $addToSet: { friends: req.params.userId } },
        { runValidators: true, new: true }
      );

      if (!friend2) {
        return res
          .status(404)
          .json({ message: "Cannot find a user with this ID." });
      }
      return res.json({
        message: `${friend1.username} and ${friend2.username} have become friends!`,
        friend1,
      });
    } catch (err) {
      res.status(500).json(err);
    }
  },
  // DELETE a friend
  async removeFriend(req, res) {
    try {
      const friend1 = await Users.findOneAndUpdate(
        { _id: req.params.userId },
        { $pull: { friends: req.params.friendId } },
        { runValidators: true, new: true }
      );

      if (!friend1) {
        return res
          .status(404)
          .json({ message: "Cannot find a user with this ID." });
      }
      const friend2 = await Users.findOneAndUpdate(
        { _id: req.params.friendId },
        { $pull: { friends: req.params.userId } },
        { runValidators: true, new: true }
      );

      if (!friend2) {
        return res
          .status(404)
          .json({ message: "Cannot find a user with this ID." });
      }
      return res.json({
        message: `${friend1.username} and ${friend2.username} are no longer friends :(`,
        friend1,
      });
    } catch (err) {
      res.status(500).json(err);
    }
  },
};
