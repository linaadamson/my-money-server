const BaseController = require("./baseController");

class FriendController extends BaseController {
  constructor(container) {
    super(container);
    this.friendService = this.container.get("friendService")();
    this.exception = this.container.get("exception");
  }

  async invite(req, reply) {
    const { email, id } = req.body;

    try {
      const user = await this.friendService.inviteFriend(email, id);
      return reply.jsendSuccess({ user });
    } catch (err) {
      throw this.exception("An issue occured");
    }
  }

  async sentInvites(req, reply) {
    let id = req.params.id;

    try {
      const invitations = await this.friendService.sentInvites(id);
      return reply.jsendSuccess({ invites: [...invitations] });
    } catch (err) {
      throw this.exception("An issue occured");
    }
  }

  async receivedInvites(req, reply) {
    let id = req.params.id;

    try {
      const invitations = await this.friendService.receivedInvites(id);

      return reply.jsendSuccess({ invites: [...invitations] });
    } catch (err) {
      throw this.exception("An issue occured");
    }
  }

  async getInviteById(req, reply) {
    let id = req.params.id;

    try {
      const invite = await this.friendService.getInviteById(id);
      return reply.jsendSuccess({ invite });
    } catch (err) {
      throw this.exception("An issue occured");
    }
  }

  async updateStatusById(req, reply) {
    const { inviteId } = req.body;

    try {
      const friend = await this.friendService.updateStatusById(inviteId);

      return reply.jsendSuccess({ friend });
    } catch (err) {
      throw this.exception("An issue occured");
    }
  }

  async getAllFriends(req, reply) {
    let id = req.params.id;

    try {
      const friends = await this.friendService.getAllFriends(id);

      return reply.jsendSuccess({ result: [...friends] });
    } catch (err) {
      throw this.exception("An issue occured");
    }
  }
}

module.exports = FriendController;
