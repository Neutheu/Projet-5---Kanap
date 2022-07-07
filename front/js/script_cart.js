//Fonction permettant de récupérer le prix d'un produit depuis l'API afin que le prix ne soit pas stocké en local
async function getprice(productid) {
  let variable = await fetch(`http://localhost:3000/api/products/${productid}`)
  .then(function(res) {
      if (res.ok) {
        return res.json();
      }
    })
  .then(function(product) {
    return product.price
  })
  return variable;
}


document.addEventListener("DOMContentLoaded", async function() {

  /*Récupération du panier*/
  let stockedCart = localStorage.getItem("obj");
  let cart = JSON.parse(stockedCart);

  console.log(cart)

  /*Affichage du panier sur la page panier*/ 

    let cartQuantity = 0;
    let cartPrice = 0;
    let apiCart = [];
  
    /*Boucle permettant d'afficher chaque produit et ses caractéristiques*/
    for (let i in cart) {
      let apiPrice = await getprice(cart[i].productId);
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
              <p id="price_${cart[i].selectedColor}+${cart[i].productId}">${apiPrice}€</p>
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
      cartPrice += (apiPrice * cart[i].selectedQuantity);

      //Ajout de l'id du produit dans le tableau destiné à l'API
      apiCart.push(cart[i].productId)

    } 

    //Affichage du nombre total d'articles et du prix final
    let totalQuantity = document.getElementById('totalQuantity');
    totalQuantity.innerHTML = `${cartQuantity}`;

    let totalPrice = document.getElementById('totalPrice');
    totalPrice.innerHTML = `${cartPrice}`;
    


  //Passage de la commande

    //Fonctions de validation 

      //Validation nom/prénom/ville
      function validateNameFirstnameCity(name) {
        let nameReg = new RegExp(/^[a-zA-Zàâéèëêïîôùüçœ -]{1,60}$/);
        let valid = nameReg.test(name);
    
        if(!valid) {
            return false;
        } else {
            return true;
        }
      }

      //Validation email
      function validateEmail(email) {
        let emailReg = new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
        let valid = emailReg.test(email);
    
        if(!valid) {
            return false;
        } else {
            return true;
        }
      }

      //Validation adresse
      function validateAddress(address) {
        let addressReg = new RegExp(/^[a-zA-Z0-9àâéèëêïîôùüçœ -]{1,60}$/);
        let valid = addressReg.test(address);
    
        if(!valid) {
            return false;
        } else {
            return true;
        }
      }

    //Récupération et vérification des données utilisateur

      //Création d'un objet contact
      let contact={}
        

      //Fonction permettant d'afficher un message d'erreur et d'ajouter une coordonnée à l'objet contact si cette dernière est valide
      function getAndValidateCustomerData (inputData , validateFunction , inputErrorMsg) {
        inputData.addEventListener('input', function () {
          if(validateFunction(inputData.value)) {
            inputErrorMsg.innerHTML = "";
      
            if(inputData.id == 'firstName') {
              contact.firstName = inputData.value
            }
            else if(inputData.id == 'lastName') {
              contact.lastName = inputData.value
            }
            else if(inputData.id == 'address') {
              contact.address = inputData.value
            }
            else if(inputData.id == 'city') {
              contact.city = inputData.value
            }
            else if(inputData.id == 'email') {
              contact.email = inputData.value
            }
          }
          else {
            inputErrorMsg.innerHTML = "Erreur : format incorrect";
          }
        })
      }

      //Prénom
      let inputFirstName = document.getElementById('firstName');
      let firstNameErrorMsg = document.getElementById('firstNameErrorMsg');
      getAndValidateCustomerData (inputFirstName , validateNameFirstnameCity , firstNameErrorMsg);

      //Nom
      let inputLastName = document.getElementById('lastName');
      let lastNameErrorMsg = document.getElementById('lastNameErrorMsg');
      getAndValidateCustomerData (inputLastName , validateNameFirstnameCity , lastNameErrorMsg);

      //Adresse
      let inputAddress = document.getElementById('address');
      let addressErrorMsg = document.getElementById('addressErrorMsg');
      getAndValidateCustomerData (inputAddress , validateAddress , addressErrorMsg);
 
      //Ville
      let inputCity = document.getElementById('city');
      let cityErrorMsg = document.getElementById('cityErrorMsg');
      getAndValidateCustomerData (inputCity , validateNameFirstnameCity , cityErrorMsg);

      //Email
      let inputEmail = document.getElementById('email');
      let emailErrorMsg = document.getElementById('emailErrorMsg');
      getAndValidateCustomerData (inputEmail , validateEmail , emailErrorMsg);

    
    // Envoi de l'objet contact et du tableau de produits à l'API
    let orderButton = document.getElementById('order');
    orderButton.addEventListener('click', function (event) { 
      event.preventDefault();
      fetch("http://localhost:3000/api/products/order", {
        method: 'POST',
        headers: { 
          'Accept': 'application/json', 
          'Content-Type': 'application/json' 
        },
        body: JSON.stringify({'contact':contact , 'products':apiCart})
        })
        .then(function(res) {
          if (res.ok) {
            return res.json();
          }
        })
        .then(function(result) {
          if (result) {
            document.location.href=`../html/confirmation.html?orderId=${result.orderId}`
          }
        })   
    })


})    
