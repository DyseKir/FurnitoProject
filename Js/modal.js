// //=====================================================================//
// //=======================  modal  ========================//
// //=====================================================================//
document.addEventListener("DOMContentLoaded", function () {
  const modalBackDrop = document.createElement("div");
  const modalWindow = document.createElement("div");
  const modalWrapper = document.createElement("div");
  const modalTitle = document.createElement("h2");
  const modalClose = document.createElement("svg");
  const modalHr = document.createElement("hr");

  modalBackDrop.classList.add("shopping-cart-back-drop");
  modalWindow.classList.add("shopping-cart-modal-window");
  modalWrapper.classList.add("shopping-cart-modal__wrapper");
  modalClose.classList.add("icon-group");
  modalClose.id = "modal-close";

  // SVG-код иконки закрытия
  const closeIconSvg = `
    <svg viewBox="0 0 24 24" width="24" height="24">
      <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" fill="currentColor" />
    </svg>
  `;
  modalClose.innerHTML = closeIconSvg;

  modalTitle.textContent = "Shopping Cart";

  document.body.appendChild(modalBackDrop);
  modalBackDrop.appendChild(modalWindow);
  modalWindow.appendChild(modalWrapper);
  modalWrapper.appendChild(modalTitle);
  modalWrapper.appendChild(modalClose);
  modalWrapper.appendChild(modalHr);

  const modalOpen = document.getElementById("modal-open");
  const modalCloseBtn = document.getElementById("modal-close");

  modalOpen.addEventListener("click", function () {
    modalBackDrop.style.display = "block";
  });

  modalCloseBtn.addEventListener("click", function () {
    modalBackDrop.style.display = "none";
  });

  modalBackDrop.addEventListener("click", function (event) {
    if (event.target === modalBackDrop) {
      modalBackDrop.style.display = "none";
    }
  });
});


