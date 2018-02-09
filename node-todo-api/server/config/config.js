let dbName = process.env.NODE_ENV === 'test' ? 'TodoAppsTest' : 'TodoApps'
module.exports = {
    PORT: process.env.PORT || 3000,
    dbURL: `mongodb://localhost:27017/${dbName}`,
    JWT_SECRET_TOKEN: 'djksdhjksdhjksdh23uiyeydsjksdbj8u38738sddb8e83'
}