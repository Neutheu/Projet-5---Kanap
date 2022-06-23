document.addEventListener("DOMContentLoaded", function() {

  /*Récupération du panier*/
  let stockedCart = localStorage.getItem("obj");
  let cart = JSON.parse(stockedCart);

  console.log(cart)

  /*Affichage du panier sur la page panier*/ 

  let cartQuantity = 0;
  let cartPrice = 0;
 
  /*Boucle permettant d'afficher chaque produit et ses caractéristiques*/
  for (let i in cart) {

    if (cart[i].productId) { /*Nécessaire car le premier élément du tableau panier est une string*/

      fetch(`http://localhost:3000/api/products/${cart[i].productId}`)
        .then(function(res) {
            if (res.ok) {
              return res.json();
            }
          })
        .then(function(value) {
            const product = value;
            let cartProduct = document.getElementById('cart__items');
            cartProduct.insertAdjacentHTML('beforeend',
            ` <article class="cart__item" data-id=${cart[i].productId} data-color=${cart[i].selectedColor}>
            <div class="cart__item__img">
              <img src=${product.imageUrl} alt=${product.altTxt}>
            </div>
            <div class="cart__item__content">
              <div class="cart__item__content__description">
                <h2>${product.name}</h2>
                <p>${cart[i].selectedColor}</p>
                <p>${product.price}€</p>
              </div>
              <div class="cart__item__content__settings">
                <div class="cart__item__content__settings__quantity">
                  <p>Qté : </p>
                  <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value=${cart[i].selectedQuantity}>
                </div>
                <div class="cart__item__content__settings__delete">
                  <p class="deleteItem">Supprimer</p>
                </div>
              </div>
            </div>
          </article>`);

          /*Augmentation de la quantité et du prix à chaque tour de boucle*/
          cartQuantity += parseInt(cart[i].selectedQuantity);

          cartPrice += (product.price * cart[i].selectedQuantity);

          setQuantityPrice(cartQuantity , cartPrice);

        })

        .catch(function(err) {
        // Une erreur est survenue
      });
      
      
    }
   
  } 

  /*Fonction permettant d'afficher le nombre total d'articles ainsi que le prix final, nécessaire pour pouvoir utiliser "product.price"*/
  function setQuantityPrice (cartQuantity , cartPrice) {
  let totalQuantity = document.getElementById('totalQuantity');
  totalQuantity.innerHTML = `${cartQuantity}`;

  let totalPrice = document.getElementById('totalPrice');
  totalPrice.innerHTML = `${cartPrice}`;
  }

  
    let itemsQuantities = document.getElementsByClassName('itemQuantity');
    console.log(itemsQuantities)
    for (let i in itemsQuantities) {
      let itemQuantity = itemsQuantities[i];
      console.log(itemQuantity);
      itemQuantity.addEventListener('change', function () {
        cart[i+1].selectedQuantity = document.getElementById("quantity").value;
        console.log(cart);

        let newStockedCart = JSON.stringify(cart);
        localStorage.setItem("obj",newStockedCart);
      })
    }
})
