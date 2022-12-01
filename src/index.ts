import express from 'express';
import bodyParser from 'body-parser';
import User from './routes/user'
import Song from './routes/song';
import DbConnect from './utils/DbConnect'
const app = express();
const port = 9000;
app.get('/', (req, res) => {
    res.send('Server is up and running!');
});



app.use(bodyParser.json())
app.use('/', User)
app.use('/song', Song)

app.listen(port, () => {
    console.log(`Server is listening on ${port}`);
});
