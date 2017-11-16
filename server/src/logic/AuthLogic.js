/**
 * Created by will on 07/11/17.
 */
import { User } from '../db';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '../../config';

export const authLogic = {
  // reusable function to check for a user with context
  getAuthenticatedUser(ctx) {
    console.log("Getting user")
    if (!ctx.user) {
       console.log("No ctx")
      return Promise.reject('Unauthorized');
    }

    return ctx.user
      .then((user) => {
        if (!user) {
          console.log("no user")
          return Promise.reject('Unauthorized');
        }
        console.log(user.id, "User Authorized");
        return user;
      })
  },
  register: (root, { username, password, email }, ctx) => {
    // find user by email
    return User.findOne({ where: { email } })
      .then((existing) => {
        if (!existing) {
          // hash password to create user
          return bcrypt.hash(password, 10).then(hash => User.create({
            email,
            password: hash,
            username: username || email,
            version: 1,
          }))
            .then((user) => {
              const { id } = user;
              const token = jwt.sign({
                id,
                email,
                username,
                version: 1,
                // exp: Math.floor(new Date().getTime() / 1000) + 7 * 24 * 60 * 60
              }, JWT_SECRET);
              user.jwt = token;
              ctx.user = Promise.resolve(user);
              console.log("user created");
              return user;
            });
        }

        return Promise.reject('Email already exists');
      });

  },
  login: (obj, { email, password }, ctx) => {
    return User.findOne({ where: { email } })
      .then((user) => {
        if (user) {
          console.log("Logged in")
          return bcrypt.compare(password, user.password)
            .then((res) => {
              if (res) {
                // create jwt
                const token = jwt.sign({
                  id: user.id,
                  email: user.email,
                  username: user.username,
                  version: user.version,
                  // exp: Math.floor(new Date().getTime() / 1000) + 7 * 24 * 60 * 60,
                }, JWT_SECRET);
                user.jwt = token;
                ctx.user = Promise.resolve(user);
                return user;
              }

              return Promise.reject('Password incorrect');
            });
        }
        else {
          return Promise.reject("Email does not exist")
        }
      });
  },
}