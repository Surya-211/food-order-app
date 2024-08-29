const mongoose = require('mongoose')
const dotenv = require('dotenv').config();
const mongoURI = process.env.MONGODB_URL;

const mongoDB = async() => {
        await mongoose.connect(mongoURI).then( () => {
            console.log("connected");
            const fetched_data = async () => {
                try {
                    const collection = mongoose.connection.db.collection("food_items");
                    const data = await collection.find({}).toArray();
                    return data;
                } catch (error) {
                    console.error("Error fetching data:", error);
                    throw error;
                }
            };
            const foodCategory = async () => {
                try {
                    const collection = mongoose.connection.db.collection("foodCategory");
                    const data = await collection.find({}).toArray();
                    return data;
                } catch (error) {
                    console.error("Error fetching data:", error);
                    throw error;
                }
            };
            fetched_data().then(data => {
                foodCategory().then(catData => {
                    global.food_items = data;
                    global.foodCategory = catData;
                })
                .catch(error => {
                    console.error(error);
                });
            })
            .catch(error => {
                console.error(error);
            });
    }
        ).catch( (err) => {
        console.log("Error",err)
    });
}

module.exports = mongoDB;