const express = require('express');
const app = express();
const PORT = 3000;

app.use(express.static('public'));

app.get('/cal', (req, res) => {
    const n1 = parseFloat(req.query.n1);
    const n2 = parseFloat(req.query.n2);

    if (isNaN(n1) || isNaN(n2)) {
        return res.status(400).json({ error: 'Invalid numbers' });
    }

    const sum = n1 + n2;
    const mul = n1 * n2;

    res.json({ 
        Total: sum, 
        Multiply: mul
    });
});


app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});



