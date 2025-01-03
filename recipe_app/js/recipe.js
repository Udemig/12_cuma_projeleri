export class Recipe {
  constructor() {}

  async getRecipe(id) {
    const res = await fetch(
      `https://forkify-api.herokuapp.com/api/get?rId=${id}`
    );

    const data = await res.json();

    console.log(data);
  }
}
