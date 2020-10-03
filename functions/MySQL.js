const mysql = require("mysql");

module.exports = {
    connect: () => {

        var connection = mysql.createConnection({
            host: "localhost",
            user: "root",
            password: "",
            database: "teamToast"
        });

        connection.connect(function (err) {
            if (err) throw err;

            console.log(`Connected!`);
        })

        return connection;
    },
    insert: (connection, table, fields, values) => {
        const sql = `INSERT INTO ${table} (${fields}) VALUES (${values})`;
        connection.query(sql, function (err, result) {
            if (err) throw err;

            return "Added data to the database"
        });
    },
    select: (connection, table) => {
        return new Promise((resolve, reject) => {
            connection.query(`SELECT * FROM ${table}`, function (err, result, fields) {
                if (err) reject(err);

                resolve(result);
            });
        });
    },
    update: (connection, table, field, oldValue, newValue) => {
        const sql = `UPDATE ${table} SET ${field} = ${newValue} WHERE ${field} = ${oldValue}`;
        connection.query(sql, function (err, result) {
            if (err) throw err;

            return "Updated data in the database"
        })
    },
    delete: (connection, table, field, index) => {
        const sql = `DELETE FROM ${table} WHERE ${field} = ${index}`;
        connection.query(sql, function (err, result) {
            if (err) throw err;

            return "Removed data from the database"
        });
    }
}