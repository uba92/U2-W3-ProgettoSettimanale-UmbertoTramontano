const currentYearSpan = document.getElementById('current-year')

const currentYear = new Date().getFullYear()
currentYearSpan.innerText = currentYear

class Item {
  constructor(_name, _description, _brand, _imageUrl, _price) {
    this.name = _name
    this.description = _description
    this.brand = _brand
    this.imageUrl = _imageUrl
    this.price = _price
  }
}
