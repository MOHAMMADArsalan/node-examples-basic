const bcrypt = require("bcryptjs");

const password = "123abc!";
const hashPassword = '$2a$10$umTQ8Qrs90fgmgoIA/3PAOxOo/IRabRM45EdBaewFElut/kGVaZpG'
// bcrypt.genSalt(10, (err, salt) => {
//     bcrypt.hash(password, salt, (er, hash) => {
//         console.log("hash", hash)
//     })
// })

bcrypt.compare(password, hashPassword, (er, res) => { console.log(er, res) })