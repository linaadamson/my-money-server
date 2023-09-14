// REQUIRE THE CONTROLLER
const FriendController = require("../controllers/friendController");

module.exports = (container) => {
  return (fastify, options, done) => {
    const friendHandler = new FriendController(container);

    // INVITE FRIEND
    fastify.post("/invite", async (req, reply) => {
      await friendHandler.invite(req, reply);
    });

    // GET ALL SENT INVITES
    fastify.get("/sentInvites/:id", async (req, reply) => {
      await friendHandler.sentInvites(req, reply);
    });

    // GET ALL RECEIVED INVITES
    fastify.get("/receivedInvites/:id", async (req, reply) => {
      await friendHandler.receivedInvites(req, reply);
    });

    // GET A SINGLE INVITE
    fastify.get("/singleInvite/:id", async (req, reply) => {
      await friendHandler.getInviteById(req, reply);
    });

    // UPDATE FRIENDS
    fastify.put("/updateFriendshipStatus", async (req, reply) => {
      await friendHandler.updateStatusById(req, reply);
    });

    // GET ALL FRIENDS
    fastify.get("/allFriends/:id", async (req, reply) => {
      await friendHandler.getAllFriends(req, reply);
    });

    done();
  };
};
