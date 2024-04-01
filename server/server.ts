import * as express from "express";
import { Request, Response } from "express";
import axios from "axios";
import * as cors from "cors";

const app = express();
const PORT = process.env.PORT || 5000; // Port for Express server

const allowedOrigins = ['http://localhost:3000'];

const options: cors.CorsOptions = {
  origin: allowedOrigins
};


app.use(cors());

// Define a route to proxy weather requests
app.get("/weather", async (req: Request, res: Response) => {
  try {
    const { city } = req.query;
    const geoResponse =
      await axios.get(`http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=5&appid=b58c016923a75be570bcce61f8bdd78c
    `);

    // Assuming the first result is the city we want
    const { lat, lon } = geoResponse.data[0];

    const weatherResponse =
      await axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=b58c016923a75be570bcce61f8bdd78c
    `);

    res.json(weatherResponse.data); // Send response here, once
  } catch (error) {
    console.error("Error fetching weather:", error);
    res.status(500).json({ error: "Failed to fetch weather data" }); // Proper error handling
  }
});


// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
