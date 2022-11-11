const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function (req, res) {
  res.sendFile(__dirname + "/index.html");
  
});

app.post("/", function(req,res){

 const query = req.body.cityName;
  const apiKey = "ec04a619eec05d03d8abd0f22b85e8d1";
  const unit = "metric";

  const url =
    "https://api.openweathermap.org/data/2.5/weather?q=" +query +"&appid=" +apiKey +"&units=" +unit;
  https.get(url, function (response) {
    console.log(response.statusCode);

    response.on("data", function (data) {
      const weatherData = JSON.parse(data);
      console.log(weatherData);

      const icon = weatherData.weather[0].icon;
      const imageUrl = "http://openweathermap.org/img/wn/" + icon + "@2x.png";
      const weatherDescription = weatherData.weather[0].description;
      const temp = weatherData.main.temp;
      res.write(
        "<p>The current weather is " + weatherDescription + "</p>"
      );
      res.write(
        "<h1>The Termparature in "+query+" is: " + temp + " Degree Celcius</h1>"
      );
      res.write("<img src=" + imageUrl + " />");
      res.send();
    });
  });

})


app.listen(3000, function () {
  console.log("This server is running on port 3000.");
});
