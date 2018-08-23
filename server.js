const express = require('express'),
      parser = require('body-parser'),
      path = require('path'),
      port = process.env.PORT || 8000,
      app = express(),
      mongoose = require('mongoose');

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'static')));
app.use(parser.urlencoded({extended: true}));

app.get('/', function(request, response) {
  response.render('index');
});

app.post('/users', function(request, response) {
  console.log(request.body);
  response.redirect('/');
});

app.listen(port, () => console.log(`listening on port ${port}`));
