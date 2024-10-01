const mongoose=require('mongoose');
const { places, descriptors } = require('./seedHelpers');
const cities = require('./cities');
const Campground=require('../models/campground');

mongoose.connect("mongodb://0.0.0.0:27017/yelp-camp");

const db=mongoose.connection;
db.on("error",console.error.bind(console,"connection error:"));
db.once("open",()=>{
    console.log("Database connected");
});

const sample = array => array[Math.floor(Math.random() * array.length)];



const seedDB = async () => {
    await Campground.deleteMany({});
    for (let i = 0; i < 50; i++) {
        const random1000 = Math.floor(Math.random() * 1000);
        const price= Math.floor(Math.random()*20)+10;
        const camp = new Campground({
            author:'66fafe66b996a406ce362192',
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            image: `https://picsum.photos/400?random=${Math.random()}`,
            description:"Picture",
            price
        })
        await camp.save();
    }
}

seedDB().then(() => {
    mongoose.connection.close();
})