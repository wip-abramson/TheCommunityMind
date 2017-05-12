import Sequelize from "sequelize";

const Conn = new Sequelize(
  'themind',
  'communitymind',
  '$TheCommunityMind$1',
  {
    dialect: 'mysql',
    host: '0.0.0.0'
  }
)

const UserModel = Conn.define('user', {
  username: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  password: {
    type: Sequelize.STRING,
    allowNull: false
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false
  }


})

const TopicModel = Conn.define('topic', {
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

//{force: true}
Conn.sync().then(() => {
  return []


})

const Topic = Conn.models.topic;
const Why = Conn.models.why;
const WhatIf = Conn.models.whatif;
const How = Conn.models.how;
const User = Conn.models.user;

export {Topic, Why, WhatIf, How, User}