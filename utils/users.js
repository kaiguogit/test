const fs = require('fs');
const path = require('path');
const USER_DB = '../users.json';

exports.getUsers = () => {
    return JSON.parse(fs.readFileSync(path.resolve(__dirname, USER_DB)).toString());
};

exports.updateUsers = users => {
    fs.writeFileSync(path.resolve(__dirname, USER_DB), JSON.stringify(users, null, 4));
};

exports.generateToken = length => {
    if (!length) {
        length = 30;
    }
    const stringArray = ['0','1','2','3','4','5','6','7','8','9','a','b','c','d','e','f','g','h',
    'i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z','A','B','C','D','E','F',
    'G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z','!','?'];
    let rndString = '';
    // build a string with random characters
    for (let i = 0; i < length; i++) {
        let rndNum = Math.ceil(Math.random() * stringArray.length) - 1;
        rndString = rndString + stringArray[rndNum];
    }
    return rndString;
};
