const { getConnection } = require('./index');

//check if table exists

const initUser = async () => {
	try {
		const usersTableQuery = `
  		  SELECT COUNT(*) AS rowsCount
        	FROM information_schema.TABLES
				WHERE (TABLE_SCHEMA = 'rentalsdb') AND (TABLE_NAME = 'Users');
					`;
		const connection = await getConnection();
		const [userRows] = await connection.query(usersTableQuery);
		if (userRows[0].rowsCount === 0) {
			const createUserTableQuery = `
				CREATE TABLE Users (
					UserId INT AUTO_INCREMENT PRIMARY KEY,
					FullName VARCHAR(35) NOT NULL,
					Email VARCHAR(80) NOT NULL UNIQUE,
					PhoneNumber VARCHAR(20) UNIQUE,
					Password VARCHAR(60) NOT NULL,
					Verified BOOLEAN DEFAULT false,
					LoggedIn  BOOLEAN DEFAULT 0,
					ImageUrl VARCHAR(255),
					CreatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
					UpdatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
				);
			`;
			await connection.query(createUserTableQuery);
			connection.release();
			console.log('DATABASE SETTINGS: USER_TABLE_CREATED');
		}
		return;
	} catch (error) {
		console.log(error);
	}
};

module.exports = initUser();
