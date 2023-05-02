//import database driver
const dbDriver = require('better-sqlite3');
// Connect to db
const db = dbDriver('bands.sqlite3');

// Import express
const express = require('express');
// Create express app
const app = express();

// Express setup
// Serve a static frontend
app.use(express.static('frontend'));

// Tell express to use json
app.use(express.json());

// Rest API
// Get all bands
app.get('/bands', (req,res)=>{
    //req=request
    //res=respond
    // Prepare and execute in one line
    const bands =db.prepare(`
    SELECT *FROM bands`).all();
    // Send back json
    res.json(bands);

});
// Get single band based on url / id 
app.get ('/bands/:id',(req,res) => {
    // Get the url id
    
    const id = req.params.id;
    console.log (req);
    let statement = db.prepare('SELECT * FROM bands WHERE id= :id');
    let result = statement.all({
        id
    });
    //send back band or error
    res.json(result[0]|| {'error': 'No band matching id'});
});

//Start the server
app.listen(3000,()=> {
    console.log('server started on port 3000');
});
