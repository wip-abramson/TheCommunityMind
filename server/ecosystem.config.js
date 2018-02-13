module.exports = {
  "apps" : [{
    "name"        : "TheCommunityMind",
    "script"      : "./server.js",
    "watch"       : false,
    "error_file"      : "err.log",
    "no-autorestart": true,
    "ignore_watch" : ["node_modules", "./mind.sqlite"],
    "exec_interpreter" : "babel-node",
    "exec_mode"        : "fork"
  }],
  deploy: {
    production: {
      user: 'ubuntu',
      host: 'ec2-35-176-132-192.eu-west-2.compute.amazonaws.com',
      key: '~/.ssh/TCM_key.pem',
      ref: 'origin/master',
      repo: 'git@github.com:wip-abramson/TheCommunityMind.git',
      path: '/home/ubuntu/TheCommunityMind',
      'post-deploy': 'npm i && npm run production && sudo cp -a ./dist/. /usr/share/nginx/dist/ && cd server && npm i && pm2 startOrRestart ecosystem.config.js'
    }
  }
}
