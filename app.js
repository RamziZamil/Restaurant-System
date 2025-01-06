// Customer Constructor
function Customer(
  fullName,
  password,
  dob,
  gender,
  phone,
  orderType,
  orderOption,
  imageUrl
) {
  this.fullName = fullName;
  this.password = password;
  this.dob = dob;
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

document.getElementById("order-form").addEventListener("submit", function (e) {
  e.preventDefault();

  const fullName = document.getElementById("fullName").value;
  const password = document.getElementById("password").value;
  const dob = document.getElementById("dob").value;
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
  // Create customer object
  const customer = new Customer(
    fullName,
    password,
    dob,
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
  localStorage.removeItem("orders"); // Remove "orders" from localStorage
  orders = []; // Clear the orders array in memory
  renderOrders(); // Re-render the orders list to show it's empty
  alert("All orders have been cleared!");
});
