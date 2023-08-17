const { Sequelize, Op, DataTypes } = require("sequelize");
const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASS,
  {
    host: "localhost",
    dialect: "mysql",
  }
);

const User = sequelize.define("User", {
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
  },
  display_name: {
    type: DataTypes.STRING,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  password_hash: {
    type: DataTypes.STRING,
  },
});

const Transaction = sequelize.define("Transaction", {
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
  },
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: User,
      key: "id",
    },
  },
  transaction_name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  amount: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});

const Breakdown = sequelize.define("Breakdown", {
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
  },
  transactionId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Transaction,
      key: "id",
    },
  },
  breakdown_name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  breakdown_amount: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});

const Friend = sequelize.define("Friend", {
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
  },
  senderId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: User,
      key: "id",
    },
  },
  receiverId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: User,
      key: "id",
    },
  },
  status: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

// ASSOCIATIONS
Transaction.hasMany(Breakdown);
Breakdown.belongsTo(Transaction);
User.hasMany(Friend, {
  foreignKey: {
    name: "senderId",
  },
});
Friend.belongsTo(User, {
  as: "receiver",
  foreignKey: "receiverId",
});
Friend.belongsTo(User, {
  as: "sender",
  foreignKey: "senderId",
});

module.exports = { sequelize, Op, User, Transaction, Breakdown, Friend };
