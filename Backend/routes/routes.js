const appRouter = (app, fs, cors, corsOptions) => {

    // i grab the data from the json file
    const path = './data/Chatbot - stock data.json';
    let file;
    // i use fs file reader to get the data and keep it in a variable
    fs.readFile(path, 'utf8', (err, data) => {
        if (err) {
            throw err;
        }
        file = JSON.parse(data);
    });

    // in case we want all the data
    app.get('/', cors(corsOptions), (req, res) => {
            res.send(file);
    })

    // i send the menu for the stock groups
    app.get('/stock-group', cors(corsOptions), (req, res) => {
        let response = [];

        file.forEach(element => {
            response.push(element.stockExchange);
        })

        res.send(response);
    })

    app.get('/stock-group/:group', cors(corsOptions), (req, res) => {
        // i requested the Stock Exchange group that we want to display
        const group = req.params.group;
        let response = [];

        // i found the excat group that its needed
        file.forEach(element => {
            if(element.stockExchange.toLowerCase() === group.toLowerCase()) {
                element.topStocks.forEach(stock => {
                    response.push(stock.stockName);
                }) 
            } else {
                // we send an empty array if the group is not found
                response = [];
            }
        });

        // i sent the response to the client
        res.send(response);
    })

    // the menu after we choose a stock to buy
    app.get('/stock/:stock', cors(corsOptions), (req, res) => {
        res.send(['Main menu','Go Back'])
    })

};

module.exports = appRouter;