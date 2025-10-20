const bcrypt = require('bcryptjs');
const dotenv = require('dotenv');
const colors = require('colors');
const { users } = require('./data/userTemplate');
const { openPositions } = require('./data/positions');
const User = require('./model/userModel.js');
const Position = require('./model/positionModel.js');
const connectDB  = require('./config/db.js');
const Application = require('./model/applicationModel.js');
const Feedback = require('./model/feedbackModel.js');

dotenv.config(), connectDB();

const importData = async () => {
    try {
        await User.deleteMany();
        await Position.deleteMany();

        const hashedUsers = users.map(user => {
            const hashedPassword = bcrypt.hashSync(user.password, 10);
            return { ...user, password: hashedPassword };
        });
        await User.insertMany(hashedUsers);
        await Position.insertMany(openPositions);

        console.log('Data Imported!'.green.inverse);
        process.exit();
    }
    catch (error) {
        console.log(`${error}`.red.inverse);
        process.exit(1);
    }
};

module.exports = { importData };

const destroyData = async () => {
    try {
        await User.deleteMany();
        await Position.deleteMany();
        await Application.deleteMany();
        await Feedback.deleteMany();

        console.log('Data Destroyed!'.red.inverse);
        process.exit();
    }
    catch (error) {
        console.log(`${error}`.red.inverse);
        process.exit(1);
    }
}

if (process.argv[2] === '-i') {
    importData();
}

if (process.argv[2] === '-d') {
    destroyData();
}