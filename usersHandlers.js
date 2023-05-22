const database = require("./database");

const getUsers = (req, res) => {
    database
        .query("select * from users")
        .then(([users]) => {
            res.json(users);
        })
        .catch((err) => {
            console.error(err);
        });
};


const getUsersById = (req, res) => {
    const id = parseInt(req.params.id);
    database
        .query(`select * from users where id = ?`, [id])
        .then(([users]) => {
            const user = users.find((user) => user.id === id);
            if (user != null) {
                res.json(user);
            } else {
                res.status(404).send("Not Found");
            }
        })
        .catch((err) => {
            console.error(err);
        });
};


module.exports = {
    getUsers,
    getUsersById,
};
