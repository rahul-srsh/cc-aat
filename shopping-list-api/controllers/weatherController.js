const Agenda = require("agenda");

const axios = require("axios");

const Weather = require("../models/weatherReport");

const agenda = new Agenda({
  db: { address: process.env.MONGO_URL, collection: "weatherReportAgenda" },
});

agenda.define("add weather", async (job) => {
  console.log("Adding weather");
  try {
    const response = await axios.get(
      "https://api.openweathermap.org/data/2.5/weather?lat=12.9716&lon=77.5946&appid=648e4614ae4a3678dd5e98bfbda560cd"
    );
    const data = response.data;
    // console.log(data);
    const weatherReport = new Weather(createWeatherObject(data));
    await weatherReport.save();
  } catch (error) {
    console.log("Error while retriving data!");
    console.log(error);
  }
});

(async function () {
  await agenda.start();

  await agenda.every("1 minute", "add weather");
})();

function createWeatherObject(weather) {
  const obj = {};
  obj.description = weather.weather[0].description;
  obj.temp = weather.main.temp;
  obj.feels_like = weather.main.feels_like;
  obj.humidity = weather.main.humidity;
  obj.city = weather.name;
  // console.log(obj);
  return obj;
}

module.exports = agenda;
