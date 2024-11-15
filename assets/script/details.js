const currentYearSpan = document.getElementById('current-year')

const currentYear = new Date().getFullYear()
currentYearSpan.innerText = currentYear

const addressContent = new URLSearchParams(window.location.search)

const itemId = addressContent.get('itemId')

const API_URL = 'https://striveschool-api.herokuapp.com/api/product'
const key =
  'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NzM3MDEwMThhZDEyOTAwMTU4NzZiYjUiLCJpYXQiOjE3MzE2NTc5ODUsImV4cCI6MTczMjg2NzU4NX0.NSQnNzM9dxo1zWIq4ud9nziBshRqPm8s2UIO3rZInEs'

//GET specifica

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
      throw new Error('Errore nella richiesta!')
    }
  })
  .then((item) => {
    const itemCol = document.getElementById('item-container')
    itemCol.innerHTML = `
        <div class="card" >
            <img src="${item.imageUrl}" class="card-img-top" alt="...">
            <div class="card-body">
                <h5 class="card-title">${item.name}</h5>
                <p class="card-text">${item.description}</p>
                <p class="card-text">${item.brand}</p>
                <p class="card-text">${item.price}$</p>
                
                <a class="btn btn-outline-warning" href="./backoffice.html?itemId=${item._id}">MODIFICA</a>
                <button class="btn btn-outline-danger"  data-bs-toggle="modal" data-bs-target="#myModal">ELIMINA</button>
            </div>
        </div>

        <div class="modal" tabindex="-1" id="myModal" onclick="deleteItem()">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">DELETE</h5>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div class="modal-body">
            <p>Are you sure?</p>
          </div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-secondary"
              data-bs-dismiss="modal"
            >
              CLOSE
            </button>
            <button type="button" class="btn btn-primary">DELETE</button>
          </div>
        </div>
      </div>
    </div>
    `
  })
  .catch((error) => {
    console.log('error', error)
  })

const deleteItem = function () {
  fetch(API_URL + '/' + itemId, {
    method: 'DELETE',
    headers: {
      'Content-type': 'application/json',
      Authorization: key,
    },
  })
    .then((response) => {
      if (response.ok) {
        console.log('articolo eliminato')
        window.location.assign('./index.html')
      } else {
        throw new Error('Errore nella rimozioine del prodotto')
      }
    })
    .catch((error) => {
      console.log('error', error)
    })
}
