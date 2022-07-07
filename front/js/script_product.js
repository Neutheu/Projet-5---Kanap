/* Affichage du produit et de ses caractéristiques dans la page produit*/

    /* récupération de l'url de la page produit*/

    let urlcourante = document.location.href; 

    /* récupération de l'id du produit dans l'URL */

    let str = `${urlcourante}`;
    let url = new URL(str);
    let id = url.searchParams.get("id");

    /*Appel à l'API pour récupérer le produit correspondant et appel de la fonction permettant l'insertion de ses caractéristiques dans la page produit*/

    fetch(`http://localhost:3000/api/products/${id}`)
    .then(function(res) {
        if (res.ok) {
          return res.json();
        }
      })
    .then(function(product) {
        uniqueproduct(product);
    })
    

    /*Fonction permettant l'insertion des caractéristiques du produit dans la page produit*/

    function uniqueproduct (product) {

        let productName = document.getElementsByTagName('title');
        let nomProduit = productName[0];
        nomProduit.innerHTML = `${product.name}`; 

        let productImg = document.getElementsByClassName('item__img');
        let productImage = productImg[0];
        productImage.innerHTML = `<img src=${product.imageUrl} alt="${product.altTxt}">`;

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

/*Initialisation après chargement du DOM*/
document.addEventListener("DOMContentLoaded", function() {
 
/*Ajout du produit dans le panier*/

  /*création d'un tableau qui fera office de panier*/
  let cart = [];

  /*Réaction au clic du bouton d'ajout au panier*/
  let addButton = document.getElementById('addToCart');  
  console.log(addButton);  
  addButton.addEventListener('click', function() {  

    /*Récupération du panier stocké*/
    let stockeCart = localStorage.getItem("obj");
    cart = JSON.parse(stockeCart);

    let selectedColor = document.getElementById('colors').options[document.getElementById('colors').selectedIndex].value;
    let selectedQuantity = parseInt(document.getElementById("quantity").value);
    // parseInt pour que la variable soit un number et qu'on puisse l'additionner plus bas car sinon deux produits avec une quantity de "1" donnaient "11" en s'additionnant car ce sont des strings.
    if (selectedQuantity != 0 && selectedColor != '') {

      //création d'un objet avec les caractéristiques sélectionnées + les caractéristiques dont on aura besoin pour l'afficher dans la page panier
      
      let addedProduct = {   
        selectedColor, 
        selectedQuantity, 
        productId : id,
        productTitle : document.getElementById('title').textContent,
        productImg : document.getElementsByClassName('item__img')[0].innerHTML,
      };

      if (cart.length == 0) {
        cart.push(addedProduct);
      }

      else {
         
        for (let i in cart) {
          if (addedProduct.selectedColor == cart[i].selectedColor && addedProduct.productId == cart[i].productId) {
            cart[i].selectedQuantity += addedProduct.selectedQuantity;
            break;
          }
          else if (i == cart.length-1) {
            cart.push(addedProduct);
          }
          else {}
        }
      }  
    }  

    // stockage du panier
    let stockedCart = JSON.stringify(cart);
    localStorage.setItem("obj",stockedCart);  

  })
    
})