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

const API_URL = 'https://striveschool-api.herokuapp.com/api/product'
const key =
  'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NzM3MDEwMThhZDEyOTAwMTU4NzZiYjUiLCJpYXQiOjE3MzE2NTc5ODUsImV4cCI6MTczMjg2NzU4NX0.NSQnNzM9dxo1zWIq4ud9nziBshRqPm8s2UIO3rZInEs'

const inputName = document.getElementById('name')
const inputDescription = document.getElementById('description')
const inputBrand = document.getElementById('brand')
const inputImageUrl = document.getElementById('image-url')
const inputPrice = document.getElementById('price')

const addForm = document.getElementById('item-form')

const addressContent = new URLSearchParams(window.location.search)
const itemId = addressContent.get('itemId')

if (itemId) {
  document.getElementById('save-btn').classList.add('d-none')
  document.getElementById('change-btn').classList.remove('d-none')
  fetch(API_URL + '/' + itemId, {
    method: 'GET',
    headers: {
      Authorization: key,
    },
  })
    .then((response) => {
      if (response.ok) {
        return response.json()
      } else {
        throw new Error('Errore nella modifica!')
      }
    })
    .then((selectedItem) => {
      inputName.value = selectedItem.name
      inputDescription.value = selectedItem.description
      inputBrand.value = selectedItem.brand
      inputImageUrl.value = selectedItem.imageUrl
      inputPrice.value = selectedItem.price
    })
    .catch((error) => {
      console.log('error', error)
    })
}

if (itemId) {
  addForm.addEventListener('submit', (e) => {
    e.preventDefault()

    const createdItem = new Item(
      inputName.value,
      inputDescription.value,
      inputBrand.value,
      inputImageUrl.value,
      inputPrice.value
    )

    fetch(API_URL + '/' + itemId, {
      method: 'PUT',
      body: JSON.stringify(createdItem),
      headers: {
        'Content-type': 'application/json',
        Authorization: key,
      },
    })
      .then((response) => {
        if (response.ok) {
          const alertSuccess = document.getElementById('success-alert')
          alertSuccess.classList.remove('d-none')
          setInterval(() => {
            alertSuccess.classList.add('d-none')
          }, 2000)
        } else {
          throw new Error('Errore nel salvataggio!')
        }
      })
      .catch((error) => {
        console.log('error', error)
      })
  })
}

addForm.addEventListener('submit', (e) => {
  e.preventDefault()

  const createdItem = new Item(
    inputName.value,
    inputDescription.value,
    inputBrand.value,
    inputImageUrl.value,
    inputPrice.value
  )

  console.log('oggetto creato', createdItem)

  fetch(API_URL, {
    method: 'POST',
    body: JSON.stringify(createdItem),
    headers: {
      'Content-type': 'application/json',
      Authorization: key,
    },
  })
    .then((response) => {
      if (response.ok) {
        inputName.value = ''
        inputDescription.value = ''
        inputBrand.value = ''
        inputImageUrl.value = ''
        inputPrice.value = ''

        const alertSuccess = document.getElementById('success-alert')
        alertSuccess.classList.remove('d-none')
        setInterval(() => {
          alertSuccess.classList.add('d-none')
        }, 2000)
      } else {
        throw new Error('Errore nel salvataggio!')
      }
    })
    .catch((error) => {
      console.log('error', error)
    })
})

const resetBtn = document.getElementById('reset-btn')
resetBtn.addEventListener('click', (e) => {
  e.preventDefault()

  inputName.value = ''
  inputDescription.value = ''
  inputBrand.value = ''
  inputImageUrl.value = ''
  inputPrice.value = ''
})
