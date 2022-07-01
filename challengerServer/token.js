const jwt = require('jsonwebtoken');

module.exports = {
  //jwt token
  verify: function(req, res, next) {
      const token = req.headers['authorization'];
      if(typeof token !== 'undefined'){
        req.token = token;
        jwt.verify(req.token, 'challenger!97', (err, data) => {
          if(err)
            res.sendStatus(403);
          else
            req.userid = data.user._id;
          next();
        });
      }
      else{
        res.sendStatus(403);
      }
  },
}