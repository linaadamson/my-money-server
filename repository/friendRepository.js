class FriendRepository {
  constructor(model) {
    this.source = new model();
  }

  async inviteFriend(email, id) {
    const { user, friend } = await this.source.inviteFriend(email, id);
    return { user, friend };
  }

  async sentInvites(id) {
    const invitations = await this.source.sentInvites(id);
    return invitations;
  }

  async receivedInvites(id) {
    const invitations = await this.source.receivedInvites(id);
    return invitations;
  }

  async getInviteById(id) {
    const invitations = await this.source.getInviteById(id);
    return invitations;
  }

  async updateStatusById(inviteId) {
    const friend = await this.source.updateStatusById(inviteId);
    return friend;
  }

  async getAllFriends(id) {
    const friends = await this.source.getAllFriends(id);
    return friends;
  }
}

module.exports = FriendRepository;
