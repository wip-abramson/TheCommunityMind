import Sequelize from "sequelize";
import faker from 'faker';
import bcrypt from 'bcrypt';

const Op = Sequelize.Op;

import ostUserQueries from './ost/ostUserQueries';

import { RDS_DB_NAME, RDS_HOSTNAME, RDS_PASSWORD, RDS_USERNAME, RDS_PORT } from '../config';

const Conn = createDatabaseConnection();

function createDatabaseConnection() {
  if (process.env.NODE_ENV === 'production') {
    console.log("PRODUCTION DB");
    return new Sequelize(RDS_DB_NAME, RDS_USERNAME, RDS_PASSWORD, {
      host: RDS_HOSTNAME,
      port: RDS_PORT,
      logging: console.log,
      maxConcurrentQueries: 100,
      dialect: 'mysql',
      dialectOptions: {
        ssl: 'Amazon RDS'
      },
      pool: { maxConnections: 5, maxIdleTime: 30 },
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
});

const QuestionModel = Conn.define('question', {
  questionText: {
    type: Sequelize.STRING,
    allowNull: false
  },
});

const TopicModel = Conn.define('topic', {
  name: {
    type: Sequelize.STRING,
    allowNull: false
  }
});

const QuestionLinkTypeModel = Conn.define('questionLinkType', {
  linkType: {
    type: Sequelize.STRING,
    allowNull: false
  }
});

const QuestionLinkModel = Conn.define('questionLink', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
});

const QuestionLinkApproval = Conn.define('question_link_approval');

const UserStarQuestionModel = Conn.define('question_star', {});

const UserFollowModel = Conn.define('follow', {});

const UserPonderQuestionModel = Conn.define('user_question', {});

const QuestionTopicModel = Conn.define('question_topic', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
});

const UserTopicModel = Conn.define('user_topic', {});

const UserTopicLinkApprovalModel = Conn.define('userTopicLinkApproval');

// Relationships

UserModel.hasMany(QuestionModel);
QuestionModel.belongsTo(UserModel);

QuestionModel.belongsToMany(UserModel, {
  through: {
    model: UserStarQuestionModel,
    unique: true,
  },
  as: 'starredBy',
  foreignKey: "starredQuestionId"

});

UserModel.belongsToMany(QuestionModel, {
  through: {
    model: UserStarQuestionModel,
    unique: true,
  },
  as: 'StarredBy',
});

QuestionModel.belongsToMany(QuestionModel, {
  through: {
    model: QuestionLinkModel,
    unique: true,
  },
  as: "FromQuestion",
  foreignKey: "fromId"
});

QuestionModel.belongsToMany(QuestionModel, {
  through: {
    model: QuestionLinkModel,
    unique: true,
  },
  as: "ToQuestion",
  foreignKey: "toId"
});

// Add questionLinkId to QuestionModel
// QuestionModel.belongsTo(QuestionLinkModel);

QuestionLinkTypeModel.hasMany(QuestionLinkModel);

// A Question Link Model has an questionLinkTypeId for QuestionLinkTypeModel
QuestionLinkModel.belongsTo(QuestionLinkTypeModel);

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
    model: UserPonderQuestionModel,
    unique: true,
  },
  as: "Ponder",
  foreignKey: "ponderId"
});

UserModel.belongsToMany(QuestionModel, {
  through: {
    model: UserPonderQuestionModel,
    unique: true,
  },
  as: "Ponder"
});

TopicModel.hasMany(QuestionTopicModel);
QuestionTopicModel.belongsTo(TopicModel);

QuestionTopicModel.belongsTo(QuestionModel);
QuestionModel.hasMany(QuestionTopicModel);

TopicModel.belongsToMany(QuestionModel, {
  through: {
    model: QuestionTopicModel,
    unique: true,
  },
});

QuestionModel.belongsToMany(TopicModel, {
  through: {
    model: QuestionTopicModel,
    unique: true,
  },
});

