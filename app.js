require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const User = require('./models/User')

const app = express();

app.use(express.json());

mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.log('MongoDB connection error: ', err));

app.get('/', (res,req) => {
    res.send('Welcome to the Budget Tracker App!');
});

app.post('/api/register' , async (res,req) => {
    const {username, password} = req.body;

    try {
        const newUser = new User({username, password});
        await newUser.save();
        res.status(201).send('User registered successfully')

    } catch (error) {
        res.status(400).send('Error registering user: ' + error.message)
    }
});

const PORT = 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));