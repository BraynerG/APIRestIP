const fs = require('fs')

const BBDDPath = './src/database/tbl_path.json'

const getPaths = () => {
    return JSON.parse(fs.readFileSync(BBDDPath, { encoding: 'utf-8' }))
}

const getPath = (id) => {
    return JSON.parse(fs.readFileSync(BBDDPath, { encoding: 'utf-8' }))[id]
}

const createPath = (route, type, method, response) => {

    fs.writeFileSync(BBDDPath, JSON.stringify([...getPaths(), { route, type, method, response }]))

}

const editPath = (id, changes) =>{

    const paths = [...getPaths()]

    paths[parseInt(id)] = {...paths[parseInt(id)], ...changes}

    fs.writeFileSync(BBDDPath, JSON.stringify(paths))
}

const deletePath = ( id ) => {

    const paths = [...getPaths()]

    paths.splice(parseInt(id),1)

    fs.writeFileSync(BBDDPath, JSON.stringify(paths))

}

module.exports = { getPaths, getPath, createPath, editPath, deletePath }