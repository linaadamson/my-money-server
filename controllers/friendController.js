const BaseController = require("./baseController");

class FriendController extends BaseController {
  constructor(container) {
    super(container);
    this.friendService = this.container.get("friendService");
  }

  async invite(req, reply) {
    const { email, id } = req.body;

    try {
      const user = await this.friendService.inviteFriend(email, id);

      reply.code(201).send(user);
    } catch (err) {
      reply.send(err);
    }
  }

  async sentInvites(req, reply) {
    let id = req.params.id;

    try {
      const invitations = await this.friendService.sentInvites(id);
      reply.status(200).send(invitations);
    } catch (err) {
      reply.send(err);
    }
  }

  async receivedInvites(req, reply) {
    let id = req.params.id;

    try {
      const invitations = await this.friendService.receivedInvites(id);
      reply.status(200).send(invitations);
    } catch (err) {
      reply.send(err);
    }
  }

  async getInviteById(req, reply) {
    let id = req.params.id;

    try {
      const invitations = await this.friendService.getInviteById(id);
      reply.status(200).send(invitations);
    } catch (err) {
      reply.send(err);
    }
  }

  async updateStatusById(req, reply) {
    const { inviteId } = req.body;

    try {
      const friend = await this.friendService.updateStatusById(inviteId);
      reply.status(200).send(friend);
    } catch (err) {
      reply.send(err);
    }
  }

  async getAllFriends(req, reply) {
    let id = req.params.id;

    try {
      const friends = await this.friendService.getAllFriends(id);
      reply.status(200).send(friends);
    } catch (err) {
      reply.send(err);
    }
  }
}

module.exports = FriendController;
