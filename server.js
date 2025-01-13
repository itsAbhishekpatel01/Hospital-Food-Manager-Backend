const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const patientRouter = require('./routes/patient.routes');
const cors = require('cors');


dotenv.config();
connectDB();

const app = express();
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({extended: true}));

const port = 3000;

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.use('/api/patients', patientRouter);






app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});