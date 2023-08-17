const FriendRepository = require("../repository/friendRepository");
const nodemailer = require("nodemailer");

// const transporter = nodemailer.createTransport({
//   host: "smtp.gmail.com",
//   port: 465,
//   secure: true,
//   auth: {
//     user: "adamsonlina@gmail.com",
//     pass: process.env.GMAIL_PASS,
//   },
// });

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "adamsonlina@gmail.com",
    pass: process.env.GMAIL_PASS,
  },
});

class FriendService {
  constructor(models) {
    this.friendRepo = new FriendRepository(models.friendModel);
  }

  async inviteFriend(email, id) {
    const { user, friend } = await this.friendRepo.inviteFriend(email, id);

    console.log(process.env.GMAIL_PASS);

    const html = `<h2>myMoney</h2> 
                <p>You have been invited to join the myMoney app </p>
                <a href="http://localhost:3001/invite/${friend.id}">View Invitation</a>
                `;

    const info = await transporter.sendMail({
      from: " myMoney <adamsonlina@gmail.com>", // sender address
      to: user.email, // list of receivers
      subject: "Invite to myMoney", // Subject line
      html: html,
    });

    console.log(info.messageId);

    return user;
  }

  //   sent invitations
  async sentInvites(id) {
    const invitations = await this.friendRepo.sentInvites(id);
    return invitations;
  }

  async receivedInvites(id) {
    const invitations = await this.friendRepo.receivedInvites(id);
    return invitations;
  }

  async getInviteById(id) {
    const invitations = await this.friendRepo.getInviteById(id);
    return invitations;
  }

  async updateStatusById(inviteId) {
    const friend = await this.friendRepo.updateStatusById(inviteId);
    return friend;
  }

  async getAllFriends(id) {
    const friends = await this.friendRepo.getAllFriends(id);
    return friends;
  }
}

module.exports = FriendService;
