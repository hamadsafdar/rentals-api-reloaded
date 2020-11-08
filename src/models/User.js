const user = require('../database/queries/user');
const queries = require('../database/queries/user');

function User({
	id = null,
	name,
	email,
	password,
	phoneNumber,
	verified,
	loggedIn,
	imageUrl
}) {
	this.id = id;
	this.name = name;
	this.email = email;
	this.password = password;
	this.phoneNumber = phoneNumber;
	this.verified = verified;
	this.loggedIn = loggedIn;
	this.imageUrl = imageUrl;
}

User.prototype.save = async function () {
	return await queries.create(this);
};

User.getByEmail = async function (email) {
	try {
		const raw = await queries.getByEmail(email);
		if (raw.length === 0) return Promise.resolve(null);
		else return Promise.resolve(new User(raw[0]));
	} catch (error) {
		return Promise.reject(error);
	}
};

User.checkEmailExist = async function (email) {
	return await queries.checkEmailUnique(email);
};

module.exports = User;
