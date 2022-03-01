document.getElementById("search-btn").addEventListener("click", () => {
  const productDetails = document.getElementById("product-details");
  productDetails.textContent = "";
  const searchResult = document.getElementById("searchResult");
  searchResult.textContent = "";
  const searchInput = document.getElementById("search-input");
  const searchText = searchInput.value;
  if (searchText !== "") {
    searchInput.classList.remove("is-invalid");
    loading("block");
    const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`;
    fetch(url)
      .then((response) => response.json())
      .then((data) => displaySearchResult(data.data))
      .catch((err) => console.log(err));
  } else {
    searchInput.classList.add("is-invalid");
  }
});
//loading
const loading = (diplay) => {
  const loading = document.getElementById("overlay");
  loading.style.display = diplay;
};

const displaySearchResult = (products) => {
  loading("none");
  const searchResult = document.getElementById("searchResult");
  searchResult.textContent = "";
  if (products.length > 0) {
    const spliceProducts = products.splice(0, 20);
    spliceProducts.forEach((product) => {
      const div = document.createElement("div");
      div.classList.add("col-xl-4");
      div.innerHTML = `
            
            <div class="card p-3 mb-3">
                <img
                    src="${product.image}"
                    class="card-img-top mb-4"
                    alt="..."
                />
                <div class="card-body p-0">
                    <h5 class="card-title">Name : ${product.phone_name}</h5>
                    <p class="card-text">Brand : ${product.brand}</p>
                    <a href="#" class="btn btn-details" onclick="loadDetailsById('${product.slug}')">
                        Details explore
                    </a>
                </div>
            </div>
            </div>
            `;
      searchResult.append(div);
    });
  } else {
    searchResult.innerHTML = `
            <h1>No product found</h1>
        `;
  }
};

const loadDetailsById = async (productId) => {
  loading("block");
  const url = `https://openapi.programming-hero.com/api/phone/${productId}`;
  const res = await fetch(url);
  const data = await res.json();
  displayProductDetailsById(data);
};
const displayProductDetailsById = (product) => {
  loading("none");
  const productDetails = document.getElementById("product-details");
  productDetails.textContent = "";
  const div = document.createElement("div");
  div.classList.add("row");
  div.classList.add("mb-5");
  div.innerHTML = `
  <h4 class="card-title text-center mb-3 pb-1">${
    product.data.name
  } Full Specifications</h4>
    <div class="col-xl-4">
        <div class="card p-4 mb-3">
            <img
                src="${product.data.image}"
                class="card-img-top mb-4"
                alt="..."
            />
            <div class="card-body p-0">
                <h5 class="card-title">Name : ${product.data.name}</h5>
                <h6>Relese Date : ${
                  product.data.releaseDate
                    ? product.data.releaseDate
                    : "No release date found"
                }</h6>
                <p class="card-text">Brand : ${product.data.brand}</p>
            </div>
        </div>
    </div>
    <div class="col-xl-8">
        <div class="table-responsive">
            <table class="table">
                  <tbody>
                    <tr>
                      <td><strong>Release</strong></td>
                      <td>${
                        product.data.releaseDate
                          ? product.data.releaseDate
                          : "No release date found"
                      }</td>
                    </tr>
                    <!-- <tr>
                      <th>&nbsp; Main Features</th>
                      <th></th>
                    </tr> -->
                    <tr>
                      <td><strong>Storage</strong></td>
                      <td>${product.data.mainFeatures.storage}</td>
                    </tr>
                    <tr>
                      <td><strong>Display Size</strong></td>
                      <td>${product.data.mainFeatures.displaySize}</td>
                    </tr>
                    <tr>
                      <td><strong>ChipSet</strong></td>
                      <td>${product.data.mainFeatures.chipSet}</td>
                    </tr>
                    <tr>
                      <td><strong>Memory</strong></td>
                      <td>${product.data.mainFeatures.memory}</td>
                    </tr>
                    <tr>
                      <td><strong>Sensors</strong></td>
                      <td>${
                        product.data.mainFeatures.sensors
                          ? product.data.mainFeatures.sensors
                          : ""
                      }</td>
                    </tr>
                 
                    <tr>
                        <td><strong>WLAN</strong></td>
                        <td>${
                          product.data.others ? product.data.others.WLAN : "No"
                        }</td>
                    </tr>
                    <tr>
                        <td><strong>Bluetooth</strong></td>
                        <td>${
                          product.data.others
                            ? product.data.others.Bluetooth
                            : "No"
                        }</td>
                    </tr>
                    <tr>
                        <td><strong>GPS</strong></td>
                        <td>${
                          product.data.others ? product.data.others.GPS : "No"
                        }</td>
                    </tr>
                    <tr>
                        <td><strong>NFC</strong></td>
                        <td>${
                          product.data.others ? product.data.others.NFC : "No"
                        }</td>
                    </tr>
                    <tr>
                        <td><strong>Radio</strong></td>
                        <td>${
                          product.data.others ? product.data.others.Radio : "No"
                        }</td>
                    </tr>
                    <tr>
                        <td><strong>USB</strong></td>
                        <td>${
                          product.data.others ? product.data.others.USB : "No"
                        }</td>
                    </tr>
                  </tbody>
                </table>
        </div>
    </div>

    `;
  productDetails.appendChild(div);
};
