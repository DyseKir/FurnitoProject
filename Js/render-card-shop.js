//=====================================================================//
//=========================Render card==============================//
//=====================================================================//
// Функция получения продуктов
const getProducts = async () => {
  const response = await fetch("../data/cards.json"); // Запрос на получение данных
  const cards = await response.json(); // Преобразование ответа в формат JSON
  return cards; // Возврат полученных данных
};

// Функция отображения продуктов
const renderProducts = async () => {
  try {
    // Получение данных о продуктах
    const productsData = await getProducts();
    const productCards = productsData["product-card"]; // Получение карточек продуктов

    // Получение контейнер для отображения продуктов
    const container = document.querySelector(".product-section-shop__list");

    // Перебор карточек продуктов
    for (const product of productCards) {
      // Создание элементов для карточки продукта
      const productItem = document.createElement("li");
      const productCard = document.createElement("article");
      const productImg = document.createElement("img");
      const productCardText = document.createElement("div");
      const productTitle = document.createElement("h3");
      const productText = document.createElement("p");
      const productTextPrice = document.createElement("p");
      const productTextPriceDiscount = document.createElement("p");

      // Добавление классов к созданным элементам
      productItem.classList.add("product-section-shop__item");
      productCard.classList.add("product-section-shop__card");
      productImg.classList.add("product-section-shop__card-img");
      productCardText.classList.add("product-section-shop__card-text");

      // Установка содержимого для элементов
      productImg.src = product.img;
      productTitle.textContent = product.name;
      productText.textContent = product.type;
      productTextPrice.textContent = product.price;
      productTextPriceDiscount.textContent = product.discountedPrice;

      // Добавление элементов карточки продукта в контейнер
      container.appendChild(productItem);
      productItem.appendChild(productCard);
      productCard.appendChild(productImg);
      productCard.appendChild(productCardText);
      productCardText.appendChild(productTitle);
      productCardText.appendChild(productText);
      productCardText.appendChild(productTextPrice);
      productCardText.appendChild(productTextPriceDiscount);
      //=====================================================================//
      //=======================Hover card================================//
      //=====================================================================//

      // HTML-разметка для всплывающего okla карточки продукта
      const cardHoverHTML = `
        <div class="product-section__card-hover is-hidden">
          <button class="add-to-card-button" type="button" id="add-to-card-button">Add to cart</button>
          <ul class="product-section__card-hover-link-list">
            <li>
              <a class="product-section__card-hover-link" href="#">
                <svg class="product-section__card-hover-link-icons">
                  <use href="../img/sprite.svg#icon-gridicons_share">
                </svg>
                Share
              </a>
            </li>
            <li>
              <a class="product-section__card-hover-link" href="#">
                <svg class="product-section__card-hover-link-icons">
                  <use href="../img/sprite.svg#icon-compare-svgrepo-com-1">
                </svg>
                Compare
              </a>
            </li>
            <li>
              <a class="product-section__card-hover-link" href="#">
                <svg class="product-section__card-hover-link-icons">
                  <use href="../img/sprite.svg#icon-Heart">
                </svg>
                Like
              </a>
            </li>
          </ul>
        </div>
      `;

      // Добавление HTML-разметки в карточку продукта
      productCard.insertAdjacentHTML("beforeend", cardHoverHTML);

      // Добавление обработчика событий для отображения всплывающего окна
      productCard.addEventListener("mouseover", showHoverEffect);
      productCard.addEventListener("mouseout", hideHoverEffect);

      function showHoverEffect(event) {
        const cardHover = event.currentTarget.querySelector(
          ".product-section__card-hover"
        );
        cardHover.classList.remove("is-hidden");
      }

      function hideHoverEffect(event) {
        const cardHover = event.currentTarget.querySelector(
          ".product-section__card-hover"
        );
        cardHover.classList.add("is-hidden");
      }
    }
  } catch (error) {
    console.error("Ошибка при отображении продуктов:", error);
  }
};

// Вызов функции отображения продуктов
renderProducts();
