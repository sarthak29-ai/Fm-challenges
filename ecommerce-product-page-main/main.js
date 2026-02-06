
let imgNum = 1
let liImgNum = 1
let itemCountNum = 0
let productInfo = {}
let finalProductsInfo = []
const emptyCartMessage = "Your cart is empty";
let cartItemCount = 0

const container = document.querySelector('body');
const menu = document.querySelector('.nav_wrapper');
const cartBtn = document.querySelector('.cart_btn');
const cartContainer = document.querySelector('.cart_container');
const lightBox = document.querySelector('#light_box');
const lightBoxBtns = document.querySelectorAll('.light_button');
const mainImg = document.querySelector('.main_product_img');
const liMainImg = document.querySelector('.light_box_img');
const thumbBtnAll = document.querySelectorAll('.thumb_btn');
const thumbLiBtnAll = document.querySelectorAll('.thumb_li_btn');
const itemCount = document.querySelector('.item_count');
const productInCart = document.querySelector('.cart_product');
const checkoutBtn = document.querySelector('.checkout_btn');
const cartItems = document.querySelector('.item_count_display');


const loadProduct = async () => {
  try {
    const imgContainer = document.querySelector('.product_img_container')
    const infoContainer = document.querySelector('.product_info_container')
    const loading = document.querySelector('.loading_container')
    const response = await fetch('./data.json')
    const { products } = await response.json();
    const product = products.brand1.product1;
    productInfo = product
    renderPage(product)
    loading.style.display = 'none'
    infoContainer.style.display = 'inline-block'
    imgContainer.style.display = 'inline-block'
    
  } catch (err) {
    console.error("oops! something went wrong",err);
  }
};
function renderPage(product) {
  const text = document.querySelector('.product_info_text');
  const price = document.querySelector('.product_info_price');
  
  text.innerHTML = 
        `<h3 class="brand_name">
          ${product.brandName}
        </h3>
        <h1 class="product_name">
          ${product.productName}
        </h1>
        <p class="product_details">
          ${product.productDetails}
        </p>`
  
  price.innerHTML = 
        `<div class="price_holder">
          <h2 class="product_total_price">
           $${product.productPrice}
          </h2>
          <h3 class="product_discount">
            ${product.productDiscount}
          </h3>
        </div>
        <h4 class="product_price">
          $${product.productTotalPrice}
        </h4>`
}
loadProduct()

function toggleMenu(menuBtn){
  const isopen = menuBtn.getAttribute('aria-expanded') === 'true';
  menuBtn.setAttribute('aria-expanded' , !isopen )
  menu.classList.toggle('show_menu')
  if(isopen){
    menuBtn.setAttribute('aria-label','close')
  }else{
    menuBtn.setAttribute('aria-label','menu')
  }
}

function toggleCart() {
  const isopen = cartBtn.getAttribute('aria-expanded') === 'true';
  cartBtn.setAttribute('aria-expanded' , !isopen )
  cartContainer.classList.toggle('show_cart')
}

function toggleLightBox() {
  const isopen = lightBoxBtns[0].getAttribute('aria-expanded') === 'true';
  lightBoxBtns.forEach((btn) => {
    btn.setAttribute('aria-expanded', !isopen)
  });
  if(isopen){
    liMainImg.src = `./images/image-product-1.jpg`;
  }
  lightBox.classList.toggle('show_light_box')
}

function changeImgOnDesk(thumbBtn) {
  const thumbImg = thumbBtn.querySelector('img').src.replace('-thumbnail' , '');
  console.log(thumbImg);
  if(thumbImg !== mainImg.src){
    thumbBtnAll.forEach((btn) => {
      btn.setAttribute('aria-pressed' , 'false')
    });
    thumbBtn.setAttribute('aria-pressed' , 'true')
    mainImg.src = thumbImg;
    console.log(mainImg.src);
  }
  
}

function changeImgOnMobile(changeBtn) {
  if(changeBtn.classList.contains('previous_btn')){
    if(imgNum === 1){
      imgNum = 4
    }else{
      imgNum--
    }
  }else if(changeBtn.classList.contains('next_btn')){
    if(imgNum === 4){
      imgNum = 1
    }else{
      imgNum++
    }
  }
  mainImg.src = `./images/image-product-${imgNum}.jpg`;
  thumbBtnAll.forEach((btn) => {
    
    if(btn.getAttribute('data-img') === `${imgNum}`){
      btn.setAttribute('aria-pressed' , 'true')
    }else{
      btn.setAttribute('aria-pressed', 'false')
    }
  });
}

