import { API } from "./api.js";
import { getFromLocal, removeFromLocal } from "./helper.js";
import { mainEle, renderTimeline, renderUserInfo, renderInfo } from "./ui.js";

const api = new API();

const user = getFromLocal("user");

// Sayfa yüklendiğinde Api'a istek at
document.addEventListener("DOMContentLoaded", async () => {
  const data = await api.fetchData("timeline.php", "screenname", user.profile);
  renderTimeline(data, mainEle.tweetsArea, user);

  renderUserInfo(user);

  controlURL();
});

// Çıkış yap butona tıklanınca
mainEle.logoutBtn.addEventListener("click", () => {
  // Kullanıcı verilerini local'den kaldır
  removeFromLocal("user");
  // Kullanıcıyı login sayfasına yönlendir
  window.location = "/auth.html";
});

const controlURL = async () => {
  const path = window.location.search.split("/")[0];
  const userName = window.location.search.split("/")[1];
  const id = window.location.hash.replace("#", "");

  // Kullanıcı yoksa login sayfasına yönlendir
  if (!user) {
    window.location = "/auth.html";
  }

  // Tweet Detay Sayfasındaysa
  if (path == "?status" && id) {
    // Tweet detay verisini al
    const info = await api.fetchData("tweet.php", "id", id);

    renderInfo(info, userName);
  }
};

// Hem sayfa yüklendiğinde hemde id değiştiğinde bunu izle ve control url'i çalıştır
["load", "hashchange"].forEach((event) => {
  window.addEventListener(event, controlURL);
});
