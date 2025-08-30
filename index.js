const mongoose = require("mongoose");
const dbUrl = 'env check local file';
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
