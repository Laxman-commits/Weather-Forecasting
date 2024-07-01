document.addEventListener("DOMContentLoaded", () => {
  const msg = document.querySelector(".chat .fa-regular");
  const xmark = document.querySelector(".chat .fa-solid");
  const form = document.querySelector(".form");
  const successSms = document.querySelector(".sms.success");
  const failureSms = document.querySelector(".sms.failure");
  const smsXmarks = document.querySelectorAll(".sms .fa-xmark");
  const submitbtn = document.querySelector("#submitbtn");
  const emailForm = document.querySelector("#emailForm");

  msg.addEventListener("click", () => {
    xmark.style.display = "block";
    form.style.display = "block";
    msg.style.display = "none";
  });

  xmark.addEventListener("click", () => {
    xmark.style.display = "none";
    form.style.display = "none";
    msg.style.display = "block";
  });

  smsXmarks.forEach(smsXmark => {
    smsXmark.addEventListener('click', () => {
      smsXmark.parentElement.parentElement.style.display = "none";
    });
  });

  emailForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const name = document.querySelector("#name").value;
    const email = document.querySelector("#email").value;

    fetch('send_email.php', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ name: name, email: email })
    })
    .then(response => response.json())
    .then(data => {
      if (data.success) {
        successSms.style.display = 'block';
        setTimeout(() => {
          successSms.style.display = 'none';
        }, 5000);
      } else {
        failureSms.style.display = 'block';
        setTimeout(() => {
          failureSms.style.display = 'none';
        }, 5000);
      }
    })
    .catch(error => {
      failureSms.style.display = 'block';
      setTimeout(() => {
        failureSms.style.display = 'none';
      }, 5000);
    });
  });
});
