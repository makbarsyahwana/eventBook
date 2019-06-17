const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const mongoose = require('mongoose')
const app = express()
const jwtSimple = require('jwt-simple')

/// start app 
const port = 8080
app.listen(process.env.PORT || port, () => {
    console.log(`app running on ${port}`)
})

/// connect to mongodb
/// for this purpose mongose url type here, other put on env file
mongoose.connect('mongodb://makbarsyahwana:4113412s@ds137857.mlab.com:37857/eventbooking', { useNewUrlParser: true })
mongoose.connection.on("open", function() {
    console.log("Connected to mongo server.")
})

/// enabling cross origin 
app.use(cors())
app.use(bodyParser.urlencoded({ extended: true })); //support x-www-form-urlencoded
app.use(bodyParser.json());

/// test api call
// app.use('/', (req, res) => {
//     res.status(200).send({
//         message: "success calling api"
//     })
// })

/// routes protection
app.use((req, res, next) => {

    console.log(`API ${req.method} ${req.url}`)

    if (req.url.substring(0, 4) == '/api') {
      if (
        req.url.substring(0, 15) !== '/api/user/login' &&
        req.url.substring(0, 18) !== '/api/user/register'
      ) {
        if (req.headers.authorization) {
          try {
            var decoded = jwtSimple.decode(
              req.headers.authorization,
              "SECRET"
            );
            req.body.authorization = decoded;
          } catch (error) {
            res.status(500).send({
              error: true,
              message: 'your authentication was invalid'
            });
            return;
          }
        } else {
          res.status(500).send({
            error: true,
            message: 'you dont have any authentication'
          });
          return;
        }
      }
    }

    next();
})

/// router directory
const router = require('./router')

/// api endpoint
app.use('/api/user', router.user)
app.use('/api/event', router.event)

