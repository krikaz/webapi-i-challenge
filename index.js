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
	Users.insert(req.body)
		.then(data => {
			console.log('success');
			res.json(data);
		})
		.catch(error => {
			console.log('failure');
			res.json(error);
		});
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