const mysql = require('mysql2/promise');
const config = require('../../config');

const dbPoolConfig = {
	host: config.DB_HOST,
	user: config.DB_USER,
	//password: config.DB_USER_PWD,
	database: config.DB_NAME,
	waitForConnections: true,
	connectionLimit: 50,
	queueLimit: 0
};
let pool;

const getConnection = async () => {
	if (pool) return await pool.getConnection();
	else {
		pool = mysql.createPool(dbPoolConfig);
		return await pool.getConnection();
	}
};

module.exports = { getConnection };
