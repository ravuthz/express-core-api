const {Sequelize, Model, DataTypes} = require("sequelize");

const sequelize = new Sequelize("sqlite::memory:");

const User = sequelize.define("User", {
    username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    birthday: DataTypes.DATE,
});

(async () => {
    // await User.sync();
    await sequelize.sync();

    await User.create({
        username: "adminz",
        birthday: new Date(1980, 6, 20),
    });

    await User.create({
        username: "ravuthz",
        birthday: new Date(1990, 7, 2),
    });

})();

module.exports = {
    User,
};
