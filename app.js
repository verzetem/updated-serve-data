const express = require('express')
const app = express()
const cors = require('cors')
const port = 3030
const bodyParser = require('body-parser')
const cohorts = require('./cohorts')

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

app.use(cors())

app.get('/', (req, res) => {
	res.json(cohorts)
})

app.get('/cohorts', (req, res, next) => {
	res.json(cohorts)
})

app.get('/cohorts/:id', (req, res, next) => {
	const id = req.params.id
	cohorts.filter(cohort => {
		(cohort.id == id) ? res.json(cohort) : res.json({ error: "not found" })
		res.json(cohort)
	})
})

app.use(notFound)

function notFound(req, res, next) {
  res.status(404).send({ error: 'Not found!', status: 404, url: req.originalUrl })
}


app.listen(port, () => console.log(`Running on port ${port}`))