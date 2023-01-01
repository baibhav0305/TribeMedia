const User = require("../models/UserSchema");

// get user
const getUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);
    res.status(200).json(user);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

// get user friends
const getUserFriends = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);

    const friendList = await Promise.all(
      user.friends.map((id) => User.findById(id))
    );

    const userFriendList = friendList.map(
      ({ _id, firstName, lastName, picturePath, location, occupation }) => {
        return { _id, firstName, lastName, picturePath, location, occupation };
      }
    );

    res.status(200).json(userFriendList);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

// add or remove friend
const addRemoveFriend = async (req, res) => {
  try {
    const { friendId } = req.params;
    const { currentUserId: id } = req.body;

    const user = await User.findById(id);
    const friend = await User.findById(friendId);

    if (user.friends.includes(friendId)) {
      user.friends = user.friends.filter((id) => id !== friendId);
      friend.friends = friend.friends.filter((id) => id !== id);
    } else {
      user.friends.push(friendId);
      friend.friends.push(id);
    }

    await user.save();
    await friend.save();

    const friendList = await Promise.all(
      user.friends.map((id) => User.findById(id))
    );

    const userFriendList = friendList.map(
      ({ _id, firstName, lastName, picturePath, location, occupation }) => {
        return { _id, firstName, lastName, picturePath, location, occupation };
      }
    );

    res.status(200).json(userFriendList);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

module.exports = { getUser, getUserFriends, addRemoveFriend };
