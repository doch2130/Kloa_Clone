module.exports = {
  apps : [{
    script: 'npm start',
    watch: '.'
  }],

  deploy : {
    production : {
      key: 'AWS_Prettier_Key.pem',
      user : 'SSH_USERNAME',
      host : '52.78.154.125',
      ref  : 'origin/main',
      repo : 'git@github.com:doch2130/Kloa_Clone.git',
      path : '/home/ubuntu/KloaClone_Project/',
      'pre-deploy-local': '',
      'post-deploy' : 'source ~/.nvm/nvm.sh && npm install && npm run build && pm2 reload ecosystem.config.js --env production',
      'pre-setup': '',
      'ssh_options': 'ForwardAgent=yes',
    }
  }
};
