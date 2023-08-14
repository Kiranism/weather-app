export const CITY_URL = "https://wft-geo-db.p.rapidapi.com/v1/geo/cities";
export const geoOptions = {
  method: "GET",
  headers: {
    "X-RapidAPI-Key": `${import.meta.env.VITE_APP_RAPID_API_KEY}`,
    "X-RapidAPI-Host": "wft-geo-db.p.rapidapi.com",
  },
};
