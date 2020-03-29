// 1. Submit the form, only if it is valid
//    email is between 5 and 50 chars long -- done
//    email format is correct -- done
//    name has 0 or 2 whitespaces between words -- done
//    name length is 1 or more chars -- done
//    phone length is 12 or more digits -- done
//    phone format is correct. Valid formats: "+38032 000 000 00", "+380(32) 000 000 00", "+380(32)-000-000-00", "0380(32) 000 000 00", + any combitaion
//    message is 10 or more characters. -- done
//    message must not include bad language: ugly, dumm, stupid, pig, ignorant -- done
// 2. Validate each input on the fly using onchange event
// 3. Define re-usable validators: length, format,  
function validateMe(event) {
  event.preventDefault();

  emailChecker();

  nameChecker();

  phoneChecker();

  messageChecker();

  dynamicLoading();

  return false;
}

function emailChecker() {
  const emailNode = event.target.elements['email'];
  const emailErrorNode = emailNode.parentNode.querySelector('p.help-block');
  emailErrorNode.innerHTML = '';

  let emailErrors = document.createElement('ul');
  emailErrors.setAttribute("role", "alert");

  if (emailNode.value.length < 5 || emailNode.value.length > 50) {
    let li = document.createElement('li');
    li.innerText = 'Email is too short';
    emailErrors.appendChild(li)
  }

  if (!emailNode.value.match(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)) {
    let li = document.createElement('li');
    li.innerText = 'Email format is incorrect';
    emailErrors.appendChild(li)
  }

  if (emailErrors.childElementCount > 0) {
    emailErrorNode.appendChild(emailErrors)
  }
}

function nameChecker() {
  const nameNode = event.target.elements['name'];
  const nameErrorNode = nameNode.parentNode.querySelector('p.help-block');
  nameErrorNode.innerHTML = '';

  let nameErrors = document.createElement('ul');
  nameErrors.setAttribute("role", "alert");

  const eachNamePiece = nameNode.value.split('');
  let whitespaces = 0;

  for (let i = 0; i < eachNamePiece.length; i++) {
    if (eachNamePiece[i] === ' ') {
      whitespaces++;
    }
  }

  if (whitespaces !== 0 && whitespaces !== 2) {
    let li = document.createElement('li');
    li.innerText = 'Number of whitespaces is incorrect';
    nameErrors.appendChild(li);
  }

  if (nameNode.value.length < 1) {
    let li = document.createElement('li');
    li.innerText = 'Name field should be filled';
    nameErrors.appendChild(li);
  }

  if (nameErrors.childElementCount > 0) {
    nameErrorNode.appendChild(nameErrors);
  }
}

function phoneChecker() {
  const phoneNode = event.target.elements['phone'];
  const phoneErrorNode =phoneNode.parentNode.querySelector('p.help-block');
  phoneErrorNode.innerHTML = '';

  let phoneErrors = document.createElement('ul');
  phoneErrors.setAttribute("role", "alert");

  if (phoneNode.value.length < 12) {
    let li = document.createElement('li');
    li.innerText = 'Phone number is too short';
    phoneErrors.appendChild(li);
  }

  const nm = phoneNode.value;

  let onlyDigits = ('' + nm).replace(/\D/g, '');

  let match = onlyDigits.match(/^(\d{3})(\d{2})(\d{2})(\d{2})(\d{3})$/) || 404;

  if (match !== 404) {
    let final = '+' + match[1] + '(' + match[2] + ')' + ' ' + match[3] + ' ' + match[4] + ' ' + match[5];
    if (final !== nm) {
      let li = document.createElement('li');
      li.innerText = 'Phone number format is +380(32) 00 00 000';
      phoneErrors.appendChild(li);
    }
  } else {
    let li = document.createElement('li');
    li.innerText = 'Phone number format is +380(32) 00 00 000';
    phoneErrors.appendChild(li);
  }

  if (phoneErrors.childElementCount > 0) {
    phoneErrorNode.appendChild(phoneErrors)
  }
}

function messageChecker() {
  const messageNode = event.target.elements['message'];
  const messageErrorNode = messageNode.parentNode.querySelector('p.help-block');
  messageErrorNode.innerHTML = '';

  let messageErrors = document.createElement('ul');
  messageErrors.setAttribute("role", "alert");

  if (messageNode.value.length < 10) {
    let li = document.createElement('li');
    li.innerText = 'Message is too short';
    messageErrors.appendChild(li);
  }

  const forbiddenMessages = ['ugly', 'dumm', 'stupid', 'pig', 'ignorant'];
  let forbiddenUsed = '';

  for (let i = 0; i < forbiddenMessages.length; i++) {
    if (messageNode.value.includes(forbiddenMessages[i])) {
      forbiddenUsed += forbiddenMessages[i] + ', ';
    }
  }

  if (forbiddenUsed !== '') {
    let li = document.createElement('li');
    li.innerText = 'The words like ' + forbiddenUsed.substring(0, forbiddenUsed.length - 2) + ' are forbidden';
    messageErrors.appendChild(li);
  }

  if (messageErrors.childElementCount > 0) {
    messageErrorNode.appendChild(messageErrors)
  }
}

function dynamicLoading() {
  const name = document.getElementById('name');
  const email = document.getElementById('name');
  const phone = document.getElementById('name');
  const message = document.getElementById('name');

  name.addEventListener('change', () => nameChecker());
  email.addEventListener('change', () => emailChecker());
  phone.addEventListener('change', () => phoneChecker());
  message.addEventListener('change', () => messageChecker());
}
