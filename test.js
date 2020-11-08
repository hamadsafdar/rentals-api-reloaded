require('dotenv').config();
const { getConnection } = require('./src/database');

//check if table exists
const usersTableQuery = `
    SELECT COUNT(*) AS rowsCount
        FROM information_schema.TABLES
            WHERE (TABLE_SCHEMA = 'hamad_rentalsdb') AND (TABLE_NAME = 'users');
`;

const init = async () => {
	try {
		const connection = await getConnection();
		const [userRows] = await connection.query(usersTableQuery);
		if (userRows[0].rowsCount === 0) {
		}
		return;
	} catch (error) {
		console.log(error);
	}
};

init();
