let productsData;

const getProducts = async () => {
  const response = await fetch("../data/cards.json");
  productsData = await response.json();
  return productsData;
};

const renderProducts = async () => {
  try {
    const container = document.querySelector(".product-section__wrapper");
    const cardListContainer = document.createElement("ul");
    cardListContainer.classList.add("product-section__list");
    container.appendChild(cardListContainer);

    const loadMoreBtn = document.createElement("button");
    loadMoreBtn.textContent = "Show More";
    loadMoreBtn.classList.add("product-section__button");
    container.appendChild(loadMoreBtn);

    const productCards = productsData["product-card"];
    let displayedCards = 0;
    const batchSize = 8;

    const displayNextBatch = () => {
      const batch = productCards.slice(displayedCards, displayedCards + batchSize);
      displayedCards += batchSize;

      for (const product of batch) {
        createProductCard(cardListContainer, product);
      }

      if (displayedCards >= productCards.length) {
        loadMoreBtn.style.display = "none";
      }
    };

    displayNextBatch(); // Отображаем первые 8 карточек

    loadMoreBtn.addEventListener("click", displayNextBatch);
  } catch (error) {
    console.error("Ошибка при отображении продуктов:", error);
  }
};

const createProductCard = (cardListContainer, product) => {
  const productItem = document.createElement("li");
  const productCard = document.createElement("article");
  const productImg = document.createElement("img");
  const productCardText = document.createElement("div");
  const productTitle = document.createElement("h3");
  const productText = document.createElement("p");
  const productTextPrice = document.createElement("p");
  const productTextPriceDiscount = document.createElement("p");

  productItem.classList.add("product-section-shop__item");
  productCard.classList.add("product-section-shop__card");
  productImg.classList.add("product-section-shop__card-img");
  productCardText.classList.add("product-section-shop__card-text");

  productImg.src = product.img;
  productTitle.textContent = product.name;
  productText.textContent = product.type;
  productTextPrice.textContent = product.price;
  productTextPriceDiscount.textContent = product.discountedPrice;

  cardListContainer.appendChild(productItem);
  productItem.appendChild(productCard);
  productCard.appendChild(productImg);
  productCard.appendChild(productCardText);
  productCardText.appendChild(productTitle);
  productCardText.appendChild(productText);
  productCardText.appendChild(productTextPrice);
  productCardText.appendChild(productTextPriceDiscount);

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

  productCard.insertAdjacentHTML("beforeend", cardHoverHTML);

  productCard.addEventListener("mouseover", showHoverEffect);
  productCard.addEventListener("mouseout", hideHoverEffect);

  function showHoverEffect(event) {
    const cardHover = event.currentTarget.querySelector(".product-section__card-hover");
    cardHover.classList.remove("is-hidden");
  }

  function hideHoverEffect(event) {
    const cardHover = event.currentTarget.querySelector(".product-section__card-hover");
    cardHover.classList.add("is-hidden");
  }
};

getProducts().then(renderProducts);
