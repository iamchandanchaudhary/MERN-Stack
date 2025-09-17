// Static Url
app.get('/about', (req, res) => {
    res.send('About Page');
});

// Dynamic Url
app.get('/products/:id', (req, res) => {
    res.send(`Product ID: ${req.params.id}`);
});

// Query Url
app.get('/search', (req, res) => {
    const { q, category } = req.query;
    res.send(`Searching for ${q} in ${category}`);
});
