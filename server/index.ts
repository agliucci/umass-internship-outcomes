import express from 'express';
import cors from 'cors';
import internshipRoutes from './routes/internships';

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

app.get('/', (req: express.Request, res: express.Response) => {
    res.send("API is up an running");
});

app.use('/api/internships', internshipRoutes);
app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});


