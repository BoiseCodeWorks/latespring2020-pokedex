export default class CaughtPokemon {
  constructor(data) {
    this.id = data._id || ''
    this.types = data.types || []
    this.name = data.name || ''
    this.img = data.img || ''
    this.weight = data.weight || ''
    this.user = data.user
  }

  get Template() {
    return /*html*/ `
    <div class="col-4">
      <img src="${this.img}" alt="">
      <h5 class="text-capitalize">${this.name}</h5>
      <p>Weight: ${this.weight}</p>
      <button class="btn btn-block btn-primary" onclick="app.pokemonController.releasePokemon('${this.id}')">Release</button>
    </div>
    `
  }
}