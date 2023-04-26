
const divLogin = document.querySelector('#idLogin');
const divReg = document.querySelector('.divReg');
const openLogin = document.querySelector('#LoginBtn');
const openRegist = document.querySelector('#RegistrationBtn');

let confirm = true;
const wrapper = document.querySelector('#wrapper');

openLogin.addEventListener('click', () => {

  if (confirm == true) {
    let div = document.createElement('div')
    div.innerHTML = `

        <div class="input-box">
                <input type="email" class="emailLOG" placeholder="Email">
            </div>
            <div class="input-box">
                <input type="password" class="pswLOG" placeholder="Password">
            </div>
            <button id="loginBTN" type="button" class="loginBtn f-s">LOGIN</button>
    `


    wrapper.appendChild(div);
    divReg.classList.add('login')
    confirm = false;

  } else {
    wrapper.innerHTML = '';
    confirm = true;
  }
});


openRegist.addEventListener('click', () => {
  wrapper.innerHTML = '';
  divReg.classList.remove('login')
  confirm = true;

}
)



let submitBtn = document.querySelector('#submitBtn');
let passowrdInput = document.querySelector('#password');
let confirmPassword = document.querySelector('#confirmPassword');
let emailInput = document.querySelector('#email');
let nameInput = document.querySelector('#name');
subbs = true;

submitBtn.addEventListener('click', () => {
  const passwordval = passowrdInput.value;
  const confirmval = confirmPassword.value;
  const nameval = nameInput.value;
  const emailval = emailInput.value;
  const checkPassword = /\d./.test(passwordval);

  if (nameval, emailval, passwordval, confirmval == '') {
    alert('Non sono stati compilati tutti i campi');
    return;
  } else if (emailval.search('@') < 0 || emailval.search('.') < 0) {
    alert('Email non valida');
  }
  else if (passwordval !== confirmval) {
    alert('La password non corrisponde a quella precedentemente inserita');

  } else if (passwordval < 8 || !checkPassword || passwordval.search(/[A-Z]/) < 0) {
    alert('La password non rispetta i criteri minimi di sicurezza');

  } else {
    alert('Registrazione effettuata!')
  }
}

);



