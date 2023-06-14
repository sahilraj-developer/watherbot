const Telegrambot =require("node-telegram-bot-api");
const axios = require("axios");

const express = require('express');
const app = express();

require('dotenv').config()

const port = process.env.PORT;
const token = process.env.TOKEN;
const apidiid = process.env.APIID;


app.get('/',(req,res)=>{
    res.send()
})

// const port  = 3000; 

app.listen(port,()=>{
    console.log(`Server running at http://localhost:${port}`)
})

// const token = tokens;


const bot = new Telegrambot(token,{polling:true});

bot.on("message", async (msg)=>{
    const chatId = msg.chat.id;
    const userInput = msg.text;
    try{
        const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${userInput}&appid=${apidiid}`);
        const data = response.data;
        const weather = data.weather[0].description;
        const temperature = data.main.temp - 273.15;
        const city = data.name;
        const humidity = data.main.humidity;
        const presure = data.main.pressure;
        const windSpeed = data.wind.speed;

        const message = `The Weather in ${city} is ${weather} with a temperature of ${temperature.toFixed(2)}° C. The Humidity is ${humidity}%, the pressure is ${presure} hPa, and the wind is ${windSpeed} m/s.`;

        bot.sendMessage(chatId,message)

    }catch(error){
        bot.sendMessage(chatId,'City Doesn/t exist.')

    }

})

