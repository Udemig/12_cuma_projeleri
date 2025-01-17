import { elements, getFromLocalStorage, setToLocalStorage } from "./helpers.js";

export class Recipe {
  constructor() {
    // Tarif bilgileri
    this.info = {};
    // Tarif malzemeleri
    this.ingredients = [];
    // Like dizisi
    this.likes = getFromLocalStorage("likes") || [];
    // Like'lanan elemanları render et
    this.renderLike();
  }
  // Tarif bilgilerini alan fonksiyon
  async getRecipe(id) {
    const res = await fetch(
      `https://forkify-api.herokuapp.com/api/get?rId=${id}`
    );

    const data = await res.json();

    this.info = data.recipe;

    this.ingredients = data.recipe.ingredients;
  }

  // Tarif bilgilerine göre ekrana renderlama yapan fonksiyon
  renderRecipe(recipe) {
    const markup = `
        <figure>
            <img
              src="${recipe.image_url}"
              alt=""
            />
            <h1>${recipe.title}</h1>
            <div  class="like-area">
              <i id='like-btn' class="bi ${
                this.isRecipeLiked() ? "bi-heart-fill" : "bi-heart"
              }"></i>
            </div>
          </figure> 

          <div class="ingredients">
            <ul>
            ${this.createIngredient()}
            </ul>
            <button id="add-to-basket">
              <i class="bi bi-cart2"></i>
              <span>Alışveriş Sepetine Ekle</span>
            </button>
          </div>

          <div class="directions">
            <h2>Nasıl Pişirilir?</h2>
            <p>
              Bu tarif dikkatlice <span>${recipe.publisher}</span> tarafından
              hazırlanmış ve test edilmiştir. Diğer detaylara onların websitesi
              üzerinden erişebilirsiniz.
            </p>

            <a href="${recipe.publisher_url}" target="_blank">Yönerge</a>
          </div>
    `;

    elements.recipeArea.innerHTML = markup;
  }
  // Likeları render eden fonksiyon
  renderLike() {
    console.log(this.likes);

    const likedHtml = this.likes
      .map(
        (item) => `<a href="#">
              <img
                src="${item.img}"
                alt=""
              />
              <p>${item.title} </p>
            </a>`
      )
      .join("");

    // Oluşturulan Html'i like area içerisindeki list'e aktar
    elements.likeList.innerHTML = likedHtml;
  }

  // Tarif malzemelerini dönen ve herbir eleman için bir li etiketi oluşturan fonksiyon
  createIngredient() {
    const ingredientHtml = this.ingredients
      .map(
        (ingredient) => ` 
   <li>
      <i class="bi bi-check-circle"></i>
      <span>${ingredient}</span>
    </li>`
      )
      .join("");

    return ingredientHtml;
  }
  // Tarif likelandı mı bunu kontrol et
  isRecipeLiked() {
    // Likes dizisini dön ve like'lanan eleman varmı bunu kontrol et
    const found = this.likes.find((i) => i.id == this.info.recipe_id);

    return found;
  }
  // Likelama işlemini
  controlLike() {
    // Bir obje oluştur
    const newObject = {
      id: this.info.recipe_id,
      img: this.info.image_url,
      title: this.info.title,
    };

    // Eleman likelandı mı kontrol et
    if (this.isRecipeLiked()) {
      this.likes = this.likes.filter((i) => i.id != newObject.id);
    } else {
      this.likes.push(newObject);
    }

    setToLocalStorage("likes", this.likes);

    // Arayüzü güncelle
    this.renderRecipe(this.info);

    // Like'lanan elemanları render et
    this.renderLike();
  }
}
