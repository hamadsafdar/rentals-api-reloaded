const User = require('../models/User');
const bcrypt = require('bcrypt');
const config = require('../../config');
const jwt = require('jsonwebtoken');

async function register(req, res) {
	const { name, email, password } = req.body;
	const user = new User({
		name,
		email,
		password
	});

	try {
		const isEmailExists = await User.checkEmailExist(email);
		if (!isEmailExists) {
			user.password = await bcrypt.hash(user.password, config.HASH_SALT);
			await user.save();
			return res.status(201).json({
				message: 'USER_CREATED'
			});
		} else {
			return res.json({
				message: 'EMAIL_ALREADY_EXISTS'
			});
		}
	} catch (error) {
		console.log(error);
		return res.status(500).json({
			message: 'INTERNAL_ERROR'
		});
	}
}

async function authenticate(req, res) {
	const { email, password } = req.body;
	try {
		const user = await User.getByEmail(email);

		if (user) {
			const isAuthenticated = await bcrypt.compare(
				password.trim(),
				user.password.trim()
			);
			if (isAuthenticated) {
				delete user.password;
				const token = jwt.sign({ userId: user.id }, config.JWT_SECRET, {
					algorithm: 'HS256'
				});
				return res.json({
					user: user,
					isAuthenticated: true,
					token
				});
			} else {
				return res.json({
					isAuthenticated: false,
					message: 'INVALID_CREDENTIALS'
				});
			}
		} else {
			return res.json({
				isAuthenticated: false,
				message: 'INVALID_CREDENTIALS'
			});
		}
	} catch (error) {
		console.log(error);
		return res.status(500).json({
			isAuthenticated: false,
			message: 'INTERNAL_ERROR'
		});
	}
}

module.exports = { register, authenticate };
