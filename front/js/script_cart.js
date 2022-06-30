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

      let cartProduct = document.getElementById('cart__items');
      cartProduct.insertAdjacentHTML('beforeend',
      ` <article class="cart__item" data-id=${cart[i].productId} data-color=${cart[i].selectedColor}>
          <div class="cart__item__img">
            ${cart[i].productImg}
          </div>
          <div class="cart__item__content">
            <div class="cart__item__content__description">
              <h2>${cart[i].productTitle}</h2>
              <p>${cart[i].selectedColor}</p>
              <p>${cart[i].productPrice}€</p>
            </div>
            <div class="cart__item__content__settings">
              <div class="cart__item__content__settings__quantity">
                <p>Qté : </p>
                <input type="number" class="itemQuantity" id="${cart[i].selectedColor}+${cart[i].productId}" name="itemQuantity" min="1" max="100" value=${cart[i].selectedQuantity}>
              </div>
              <div class="cart__item__content__settings__delete">
                <p class="deleteItem" id="${cart[i].productId}+${cart[i].selectedColor}">Supprimer</p>
              </div>
            </div>
          </div>
        </article> `);

      //Changement de la quantité d'un produit depuis le panier
      let itemQuantity = document.getElementById(`${cart[i].selectedColor}+${cart[i].productId}`);
      console.log(itemQuantity);
      itemQuantity.addEventListener('change', function () {
        cart[i].selectedQuantity = parseInt(itemQuantity.value);
        let stockedCart = JSON.stringify(cart);
        localStorage.setItem("obj",stockedCart); 
        location.reload(); 
      })

      //Suppression d'un produit du panier
      let elementToDelete = document.getElementById(`${cart[i].productId}+${cart[i].selectedColor}`);
      elementToDelete.addEventListener('click', function () {
        cart.splice(i , 1);
        let stockedCart = JSON.stringify(cart);
        localStorage.setItem("obj",stockedCart); 
        location.reload();
      })
    

      /*Augmentation de la quantité et du prix du panier à chaque tour de boucle*/
      cartQuantity += parseInt(cart[i].selectedQuantity);
      cartPrice += (cart[i].productPrice * cart[i].selectedQuantity);

    } 

    //Affichage du nombre total d'articles et du prix final
    let totalQuantity = document.getElementById('totalQuantity');
    totalQuantity.innerHTML = `${cartQuantity}`;

    let totalPrice = document.getElementById('totalPrice');
    totalPrice.innerHTML = `${cartPrice}`;
    

})
