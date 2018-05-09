import Sequelize from "sequelize";
import faker from 'faker';
import bcrypt from 'bcrypt';

import ostUserQueries from './ost/ostUserQueries';

import {RDS_DB_NAME, RDS_HOSTNAME, RDS_PASSWORD, RDS_USERNAME, RDS_PORT} from '../config';

const Conn = createDatabaseConnection();

function createDatabaseConnection() {
  if (process.env.NODE_ENV === 'production')
  {
    console.log("PRODUCTION DB");
    return new Sequelize(RDS_DB_NAME, RDS_USERNAME, RDS_PASSWORD, {
      host: RDS_HOSTNAME,
      port: RDS_PORT,
      logging: console.log,
      maxConcurrentQueries: 100,
      dialect: 'mysql',
      dialectOptions: {
        ssl:'Amazon RDS'
      },
      pool: { maxConnections: 5, maxIdleTime: 30},
      language: 'en'
    })
  }
  else {
    return new Sequelize('communitymind', null, null, {
      dialect: 'sqlite',
      storage: './mind.sqlite',
      logging: false, // true to see logs
    })
  }
}



const UserModel = Conn.define('user', {
  username: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  ostUuid: {
    type: Sequelize.STRING,
    allowNull: false
  },
  password: {
    type: Sequelize.STRING,
    allowNull: false
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false
  },
  bio: {
    type: Sequelize.STRING,
    allowNull: true
  },
  version: { // version of the password
    type: Sequelize.INTEGER,
  },
})

const QuestionModel = Conn.define('question', {
  questionText: {
    type: Sequelize.STRING,
    allowNull: false
  },
})

const TagModel = Conn.define('tag', {
  name: {
    type: Sequelize.STRING,
    allowNull: false
  }
})

const UserStarQuestionModel = Conn.define('question_star', {});

const UserFollowModel = Conn.define('follow', {});

const UserWatchQuestionModel = Conn.define('user_question', {});

const QuestionTagModel = Conn.define('question_tag', {});

const UserTagModel = Conn.define('user_tag', {});

const QuestionLinkModel = Conn.define('question_link', {});
// Relationships

UserModel.hasMany(QuestionModel);
QuestionModel.belongsTo(UserModel);

QuestionModel.belongsToMany(UserModel, {
  through: {
    model: UserStarQuestionModel,
    unique: true,
  },
  as: 'starredBy'
});

UserModel.belongsToMany(QuestionModel, {
  through: {
    model: UserStarQuestionModel,
    unique: true,
  },
  as: 'StarredBy'
});

QuestionModel.belongsToMany(QuestionModel, {
  through: {
    model: QuestionLinkModel,
    unique: true,
  },
  as: "ParentQuestion",
  foreignKey: "parentId"
});

QuestionModel.belongsToMany(QuestionModel, {
  through: {
    model: QuestionLinkModel,
    unique: true,
  },
  as: "ChildQuestion",
  foreignKey: "childId"
});

UserModel.belongsToMany(UserModel, {
  through: {
    model: UserFollowModel,
    unique: true,
  },
  as: "FollowedBy",
  foreignKey: "followedById"
});

UserModel.belongsToMany(UserModel, {
  through: {
    model: UserFollowModel,
    unique: true,
  },
  as: "Follower",
  foreignKey: "followerId"
});

QuestionModel.belongsToMany(UserModel, {
  through: {
    model: UserWatchQuestionModel,
    unique: true,
  },
  as: "Watched",
  foreignKey: "watchedId"
});

UserModel.belongsToMany(QuestionModel, {
  through: {
    model: UserWatchQuestionModel,
    unique: true,
  },
  as: "Watched"
})

TagModel.belongsToMany(QuestionModel, {
  through: {
    model: QuestionTagModel,
    unique: true,
  },
});

QuestionModel.belongsToMany(TagModel, {
  through: {
    model: QuestionTagModel,
    unique: true,
  },
});

UserModel.belongsToMany(TagModel, {
  through: {
    model: UserTagModel,
    unique: true,
  },
})

