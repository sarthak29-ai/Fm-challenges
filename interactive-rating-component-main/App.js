
const rateBtn = document.querySelector(".rate_btn_holder");
const submitBtn = document.querySelector(".submit_btn");
const rateDisplay = document.querySelector("#thank_you_card h3");
const ratingDisplay = document.querySelector("#rating_card");
let btn;
let rate;
function changeDisplay() {
  if(rate){
    const thanksDisplay = document.querySelector("#thank_you_card");
    rateDisplay.innerText = `You selected ${rate} out of 5`;
    ratingDisplay.style.display = "none";
    thanksDisplay.style.display = "flex";
    window.removeEventListener("keydown", keyboardRating);
  }else{
    alert("Please select rate fist.");
  }
}

const keyboardRating = (e)=>{
    //check if key is number 
    if(Number(e.key)){
      //check if number is between 1 to 5
      if(e.key >= 1 && e.key <= 5){
        if(btn){
          //first remove active class on previous button 
          btn.classList.remove("active");
          //reset aria checked 
          btn.setAttribute("aria-checked","false");
        }
        btn = document.querySelector(`.rate[data-rate = "${e.key}"]`);
    
        //add class on button which is click 
        btn.classList.add("active");
        btn.setAttribute("aria-checked","true");
        rate = btn.getAttribute("data-rate");
        console.log(rate);
      }
      
    }else if(e.key === "enter" || e.key === " "){
      changeDisplay();
    }
  }
  

rateBtn.addEventListener("click",(event) => {
    //check click are on button tag
  if(event.target.tagName === "BUTTON"){
      
      //check btn variable have document 
    if(btn){
      //first remove active class on previous button 
      btn.classList.remove("active");
      //reset aria checked 
      btn.setAttribute("aria-checked","false");
    }
    btn = event.target;
    
    //add class on button which is click 
    btn.classList.add("active");
    btn.setAttribute("aria-checked","true");
    //get rate from data attribute 
    rate = btn.getAttribute("data-rate");
    console.log(rate);
  }
});


if(ratingDisplay.style.display !== "none"){
  window.addEventListener("keydown", keyboardRating);
}

submitBtn.addEventListener("click",()=>{
  changeDisplay();
});
