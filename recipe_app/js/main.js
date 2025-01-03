import { Search } from "./api.js";
import { elements } from "./helpers.js";
import { Recipe } from "./recipe.js";
import { renderLoader, renderResults } from "./ui.js";

// Recipe Classının örneğini al
const recipe = new Recipe();

// ! Fonksiyonlar

// Formun gönderilmesi durumunda çalışacak fonksiyon
const handleSubmit = async (e) => {
  // Formun gönderilmesinde oluşan default sayfa yenileme özelliğini iptal et
  e.preventDefault();

  console.log(e);

  // Input içerisindeki değere erişme
  const query = e.target[0].value;

  // Eğer query yoksa uyarı ver
  if (!query) {
    Toastify({
      text: "Input boş bırakılamaz !",
      duration: 3000,
      destination: "https://github.com/apvarun/toastify-js",
      newWindow: true,
      close: true,
      gravity: "top", // `top` or `bottom`
      position: "right", // `left`, `center` or `right`
      stopOnFocus: true, // Prevents dismissing of toast on hover
      style: {
        background: "linear-gradient(to right, #FF9D23, #F93827)",
      },
      onClick: function () {}, // Callback after click
    }).showToast();

    return;
    // Eğer query yoksa uyarı ver ve kodu durdur
  }

  //  Eğer query varsa API işlemlerini yap

  // Api.js dosyasında oluşturulan classın örneğini al
  const search = new Search(query);

  renderLoader(elements.resultList);
  try {
    // Search classı içerisindeki getResults fonksiyonunu çalıştır ve verileri al
    await search.getResults();
    // Gelen verileri ui.js deki  renderResults ile ekrana render et
    renderResults(search.result);
  } catch (err) {
    // Bir hata olursa bunu yakala ve uyarı ver
    alert("Araadığınız kriterde tarif bulunmadı");
  }
  // Input içerisini sıfırla
  e.target[0].value = "";
};

// Sayfa yüklendiğinde ve id değişince çalışacak fonksiyon
const controlRecipe = () => {
  // Ui dosyasında url e geçilen # ile id'yi api'a gönderirsek hata alırız.Bunun önlemek için replace("#", "") ile # kaldırdık.
  const id = window.location.hash.replace("#", "");
  console.log(id);

  if (id) {
    recipe.getRecipe(id);
  }
};
// ! Olay İzleyicileri
// Formun Gönderilmesini izle
elements.form.addEventListener("submit", handleSubmit);

["load", "hashchange"].forEach((eventName) => {
  window.addEventListener(eventName, controlRecipe);
});
