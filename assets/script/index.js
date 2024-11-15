const currentYearSpan = document.getElementById('current-year')

const currentYear = new Date().getFullYear()
currentYearSpan.innerText = currentYear

const API_URL = 'https://striveschool-api.herokuapp.com/api/product'
const key =
  'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NzM3MDEwMThhZDEyOTAwMTU4NzZiYjUiLCJpYXQiOjE3MzE2NTc5ODUsImV4cCI6MTczMjg2NzU4NX0.NSQnNzM9dxo1zWIq4ud9nziBshRqPm8s2UIO3rZInEs'

fetch(API_URL, {
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
  .then((items) => {
    const row = document.getElementById('item-row')
    items.forEach((item) => {
      const newCol = document.createElement('div')
      newCol.classList.add('col', 'col-12', 'col-md-6', 'col-lg-4')
      newCol.innerHTML = `
        <div class="card" >
            <img src="${item.imageUrl}" class="card-img-top" alt="...">
            <div class="card-body">
                <h5 class="card-title">${item.name}</h5>
                <p class="card-text">${item.description}</p>
                <p class="card-text">${item.brand}</p>
                <p class="card-text">${item.price}$</p>
                
                <a href="./details.html?itemId=${item._id}" class="btn btn-outline-dark">Vai Ai Dettagli!</a>
            </div>
        </div>
      `

      row.appendChild(newCol)
      const spinner = document.getElementById('spinner')
      spinner.classList.add('d-none')
    })
  })
  .catch((error) => {
    console.log('error', error)
  })
