
const express = require('express');
const app = express();
const mysql = require('mysql');
const cors = require('cors')

app.use(cors())
app.use(express.json())

const db = mysql.createConnection({
    user: 'root',
    host: 'localhost',
    password: 'password1',
    database: 'fake-data-schools',
});

//! Post 
app.post('/create', (req, res) => {
    const school_name = req.body.school_name;
    const school_city = req.body.school_city;
    const school_state = req.body.school_state;

    db.query('INSERT INTO client_ids(school_name, school_city, school_state) VALUES (?,?,?)',
        [school_name, school_city, school_state],
        (err, result) => {
            if (err) {
                console.log(err)
            } else {
                res.send("Values Inserted")
            }
        }
    )
})

//! Get
app.get('/schoolsID', (req, res) => {
    db.query('SELECT * FROM client_ids', (err, result) => {
        if (err) {
            console.log(err)
        } else {
            res.json(result)
        }
    })
})

//! Put
app.put('/update', (req, res) => {
    const client_id = req.body.client_id;
    const school_name = req.body.school_name;
    db.query('UPDATE client_ids SET   school_name = ? WHERE client_id = ?',
        [school_name, client_id],
        (err, result) => {
            if (err) {
                console.log(err)
            } else {
                res.send(result)
            }
        }
    )
})

//! Delete
app.delete('/delete/:client_id', (req, res) => {
    const client_id = req.params.client_id;
    db.query('DELETE FROM client_ids WHERE client_id = ?', client_id, (err, result) => {
        if (err) {
            console.log(err)
        } else {
            res.send(result)
        }
    })
})



const PORT = process.env.PORT || 8000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));

