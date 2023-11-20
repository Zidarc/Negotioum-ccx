const mongoose = require("mongoose");
const dbUrl = 'mongodb+srv://alihussain:Kampala1980@cluster0.15cptjw.mongodb.net/?retryWrites=true&w=majority';
const express = require('express');
const UserData = require("./models/userdata")
const app = express()
const PORT = 3000
const cors = require('cors');
app.use(cors());
const connectionParams = {
    useNewUrlParser: true,
}

mongoose.connect(dbUrl,connectionParams). then(() =>{
    console.log("Connected to the DB");
})
.catch((e) => {
    console.log("Error",e);
});

app.listen(PORT, () => {
    console.log(`Listening on PORT: ${PORT}`);
})

app.get("/insert", (req, res) => {
    var datas = new UserData();
    datas.name = "Ali";
    datas.num = "3";

    datas.save()
        .then(() => {
            console.log("Data saved successfully.");
            res.status(200).send("Data saved successfully.");
        })
        .catch((err) => {
            console.error("Error saving data:", err);
            res.status(500).send("Error saving data.");
        });
});


app.get("/read", (req, res) => {
    UserData.find()
        .then((data) => {
            return res.status(200).send(data);
        })
        .catch((err) => {
            return res.status(500).send(err);
        });
});

app.get("/update", (req, res) => {
    const id = "6542dd63fbfbebee3c44792d";
    const newName = "Hussain";

    UserData.findByIdAndUpdate(id, { name: newName })
        .then((data) => {
            if (!data) {
                return res.status(404).send("Document not found.");
            }
            return res.status(200).send("Document updated successfully.");
        })
        .catch((err) => {
            return res.status(500).send(err);
        });
});
