document.addEventListener("DOMContentLoaded", function() {

/* récupération de l'url de la page confirmation*/

let urlcourante = document.location.href; 
console.log(urlcourante);

/* récupération de l'id de la commande dans l'URL */

let str = `${urlcourante}`;
let url = new URL(str);
let orderId = url.searchParams.get("orderId");

/*insertion du numéro de commande dans la page de confirmation*/

let orderNumber = document.getElementById('orderId');
orderNumber.innerHTML = `${orderId}`;

})