const express = require('express');
const server = express();
const Users = require('./data/db');

server.use(express.json());

server.get('/api/users', (req, res) => {
	Users.find()
		.then(data => {
			res.json(data);
		})
		.catch(() => {
			res.status(500);
			res.json({ error: 'The users information could not be retrieved.' });
		});
});

server.get('/api/users/:id', (req, res) => {
	Users.findById(req.params.id)
		.then(data => {
			if (!data) {
				res.status(404);
				res.json({ message: 'The user with the specified ID does not exist.' });
			} else {
				res.json(data);
			}
		})
		.catch(() => {
			res.status(500);
			res.json({ error: 'The user information could not be retrieved.' });
		});
});

server.post('/api/users', (req, res) => {
	if (req.body.name && req.body.bio) {
		Users.insert(req.body)
			.then(data => {
				res.status(201);
				res.json(data);
			})
			.catch(() => {
				res.status(500);
				res.json({
					error: 'There was an error while saving the user to the database',
				});
			});
	} else {
		res.status(400);
		res.json({ errorMessage: 'Please provide name and bio for the user.' });
	}
});

server.put('/api/users', (req, res) => {
	if (req.body.name && req.body.bio) {
		Users.update(req.params.id, req.body)
			.then(data => {
				if (!data) {
					res.status(404);
					res.json({
						message: 'The user with the specified ID does not exist.',
					});
				} else {
					res.status(200);
					res.json(data);
				}
			})
			.catch(() => {
				res.status(500);
				res.json({ error: 'The user information could not be modified.' });
			});
	} else {
		res.status(400);
		res.json({ errorMessage: 'Please provide name and bio for the user.' });
	}
});

server.delete('/api/users/:id', (req, res) => {
	Users.remove(req.params.id)
		.then(data => {
			if (!data) {
				res.status(404);
				res.json({ message: 'The user with the specified ID does not exist.' });
			} else {
				res.json(data);
			}
		})
		.catch(() => {
			res.status(500);
			res.json({ error: 'The user could not be removed' });
		});
});

server.listen(3000, () => {
	console.log('listening on 3000');
});
