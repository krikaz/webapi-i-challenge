const express = require('express');
const server = express();
const Users = require('./data/db');

server.use(express.json());

server.get('/api/users', (req, res) => {
	Users.find()
		.then(data => {
			console.log('success');
			res.json(data);
		})
		.catch(error => {
			console.log('failure');
			res.json(error);
		});
});

server.get('/api/users/:id', (req, res) => {
	Users.findById(req.params.id)
		.then(data => {
			console.log('success');
			res.json(data);
		})
		.catch(error => {
			console.log('failure');
			res.json(error);
		});
});

server.post('/api/users', (req, res) => {
	if (req.body.name && req.body.bio) {
		Users.insert(req.body)
			.then(data => {
				console.log('success');
				res.status(201);
				res.json(data);
			})
			.catch(error => {
				console.log('failure');
				res.status(500);
				res.json({
					error: 'There was an error while saving the user to the database',
				});
			});
	} else {
		req.setTimeout(1000);
		res.status(400);
		res.json({ errorMessage: 'Please provide name and bio for the user.' });
	}
});

server.put('/api/users', (req, res) => {
	Users.update(req.params.id, req.body)
		.then(data => {
			console.log('success');
			res.json(data);
		})
		.catch(error => {
			console.log('failure');
			res.json(error);
		});
});

server.delete('/api/users/:id', (req, res) => {
	Users.remove(req.params.id)
		.then(data => {
			console.log('success');
			res.json(data);
		})
		.catch(error => {
			console.log('failure');
			res.json(error);
		});
});

server.listen(3000, () => {
	console.log('listening on 3000');
});
