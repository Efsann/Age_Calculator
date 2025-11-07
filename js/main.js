document.addEventListener("DOMContentLoaded", () => {
  const gunGiris = document.querySelector('.input-days');
  const ayGiris = document.querySelector('.input-months');
  const ilGiris = document.querySelector('.input-years');
  const button = document.querySelector('.calculator__user-input-btn');

  gunGiris.addEventListener('input', function () {
    if (gunGiris.nextElementSibling.innerHTML == "Must be a valid date") {
      gunGiris.parentElement.classList.remove("error");
      ayGiris.parentElement.classList.remove("error");
      ilGiris.parentElement.classList.remove("error");
    }
    if (gunGiris.value > 31) {
      gunGiris.nextElementSibling.innerHTML = "Must be a valid day";
      gunGiris.parentElement.classList.add("error");
    } else {
      gunGiris.parentElement.classList.remove("error");
    }
  });
  ayGiris.addEventListener('input', function () {
    if (gunGiris.nextElementSibling.innerHTML == "Must be a valid date") {
      gunGiris.parentElement.classList.remove("error");
      ayGiris.parentElement.classList.remove("error");
      ilGiris.parentElement.classList.remove("error");
    }
    if (ayGiris.value > 12) {
      ayGiris.nextElementSibling.innerHTML = "Must be a valid mounth";
      ayGiris.parentElement.classList.add("error");
    } else {
      ayGiris.parentElement.classList.remove("error");
    }
  });
  ilGiris.addEventListener('input', function () {
    if (gunGiris.nextElementSibling.innerHTML == "Must be a valid date") {
      gunGiris.parentElement.classList.remove("error");
      ayGiris.parentElement.classList.remove("error");
      ilGiris.parentElement.classList.remove("error");
    }
    const bugunTarix = new Date();
    if (ilGiris.value > bugunTarix.getFullYear()) {
      ilGiris.nextElementSibling.innerHTML = "Must be in the past";
      ilGiris.parentElement.classList.add("error");
    } else {
      ilGiris.parentElement.classList.remove("error");
    }
  });

 

  
  ilGiris.addEventListener('change', function () {
    const bugunTarix = new Date();
    if (ilGiris.value < 0) {
      ilGiris.value = -ilGiris.value;
      ilGiris.value = bugunTarix.getFullYear() - ilGiris.value;
    }
  });
  button.addEventListener('click', function () {
    const gun = Number(gunGiris.value);
    const ay = Number(ayGiris.value);
    const il = Number(ilGiris.value);
    if (!gun) {
      gunGiris.parentElement.classList.add("error");
      gunGiris.nextElementSibling.innerHTML = "This field is required";
    }
    if (!ay) {
      ayGiris.parentElement.classList.add("error");
      ayGiris.nextElementSibling.innerHTML = "This field is required";
    }
    if (!il) {
      ilGiris.parentElement.classList.add("error");
      ilGiris.nextElementSibling.innerHTML = "This field is required";
    }
    if (!gun || !ay || !il) {
      return;
    }
    const dogumTarix = new Date(il, ay - 1, gun);
    const indikiTarix = new Date();
    if (
      !(dogumTarix.getFullYear() == il &&
        dogumTarix.getMonth() == ay - 1 &&
        dogumTarix.getDate() == gun) ||
      document.getElementsByClassName('error').length ||
      dogumTarix > indikiTarix ||
      il < 0
    ) {
      gunGiris.parentElement.classList.add("error");
      gunGiris.nextElementSibling.innerHTML = "Must be a valid date";
      ayGiris.parentElement.classList.add("error");
      ayGiris.nextElementSibling.innerHTML = "";
      ilGiris.parentElement.classList.add("error");
      ilGiris.nextElementSibling.innerHTML = "";
      return;
    }
    let yasIl = indikiTarix.getFullYear() - dogumTarix.getFullYear();
    let yasAy = 0;
    let yasGun = 0;

    if (indikiTarix < new Date(indikiTarix.getFullYear(), ay - 1, gun)) {
      yasIl = yasIl - 1;
      yasAy = indikiTarix.getMonth() + 1;
      yasGun = indikiTarix.getDate();
    } else {
      if (indikiTarix.getMonth() + 1 === ay) {
        yasAy = 0;
        yasGun = indikiTarix.getDate() - gun;
      } else {
        yasAy = indikiTarix.getMonth() + 1 - ay;
        if (indikiTarix.getDate() < gun) {
          yasAy = yasAy - 1;
          yasGun =
            indikiTarix.getDate() +
            new Date(
              indikiTarix.getFullYear(),
              indikiTarix.getMonth(),
              0
            ).getDate() -
            gun;
        } else {
          yasGun = indikiTarix.getDate() - gun;
        }
      }
    }
    const cixisGun = document
      .querySelector('.output-days')
      .querySelector('span');
    const cixisAy = document
      .querySelector('.output-months')
      .querySelector('span');
    const cixisIl = document
      .querySelector('.output-years')
      .querySelector('span');
    reqemiAnimasiyaEt(cixisIl, yasIl);
    reqemiAnimasiyaEt(cixisAy, yasAy);
    reqemiAnimasiyaEt(cixisGun, yasGun);
  });

  function reqemiAnimasiyaEt(element, reqem) {
    let step = 50;
    reqem > 25 && (step = 35);
    reqem > 50 && (step = 25);
    reqem > 75 && (step = 20);
    reqem > 100 && (step = 10);
    reqem > 200 && (step = 1);
    let cariReqem = 0;
    if (reqem === 0) {
      element.innerHTML = cariReqem;
    } else {
      const intervalId = setInterval(() => {
        cariReqem = cariReqem + 1;
        if (cariReqem === reqem) {
          clearInterval(intervalId);
        }
        element.innerHTML = cariReqem;
      }, step);
    }
  }
});
