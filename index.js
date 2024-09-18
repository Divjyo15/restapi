const express = require('express');
const users = require('./MOCK_DATA.json')
const app = express();
const Port = 8001;
const fs = require('fs');
app.use(express.urlencoded({extended:false}))
app.use((req,res,next) =>{
console.log("Hello from middleware1")
next();
});
app.use((req,res,next) =>{
    console.log("Hello from middleware2")
    return res.end("Hey baby!!");
    });
app.get('/users', (req, res) => {
    const html = `
    <ul>
    ${users.map((user) => `<li>${user.first_name}</li>`).join("")}
    </ul> 
    `;
    res.send(html)
})
app.get("/api/users",(req,res) =>{
   return res.json(users);
})

app.route("/api/users/:id")
    .get((req, res) => {
        const id = Number(req.params.id);
        const user = users.find((user) => user.id === id);
        if (user) {
            return res.json(user);
        } else {
            return res.status(404).json({ error: "User not found" });
        }
    })

.patch((req, res) => {
    const id = Number(req.params.id);
    const user = users.find((user) => user.id == id);
    return res.json({status:pending});
})
.delete(
    (req, res) => {
        const id = Number(req.params.id);
        const user = users.find((user) => user.id == id);
        return res.json({status:pending});
})


 app.post("/api/users",(req,res) => {
    const body = req.body
    users.push({...body , id :users.length+1});
    fs.writeFileSync('MOCK_DATA.json', JSON.stringify(users),(err,data)=>{
        return res.json({status: "Success",id:users.length });  
    });

})   
// rest api 

app.get("/api/users",(req,res) => {
res.setHeader("MyName","Divya");// custom header
// always add custom to x headers 

return res.json(users);
})





app.listen(Port, () => {
    console.log(`Server Started at PORT :  ${Port}`)
})