import express from 'express';
import cors from 'cors';
import internshipRoutes from './routes/internships';
import { internships } from './models/internship'; 

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send("API is up and running");
});

app.use('/api/internships', internshipRoutes);

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});