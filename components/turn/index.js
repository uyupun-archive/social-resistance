export default class Turn {
  constructor() {
    this._count = 1
  }

  get count() {
    return this._count
  }

  add() {
    this._count++
  }
}
