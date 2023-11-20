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

app.get('http://localhost:3000/insert', async (req, res) => {
    try {
        const datas = new UserData({
            Team_name: 'Ali',
            Team_password: 'someHashedPassword', // Make sure to use a secure hash
            coins: [10, 5, 6, 8, 7, 4], // Assuming you want to initialize all coin values to 0
        });

        await datas.save();

        console.log('Data saved successfully.');
        res.status(200).send('Data saved successfully.');
    } catch (err) {
        console.error('Error saving data:', err);
        res.status(500).send('Error saving data.');
    }
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
