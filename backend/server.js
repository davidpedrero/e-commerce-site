require("dotenv").config({path: "./.env}"});
const express = require('express');
const connectDB = require("./config/db");
const productRoutes = require('./routes/productRoutes')
const path = require('path');

connectDB();

const app = express();

app.use(express.json());

app.use((req, res, next) => {
    res.append('Access-Control-Allow-Origin', '*');
    res.append('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.append('Access-Control-Allow-Headers', 'Content-Type');
    next();
});

app.use('/api/products', productRoutes);

if(process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, '/frontend/build')))
    
    app.get('/', (req, res) => {
        res.sendFile(path.join(__dirname, 'frontend/build/index.html'))
    });
} else {
    app.get('*', (req, res) => {
        res.send("Api is running...");
    })
}


const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));