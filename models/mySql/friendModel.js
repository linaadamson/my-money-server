const { Op, User, Friend } = require("./modelInstances");

class FriendModel {
  constructor() {
    this.id = "";
  }

  async inviteFriend(email, id) {
    const [user, created] = await User.findOrCreate({
      where: { email: email },
      defaults: {
        email: email,
      },
    });

    const friend = await Friend.create({
      senderId: id,
      receiverId: user.id,
      status: "pending",
    });

    return { user, friend };
  }

  async sentInvites(id) {
    const invitation = await Friend.findAll({
      where: {
        senderId: id,
        status: "pending",
      },
      include: { model: User, as: "receiver" },
      order: [["createdAt", "DESC"]],
    });

    return invitation;
  }

  async receivedInvites(id) {
    const invitation = await Friend.findAll({
      where: {
        receiverId: id,
        status: "pending",
      },
      include: { model: User, as: "sender" },
      order: [["createdAt", "DESC"]],
    });

    return invitation;
  }

  async getInviteById(id) {
    const invitation = await Friend.findOne({
      where: {
        id: id,
      },
      include: { model: User, as: "sender" },
      order: [["createdAt", "DESC"]],
    });

    return invitation;
  }

  async updateStatusById(inviteId) {
    const invite = await Friend.findByPk(inviteId);

    await invite.update({ status: "accepted" });

    const friend = await Friend.create({
      senderId: invite.receiverId,
      receiverId: invite.senderId,
      status: "accepted",
    });

    return friend;
  }

  async getAllFriends(id) {
    const invitation = await Friend.findAll({
      where: {
        senderId: id,
        status: "accepted",
      },
      include: { model: User, as: "receiver" },
      order: [["createdAt", "DESC"]],
    });

    return invitation;
  }
}

module.exports = FriendModel;
