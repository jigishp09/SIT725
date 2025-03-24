const express = require('express');
const app = express();
const port = 3000;

app.use(express.json());

app.get('/', (req, res) => {
    res.send('1.4 - Intro to Programming!');
});

app.get('/api/data', (req, res) => {
    res.json({ message: 'This is sample data from the API' });
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
