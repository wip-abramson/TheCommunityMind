import bcrpyt from 'bcrypt';
import {User} from './db';

var saltRounds = 15;

const saveUser = (username,password, email) => {
  bcrpyt.hash(password, saltRounds).then(function (hash) {
    User.create({
      username: username,
      password: hash,
      email: email
    })
  })
}


const comparePassword = function (password, hash) {
  return bcrpyt.compare(password, hash).then(function (res) {
    return res;
  })
}

export {saveUser, comparePassword};