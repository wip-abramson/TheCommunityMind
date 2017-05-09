import bcrpyt from 'bcrypt'

var saltRounds = 15;

const hashPassword = function (password) {
  return bcrpyt.hash(password, saltRounds).then(function (hash) {
    return hash;
  })
}

const comparePassword = function (password, hash) {
  return bcrpyt.compare(password, hash).then(function (res) {
    return res;
  })
}

export {hashPassword, comparePassword};