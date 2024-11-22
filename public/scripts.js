document.addEventListener("DOMContentLoaded", () => {
  loadCars();
  loadUsers();
  loadBookings();
});

function showTab(tabId) {
  document.querySelectorAll(".tab-content").forEach((tab) => {
    tab.style.display = tab.id === tabId ? "block" : "none";
  });
}

// Car Management
document.getElementById("carForm").addEventListener("submit", function (event) {
  event.preventDefault();
  const id = document.getElementById("carId").value;
  const carData = {
    Make: document.getElementById("make").value,
    Model: document.getElementById("model").value,
    Year: document.getElementById("year").value,
    Color: document.getElementById("color").value,
    PricePerDay: document.getElementById("pricePerDay").value,
    Availability: document.getElementById("availability").value,
  };

  if (id) {
    fetch(`/cars/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(carData),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          loadCars();
          resetCarForm();
        } else {
          alert("Error updating car.");
        }
      });
  } else {
    fetch("/cars", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(carData),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          loadCars();
          resetCarForm();
        } else {
          alert("Error adding car.");
        }
      });
  }
});

function loadCars() {
  fetch("/cars")
    .then((response) => response.json())
    .then((data) => {
      const tbody = document.querySelector("#carsTable tbody");
      tbody.innerHTML = "";
      data.forEach((car) => {
        const tr = document.createElement("tr");
        tr.innerHTML = `
                  <td>${car.CarID}</td>
                  <td>${car.Make}</td>
                  <td>${car.Model}</td>
                  <td>${car.Year}</td>
                  <td>${car.Color}</td>
                  <td>${car.PricePerDay}</td>
                  <td>${car.Availability}</td>
                  <td>
                      <button onclick="editCar(${car.CarID})">Edit</button>
                      <button onclick="deleteCar(${car.CarID})">Delete</button>
                  </td>
              `;
        tbody.appendChild(tr);
      });
    });
}

function editCar(id) {
  fetch(`/cars/${id}`)
    .then((response) => response.json())
    .then((data) => {
      if (data) {
        document.getElementById("carId").value = data.CarID;
        document.getElementById("make").value = data.Make;
        document.getElementById("model").value = data.Model;
        document.getElementById("year").value = data.Year;
        document.getElementById("color").value = data.Color;
        document.getElementById("pricePerDay").value = data.PricePerDay;
        document.getElementById("availability").value = data.Availability;
        document.getElementById("carSubmitButton").textContent = "Update";
        showTab("carsTab");
      }
    });
}

function deleteCar(id) {
  fetch(`/cars/${id}`, { method: "DELETE" })
    .then((response) => response.json())
    .then((data) => {
      if (data.success) {
        loadCars();
      } else {
        alert("Error deleting car.");
      }
    });
}

function resetCarForm() {
  document.getElementById("carForm").reset();
  document.getElementById("carId").value = "";
  document.getElementById("carSubmitButton").textContent = "submit";
}

// User Management
document
  .getElementById("userForm")
  .addEventListener("submit", function (event) {
    event.preventDefault();
    const id = document.getElementById("userId").value;
    const userData = {
      Name: document.getElementById("name").value,
      Email: document.getElementById("email").value,
      Phone: document.getElementById("phone").value,
      Address: document.getElementById("address").value,
    };

    if (id) {
      fetch(`/users/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userData),
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.success) {
            loadUsers();
            resetUserForm();
          } else {
            alert("Error updating user.");
          }
        });
    } else {
      fetch("/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userData),
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.success) {
            loadUsers();
            resetUserForm();
          } else {
            alert("Error adding user.");
          }
        });
    }
  });

function loadUsers() {
  fetch("/users")
    .then((response) => response.json())
    .then((data) => {
      const tbody = document.querySelector("#usersTable tbody");
      tbody.innerHTML = "";
      data.forEach((user) => {
        const tr = document.createElement("tr");
        tr.innerHTML = `
                  <td>${user.UserID}</td>
                  <td>${user.Name}</td>
                  <td>${user.Email}</td>
                  <td>${user.Phone}</td>
                  <td>${user.Address}</td>
                  <td>
                      <button onclick="editUser(${user.UserID})">Edit</button>
                      <button onclick="deleteUser(${user.UserID})">Delete</button>
                  </td>
              `;
        tbody.appendChild(tr);
      });
    });
}