// TODO look into this further. Why does it add correct functions to entities. only addLinkApproval to UserModel
UserModel.belongsToMany(QuestionTopicModel, {
  through: {
    model: UserTopicLinkApprovalModel,
    unique: true
  },
  as: "TopicLinkApproval",
});

UserModel.hasMany(QuestionTopicModel, { as: "QuestionTopicLink" });
QuestionTopicModel.belongsTo(UserModel, { as: "Owner" });

QuestionTopicModel.belongsToMany(UserModel, {
  through: {
    model: UserTopicLinkApprovalModel,
    unique: true
  },
  as: "TopicLinkApproval",
});

UserModel.hasMany(QuestionLinkModel)
QuestionLinkModel.belongsTo(UserModel, { as: "Owner" });
QuestionModel.hasMany(QuestionLinkModel)
QuestionLinkModel.belongsTo(QuestionModel);

UserModel.belongsToMany(QuestionLinkModel, {
  through: {
    model: QuestionLinkApproval,
    unique: true
  },
  as: "QuestionLinkApproval"
});

QuestionLinkModel.belongsToMany(UserModel, {
  through: {
    model: QuestionLinkApproval,
    unique: true
  },
  as: "QuestionLinkApproval"
});

UserModel.belongsToMany(TopicModel, {
  through: {
    model: UserTopicModel,
    unique: true,
  },
});

TopicModel.belongsToMany(UserModel, {
  through: {
    model: UserTopicModel,
    unique: true,
  },
});

faker.seed(123); // consistent data every time reload app

const questions = [
  {
    questionText: "Why can't helicopters be quiet",
    questions: []
  },

  {
    questionText: "Why do I need to get a new pair of glasses when my perscription changes",
    questions: [],
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
    questions: [
      {
        questionText: "Why don't we all question our reality more",
        questions: []
      },
    ]
  },
  {
    questionText: "How can I help others understand the promise of blockchain technologies",
    questions: []
  },
  {
    questionText: "Why should companies own my digital data",
    questions: []
  },

];

const topics = [
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
];

const PARENT_CHILD_LINK = "PARENT_CHILD";
const RELATED_LINK = "RELATED_LINK";
const REWORDING_LINK = "REWORDING_LINK";

const questionLinkTypes = [
  PARENT_CHILD_LINK,
  RELATED_LINK,
  REWORDING_LINK
];

Conn.sync({ force: true, logging: console.log })
  .then(() => {
    return QuestionLinkTypeModel.create({ linkType: PARENT_CHILD_LINK })
      .then(createdLinkType => {
        QuestionLinkType.create({ linkType: RELATED_LINK });
        QuestionLinkType.create({ linkType: REWORDING_LINK });
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
                return user1.createQuestion({
                  questionText: "Why should I care about blockchain technology"
                })
              })
          })


      })


  });
