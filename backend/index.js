const express = require('express');
const mongoDB = require('./db');
const app = express()
const PORT = process.env.PORT || 5000;

mongoDB();

app.use((req,res,next) => {
    res.setHeader("Access-Control-Allow-Origin","*");
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept"
    );
    next();
})

app.use(express.json());

app.get('/', (req,res) => {
    res.send('Hello world');
})

app.use('/api',require("./src/Routes/CreateUser"));

app.use('/api',require("./src/Routes/DisplayData"));

app.use('/api',require("./src/Routes/OrderData"));

app.use('/api',require("./src/Routes/AllOrdersData"));

app.listen(PORT, () => {
    console.log(`app listening on port ${PORT}`);
})