function editUser(id) {
  fetch(`/users/${id}`)
    .then((response) => response.json())
    .then((data) => {
      if (data) {
        document.getElementById("userId").value = data.UserID;
        document.getElementById("name").value = data.Name;
        document.getElementById("email").value = data.Email;
        document.getElementById("phone").value = data.Phone;
        document.getElementById("address").value = data.Address;
        document.getElementById("userSubmitButton").textContent = "Update";
        showTab("usersTab");
      }
    });
}

function deleteUser(id) {
  fetch(`/users/${id}`, { method: "DELETE" })
    .then((response) => response.json())
    .then((data) => {
      if (data.success) {
        loadUsers();
      } else {
        alert("Error deleting user.");
      }
    });
}

function resetUserForm() {
  document.getElementById("userForm").reset();
  document.getElementById("userId").value = "";
  document.getElementById("userSubmitButton").textContent = "submit";
}

// Booking Management
document
  .getElementById("bookingForm")
  .addEventListener("submit", function (event) {
    event.preventDefault();
    const id = document.getElementById("bookingId").value;
    const bookingData = {
      UserID: document.getElementById("userIdBooking").value,
      CarID: document.getElementById("carIdBooking").value,
      StartDate: document.getElementById("startDate").value,
      EndDate: document.getElementById("endDate").value,
      TotalAmount: document.getElementById("totalAmount").value,
      Status: document.getElementById("status").value,
    };

    if (id) {
      fetch(`/bookings/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(bookingData),
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.success) {
            loadBookings();
            resetBookingForm();
          } else {
            alert("Error updating booking.");
          }
        });
    } else {
      fetch("/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(bookingData),
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.success) {
            loadBookings();
            resetBookingForm();
          } else {
            alert("Error adding booking.");
          }
        });
    }
  });

function loadBookings() {
  fetch("/bookings")
    .then((response) => response.json())
    .then((data) => {
      const tbody = document.querySelector("#bookingsTable tbody");
      tbody.innerHTML = "";
      data.forEach((booking) => {
        const tr = document.createElement("tr");
        tr.innerHTML = `
                  <td>${booking.BookingID}</td>
                  <td>${booking.UserID}</td>
                  <td>${booking.CarID}</td>
                  <td>${booking.StartDate}</td>
                  <td>${booking.EndDate}</td>
                  <td>${booking.TotalAmount}</td>
                  <td>${booking.Status}</td>
                  <td>
                      <button onclick="editBooking(${booking.BookingID})">Edit</button>
                      <button onclick="deleteBooking(${booking.BookingID})">Delete</button>
                  </td>
              `;
        tbody.appendChild(tr);
      });
    });
}

function editBooking(id) {
  fetch(`/bookings/${id}`)
    .then((response) => response.json())
    .then((data) => {
      if (data) {
        document.getElementById("bookingId").value = data.BookingID;
        document.getElementById("userIdBooking").value = data.UserID;
        document.getElementById("carIdBooking").value = data.CarID;
        document.getElementById("startDate").value = data.StartDate;
        document.getElementById("endDate").value = data.EndDate;
        document.getElementById("totalAmount").value = data.TotalAmount;
        document.getElementById("status").value = data.Status;
        document.getElementById("bookingSubmitButton").textContent = "Update";
        showTab("bookingsTab");
      }
    });
}

function deleteBooking(id) {
  fetch(`/bookings/${id}`, { method: "DELETE" })
    .then((response) => response.json())
    .then((data) => {
      if (data.success) {
        loadBookings();
      } else {
        alert("Error deleting booking.");
      }
    });
}

function resetBookingForm() {
  document.getElementById("bookingForm").reset();
  document.getElementById("bookingId").value = "";
  document.getElementById("bookingSubmitButton").textContent = "submit";
}
