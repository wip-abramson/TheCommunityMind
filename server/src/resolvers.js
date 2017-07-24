import { Topic, Why, WhatIf, How, User, Question } from "./db";
import GraphQLDate from 'graphql-date';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '../config';
import { whyLogic, whatIfLogic, howLogic, userLogic, questionLogic } from './logic';

export const resolvers = {
  Date: GraphQLDate,

  Query: {
    topics(){
      return Topic.findAll();
    },
    whys: (_, args, ctx) => {

      return whyLogic.query(_, args, ctx);
    },
    whatIfs: (_, args, ctx) => {
      return whatIfLogic.query(_, args, ctx);
    },
    hows(_, args, ctx) {
      return howLogic.query(_, args, ctx);
    },

  },
  Mutation: {
    addTopic: (root, args) => {
      return Topic.create({ name: args.name })
    },
    createWhy(_, args, ctx) {
      return whyLogic.createWhy(_, args, ctx);

    },
    createWhatIf: (_, args, ctx) => {
      return whatIfLogic.createWhatIf(_, args, ctx)
    },
    createHow: (_, args, ctx) => {
      return howLogic.createHow(_, args, ctx)

    },
    deleteQuestion: (_, args, ctx) => {
      return questionLogic.deleteQuestion(_, args, ctx);
    },
    register: (root, { username, password, email }, ctx) => {
      // find user by email
      return User.findOne({ where: { email } }).then((existing) => {
        if (!existing) {
          // hash password to create user
          return bcrypt.hash(password, 10).then(hash => User.create({
            email,
            password: hash,
            username: username || email,
            version: 1,
          })).then((user) => {
            const { id } = user;
            const token = jwt.sign({ id, email, version: 1 }, JWT_SECRET);
            user.jwt = token;
            ctx.user = Promise.resolve(user);
            console.log("user created");
            return user;
          });
        }

        return Promise.reject('Email already exists');
      });

    },
    login: (obj, { username, password }, ctx) => {
      return User.findOne({ where: { username } }).then((user) => {
        if (user) {
          // validate password
          return bcrypt.compare(password, user.password)
            .then((res) => {
              if (res) {
                // create jwt
                const token = jwt.sign({
                  id: user.id,
                  email: user.email,
                  version: user.version,
                }, JWT_SECRET);
                user.jwt = token;
                ctx.user = Promise.resolve(user);
                return user;
              }

              return Promise.reject('Password incorrect');
            });
        }
      });
    },

  },

  Topic: {
    whys(topic) {
      return topic.getWhys()
    },
  },

  Question: {
    owner(question) {
      return question.getUser();
    }
  },

  Why: {
    whatIfs(why, args, ctx) {
      return whyLogic.whatIfs(why, args, ctx);
    },
    question(why, args, ctx) {
      return whyLogic.question(why, args, ctx);
    }
  },
  WhatIf: {
    hows(whatIf, args, ctx) {
      return whatIfLogic.hows(whatIf, args, ctx);
    },
    question(whatIf, args, ctx) {
      return whatIfLogic.question(whatIf, args, ctx);
    }
  },

  How: {
    question(how, args, ctx) {
      return howLogic.question(how, args, ctx);
    },
  },

  User: {
    questions(user, args, ctx) {
      return userLogic.questions(user, args, ctx);
    },
    jwt(user, args, ctx) {
      return userLogic.jwt(user, args, ctx);
    }
  }
}