
const form = document.querySelector('.contact_form');


form.addEventListener('submit', (e) => {
  e.preventDefault();
  const text = form.querySelectorAll('input.info,textarea.info');
  const error_text = form.querySelectorAll('.imp_info');
  const fieldset_error = form.querySelector('#req_query_type');
  const query_check = form.querySelector('.query_type:checked') !== null;
  const consent_error= form.querySelector('#req_term');
  const content_check = form.querySelector('.check_term:checked') !== null;
  const message = document.querySelector('.succ_massage');
  
  const emailRegex =/^[a-zA-Z0-9]+(?:[._%+-][a-zA-Z0-9]+)*@(?:[a-zA-Z0-9]+(?:-[a-zA-Z0-9]+)*\.)+[a-zA-Z]{2,}$/;
  
  const data = new FormData(form);
  const entries = Object.fromEntries(data.entries());
  const emp_place = Object.keys(entries).filter(key=>{
      const value = entries[key];
    return value === null || value === undefined || (typeof value === 'string' && value.trim() === "");
  });
  
  text.forEach((item) => {
    item.classList.remove('error_outline');
  });
  error_text.forEach((item) =>{
    item.classList.remove('error');
    item.setAttribute('aria-hidden','true');
  });
  
  if(emp_place.length !== 0){
    for(let name of emp_place){
      const input = form.elements[name];
      const para = form.querySelector(`#req_${name}`);
      input.classList.add('error_outline');
      para.classList.add('error');
      para.setAttribute('aria-hidden','false');
    }
  }
  if(!query_check){
    fieldset_error.classList.add('error');
    fieldset_error.setAttribute('aria-hidden','false');
  }
  if(!content_check){
    consent_error.classList.add('error');
    consent_error.setAttribute('aria-hidden','false');
  }
  
  const check_email = emailRegex.test(entries["email"]);
  if(!emp_place.includes("email") && !check_email){
    
    const wrong_email = form.querySelector('#wrong_email');
    wrong_email.classList.add('error');
    wrong_email.setAttribute('aria-hidden','false');
    
  }
  if(emp_place.length === 0 && query_check && check_email && content_check){
  
    message.setAttribute('aria-hidden','true');
    message.style.animationName = "pop_message";
    setTimeout(() => {
        message.setAttribute('aria-hidden', 'false');
    }, 50);
    form.reset();
    setTimeout(() => {
        message.setAttribute('aria-hidden', 'true');
        message.style.animationName = ""; 
    }, 20000); 
    
  }
  
  
});