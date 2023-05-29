// cart
const cartIcon = document.querySelector('#cart-icon');
const cart = document.querySelector('.cart');
const closeCart = document.querySelector('#close-cart');

// open
cartIcon.addEventListener('click', () => {
    cart.classList.add("active");
});

// close
closeCart.addEventListener('click', () => {
    cart.classList.remove("active");
})

// function autoOpenCart() {
//     cart.classList.add("active");
// }


if(document.readyState == "loading") {
    document.addEventListener('DOMContentLoaded', ready)
} else {
    ready();
}

function ready() {
    // remove from cart
    let removeCartButtons = document.getElementsByClassName("cart-remove");
    console.log(removeCartButtons)
    for(let i = 0; i < removeCartButtons.length; i++) {
        let button = removeCartButtons[i];
        button.addEventListener('click', removeCartItem)
    }
    // quantity change
    let quantityInputs = document.getElementsByClassName('cart-quantity');
    for(let i = 0; i < quantityInputs.length; i++ ) {
        let input = quantityInputs[i];
        input.addEventListener('change', quantityChanged);
    }
    // Add To Cart
    let addCart = document.getElementsByClassName('add-cart');
    for(let i = 0; i < addCart.length; i++) {
        let button = addCart[i];
        button.addEventListener('click', addCartClicked);  
    }
   
    // buy BTN
    document.getElementsByClassName('btn-buy')[0].addEventListener('click', buyButtonClicked);
}

// buy BTN
function buyButtonClicked() {
    let cartContent = document.getElementsByClassName('cart-content')[0];
    if(!cartContent.firstChild){
        alert(`Your Cart is empty!`);
    } else {
        alert(`Your order is placed`);  
        while(cartContent.hasChildNodes()) {
            cartContent.removeChild(cartContent.firstChild);
        }
        updateTotal();
    }
}

function removeCartItem(e) {
    let buttonClicked = e.target;
    buttonClicked.parentElement.remove();
    updateTotal();
}

// quantity changes
function quantityChanged(e) {
    let input = e.target;
    if(isNaN(input.value) || input.value <= 0) {
        input.value = 1;
    }
    updateTotal();
}

// Add to Cart

function addCartClicked(e) {
    let button = e.target;
    let shopProducts = button.parentElement;
    let title = shopProducts.getElementsByClassName('product-title')[0].innerText;
    let price = shopProducts.getElementsByClassName('price')[0].innerText;
    let productImage = shopProducts.getElementsByClassName('product-img')[0].src;
    addProductToCart(title, price, productImage);
    updateTotal();
    //autoOpenCart();
}

function addProductToCart(title, price, productImage) {
    let cartShopBox = document.createElement("div");
    cartShopBox.classList.add("cart-box");
    let cartItems = document.getElementsByClassName('cart-content')[0];
    let cartItemsNames = cartItems.getElementsByClassName('cart-product-title');
    for(let i = 0; i < cartItemsNames.length; i++) {
        if(cartItemsNames[i].innerText == title) {
            alert(`You already have this item in your cart.`);
            return;
        }  
    }

let cartBoxContent = `
    <img src="${productImage}" class="cart-img">
    <div class="detail-box">
        <div class="cart-product-title">${title}</div>
        <div class="cart-price">${price}</div>
        <input type="number" value="1" class="cart-quantity">
    </div>

    <i class='bx bxs-trash cart-remove'></i>
`;
cartShopBox.innerHTML = cartBoxContent;
cartItems.append(cartShopBox);
cartShopBox.getElementsByClassName('cart-remove')[0].addEventListener('click', removeCartItem);
cartShopBox.getElementsByClassName('cart-quantity')[0].addEventListener('change', quantityChanged);
}

function updateTotal() {
    let cartContent = document.getElementsByClassName("cart-content")[0];
    let cartBoxes = cartContent.getElementsByClassName("cart-box");
    let total = 0;
    for(let i = 0; i < cartBoxes.length; i++) {
        let cartBox = cartBoxes[i];
        let priceElement = cartBox.getElementsByClassName('cart-price')[0];
        let quantityElement = cartBox.getElementsByClassName('cart-quantity')[0];
        let price = parseFloat(priceElement.innerText.replace("$", ""));
        let quantity = quantityElement.value;
        total = total + price * quantity;
    }
        // cents value 
        total = Math.round(total * 100) / 100;

        document.getElementsByClassName("total-price")[0].innerText = "$" + total;
    
}
