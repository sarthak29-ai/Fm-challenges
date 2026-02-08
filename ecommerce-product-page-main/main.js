
let gallaryImg = {
  "imgNum" : 1,
  "liImgNum" : 1,
  "totalImages" : 0,
  "thumbBtnAll" : [],
  "thumbLiBtnAll" : []
}
let  = 1
let  = 1
let itemCountNum = 0
let productInfo = {}
let finalProductsInfo = []
const emptyCartMessage = "Your cart is empty";
let cartItemCount = 0
let  = 0

const container = document.querySelector('body');
const menu = document.querySelector('.nav_wrapper');
const cartBtn = document.querySelector('.cart_btn');
const cartContainer = document.querySelector('.cart_container');
const lightBox = document.querySelector('#light_box');
const lightBoxBtns = document.querySelectorAll('.light_button');
const mainImg = document.querySelector('.main_product_img');
const liMainImg = document.querySelector('.light_box_img');
const itemCount = document.querySelector('.item_count');
const productInCart = document.querySelector('.cart_product');
const checkoutBtn = document.querySelector('.checkout_btn');
const cartItems = document.querySelector('.item_count_display');
const menuBtn = document.querySelector('.menu_button');



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
  const thumbList = document.querySelector('.thumbnail_list');
  const thumbLiList = document.querySelector('.thumbnail_li_list');
  const thumbSrc = productInfo.productThumbnail
  gallaryImg.totalImages = thumbSrc.length
  
  mainImg.src = productInfo.productMainImage
  liMainImg.src = productInfo.productMainImage
  thumbList.innerHTML = ""
  thumbSrc.forEach((src , index) => {
    thumbList.innerHTML += 
        `<li>
          <button class="thumb_btn" aria-controls="main_img" data-img="${index + 1}" aria-pressed="${index === 0}" aria-label="View product image ${index + 1}">
            <img src="${src}" width="88" height="88" alt="">
          </button>
        </li>`
  });
  thumbLiList.innerHTML = ""
  thumbSrc.forEach((src , index) => {
    thumbLiList.innerHTML += 
        `<li>
          <button class="thumb_li_btn" aria-controls="main_li_img" data-img="${index + 1}" aria-pressed="${index === 0}" aria-label="View product image ${index + 1}">
            <img src="${src}" width="88" height="88" alt="">
          </button>
        </li>`
  });
  
  gallaryImg.thumbLiBtnAll = document.querySelectorAll('.thumb_li_btn');
  gallaryImg.thumbBtnAll = document.querySelectorAll('.thumb_btn');
  
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
           $${product.productTotalPrice}
          </h2>
          <h3 class="product_discount">
            ${product.productDiscount}
          </h3>
        </div>
        <h4 class="product_price">
          $${product.productPrice}
        </h4>`
  
  const savedCart = localStorage.getItem('cartProduct');
  if(savedCart){
    finalProductsInfo = JSON.parse(savedCart)
    cartItemCount = JSON.parse(localStorage.getItem('totalItems'))
    insertProductInCart()
    checkoutBtn.style.display = "inline-block"
    cartItems.style.display = "inline-block"
  }else{
    productInCart.innerHTML = emptyCartMessage
  }
  
}

loadProduct()

function toggleMenu(){
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
    liMainImg.src = productInfo.productMainImage;
  }
  lightBox.classList.toggle('show_light_box')
}



function changeImgOnDesk(thumbBtn) {
  const thumbImg = thumbBtn.querySelector('img').src.replace('-thumbnail' , '');
  console.log(gallaryImg.thumbBtnAll);
  console.log(thumbImg);
  if(thumbImg !== mainImg.src){
    gallaryImg.thumbBtnAll.forEach((btn) => {
      btn.setAttribute('aria-pressed' , 'false')
    });
    thumbBtn.setAttribute('aria-pressed' , 'true');
    mainImg.src = thumbImg;
  }
  
}

function changeImgOnMobile(changeBtn) {
  if(changeBtn.classList.contains('previous_btn')){
    if(gallaryImg.imgNum === 1){
      gallaryImg.imgNum = 4
    }else{
      gallaryImg.imgNum--
    }
  }else{
    if(gallaryImg.imgNum === gallaryImg.totalImages){
      gallaryImg.imgNum = 1
    }else{
      gallaryImg.imgNum++
    }
  }
  mainImg.src = `./images/image-product-${gallaryImg.imgNum}.jpg`;
  gallaryImg.thumbBtnAll.forEach((btn) => {
    
    if(btn.getAttribute('data-img') === `${gallaryImg.imgNum}`){
      btn.setAttribute('aria-pressed' , 'true')
    }else{
      btn.setAttribute('aria-pressed', 'false')
    }
  });
}

function changeLightBoxByBtn(changeBtn) {
  if(changeBtn.classList.contains('previous_li_btn')){
    if(gallaryImg.liImgNum === 1){
      gallaryImg.liImgNum = 4
    }else{
      gallaryImg.liImgNum--
    }
  }else if(changeBtn.classList.contains('next_li_btn')){
    if(gallaryImg.liImgNum === gallaryImg.totalImages){
      gallaryImg.liImgNum = 1
    }else{
      gallaryImg.liImgNum++
    }
  }
  liMainImg.src = `./images/image-product-${gallaryImg.liImgNum}.jpg`;
  gallaryImg.thumbLiBtnAll.forEach((btn) => {
    if(btn.getAttribute('data-img') === `${gallaryImg.liImgNum}`){
      
      btn.setAttribute('aria-pressed' , 'true')
    }else{
      btn.setAttribute('aria-pressed', 'false')
    }
  });
}

function changeLightBoxByThumbBtn(thumbBtn) {
  const thumbImg = thumbBtn.querySelector('img').src.replace('-thumbnail' , '');
  if(thumbImg !== liMainImg.src){
    gallaryImg.thumbLiBtnAll.forEach((btn) => {
      btn.setAttribute('aria-pressed' , 'false')
    });
    gallaryImg.liImgNum = Number(thumbBtn.getAttribute('data-img'));
    thumbBtn.setAttribute('aria-pressed' , 'true')
    liMainImg.src = thumbImg;
  }
}

function changeItemCount(changeBtn) {
  if(changeBtn.classList.contains('minus_btn')){
    if(itemCountNum !== 0){
      itemCountNum--
    }
  }else{
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
  localStorage.setItem('cartProduct' , JSON.stringify(finalProductsInfo))
  localStorage.setItem('totalItems' , `${cartItemCount}`)
  if(productInCart.innerHTML === emptyCartMessage){
    checkoutBtn.style.display = "inline-block"
    cartItems.style.display = "inline-block"
  }
  insertProductInCart()
  
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
    localStorage.setItem('totalItems' , `${cartItemCount}`)
    localStorage.setItem('cartProduct' , JSON.stringify(finalProductsInfo))
    insertProductInCart()
    
  }else {
    localStorage.removeItem('cartProduct')
    localStorage.removeItem('totalItems')
    
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
    toggleMenu()
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
  }else if(e.closest('.add_cart_btn') && itemCountNum !== 0){
    addItemInCart()
  }
  
});

window.addEventListener('keydown', (e) => {
  if(e.key !== 'escape'){
    return ;
  }
  if(cartBtn.getAttribute('aria-expanded') === 'true'){
    toggleCart()
  }else if(menuBtn.getAttribute('aria-expanded') === 'true'){
    toggleMenu()
  }else if(lightBoxBtns[0].getAttribute('aria-expanded') === 'true'){
    toggleLightBox()
  }
});