const express = require("express");

const app = express();
const PORT = process.env.PORT || 4000;

app.use(express.static(__dirname + "/static"))


app.get("*", (req, res) => {
    res.send("<h1>Hello World</h1>")
})


app.listen(PORT, (error) => {
    if (error) {
        console.log("================= ERROR =================")
        console.log(error);
        return;
    }
    console.log("Server is running on PORT ", PORT)
})