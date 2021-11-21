const User = require('../model/User');

module.exports = {
    async post(req, res) {
        const {name, email} = req.body;        
        const new_user = await User.create({name, email});

        return res.json(new_user);
    },

    async get(req, res) {
        const users = await User.findAll();

        return res.json(users);
    },

    async put(req, res) {
        const {id, name, email} = req.body;
        const user = await User.update({
                name: name,
                email: email,
            },
            {
                where: {
                    id: id
            }
        });

        return res.json(user);
    },

    async delete(req, res) {
        const {id} = req.body;
        const user = await User.destroy({
            where: {
                id: id
            }
        })

        return res.json(user);
    }
};