document.addEventListener("DOMContentLoaded", () => {
  const createModalElement = (tag, className, innerHTML) => {
    const element = document.createElement(tag);
    if (className) element.className = className;
    if (innerHTML) element.innerHTML = innerHTML;
    return element;
  };

  const modalBackDrop = createModalElement("div", "shopping-cart-back-drop");
  const modalWindow = createModalElement("div", "shopping-cart-modal-window");
  const modalWrapper = createModalElement(
    "div",
    "shopping-cart-modal__wrapper"
  );
  const modalTitle = createModalElement("h2", null, "Shopping Cart");
  const modalClose = createModalElement(
    "div",
    null,
    `
    <svg class="icon-group" id="modal-close">
      <use href="../img/sprite.svg#icon-Group"></use>
    </svg>
  `
  );
  const modalHr = createModalElement("hr");
  const modalList = createModalElement(
    "ul",
    "shopping-cart-modal__wrapper-list"
  );

  document.body.appendChild(modalBackDrop);
  modalBackDrop.appendChild(modalWindow);
  modalWindow.appendChild(modalWrapper);
  modalWrapper.appendChild(modalTitle);
  modalWrapper.appendChild(modalClose);
  modalWrapper.appendChild(modalHr);
  modalWrapper.appendChild(modalList);

  const modalOpen = document.getElementById("modal-open");

  const showModal = () => {
    modalBackDrop.style.display = "block";
  };

  const hideModal = () => {
    modalBackDrop.style.display = "none";
  };

  modalOpen.addEventListener("click", showModal);
  modalClose.addEventListener("click", hideModal);
  modalBackDrop.addEventListener("click", event => {
    if (!modalWindow.contains(event.target)) {
      hideModal();
    }
  });
});
