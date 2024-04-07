
const express = require('express');
const bodyParser = require('body-parser');
const http = require("http");
const cookieParser = require('cookie-parser');
const cors = require("cors");
const path = require('path');

const app = express();
const server = http.createServer(app);


// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors());


const Routes = require('./src/routes/main.routes');

app.use('/', Routes);

app.get("/",(req,res)=>{
    res.send("Hello sir / medam, Server is running on port : 7878")

})
// Start server
const PORT = process.env.PORT || 7878;
server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
