import express from 'express';
import cors from 'cors';


const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

app.get('/', (req: express.Request, res: express.Response) => {
    res.send("API is up an running");
});
app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});