TagModel.belongsToMany(UserModel, {
  through: {
    model: UserTagModel,
    unique: true,
  },
})

// QuestionModel.belongsTo(WhyModel);
// QuestionModel.belongsTo(WhatIfModel);
// QuestionModel.belongsTo(HowModel);

const USERS = 5;
const QUESTIONS = 5;

faker.seed(123); // consistent data every time reload app

const questions = [
  {
    questionText: "Why can't helicopters be quiet",
    questions: []
  },

  {
    questionText: "Why do I need to get a new pair of glasses when my perscription changes",
    questions: [
    ],
  },
  {
    questionText: "Why don't people wear their hearing aides",
    questions: []

  },
  {
    questionText: "Why don't we build cities in the sea",
    questions: []

  },
  {
    questionText: "Why don't I question my reality more",
    questions: []
  },
  {
    questionText: "How can I help others understand the promise of blockchain technologies",
    questions: []
  },
  {
    questionText: "Why should companies own my digital data",
    questions: []
  },
  // {
  //   questionText: ""
  // }

];

const tags = [
  {
    name: "creativity"
  },
  {
    name: "environment"
  },
  {
    name: "self improvement"
  },
  {
    name: "technology"
  }
]
//
// Conn.sync();
Conn.sync({ force: true })
  .then(() => {
    const passwrd = "tPass2";
    return bcrypt.hash(passwrd, 10)
      .then((hash1) => {
        let user1 = {
          email: faker.internet.email(),
          username: "Alice",
          password: hash1,
          version: 1,
          ostUuid: 'e3586536-bfb4-4b98-8998-e4c9a8069cba',
        };
        return UserModel.create(user1)
          .then(user1 => {

            const password = "testPassword";
            return bcrypt.hash(password, 10)
              .then((hash) => {
                let user2 = {
                  email: faker.internet.email(),
                  username: "Bob",
                  password: hash,
                  version: 1,
                  ostUuid: '9aa974b4-9fa7-4f93-bd88-a3cf3de1fa22',
                };
                return UserModel.create(user2)
                  .then((user) => {
                    ostUserQueries.editUser('9aa974b4-9fa7-4f93-bd88-a3cf3de1fa22', "Bob");
                    // ostUserQueries.verifyAirdropStatus('47e44392-fec8-4aff-b6d6-8f0fa483463f');
                    console.log(user1.id, "u2")
                    console.log(user.id, "u1")
                    user.addFollowedBy(user1).then(() => {
                    }).catch(error => {
                      console.log(error)
                    })

                    return Promise.all(tags.map(tag => {
                      return Tag.create(tag);

                    })).then(createdTags => {

                      console.log(createdTags.length)
                      user.setTags(createdTags);

                      console.log("Added follower")
                      return questions.forEach((topQuestionData) => {
                        console.log(topQuestionData.questionText);
                        return user.createQuestion({
                          questionText: topQuestionData.questionText,
                          stars: 0
                        })
                          .then((topQuestion) => {
                            console.log(topQuestion.questionText)
                            user.addWatched(topQuestion);

                            console.log("addQuestion");
                            topQuestion.addStarredBy(user);
                            topQuestion.setTags(createdTags);

                            return topQuestionData.questions.forEach((secondQuestionData) => {
                              // console.log(whatIfData.whatif)
                              return user.createQuestion({
                                questionText: secondQuestionData.questionText,
                                stars: 0
                              })
                                .then((secondQuestion) => {
                                  // console.log(newWhatIf == null)
                                  secondQuestion.addParentQuestion(topQuestion)

                                  // console.log(newWhy == null)
                                  return secondQuestionData.questions.forEach((thirdQuestionText) => {
                                    return user.createQuestion({
                                      questionText: thirdQuestionText,
                                      stars: 0
                                    })
                                      .then((thirdQuestion) => {

                                        secondQuestion.addChildQuestion(thirdQuestion);

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


  });

const User = Conn.models.user;
const Question = Conn.models.question;
const Tag = Conn.models.tag;

// note only export objects that represent data not join tables
export {
  User,
  Question,
  Tag,
  Conn,
}
