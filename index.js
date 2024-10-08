const express = require("express");
const app = express();
const { connect } = require("mongoose");
require("dotenv").config();
const cors = require("cors");
const upload = require("express-fileupload");
const { notFound, erorMiddleware } = require("./Middleware/errorMiddleware");

const port = process.env.PORT || 5000;
app.use(upload());
app.use('/uploads', express.static(__dirname + '/uploads'))
app.use(express.json({ limit: '70mb', extended: true }));
app.use(express.urlencoded({ limit: '70mb', extended: true }));
app.use(
  cors(
    {
      origin: ["http://localhost:5173","https://master.d2ntan67dq483m.amplifyapp.com"],
      credentials: true,
      methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
      optionsSuccessStatus: 204,
    }
  )
);
const userRoutes = require('./Routes/userRoutes')
const ticketRoutes = require('./Routes/ticketRoutes')
const attendanceRoutes = require('./Routes/attendanceRoutes');
app.use('/api/user', userRoutes)
app.use('/api/tickets', ticketRoutes)
app.use('/api/attendance', attendanceRoutes);
app.get('/',(req,res) => {
  res.status(200).json({test:'DB CONNECTED SUCCESSFULLY AND SERVER RUNNING ON 5000'});
})
app.get('/test',(req,res) => {
  res.status(200).json({test:"TEST CONNECTED SUCCESSFULLY"});
})
app.get('/api/test',(req,res) => {
  res.status(200).json({test:"API TEST CONNECTED SUCCESSFULLY"});
})
app.use(notFound)
app.use(erorMiddleware)

connect(process.env.MONGO_DB_URL).then(() => {
app.listen( port , '0.0.0.0' , () => {
  console.log(
    `DB CONNECTED SUCCESSFULLY AND SERVER RUNNING ON ${process.env.PORT}`,
    
  );

});
}).catch((error)=>{console.log(error)})