function changeLightBoxByBtn(changeBtn) {
  if(changeBtn.classList.contains('previous_li_btn')){
    if(liImgNum === 1){
      liImgNum = 4
    }else{
      liImgNum--
    }
  }else if(changeBtn.classList.contains('next_li_btn')){
    if(liImgNum === 4){
      liImgNum = 1
    }else{
      liImgNum++
    }
  }
  liMainImg.src = `./images/image-product-${liImgNum}.jpg`;
  thumbLiBtnAll.forEach((btn) => {
    if(btn.getAttribute('data-img') === `${liImgNum}`){
      
      btn.setAttribute('aria-pressed' , 'true')
    }else{
      btn.setAttribute('aria-pressed', 'false')
    }
  });
}

function changeLightBoxByThumbBtn(thumbBtn) {
  const thumbImg = thumbBtn.querySelector('img').src.replace('-thumbnail' , '');
  if(thumbImg !== liMainImg.src){
    thumbLiBtnAll.forEach((btn) => {
      btn.setAttribute('aria-pressed' , 'false')
    });
    liImgNum = Number(thumbBtn.getAttribute('data-img'));
    thumbBtn.setAttribute('aria-pressed' , 'true')
    liMainImg.src = thumbImg;
  }
}

function changeItemCount(changeBtn) {
  if(changeBtn.classList.contains('minus_btn')){
    if(itemCountNum !== 0){
      itemCountNum--
    }
  }else if(changeBtn.classList.contains('plus_btn')){
    if(itemCountNum !== 40){
      itemCountNum++
    }
  }
  itemCount.textContent = `${itemCountNum}`
}

function addItemInCart() {
  const totalPrice = productInfo.productTotalPrice * itemCountNum
  const finalProduct = {
    "productName": `${productInfo.productName}`,
    "productPrice": productInfo.productTotalPrice,
    "productCount": itemCountNum,
    "totalPrice": totalPrice
  }
  cartItemCount += itemCountNum
  finalProductsInfo.push(finalProduct)
  insertProductInCart()
  if(productInCart.innerHTML !== emptyCartMessage){
    checkoutBtn.style.display = "inline-block"
    cartItems.style.display = "inline-block"
  }
}

function insertProductInCart() {
  cartItems.textContent = `${cartItemCount}`;
  productInCart.innerHTML = "";
  finalProductsInfo.forEach((product,index) =>{
    productInCart.innerHTML += 
       `<div class="final_product">
          <img src="./images/image-product-1-thumbnail.jpg" width="45" height="44" class="cart_img" alt="product main image">
          <p class="cart_product_details">
            ${product.productName}
            $${product.productPrice} x ${product.productCount} <span>$${product.totalPrice}</span>
          </p>
          <button class="del_btn" aria-label="delete" data-itemNo="${index}">
            <img src="./images/icon-delete.svg" height="16" width="14" alt="">
          </button>
        </div>`;
  })
}

function delFinalProduct(delBtn) {
  const delIndex = delBtn.getAttribute("data-itemNo");
  cartItemCount -= finalProductsInfo[delIndex].productCount
  finalProductsInfo.splice(delIndex , 1);
  if(finalProductsInfo.length !== 0){
    insertProductInCart()
  }else{
    cartItems.innerHTML = ""
    cartItems.style.display = "none"
    productInCart.innerHTML = emptyCartMessage
    checkoutBtn.style.display = "none"
  }
}

function finalCheckout() {
  cartItemCount = 0
  cartItems.innerHTML = ""
  cartItems.style.display = "none"
  finalProductsInfo.length = 0
  productInCart.innerHTML = emptyCartMessage
  checkoutBtn.style.display = "none"
}




container.addEventListener('click', (event) => {
  const e = event.target;
  
  if(e.closest('.checkout_btn')){
    finalCheckout()
  }else if(e.closest('.del_btn')){
    delFinalProduct(e.closest('.del_btn'))
  }else if(cartBtn.getAttribute('aria-expanded') === 'true'){
    toggleCart()
  }else if (e.closest('.menu_button')) {
    toggleMenu(e.closest('.menu_button'))
  }else if(e.closest('.light_button')){
    toggleLightBox()
  }else if(e.closest('.thumb_btn')){
    changeImgOnDesk(e.closest('.thumb_btn'))
  }else if(e.closest('.change_img_btn')){
    changeImgOnMobile(e.closest('.change_img_btn'))
  }else if(e.closest('.li_change_img')){
    changeLightBoxByBtn(e.closest('.li_change_img'))
  }else if(e.closest('.thumb_li_btn')){
    changeLightBoxByThumbBtn(e.closest('.thumb_li_btn'))
  }else if(e.closest('.change_count')){
    changeItemCount(e.closest('.change_count'))
  }else if(e.closest('.cart_btn')){
    toggleCart()
  }else if(e.closest('.add_cart_btn')){
    addItemInCart()
  }
  
});