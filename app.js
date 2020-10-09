const express = require('express')
const app = express()
const port = 3000

const sqlite3 = require('sqlite3').verbose()

let db = new sqlite3.Database(':memory:', (err) => {
    if (err) {
      return console.error(err.message)
    }
    console.log('Connected to the in-memory SQlite database.')
})

// let db = new sqlite3.Database('./chinook.db')

app.get('/', (req, res) => {
    res.send('ok')
})

app.get('/close', (req, res) => {
    db.close((err) => {
        if (err) {
            console.error(err.message)
            res.send(err.message)
          }
          else {
              console.log('Close the database connection.')
              res.send('Close the database connection.')
        }
    })
})

app.get('/create', (req, res) => {
    const sql = 'CREATE TABLE TEST (NAME TEXT);'
    db.run(sql)
})

app.get('/select', (req, res) => {
    const sql = 'SELECT * FROM TEST;'
    const params = []
    db.run(sql, params, (err, rows) => {
        if (err) {
            res.send(err.message)
        }
        else {
            res.send(rows)
        }
    })
})

app.get('/all', (req, res) => {
    const sql = 'SELECT * FROM TEST;'
    const params = []
    db.all(sql, params, (err, rows) => {
        if (err) {
            res.send(err.message)
        }
        else {
            res.send(rows)
        }
    })
})

app.listen(port, () => {
    console.log('PORT:', port)
})