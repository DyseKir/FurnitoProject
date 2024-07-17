const getProducts = async () => {
  const response = await fetch("../data/cards.json");
  const products = await response.json();
  return products["product-card"].slice(0, 8);
};
const renderProducts = async () => {
  const products = await getProducts();
  const container = document.querySelector(".product__list");

  for (const product of products) {
    // creating elements
    const productItem = document.createElement("li");
    const productCard = document.createElement("article");
    const productImg = document.createElement("img");
    const productCardText = document.createElement("div");
    const productTitle = document.createElement("h3");
    const productText = document.createElement("p");
    const productTextPrice = document.createElement("p");
    const productTextPriceDiscount = document.createElement("p");

    // setting values for elements
    productItem.classList.add("product-section-shop__item");
    productCard.classList.add("product-section-shop__card");
    productImg.classList.add("product-section-shop__card-img");
    productCardText.classList.add("product-section-shop__card-text");

    productImg.src = product.img;
    productTitle.textContent = product.name;
    productText.textContent = product.type;
    productTextPrice.textContent = `$${product.price}`;

    if (product.discountedPrice) {
      productTextPriceDiscount.textContent = `$${product.discountedPrice}`;
    } else {
      productTextPriceDiscount.textContent = "";
    }

    productCardText.appendChild(productTitle);
    productCardText.appendChild(productText);
    productCardText.appendChild(productTextPrice);

    if (product.discountedPrice) {
      productCardText.appendChild(productTextPriceDiscount);
    }
    productCard.appendChild(productImg);
    productCard.appendChild(productCardText);
    productItem.appendChild(productCard);
    container.appendChild(productItem);

    // Hover effect for the product card
    const hoverContainer = document.createElement("div");
    const addToCartButton = document.createElement("button");
    const hoverLinkList = document.createElement("ul");

    const hoverShareLink = document.createElement("a");
    const hoverCompareLink = document.createElement("a");
    const hoverLikeLink = document.createElement("a");

    hoverShareLink.classList.add("product-section__card-hover-link");
    hoverShareLink.textContent = "Share";
    hoverShareLink.href = "#";

    hoverCompareLink.classList.add("product-section__card-hover-link");
    hoverCompareLink.textContent = "Compare";
    hoverCompareLink.href = "#";

    hoverLikeLink.classList.add("product-section__card-hover-link");
    hoverLikeLink.textContent = "Like";
    hoverLikeLink.href = "#";

    hoverContainer.classList.add("product-section__card-hover", "is-hidden");
    addToCartButton.classList.add("add-to-cart-button");
    addToCartButton.type = "button";
    addToCartButton.id = "add-to-cart-button";
    addToCartButton.textContent = "Add to cart";
    addToCartButton.addEventListener("click", () => addToCart(product));

    hoverLinkList.classList.add("product-section__card-hover-link-list");

    hoverLinkList.appendChild(hoverShareLink);
    hoverLinkList.appendChild(hoverCompareLink);
    hoverLinkList.appendChild(hoverLikeLink);

    hoverContainer.appendChild(addToCartButton);
    hoverContainer.appendChild(hoverLinkList);

    productCard.appendChild(hoverContainer);

    productCard.addEventListener("mouseenter", () => {
      hoverContainer.classList.remove("is-hidden");
      hoverContainer.classList.add("is-visible");
    });

    productCard.addEventListener("mouseleave", () => {
      hoverContainer.classList.remove("is-visible");
      hoverContainer.classList.add("is-hidden");
    });
  }
};
document.addEventListener("DOMContentLoaded", () => {
  renderProducts();
});
