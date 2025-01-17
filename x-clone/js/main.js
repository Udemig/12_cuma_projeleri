import { API } from "./api.js";

const api = new API();

// Sayfa yüklendiğinde Api'a istek at
document.addEventListener("DOMContentLoaded", async () => {
  const data = await api.fetchData(
    "timeline.php",
    "screenname",
    "isvec_krali_"
  );
});
