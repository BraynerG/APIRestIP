const fs = require('fs')
const jwt = require('jsonwebtoken')

const BBDDPath = './src/database/tbl_user.json'

const getUser = (username) => {

    for (user of JSON.parse(fs.readFileSync(BBDDPath, { encoding: 'utf-8' }))) {
        if (user.username == username) return user
    }

    return undefined
}

const authUser = (username, password) => {

    const user = getUser(username)

    if (password == user.password) return true

    return false
}

module.exports = { getUser, authUser }