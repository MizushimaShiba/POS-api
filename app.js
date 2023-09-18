require('./config/database')

const app = require('express')()
const index = require('./routes/index');

const bodyParser = require('express').json;
app.use(bodyParser());
app.set('view engine', 'ejs');
app.use(require('express').urlencoded({ extended: false }));


app.use('/', index)
app. listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
})