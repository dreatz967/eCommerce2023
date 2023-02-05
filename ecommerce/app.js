const express = require('express')
const app = express()
const mongoose = require('mongoose')
const dotenv = require('dotenv')
dotenv.config()
const morgan = require('morgan')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const expressValidator = require('express-validator')

//import routes
const authRoutes = require('./routes/auth.js')
const userRoutes = require('./routes/user.js')
const categoryRoutes = require('./routes/category.js')
const productRoutes = require('./routes/product');

//middleware
app.use(morgan('dev'))
app.use(bodyParser.json())
app.use(cookieParser())
app.use(expressValidator())

//routes middleware
app.use('/api', authRoutes)
app.use('/api', userRoutes)
app.use('/api', categoryRoutes)
app.use('/api', productRoutes);



const port = process.env.PORT || 8000

app.listen(port, () =>{
    console.log(`Server is running on port ${port}`)
})

//db connection
mongoose.connect(
    process.env.MONGO_URI,
    {useNewUrlParser: true}
  )
  .then(() => console.log('DB Connected'))
   
  mongoose.connection.on('error', err => {
    console.log(`DB connection error: ${err.message}`)
  });

  
/*mongoose
  .connect(process.env.DATABASE, {})
  .then(() => console.log("DB connected"))
  .catch((err) => console.log("DB Error => ", err));*/