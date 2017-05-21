import Sequelize from "sequelize";
import faker from 'faker';

const Conn = new Sequelize('communitymind', null, null, {
  dialect: 'sqlite',
  storage: './mind.sqlite',
  logging: false, // true to see logs
})

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

const QuestionModel = Conn.define('question', {
  question: {
    type: Sequelize.STRING,
    allowNull: false
  },
  stars: {
    type: Sequelize.INTEGER,
    allowNull: false
  }
})

const WhyModel = Conn.define('why', {
  // question: {
  //   type: Sequelize.STRING,
  //   allowNull: false
  // },
  // stars: {
  //   type: Sequelize.INTEGER,
  //   allowNull: false
  // }
})

const WhatIfModel = Conn.define('whatif', {
  // question: {
  //   type: Sequelize.STRING,
  //   allowNull: false
  // },
  // stars: {
  //   type: Sequelize.INTEGER,
  //   allowNull: false
  // }
})

const HowModel = Conn.define('how', {
  // question: {
  //   type: Sequelize.STRING,
  //   allowNull: false
  // },
  // stars: {
  //   type: Sequelize.INTEGER,
  //   allowNull: false
  // }
})

// Relationships

UserModel.hasMany(QuestionModel);
QuestionModel.belongsTo(UserModel);
// UserModel.hasMany(WhatIfModel);
// WhatIfModel.belongsTo(UserModel);
// UserModel.hasMany(HowModel);
// HowModel.belongsTo(UserModel);


TopicModel.hasMany(WhyModel, { as: 'Whys' });
// WhyModel.belongsToMany(TopicModel);
WhyModel.hasMany(WhatIfModel, { as: 'WhatIfs' });
WhatIfModel.belongsTo(WhyModel);
WhatIfModel.hasMany(HowModel, { as: 'Hows' });
HowModel.belongsTo(WhatIfModel);

WhyModel.hasOne(QuestionModel);
WhatIfModel.hasOne(QuestionModel);
HowModel.hasOne(QuestionModel);

const USERS = 5;
const QUESTIONS = 5;

faker.seed(123); // consistent data every time reload app

const questions = [
  {
    why: "Why do I need to get a new pair of glasses when my pescription changes",
    whatifs: [
      {
        whatif: "What if you could electronically alter the strength of the lenses",
        hows: ["How would this happen"]
      },
      // {
      //   whatif: "What if ",
      //   hows: ["how would it do this", "how could we use any materials recovered"]
      // },
      // { whatif: "What id these cities actually existed under the sea", hows: ["how would it withstand the pressure"] },
    ],
  },
  {
    why: "Why don't people wear their hearing aides",
    whatifs: [
      {
        whatif: "What if hearing aides were fashionable",
        hows: []
      },
      {
        whatif: "What if heaering aides were sold more like glasses",
        hows: []
      },
    ],
  },
  {
    why: "Why don't we have cities in the sea?",
    whatifs: [
      {
        whatif: "What if we thought of development in the sea like building a spacestation",
        hows: ["How would it survive potential collisions"]
      },
      {
        whatif: "What if these cities cleaned the ocean at the same time",
        hows: ["how would it do this", "how could we use any materials recovered"]
      },
      { whatif: "What id these cities actually existed under the sea", hows: ["how would it withstand the pressure"] },
    ],
  },
  {
    why: "Why don't people question their reality more",
    whatifs: [
      {
        whatif: "What if we encourages questions whenever they are asked",
        hows: ["How can we show our appreciation for each question"]
      },
      { whatif: "What if we admit when we don't know the answer", hows: [] },

    ]
  },
  {
    why: "Why am I not happy",
    whatifs: [
      { whatif: "What if I wrote down everything that made me unhappy", hows: ["How can I use this information"] },
      {
        whatif: "What if I concentrated on the things that made me happy",
        hows: ["How can I find something that makes me happy"]
      },
      {
        whatif: "what if I changed my environment",
        hows: ["How can I identify the envirnment that makes me least happy"]
      }

    ]
  },

]

//{force: true}
Conn.sync({ force: true }).then(() => {

  const password = faker.internet.password();
  return UserModel.create({
    email: faker.internet.email(),
    username: faker.internet.userName(),
    password,
  }).then((user) => {
    questions.forEach((whyData) => {
      // console.log(whyData.why);
      return user.createQuestion({ question: whyData.why, stars: 0 }).then((whyQuestion) => {
        return WhyModel.create({}).then((newWhy) => {
          newWhy.setQuestion(whyQuestion);

          return whyData.whatifs.forEach((whatIfData) => {
            // console.log(whatIfData.whatif)
            return user.createQuestion({ question: whatIfData.whatif, stars: 0 }).then((whatIfQuestion) => {
              // console.log(newWhatIf == null)

              return WhatIfModel.create({}).then((newWhatIf) => {
                // whatIfQuestion.setWhatIf(newWhatIf);
                newWhatIf.setQuestion(whatIfQuestion);
                newWhy.addWhatIf(newWhatIf);
              // console.log(newWhy == null)
                return whatIfData.hows.forEach((how) => {
                  return user.createQuestion({ question: how, stars: 0 }).then((howQuestion) => {

                    return HowModel.create({}).then((newHow) => {
                      newHow.setQuestion(howQuestion);
                      newWhatIf.addHow(newHow);
                    })

                  })
                })
              })

            })
          })
        })

      })
    })

  })
})

const Topic = Conn.models.topic;
const Why = Conn.models.why;
const WhatIf = Conn.models.whatif;
const How = Conn.models.how;
const User = Conn.models.user;
const Question = Conn.models.question;

export { Topic, Why, WhatIf, How, User, Question }