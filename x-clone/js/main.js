import { API } from "./api.js";
import { getFromLocal, removeFromLocal } from "./helper.js";
import {
  mainEle,
  renderTimeline,
  renderUserInfo,
  renderInfo,
  renderLoader,
  renderDetailLoader,
  renderUserPage,
} from "./ui.js";

const api = new API();

const user = getFromLocal("user");

// Çıkış yap butona tıklanınca
mainEle.logoutBtn.addEventListener("click", () => {
  // Kullanıcı verilerini local'den kaldır
  removeFromLocal("user");
  // Kullanıcıyı login sayfasına yönlendir
  window.location = "/auth.html";
});

// Kullanıcı bilgilerini render et

document.addEventListener("DOMContentLoaded", () => {
  renderUserInfo(user);
});

const controlURL = async () => {
  const path = window.location.search.split("/")[0];
  const userName = window.location.search.split("/")[1];
  const id = window.location.hash.replace("#", "");

  // Kullanıcı yoksa login sayfasına yönlendir
  if (!user) {
    window.location = "/auth.html";
  }

  // Url'de herhangi bir parametre yoksa(ana sayfadaysa) tweetleri ekrana bas
  if (!path) {
    // Loader render et
    renderLoader(mainEle.tweetsArea);

    // Api'dan tweetleri al
    const data = await api.fetchData(
      "timeline.php",
      "screenname",
      user.profile
    );
    // Tweetleri renderlam
    renderTimeline(data, mainEle.tweetsArea, user);
  }

  // Tweet Detay Sayfasındaysa
  if (path == "?status" && id) {
    renderDetailLoader();
    // Tweet detay verisini al
    const info = await api.fetchData("tweet.php", "id", id);

    renderInfo(info, userName);
  }

  // Kullanıcının detay sayfasındaysa
  if (path == "?user" && id) {
    // Kullanıcının verilerini api'dan al
    const userInfo = await api.getUser(id);

    // Kullanıcının verilerini render et
    renderUserPage(userInfo);

    // Tweetlerin listeleneceği alana eriş
    const outlet = document.querySelector(".user-tweets");

    // Loader render et

    renderLoader(outlet);

    // Kullanıcının tweetlerini al
    const userTweets = await api.fetchData("timeline.php", "screenname", id);

    // Kullanıcının tweetlerini renderla
    renderTimeline(userTweets, outlet, userInfo);
  }

  // Arama işlemi yapıldı ve search parametresi geçildiyse

  if (path == "?search") {
    // Api'dan arama sonuçlarını al
    const data = await api.fetchData("search.php", "query", id);

    // Arama sonuçlarını render et
    renderTimeline(data, mainEle.main, null);
  }
};

// Hem sayfa yüklendiğinde hemde id değiştiğinde bunu izle ve control url'i çalıştır
["load", "hashchange"].forEach((event) => {
  window.addEventListener(event, controlURL);
});

// Formun gönderilmesini izle ve form içerisindeki değere eriş

mainEle.searchForm.addEventListener("submit", (e) => {
  // Sayfa yenilemesini engelle
  e.preventDefault();

  // Input'daki değere eriş
  const query = e.target[0].value;

  // Input içerisindeki değeri url'e parametre olarak geç
  location = `?search#${query}`;
});
