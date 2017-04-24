import Sequelize from "sequelize";

const Conn = new Sequelize(
  'CollectiveInquiry',
  'communitiymind',
  '$TheCommunityMind$1',
  {
    dialect: 'mysql',
    host: 'localhost'
  }
)

const UserModel = Conn.define('user', {
  username: {
    type: Sequelize.STRING,
    allowNull: false,
  }

})

const TopicModel = Conn.define('topic', {
  // id: {
  //   type: DataTypes.UUID,
  //   defaultValue: DataTypes.UUIDV1,
  //   primaryKey: true
  // },
  name: {
    type: Sequelize.STRING,
    allowNull: false
  }
})

const WhyModel = Conn.define('why', {
  question: {
    type: Sequelize.STRING,
    allowNull: false
  },
  stars: {
    type: Sequelize.INTEGER,
    allowNull: false
  }
})

const WhatIfModel = Conn.define('whatif', {
  // id: {
  //   type: DataTypes.UUID,
  //   defaultValue: DataTypes.UUIDV1,
  //   primaryKey: true
  // },
  question: {
    type: Sequelize.STRING,
    allowNull: false
  },
  stars: {
    type: Sequelize.INTEGER,
    allowNull: false
  }
})

const HowModel = Conn.define('how', {
  // id: {
  //   type: DataTypes.UUID,
  //   defaultValue: DataTypes.UUIDV1,
  //   primaryKey: true
  // },
  question: {
    type: Sequelize.STRING,
    allowNull: false
  },
  stars: {
    type: Sequelize.INTEGER,
    allowNull: false
  }
})

// Relationships
TopicModel.hasMany(WhyModel, {as: 'Whys'});
WhyModel.belongsTo(TopicModel);
WhyModel.hasMany(WhatIfModel, {as: 'WhatIfs'});
WhatIfModel.belongsTo(WhyModel);
WhatIfModel.hasMany(HowModel, {as: 'Hows'});
HowModel.belongsTo(WhatIfModel);

Conn.sync().then(() => {
  return []


})

const Topic = Conn.models.topic;
const Why = Conn.models.why;
const WhatIf = Conn.models.whatif;
const How = Conn.models.how;
const User = Conn.models.user;

export {Topic, Why, WhatIf, How, User}