function Customer(
  fullName,
  password,
  dob,
  gender,
  orderType,
  orderOption,
  imageUrl,
  phone
) {
  this.fullName = fullName;
  this.password = password;
  this.dob = dob;
  this.gender = gender;
  this.orderType = orderType;
  this.orderOption = orderOption;
  this.imageUrl = imageUrl;
  this.phone = phone;
}

let customers = JSON.parse(localStorage.getItem("customers")) || [];

function renderCustomers() {
  const customerCards = document.getElementById("customerCards");
  customerCards.innerHTML = "";

  for (let i = 0; i < customers.length; i++) {
    const customer = customers[i];

    const customerCard = document.createElement("div");
    customerCard.className = "customer-card";

    customerCard.innerHTML = `
      <img src="${customer.imageUrl}" alt="${customer.fullName}">
      <p><strong>Full Name:</strong> ${customer.fullName}</p>
      <p><strong>Password:</strong> ${"*".repeat(customer.password.length)}</p>
      <p><strong>Date of Birth:</strong> ${customer.dob}</p>
      <p><strong>Gender:</strong> ${customer.gender}</p>
      <p><strong>Order Type:</strong> ${customer.orderType.join(", ")}</p>
      <p><strong>Order Option:</strong> ${customer.orderOption}</p>
      <p><strong>Phone:</strong> ${customer.phone}</p>
    `;

    customerCards.appendChild(customerCard);
  }
}

document
  .getElementById("orderForm")
  .addEventListener("submit", function (submitting) {
    submitting.preventDefault();

    const fullName = document.getElementById("fullName").value;
    const password = document.getElementById("password").value;
    const dob = document.getElementById("dob").value;
    const gender = document.getElementById("gender").value;
    const phone = document.getElementById("phone").value;
    const orderType = Array.from(
      document.querySelectorAll('input[name="orderType"]:checked')
    ).map((input) => input.value);
    const orderOption = document.querySelector(
      'input[name="orderOption"]:checked'
    ).value;

    const imageInput = document.getElementById("image");
    let imageUrl = "./assets/customer-default.png";
    if (imageInput.files && imageInput.files[0]) {
      const reader = new FileReader();
      reader.onload = function (event) {
        imageUrl = event.target.result;

        const newCustomer = new Customer(
          fullName,
          password,
          dob,
          gender,
          orderType,
          orderOption,
          imageUrl,
          phone
        );

        customers.push(newCustomer);
        localStorage.setItem("customers", JSON.stringify(customers));

        renderCustomers();

        submitting.target.reset();
      };
      reader.readAsDataURL(imageInput.files[0]);
    } else {
      const newCustomer = new Customer(
        fullName,
        password,
        dob,
        gender,
        orderType,
        orderOption,
        imageUrl,
        phone
      );

      customers.push(newCustomer);
      localStorage.setItem("customers", JSON.stringify(customers));

      renderCustomers();

      submitting.target.reset();
    }
  });

renderCustomers();
