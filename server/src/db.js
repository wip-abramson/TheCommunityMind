
import Faker from 'faker'
import Sequelize from 'sequelize'

const Conn = new Sequelize(
  'CollectiveInquiry',
  'communitiymind',
  '$TheCommunityMind$1',
  {
    dialect: 'mysql',
    host: 'localhost'
  }
)

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
  // id: {
  //   type: DataTypes.UUID,
  //   defaultValue: DataTypes.UUIDV1,
  //   primaryKey: true
  // },
  question: {
    type: Sequelize.STRING,
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
  }
})

// Relationships
TopicModel.hasMany(WhyModel);
WhyModel.belongsTo(TopicModel);
WhyModel.hasMany(WhatIfModel);
WhatIfModel.belongsTo(WhyModel);
WhatIfModel.hasMany(HowModel);
HowModel.belongsTo(WhatIfModel);

Conn.sync({force: true}).then(() => {
    return TopicModel.create({
        name: "Peace"
    })

})

const Topic = Conn.models.topic;
const Why = Conn.models.why;
const WhatIf = Conn.models.whatif;
const How = Conn.models.how;


export {Topic, Why, WhatIf, How}