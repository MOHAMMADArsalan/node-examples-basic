const jwt = require("jsonwebtoken");

const secret_key = '4545485133ds5sddddsdrgwfjwhdsbdjsbdjs';

const data = {
    id: 10
}
const token = jwt.sign(data, secret_key);
console.log(token)
const decoded = jwt.verify(token, secret_key)
console.log('====================================');
console.log(decoded);
console.log('====================================');