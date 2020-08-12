let customers = [
  { id: 1, name: 'moe', email: 'moe@gmail.com', isVIP: true },
  { id: 2, name: 'larry', isVIP: true, email: 'larry@gmail.com' },
  { id: 4, name: 'shep', email: 'shep@gmail.com' },
];

const list = document.querySelector('.customerList');

const customerForm = document.querySelector('.form-container');
const nameInput = document.querySelector('#name');
const emailInput = document.querySelector('#email');
const isVIPInput = document.querySelector('#isVIP');
// const nameInput = docuemnt.querySelector('#name');

customerForm.addEventListener('submit', (ev) => {
  ev.preventDefault();
  customers.push({
    name: nameInput.value,
    email: emailInput.value,
    isVIP: isVIPInput.checked,
    id: Math.random(),
  });
  nameInput.value = '';
  emailInput.value = '';
  isVIPInput.checked = false;
  render();
});

list.addEventListener('click', (ev) => {
  const id = ev.target.getAttribute('id');
  if (!id) {
    return;
  }
  customers = customers.filter((customer) => customer.id != id);
  render();
});

const render = () => {
  const html = customers
    .map((customer) => {
      return `<div class='customer${customer.isVIP ? 'vip' : ''}'>${
        customer.name
      } ${customer.email}<button class='destroy' id=${
        customer.id
      }>Destroy</button></div>`;
    })
    .join('');
  list.innerHTML = `<div class='VIP-status'>${
    customers.filter((customer) => customer.isVIP).length
  } VIPs</div>${html}`;
};
render();
