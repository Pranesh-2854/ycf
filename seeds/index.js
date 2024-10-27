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
            description:"Picture",
            price,
            images: [
                {
                    url: 'https://res.cloudinary.com/dvall5nuq/image/upload/w_350,h_210/YelpCamp/xke4mafdkyo00m8c7fyl.jpg',
                    filename: 'YelpCamp/xke4mafdkyo00m8c7fyl'
                },
                {
                    url: 'https://res.cloudinary.com/dvall5nuq/image/upload/w_350,h_210/YelpCamp/ojdma1lwpnlottbwhlcx.jpg',
                    filename: 'YelpCamp/ojdma1lwpnlottbwhlcx'
                }
            ]
            
        })
        await camp.save();
    }
}

seedDB().then(() => {
    mongoose.connection.close();
})