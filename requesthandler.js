var Shots = require('./db-data.js');

exports.getData = function(req, res){
  console.log(req.query.name);
    Shots.find({name: req.query.name},function(error, data){
      console.log(error);
      console.log('hello');
      console.log(data[0]);

      res.send(200, data[0]);
    });
    console.log('wtf');
};

exports.renderIndex = function(req, res) {
  res.render('index');
};

exports.signupUserForm = function(req, res) {
  res.render('signup');
};

exports.loginUserForm = function(req, res) {
  res.render('login');
};

exports.logoutUser = function(req, res) {
  req.session.destroy(function(){
    res.redirect('/login');
  });
};

exports.fetchLinks = function(req, res) {
  Links.find(function(err, links) {
    if (err) {
      console.log('fetchLinks, error finding links: ', err);
      return;
    }
    res.send(200, links);
  });
};

exports.saveLink = function(req, res) {
  var uri = req.body.url;

  if (!util.isValidUrl(uri)) {
    console.log('Not a valid url: ', uri);
    return res.send(404);
  }

  Links.findOne( {url: uri} , function(err, link) {
    if (err) {
      console.log('saveLink, error finding link: ', err);
      return;
    }
    if (link) {
      res.send(200, link);
    } else {
      util.getUrlTitle(uri, function(err, title) {
        if (err) {
          console.log('Error reading URL heading: ', err);
          return res.send(404);
        }

        var newLink = new Links(
        {
          url: uri,
          title: title,
          base_url: req.headers.origin
        });

        newLink.save(function(err) {
          if (err) {
            console.log('error saving link: ', err);
            return;
          }
          console.log('link saved');
          res.send(200, newLink);
        });
      });
    }
  });
};

exports.loginUser = function(req, res) {
  var username = req.body.username;
  var password = req.body.password;

  Users.findOne( {username: username} , function(err, user) {
    if (err) {
      console.log('loginUser, error finding user: ', err);
      return;
    }
    if (!user) {
      res.redirect('/login');
    } else {
      user.comparePassword(password, function(match) {
        if (match) {
          util.createSession(req, res, user);
        } else {
          res.redirect('/login');
        }
      });
    }
  });
};

exports.signupUser = function(req, res) {
  var username = req.body.username;
  var password = req.body.password;

  Users.findOne( {username: username} , function(err, user) {
    if (err) {
      console.log('signUpUser, error finding user: ', err);
      return;
    }
    if (!user) {
      var newUser = new Users({
        username: username,
        password: password
      });
      newUser.save(function(err) {
        if (err) {
          console.log('error saving user: ', err);
          return;
        }
        console.log('user saved');
        util.createSession(req,res,newUser);
      });
    } else {
      console.log('Account already exists');
      res.redirect('/signup');
    }
  });
};

exports.navToLink = function(req, res) {
  var query = {code: req.params[0]};
  Links.findOne(query, function(err, link) {
    if (err) {
      console.log('navToLink, error finding link: ', err);
      return;
    }
    if (!link) {
      res.redirect('/');
    } else {
      Links.findOneAndUpdate(query, {visits: link.visits+1} , function(err, linked) {
        if (err) {
          console.log('error updating link: ', err);
          return;
        }
        return res.redirect(linked.url);
      });
    }
  });
};