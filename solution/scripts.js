let customers = [
    { id: 1, name: 'moe', email: 'moe@gmail.com', isVIP: true},
    { id: 2, name: 'larry', isVIP: true, email: 'larry@gmail.com'},
    { id: 4, name: 'shep', email: 'shep@gmail.com'},
  ];
  
  let emailError = '';
  let nameError = '';
  
  const customersContainer = document.querySelector('#customersContainer');
  
  const nameInput = document.querySelector('[name="name"]');
  const emailInput = document.querySelector('[name="email"]');
  const isVIPInput = document.querySelector('[name="isVIP"]');
  const createButton = document.querySelector('#createButton');
  
  const emailErrorDisplay = document.querySelector('#emailError');
  const nameErrorDisplay = document.querySelector('#nameError');
  
  const renderErrors = ()=> {
    emailErrorDisplay.innerHTML = emailError;
    nameErrorDisplay.innerHTML = nameError;
  };
  
  nameInput.addEventListener('keyup', (ev)=> {
    nameError = ev.target.value ? '' : 'name required';
    renderErrors();
    checkValidity();
  });
  
  emailInput.addEventListener('keyup', (ev)=> {
    if(!ev.target.value){
      emailError = 'email required';
    }
    else if(ev.target.value.indexOf('@') === -1){
      emailError = 'email must contain an @';
    }
    else {
      emailError = '';
    }
    renderErrors();
    checkValidity();
  });
  
  const checkValidity = ()=> {
    if(emailInput.value && emailInput.value.indexOf('@') !== -1 && nameInput.value){
      createButton.removeAttribute('disabled');
    }
    else {
      createButton.setAttribute('disabled', 'disabled');
    }
  };
  
  customerForm.addEventListener('submit', (ev)=> {
    ev.preventDefault();
    customers.push({
      name: nameInput.value,
      email: emailInput.value,
      isVIP: isVIPInput.checked,
      id: Math.random()
    });
    nameInput.value = '';
    emailInput.value = '';
    isVIPInput.checked = false;
    checkValidity();
    render();
  });
  
  customersContainer.addEventListener('click', (ev)=> {
    const id = ev.target.getAttribute('data-id');
    if(!id){
      return;
    }
    customers = customers.filter( customer => customer.id !== id*1);
    render();
  });
  
  
  const render = ()=> {
    const html = customers.map( customer => `
      <div class="customer${ customer.isVIP ? ' vip': ''}">
        <h3>
        ${ customer.name }
        (${ customer.email })
        </h3>
        <button data-id=${customer.id}>Destroy</button>
      </div>
    `).join('');
    customersContainer.innerHTML = `<div class='status'>${ customers.filter( customer => customer.isVIP).length } VIPS</div>${html}`
  };
  
  render();
  