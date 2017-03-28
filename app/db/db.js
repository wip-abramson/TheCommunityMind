
import _ from 'loadash'
import Faker from 'faker'
import Sequelize from 'sequelize'

const Conn = new Sequelize(
  'collectiveinquiry',
  'ci',
  'Collective-Inquiry1',
  {
    dialect: 'mysql',
    host: 'localhost'
  }
)

const Topic = Conn.define('topic', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV1,
    primaryKey: true
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false
  }
})

const Why = Conn.define('why', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV1,
    primaryKey: true
  },
  question: {
    type: Sequelize.STRING,
    allowNull: false
  }
})

const WhatIf = Conn.define('whatif', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV1,
    primaryKey: true
  },
  question: {
    type: Sequelize.STRING,
    allowNull: false
  }
})

const How = Conn.define('how', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV1,
    primaryKey: true
  },
  question: {
    type: Sequelize.STRING,
    allowNull: false
  }
})

// Relationships
Topic.hasMany(Why);
Why.belongsTo(Topic);
Why.hasMany(WhatIf);
WhatIf.belongsTo(Why);
WhatIf.hasMany(How);
How.belongsTo(WhatIf);

Conn.sync({force: true}).then(() => {
  _.times(10, () => {
    return Topic.create({
      question: Faker.commerce.product()
    })
  })

})

export default Conn;
