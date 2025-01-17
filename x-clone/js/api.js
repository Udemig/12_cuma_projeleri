// Api'ın bizi tanıması için gereken bir obje
const options = {
  method: "GET",
  headers: {
    "x-rapidapi-key": "d8b7d9a6c9msh95b988adf85f44fp1721b2jsn54008d431a03",
    "x-rapidapi-host": "twitter-api45.p.rapidapi.com",
  },
};
// Baseurl
const baseUrl = "https://twitter-api45.p.rapidapi.com";

export class API {
  // Kurucu metot
  constructor() {}

  // Kullanıcı verilerini alan fonksiyon
  async getUser(userName) {
    try {
      // Api'a istek at
      const res = await fetch(
        `https://twitter-api45.p.rapidapi.com/screenname.php?screenname=${userName}`,
        options
      );
      // Api'dan gelen veriyi js nesnesine çevir
      const data = await res.json();

      // Veriyi dönder
      return data;
    } catch (err) {
      console.log(`Hataaa: ${err}`);
    }
  }
  //  Kullanıcın attığı tweetleri alan fonksiyon
  async fetchData(endopint, paramName, paramValue) {
    const res = await fetch(
      `${baseUrl}/${endopint}?${paramName}=${paramValue}`,
      options
    );

    const data = await res.json();

    console.log(data.timeline);
  }
}
