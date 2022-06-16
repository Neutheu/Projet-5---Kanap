/* récupération des produits de l'API */

fetch("http://localhost:3000/api/products")
.then(function(res) {
    if (res.ok) {
      return res.json();
    }
  })
.then(function(value) {
    console.log(value);
    const products = value;
    listproducts(products);
})
.catch(function(err) {
// Une erreur est survenue
});

/* Appel de tous les produits dans la page d'accueil*/

  function listproducts (products) {
    console.log(products);

    for (let product of products) {
        console.log(product.name);
        
        let produit = document.getElementById('items');
        produit.insertAdjacentHTML('beforeend',`<article> <img src=${product.imageUrl} alt=${product.altTxt}> <h3 class="productName">${product.name}</h3> <p class="productDescription">${product.description}</p>`); 
      }
    
  }
  
  