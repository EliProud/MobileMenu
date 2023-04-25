document.addEventListener("DOMContentLoaded", () => {
    const menuSection = document.querySelector(".menu");
    const yourOrderSection = document.querySelector(".your-order");
    const orderList = document.querySelector(".order-list");
    const total = document.querySelector(".total");
    const completeOrderBtn = document.querySelector(".complete-order");
    const modal = document.querySelector(".modal");
    const paymentForm = document.getElementById("payment-form");
  
    const order = [];
  
    function createMenuItem(item) {
        const menuItem = document.createElement("div");
        menuItem.classList.add("menu-item");
        menuItem.innerHTML = `
            <div class="content">
              <span class="emoji">${item.emoji}</span>
              <div class="details">
                <h3>${item.name}</h3>
                <ul>
                  ${item.ingredients.map(ingredient => `<li>${ingredient}</li>`).join('')}
                </ul>
                <p>$${item.price}</p>
              </div>
            </div>
            <button class="add-to-order" data-id="${item.id}">+</button>
        `;
        menuItem.querySelector(".add-to-order").addEventListener("click", () => addToOrder(item));
        return menuItem;
    }
  
    function addToOrder(item) {
      const orderItem = order.find((o) => o.id === item.id);
      if (orderItem) {
        orderItem.quantity++;
      } else {
        order.push({ ...item, quantity: 1 });
      }
      updateOrder();
    }
  
    function removeFromOrder(itemId) {
      const orderItem = order.find((o) => o.id === itemId);
      if (orderItem) {
        orderItem.quantity--;
        if (orderItem.quantity === 0) {
          order.splice(order.indexOf(orderItem), 1);
        }
      }
      updateOrder();
    }
  
    function updateOrder() {
      orderList.innerHTML = "";
      let orderTotal = 0;
  
      order.forEach((item) => {
        orderTotal += item.price * item.quantity;
  
        const li = document.createElement("li");
        li.innerHTML = `
            ${item.emoji} ${item.name} - ${item.quantity} x $${item.price}
            <button class="remove-from-order" data-id="${item.id}">-</button>
        `;
        li.querySelector(".remove-from-order").addEventListener("click", () => removeFromOrder(item.id));
        orderList.appendChild(li);
      });
  
      total.innerHTML = `Total: $${orderTotal.toFixed(2)}`;
  
      if (order.length > 0) {
        yourOrderSection.classList.remove("hidden");
      } else {
        yourOrderSection.classList.add("hidden");
      }
    }
  
    menuArray.forEach((item) => {
      menuSection.appendChild(createMenuItem(item));
    });
  
    completeOrderBtn.addEventListener("click", () => {
      modal.classList.remove("hidden");
    });
  
    paymentForm.addEventListener("submit", (event) => {
      event.preventDefault();
      alert("Payment successful! Enjoy your meal.");
      modal.classList.add("hidden");
      order.length = 0;
      updateOrder();
    });
  });
  
  
  
  