const app = require("./app")
const port = 5414;
app.listen(port, ()=>{
    console.log(` back-end is running on http://localhost:${port}`)
})