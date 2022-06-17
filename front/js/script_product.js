/* récupération de l'url de la page produit*/

var urlcourante = document.location.href; 
console.log(urlcourante);

/* récupération de l'id du produit dans l'URL */

var str = `${urlcourante}`;
var url = new URL(str);
var id = url.searchParams.get("id");
console.log(id);

fetch(`http://localhost:3000/api/products/${id}`)
.then(function(res) {
    if (res.ok) {
      return res.json();
    }
  })
.then(function(value) {
    console.log(value);
    const product = value;
    uniqueproduct(product);
})
.catch(function(err) {
// Une erreur est survenue
});

function uniqueproduct (product) {
    console.log(product);

    let productName = document.getElementsByTagName('title');
    let nomProduit = productName[0];
    nomProduit.innerHTML = `${product.name}`; 

    let productImg = document.getElementsByClassName('item__img');
    let productImage = productImg[0];
    productImage.innerHTML = `<img src=${product.imageUrl} alt=${product.altTxt}>`;

    let productTitle = document.getElementById('title');
    productTitle.innerHTML = `${product.name}`;

    let productPrice = document.getElementById('price');
    productPrice.innerHTML = `${product.price}`;

    let productDescription = document.getElementById('description');
    productDescription.innerHTML = `<p id="description">${product.description}</p>`;

    let productOptions = document.getElementById('colors');
    for (let color of product.colors) {
    productOptions.insertAdjacentHTML('beforeend',` <option value="${color}">${color}</option>`);
    } 
  }