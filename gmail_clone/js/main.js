// * Bağlantı kontrolü
// console.log(`Gmail clone projesinden selamlar`);

// ! Diğer dosyalardan import
import { renderMails, showModal } from "./ui.js";
import { getDate } from "./helper.js";

// ! Html'deki elemanlara erişme

const hamburgerMenu = document.querySelector(".hamburger-menu");
const navigation = document.querySelector("nav");
const createMailBtn = document.querySelector(".create");
const modal = document.querySelector(".modal-wrapper");
const closeModalBtn = document.querySelector("#close-btn");
const form = document.querySelector("#create-mail-form");
const mailsArea = document.querySelector(".mails-area");

// ! localstoragedan verileri al
const strMailData = localStorage.getItem("data");

// localstoragedan gelen verileri javascript nesnesine çevir
const mailData = JSON.parse(strMailData) || [];

// Sayfanın yüklenme anını izleyerek mailleri render et

document.addEventListener("DOMContentLoaded", () => {
  renderMails(mailsArea, mailData);
});

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

// Form gönderildiğinde çalışacak fonksiyon
const sendMail = (e) => {
  // Formlar gönderildiğinde sayfa yenilemesine sebep olur.
  e.preventDefault();
  const recevier = e.target[0].value;
  const title = e.target[1].value;
  const message = e.target[2].value;

  // Form içerisindeki inputların boş olma durumunu kontrol et
  if (!recevier || !title || !message) {
    Toastify({
      text: "Form doldurunuz !",
      duration: 3000,
      destination: "https://github.com/apvarun/toastify-js",
      newWindow: true,
      close: true,
      gravity: "top", // `top` or `bottom`
      position: "right", // `left`, `center` or `right`
      stopOnFocus: true, // Prevents dismissing of toast on hover
      style: {
        background: "#FDCC00",
        borderRadius: "10px",
      },
      onClick: function () {}, // Callback after click
    }).showToast();

    // Eğer inputlar boşsa uyarı ver ve fonksiyonu durdur
    return;
  }

  // Gönderilen form içerisindeki değerler ile bir nesne oluştur

  const newMail = {
    // recevier,title,message,id,date
    id: new Date().getTime(),
    sender: "Yusuf",
    recevier,
    title,
    message,
    stared: false,
    date: getDate(),
  };

  mailData.unshift(newMail);

  // Mail objesini localstorage kayıt edebilmek için string veri tipine çevirmemiz gerekir.
  const strData = JSON.stringify(mailData);
  // Stringe çevrilen veriyi localstorage kayıt et.Localstorage verileri key-value değer çiftleri halinde ister.

  // Formun gönderilmesiyle elde edilen verileri localstorage a kayıt et
  localStorage.setItem("data", strData);

  //Modal içerisindeki inputları sıfırla
  e.target[0].value = "";
  e.target[1].value = "";
  e.target[2].value = "";

  // Modalı Kapat
  showModal(modal, false);

  // Bildirim gönder
  Toastify({
    text: "Mail başarıyla gönderildi.",
    duration: 3000,
    destination: "https://github.com/apvarun/toastify-js",
    newWindow: true,
    close: true,
    gravity: "top", // `top` or `bottom`
    position: "right", // `left`, `center` or `right`
    stopOnFocus: true, // Prevents dismissing of toast on hover
    style: {
      background: "#24BB33",
      borderRadius: "10px",
    },
    onClick: function () {}, // Callback after click
  }).showToast();

  // Mailleri ekrana render et
  renderMails(mailsArea, mailData);
};

const updateMail = (e) => {
  // Eğer silme butonuna tıklandıysa bu maili sil
  if (e.target.classList.contains("bi-trash-fill")) {
    // Sil iconuna tıklayınca mail elemanını silmemiz gerekir.Bunu iconun kapsam elemanına erişerek yaparız.

    // const mail = e.target.parentElement.parentElement.parentElement;
    const mail = e.target.closest(".mail");
    // Mailin id'sine eriş
    const mailId = mail.dataset.id;
    // Id si bilinen elemanı diziden kaldır
    const filtredData = mailData.filter((mail) => mail.id != mailId);
    // Filtrelenmiş diziyi localstorage aktar
    // i-) filtrelenmiş maili stringe çevir
    const strData = JSON.stringify(filtredData);
    // ii-) Localstoragedan verileri kaldır
    localStorage.removeItem("data");
    // iii-) Filtrelenmiş veriyi localstorage aktar
    localStorage.setItem("data", strData);

    // Kaldırılan maili arayüzden de kaldır
    mail.remove();
  }
};

// Formun gönderilmesini izle
form.addEventListener("submit", sendMail);

// Mail alanına tıklanınca çalışacak fonksiyon
mailsArea.addEventListener("click", updateMail);
