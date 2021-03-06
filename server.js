const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const meetingPointRoutes = require('./meetingPoint/meetingPoint.routes.js')
const usersRoutes = require('./users/users.routes.js')

const app = express();

mongoose.set('useUnifiedTopology', true);
mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);

app.use(morgan('common'));
app.use(bodyParser.json({urlencoded: true}));
app.use('/', express.static('public'));
app.use('/meetingPoint', meetingPointRoutes);
app.use('/users', usersRoutes);


function runServer(db) {
	return new Promise((resolve, reject) => {
		mongoose
			.connect(db, (err) => {
				if (err) {
					return reject(err);
        }
        const PORT = process.env.PORT || 3000;
				server = app.listen(PORT, () => {
					console.log(`App is listening on port ${PORT}`);
					resolve();
				})
				.on('error', (err) => {
					mongoose.disconnect();
					reject(err);
				})
			})
	})
}


  
  let server;
  
  
  
  // like `runServer`, this function also needs to return a promise.
  // `server.close` does not return a promise on its own, so we manually
  // create one.
  function closeServer() {
    return mongoose
      .disconnect()
      .then(() => {
        return new Promise((resolve, reject) => {
          console.log('Closing server');
          server.close((err) => {
            if (err) {
              return reject(err);
            }
            resolve();
          });
        });
      });
  }
  
  // if server.js is called directly (aka, with `node server.js`), this block
  // runs. but we also export the runServer command so other code (for instance, test code) can start the server as needed.


  if (require.main === module) {
    runServer('mongodb+srv://JLinnell:Contras3na1@cluster0.vdrve.mongodb.net/Socialeyes?retryWrites=true&w=majority').catch((err) => {
      console.log(err);
  });


  };
  
  module.exports = {app, runServer, closeServer};

