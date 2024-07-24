import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import { connectToDatabase } from './utils/database';
import morgan from 'morgan';
import helmet from 'helmet';
import {errorHandler} from './utils/errorhandler';
import authRoute from './routes/authRoute';

dotenv.config();

const app = express();
const port = process.env.PORT;

app.use(express.json());
app.use(cookieParser());

const corsoption = {
    origin: 'http://localhost:5173',
    credentials: true,
    exposedHeaders: ['authorization'],
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
};

app.use(cors(corsoption));

//database connection
connectToDatabase();

// Use morgan middleware
app.use(morgan('common'));
app.use(helmet());  
app.use(errorHandler);

app.use("/api/auth", authRoute);

app.use(errorHandler);
// // Function to insert users into the database
// const seedUsers = async () => {
//     try {
//         await connectToDatabase();
//         await UserModel.insertMany(users);
//         console.log('Test users inserted successfully');
//         mongoose.connection.close();
//     } catch (error) {
//         console.error('Error inserting test users:', error);
//         mongoose.connection.close();
//     }
// };

// // Execute the function
// seedUsers();

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});