// Customer Constructor
function Customer(
  fullName,
  password,
  dob,
  email,
  gender,
  phone,
  orderType,
  orderOption,
  imageUrl
) {
  this.fullName = fullName;
  this.password = password;
  this.dob = dob;
  this.email = email;
  this.gender = gender;
  this.phone = phone;
  this.orderType = orderType;
  this.orderOption = orderOption;
  this.imageUrl = imageUrl;
}

let orders = [];

function renderOrders() {
  const ordersList = document.getElementById("orders-list");
  ordersList.innerHTML = "";

  orders.forEach((customer) => {
    const orderCard = document.createElement("div");
    orderCard.classList.add("col-md-4", "mb-4");

    orderCard.innerHTML = `
          <div class="card">
              <img src="${
                customer.imageUrl
              }" class="card-img-top" alt="Customer Image">
              <div class="card-body">
                  <h5 class="card-title">${customer.fullName}</h5>    
                  <p><strong>Email:</strong> ${customer.email}</p>
                  <p><strong>Phone:</strong> ${customer.phone}</p>
                  <p><strong>Gender:</strong> ${customer.gender}</p>
                  <p><strong>Date of Birth:</strong> ${customer.dob}</p>
                  <p><strong>Order Type:</strong> ${customer.orderType.join(
                    ", "
                  )}</p>
                  <p><strong>Order Option:</strong> ${customer.orderOption}</p>
              </div>
          </div>
      `;

    ordersList.appendChild(orderCard);
  });
}

function validateInput(fullName, password, dob, email, phone) {
  const userNameValidate = /^\S+$/;
  const passwordValidate =
    /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;
  const dobValidate = /^\d{4}-\d{2}-\d{2}$/;
  const emailValidate = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const phoneValidate = /^07\d{8}$/;

  if (!userNameValidate.test(fullName)) {
    alert("Full Name cannot contain spaces.");
    return false;
  }

  if (!passwordValidate.test(password)) {
    alert(
      "Password must be at least 8 characters long, contain at least 1 uppercase letter, 1 number, and 1 special character."
    );
    return false;
  }

  if (!dobValidate.test(dob)) {
    alert("Date of Birth must be in the format YYYY-MM-DD.");
    return false;
  }

  if (!emailValidate.test(email)) {
    alert("Invalid email format.");
    return false;
  }

  if (!phoneValidate.test(phone)) {
    alert("Phone number must be 10 digits and start with 07.");
    return false;
  }

  // Check for duplicate username or phone number
  const existUserEmail = orders.some((customer) => customer.email === email);
  if (existUserEmail) {
    alert("A user with this email already exists.");
    return;
  }
  const existUserName = orders.some(
    (customer) => customer.fullName.toLowerCase() === fullName.toLowerCase()
  );
  if (existUserName) {
    alert("A user with this UserName already exists.");
    return;
  }
  const existUserPhone = orders.some((customer) => customer.phone === phone);

  if (existUserPhone) {
    alert("A user with this phone number already exists.");
    return false;
  }

  return true;
}

document.getElementById("order-form").addEventListener("submit", function (e) {
  e.preventDefault();

  const fullName = document.getElementById("fullName").value;
  const password = document.getElementById("password").value;
  const dob = document.getElementById("dob").value;
  const email = document.getElementById("email").value;
  const gender = document.getElementById("gender").value;
  const phone = document.getElementById("phone").value;

  const orderType = [];
  if (document.getElementById("shawarma").checked) orderType.push("Shawarma");
  if (document.getElementById("zinger").checked) orderType.push("Zinger");
  if (document.getElementById("burger").checked) orderType.push("Burger");

  const orderOption = document.querySelector(
    'input[name="orderOption"]:checked'
  ).value;

  const imageUrl = "userimg.png";

  if (!validateInput(fullName, password, dob, email, phone)) return;

  // Create customer object
  const customer = new Customer(
    fullName,
    password,
    dob,
    email,
    gender,
    phone,
    orderType,
    orderOption,
    imageUrl
  );

  orders.push(customer);
  localStorage.setItem("orders", JSON.stringify(orders));

  renderOrders();

  document.getElementById("order-form").reset();
});

document.addEventListener("DOMContentLoaded", function () {
  const storedOrders = JSON.parse(localStorage.getItem("orders"));
  if (storedOrders) {
    orders = storedOrders;
    renderOrders();
  }
});

document.getElementById("clear-storage").addEventListener("click", function () {
  localStorage.removeItem("orders");
  orders = [];
  renderOrders();
  alert("All orders have been cleared!");
});
