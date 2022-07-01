const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const userRoute = require('./routes/userRoute.js');
const challengeRoute = require('./routes/challengeRoute.js');
const challengeUserRoute = require('./routes/challengeUserRoute.js');

const app = express();

app.use(bodyParser.json());

//database Azure, Netherlands mongoDB 4.2
//email: saso.ivic@student.um.si
//password: challengerApp
//user: dbChallenger pass: dbChallengerPassword
const connectionString = "mongodb+srv://dbChallenger:dbChallengerPassword@cluster0-jjbhb.azure.mongodb.net/test?retryWrites=true&w=majority";
mongoose.connect(process.env.MONGODB_URI || connectionString, {
  useNewUrlParser: true,
  useFindAndModify: true,
  useUnifiedTopology: true,
  dbName: "challenger"
}).then(() => {
	console.log("Successfully connected to the database");
}).catch(err => {
	console.log("Could not connect to the database. Exiting now...", err);
	process.exit();
});
mongoose.Promise = global.Promise;

//allow CORS
app.use((req, res, next) => {
    let allowedOrigins = ['http://localhost:8100', 'http://192.168.178.32:8101', 'http://192.168.2.9:8101', 'http://localhost:8101', 'http://192.168.2.15:8100', 'http://192.168.2.15:8101', 'http://192.168.1.4:8100', 'http://192.168.1.4:8101'];
    let origin = req.headers.origin;
    if(allowedOrigins.indexOf(origin) > -1){
         res.setHeader('Access-Control-Allow-Origin', origin);
    }
    res.header(
        'Access-Control-Allow-Credentials',
        'true'
    );
    res.header(
        'Access-Control-Allow-Headers', 
        'Origin, X-Requested-With, Content-Type, Accept, Authorization'
    );
    if (req.method === 'OPTIONS'){
      res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
      return res.status(200).json({});
    }
    next();
});

//routes
app.use('/user', userRoute);
app.use('/challenge', challengeRoute);
app.use('/challengeUser', challengeUserRoute);


//catch 404 and forward to error handler
app.use(function(req, res, next) {
    next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};
  
    res.status(err.status || 500);
});

//start server
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => { console.log('Server running on port ' + PORT); });
  
module.exports = app;