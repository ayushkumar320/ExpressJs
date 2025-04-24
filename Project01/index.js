const fs = require("fs");
const express= require("express");
const users = require("./MOCK_DATA.json");

const app = express();
const port = 8000;

app.use(express.urlencoded({extended: false}));

// Routes - Here I am defining all the possible routes that I can go to, one way is using app.route("route").get().post().patch() etc... Or you can define separately.

app.get('/api/users', (req, res) => {
    return res.json(users);
});

app.get('/users', (req, res) => {
    // One way - to use maps
    
    // const html = `
    // <ul>
    //     ${users.map((user) => `<li>${user.first_name}</li>`).join("")}
    // </ul>
    // `;
    // res.send(html);

    // Other way - using foreach loop
    let listItems = "";
    users.forEach((user) => {
        listItems += `<li>${user.first_name}</li>`;
    });

    const html = `
    <ul>
        ${listItems}
    </ul>
    `;
    res.send(html);
});


app.get("/api/users/:id", (req, res) => {
    const id = Number(req.params.id);
    const user = users.find((user) => user.id === id);
    return res.json(user);
});

app.post('/api/users', (req, res) => {
    const body = req.body;
    users.push({...body, id: users.length + 1});
    fs.writeFile("./MOCK_DATA.json", JSON.stringify(users), (err, data) => {
        return res.json({status: "success", id: users.length+1});
    });
});

app.listen(port, () => {
    console.log(`Server started at port ${port}`);
})