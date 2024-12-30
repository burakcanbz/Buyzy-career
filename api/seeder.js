const fs = require('fs');
const bcrypt = require('bcryptjs');
const { fileReader } = require('./helpers/utils');

const hashPasswords = async () => {
  try {
    const jsonData = await fileReader('userTemplate')
    const users = jsonData.users.map((user) => {
      const hashedPassword = bcrypt.hashSync(user.password, 10); 
      return {
        ...user,
        password: hashedPassword, 
      };
    });

    fs.writeFileSync(
      './data/users.json',
      JSON.stringify({ users }, null, 2),
      'utf8'
    );

    console.log('Passwords hashed and saved successfully.');
  } catch (error) {
    console.error('Error:', error);
  }
};

hashPasswords();