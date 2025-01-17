import { API } from "./api.js";
import { setToLocal } from "./helper.js";
import { authEle } from "./ui.js";
const api = new API();

const regex =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/;

// Varsa hataları render edecek fonksiyon
const renderWarns = (nameWarning, passWarning) => {
  // İsim hatası varsa
  if (nameWarning) {
    // Eğer isim hatası varsa bunu gereken yerde render et
    authEle.nameArea.innerHTML = `<p class="warning">${nameWarning}</p>`;
  } else {
    authEle.nameArea.innerHTML = "";
  }

  // Şifre hatası varsa
  if (passWarning) {
    authEle.passArea.innerHTML = `<p class="warning">${passWarning}</p>`;
  } else {
    authEle.passArea.innerHTML = "";
  }
};

authEle.loginForm.addEventListener("submit", async (e) => {
  // Sayfa yenilemesini engelle
  e.preventDefault();
  // Form gönderildiğinde inputlardaki değerlere eriş
  const name = authEle.nameInput.value;
  const password = authEle.passwordInput.value;

  // İsim ve şifre hatası için birer değişken oluştur

  let nameWarning = null;
  let passWarning = null;

  // İsimle ilgili hataları kontrol et
  if (!name) {
    nameWarning = "İsim kısımı boş bırakılamaz";
  } else if (name.length < 5) {
    nameWarning = "İsim 5 karakterden kısa olamaz";
  } else {
    nameWarning = null;
  }

  // Şifre ile ilgili hataları kontrol et
  if (!password) {
    passWarning = "Şifre giriniz !!";
  } else if (password.length < 6) {
    passWarning = "Şifre 6 haneden kısa olamaz !!";
  } else if (!regex.test(password)) {
    passWarning = "Zayıf şifree !!";
  } else {
    passWarning = null;
  }

  // Hata varsa bunları render et
  renderWarns(nameWarning, passWarning);

  // Hata yoksa
  if (!nameWarning && !passWarning) {
    // Api istek at ve kullanıcı verisini al
    const useData = await api.getUser(name);

    // Veriyi localstorage'a kaydet
    setToLocal("user", useData);
    // Kullanıcıyı anasayfaya yönlendir
    window.location = "/";
  }
});
