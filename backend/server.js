require('dotenv').config();
const express = require('express');
const helmet = require('helmet');
const compression = require('compression');
const cors = require('cors');
const cookieParser = require('cookie-parser');

const corsOptions = require('./config/corsOptions');
const connectDB = require('./config/mongoDb');
const errorHandler = require('./middleware/errorHandler');

const PORT = 8000;
const app = express();

app.use(helmet());
app.use(compression());
app.use(cookieParser());
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// connect with mongoDB
connectDB();

app.use('/user', require('./router/usersRouter'));

app.use(errorHandler);

app.listen(PORT, () => {
   console.log(`server is live`);
});
