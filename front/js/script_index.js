/* Fonction permettant d'insérer tous les produits dans la page d'accueil*/

function listproducts (products) {
  let produit = document.getElementById('items');
  for (let product of products) {
      produit.insertAdjacentHTML('beforeend',`<a href="./product.html?id=${product._id}"> <article> <img src=${product.imageUrl} alt="${product.altTxt}"> <h3 class="productName">${product.name}</h3> <p class="productDescription">${product.description}</p> </article> </a>`); 
    } 
}

/* Récupération des produits de l'API et appel de la fonction pour les insérer */

fetch("http://localhost:3000/api/products")
.then(function(res) {
    if (res.ok) {
      return res.json();
    }
  })
.then(function(products) {
    console.log(products);
    listproducts(products);
})


  