//
// Conn.sync()
//   .then(() => ostUserQueries.editUser('9aa974b4-9fa7-4f93-bd88-a3cf3de1fa22', "Bob") );
// Conn.sync({ force: true })
//   .then(() => {
//     return QuestionLinkTypeModel.create({ linkType: PARENT_CHILD_LINK })
//       .then(createdLinkType => {
//         QuestionLinkType.create({ linkType: RELATED_LINK });
//         QuestionLinkType.create({ linkType: REWORDING_LINK });
//         const passwrd = "tPass2";
//         return bcrypt.hash(passwrd, 10)
//           .then((hash1) => {
//             let user1 = {
//               email: faker.internet.email(),
//               username: "Alice",
//               password: hash1,
//               version: 1,
//               ostUuid: 'e3586536-bfb4-4b98-8998-e4c9a8069cba',
//             };
//             return UserModel.create(user1)
//               .then(user1 => {
//
//                 const password = "testPassword";
//                 return bcrypt.hash(password, 10)
//                   .then((hash) => {
//                     let user2 = {
//                       email: faker.internet.email(),
//                       username: "Bob",
//                       password: hash,
//                       version: 1,
//                       ostUuid: '9aa974b4-9fa7-4f93-bd88-a3cf3de1fa22',
//                     };
//                     return UserModel.create(user2)
//                       .then((user) => {
//                         ostUserQueries.editUser('9aa974b4-9fa7-4f93-bd88-a3cf3de1fa22', "Bob");
//                         // ostUserQueries.verifyAirdropStatus('47e44392-fec8-4aff-b6d6-8f0fa483463f');
//                         user.addFollowedBy(user1).then(() => {
//                         }).catch(error => {
//                           console.log(error)
//                         });
//
//                         return Promise.all(topics.map(topic => {
//                           return Topic.create(topic);
//
//                         })).then(createdTopics => {
//
//                           user.setTopics(createdTopics);
//
//                           return questions.forEach((topQuestionData) => {
//                             console.log(topQuestionData.questionText);
//                             return user.createQuestion({
//                               questionText: topQuestionData.questionText,
//                               stars: 0
//                             })
//                               .then((topQuestion) => {
//                                 user.addPonder(topQuestion);
//
//                                 console.log("addQuestion");
//                                 topQuestion.addStarredBy(user);
//                                 createdTopics.forEach(topic => {
//                                   console.log("CREATE Q TOPIC")
//                                   return user.createQuestionTopicLink({
//                                     questionId: topQuestion.id,
//                                     topicId: topic.id
//                                   })
//                                     .then(questionTopic => {
//                                       console.log("CREATED LINK", questionTopic.userId);
//                                         return user.addTopicLinkApproval(questionTopic)
//                                       }
//                                     )
//                                 });
//
//                                 return topQuestionData.questions.forEach((secondQuestionData) => {
//                                   return user.createQuestion({
//                                     questionText: secondQuestionData.questionText,
//                                     stars: 0
//                                   })
//                                     .then((secondQuestion) => {
//                                       // console.log(newWhatIf == null)
//                                       console.log("THEUSER", user.id)
//                                       return user.createQuestionLink({
//                                         fromId: topQuestion.id,
//                                         toId: secondQuestion.id,
//                                         questionLinkTypeId: createdLinkType.id,
//                                       }).then(questionLink => {
//                                         console.log("Created question link", questionLink.userId)
//                                         user.addQuestionLinkApproval(questionLink);
//
//                                         console.log("QUESTIONLINKTYPEID", questionLink.questionLinkTypeId);
//                                         return secondQuestionData.questions.forEach((thirdQuestionText) => {
//                                           return user.createQuestion({
//                                             questionText: thirdQuestionText,
//                                             stars: 0
//                                           })
//                                             .then((thirdQuestion) => {
//                                               user.createQuestionLink({
//                                                 ownerId: user.id,
//                                                 fromId: secondQuestion.id,
//                                                 toId: thirdQuestion.id,
//                                                 questionLinkTypeId: 1
//                                               }).then(questionLink => console.log("QUESTIONLINKTYPEID", questionLink.questionLinkTypeId))
//
//                                             })
//                                         })
//                                       })
//                                       // console.log(newWhy == null)
//
//                                     })
//
//                                 })
//                               })
//                           })
//
//                         })
//                       })
//
//                   })
//               })
//           })
//
//       });
//   });

const User = Conn.models.user;
const Question = Conn.models.question;
const Topic = Conn.models.topic;
const QuestionLink = Conn.models.questionLink;
const QuestionLinkType = Conn.models.questionLinkType;
const QuestionTopicLink = Conn.models.question_topic;

// note only export objects that represent data not join tables
export {
  User,
  Question,
  Topic,
  QuestionLink,
  QuestionLinkType,
  QuestionTopicLink,
  Conn,
  PARENT_CHILD_LINK,
  RELATED_LINK,
  REWORDING_LINK,
  Op

}

export default Conn;
