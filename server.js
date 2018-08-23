const express = require('express'),
      parser = require('body-parser'),
      path = require('path'),
      port = process.env.PORT || 8000,
      app = express(),
      mongoose = require('mongoose');

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/basic_mongoose', {useNewUrlParser: true});

const UserSchema = new mongoose.Schema({
  name: String,
  age: Number
});
mongoose.model('User', UserSchema);
const User = mongoose.model('User');


app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'static')));
app.use(parser.urlencoded({extended: true}));

app.get('/', function(request, response) {
  let users = [];
  User.find({}, function(error, users){
    if ( error ) {
      console.log('error retrieving users');
    } else {
      console.log('users retrieved');
      response.render('index', { users: users });
    }
  });
});

app.post('/users', function(request, response) {
  console.log(request.body);
  let user = new User(request.body);
  user.save((error) =>{
    if ( error ) {7
      console.log('error saving user');
    } else {
      console.log('successfully added user');
      response.redirect('/');
    }
  });
});

app.listen(port, () => console.log(`listening on port ${port}`));
