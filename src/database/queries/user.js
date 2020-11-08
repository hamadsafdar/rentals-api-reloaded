const { getConnection } = require('../index');

async function create({ name, email, password }) {
	const query =
		'INSERT INTO `Users`(FullName, Email, Password) VALUES (?,?,?);';
	const values = [name, email, password];
	const connection = await getConnection();
	try {
		await connection.execute(query, values);
		connection.release();
		return Promise.resolve(true);
	} catch (error) {
		return Promise.reject(error);
	}
}

async function getByEmail(email) {
	const query = `
	SELECT 
		UserId as id, 
		FullName AS name, 
		Email AS email, 
		Password AS password, 
		PhoneNumber AS phoneNumber,
		CreatedAt AS createdAt,
		UpdatedAt AS updatedAt,
		Verified AS verified,
		LoggedIn AS loggedIn
	FROM 
		Users
	WHERE
		Email = ?
	`;
	const connection = await getConnection();
	try {
		const [rows] = await connection.execute(query, [email]);
		connection.release();
		return Promise.resolve(rows);
	} catch (error) {
		return Promise.reject(error);
	}
}

async function getById(id) {
	const query = `
	SELECT 
		UserId as id, 
		FullName AS name, 
		Email AS email,
		PhoneNumber AS phoneNumber,
		CreatedAt AS createdAt,
		UpdatedAt AS updatedAt,
		Verified AS verified,
		LoggedIn AS loggedIn
	FROM 
		Users
	WHERE
		UserId = ?
	`;
	const connection = await getConnection();
	try {
		const [rows] = await connection.execute(query, [id]);
		connection.release();
		return Promise.resolve(rows);
	} catch (error) {
		connection.release();
		return Promise.reject(error);
	}
}

async function checkEmailUnique(email) {
	const query = `SELECT COUNT(*) AS rowsCount FROM Users WHERE email = ?`;
	try {
		const connection = await getConnection();
		const [rows] = await connection.execute(query, [email]);
		const isExist = Boolean(rows[0].rowsCount);
		connection.release();
		return Promise.resolve(isExist);
	} catch (error) {
		return Promise.reject(error);
	}
}

module.exports = { create, getByEmail, checkEmailUnique, getById };
