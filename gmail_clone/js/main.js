// * Bağlantı kontrolü
// console.log(`Gmail clone projesinden selamlar`);

import { showModal } from "./ui.js";

// ! Diğer dosyalardan import

// ! Html'deki elemanlara erişme

const hamburgerMenu = document.querySelector(".hamburger-menu");
const navigation = document.querySelector("nav");
const createMailBtn = document.querySelector(".create");
const modal = document.querySelector(".modal-wrapper");
const closeModalBtn = document.querySelector("#close-btn");
const form = document.querySelector("#create-mail-form");

// Hamburger menüye tıklanınca sol menüyü kapat aç yapan fonksiyon
hamburgerMenu.addEventListener("click", () => {
  navigation.classList.toggle("hide");
});

// Oluştur butonuna tıklanma anını izle

// Oluştur butonuna tıklayınca modalı aç
createMailBtn.addEventListener("click", () => showModal(modal, true));
// Modal kapat butonuna tıklayınca modalı kapat
closeModalBtn.addEventListener("click", () => showModal(modal, false));

// Ekran boyutundaki değişimi izleyerek leftNav kısmının görünürlüğünü ayarla

// Pencerenin genişliğini izle
window.addEventListener("resize", (e) => {
  // Ekran genişiliğine eriş
  const width = e.target.innerWidth;

  if (width < 1100) {
    // Eğer ekran genişliği 1100px altındaysa lefNav kısmına hide classını ekle
    navigation.classList.add("hide");
  } else {
    // Eğer ekran genişliği 1100px altında değilse lefNav kısmına hide classını kaldır
    navigation.classList.remove("hide");
  }
});

// Formun gönderilmesini izle

form.addEventListener("submit", (e) => {
  // Form gönderildiğinde default olarak sayfayı yeniler.Bunu engellemek için
  e.preventDefault();
  console.log(`Form gönderildi`);

  console.log(e);
});
