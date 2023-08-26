var productTitle = document.getElementById("productTitle");
var productPrice = document.getElementById("productPrice");
var productTaxes = document.getElementById("productTaxes");
var productAds = document.getElementById("productAds");
var productDiscount = document.getElementById("productDiscount");
var productCategory = document.getElementById("productCategory");
var total = document.getElementById("total");
var count = document.getElementById("count");
var tbody = document.getElementById("tbody");
var createBtn = document.getElementById("createBtn");
var updateBtn = document.getElementById("updateBtn");
var deleteAllBtn = document.getElementById("deleteAllBtn");
var searchInp = document.getElementById("searchInp");
var searchTitleBtn = document.getElementById("searchByTitle");
var searchCategoryBtn = document.getElementById("searchByCategory");
var allProducts;

// *** IF CONDITION TO CHECK IF PRODUCT-CONTAINER IS EMPTY OR NOT *** //
if (localStorage.getItem("myProducts") != null) {
  allProducts = JSON.parse(localStorage.getItem("myProducts"));
  displayProducts(allProducts);
} else {
  allProducts = [];
  deleteAllBtn.style.display = "none";
}

// *** FUNCTION TO CALCULATE THE TOTAL *** //
function getTotal() {
  //even price is number inputs but it return a string value
  if (productPrice.value != "") {
    var totalPrice =
      +productPrice.value +
      +productTaxes.value +
      +productAds.value -
      +productDiscount.value;
    total.innerHTML = totalPrice;
  } else {
    total.innerHTML = "";
  }
}

// *** FUNCTION TO CREATE PRODUCTS *** //
createBtn.onclick = function () {
  var product = {
    title: productTitle.value,
    price: productPrice.value,
    taxes: productTaxes.value,
    ads: productAds.value,
    discount: productDiscount.value,
    total: total.innerHTML,
    count: count.value,
    category: productCategory.value,
  };
  if (productTitle.value != "" && productPrice.value != "" && productCategory.value != "") {
    for (let i = 0; i < product.count; i++) {
        allProducts.push(product);
        clearForm();
    }
  }
  localStorage.setItem("myProducts", JSON.stringify(allProducts));
  displayProducts(allProducts);
};

// *** FUNCTION TO GET ALL PRODUCTS AND DISPLAY THEM ON A TABLE & CONTROLS THE DISPLAY OF DELETE ALL BUTTON *** //
function displayProducts(arr) {
  var tableFill = ``;
  for (let i = 0; i < arr.length; i++) {
    tableFill += `<tr>
            <td>${1 + i}</td>
            <td>${arr[i].title}</td>
            <td>${arr[i].price}</td>
            <td>${arr[i].taxes}</td>
            <td>${arr[i].ads}</td>
            <td>${arr[i].discount}</td>
            <td>${arr[i].total}</td>
            <td>${arr[i].category}</td>
            <td><button onclick="updateProduct(${i})" class="btn btn-warning text-white"><i class="fa-solid fa-pen"></i></button></td>
            <td><button onclick="deleteProduct(${i})" class="btn btn-danger text-white"><i class="fa-solid fa-trash"></i></button></td>
        </tr>`;
  }
  tbody.innerHTML = tableFill;
  if (allProducts.length > 0) {
    deleteAllBtn.style.display = "block";
    deleteAllBtn.innerHTML = `Delete All (${allProducts.length})`;
  } else {
    deleteAllBtn.style.display = "none";
  }
}

// *** FUNCTION TO RESET INPUTS *** //
function clearForm() {
  productTitle.value = ``;
  productPrice.value = ``;
  productTaxes.value = ``;
  productAds.value = ``;
  productDiscount.value = ``;
  total.innerHTML = ``;
  count.value = ``;
  productCategory.value = ``;
}

// *** FUNCTION TO DELETE ONE PRODUCT *** //
function deleteProduct(index) {
  allProducts.splice(index, 1);
  localStorage.setItem("myProducts", JSON.stringify(allProducts));
  displayProducts(allProducts);
}

// *** FUNCTION TO DELETE ALL PRODUCTS *** //
deleteAllBtn.onclick = function () {
  localStorage.clear();
  allProducts.splice(0);
  displayProducts(allProducts);
};

// *** FUNCTION TO UPDATE PRODUCT *** //
function updateProduct(index) {
  productTitle.value = allProducts[index].title;
  productPrice.value = allProducts[index].price;
  productTaxes.value = allProducts[index].taxes;
  productAds.value = allProducts[index].ads;
  productDiscount.value = allProducts[index].discount;
  total.innerHTML = allProducts[index].total;
  productCategory.value = allProducts[index].category;
  count.style.display = "none";
  createBtn.classList.add("d-none");
  updateBtn.classList.replace("d-none", "d-block");
  updateBtn.onclick = function () {
    var product = {
      title: productTitle.value,
      price: productPrice.value,
      taxes: productTaxes.value,
      ads: productAds.value,
      discount: productDiscount.value,
      total: total.innerHTML,
      category: productCategory.value,
    };
    allProducts.splice(index, 1, product);
    localStorage.setItem("myProducts", JSON.stringify(allProducts));
    displayProducts(allProducts);
    count.style.display = "block";
    createBtn.classList.remove("d-none");
    updateBtn.classList.replace("d-block", "d-none");
    clearForm();
  };
}

// *** FUNCTION TO CHECK MOOD OF SEARCH *** //
var searchMood = "title";
function getSearchMood(id) {
  if (id == "searchByTitle") {
    searchMood = "title";
  } else if (id == "searchByCategory") {
    searchMood = "category";
  }
  searchInp.placeholder = "search by" + searchMood;
}

// *** FUNCTION TO SEARCH *** //
function search(value) {
    var selectedProducts = [];
    for (let i = 0; i < allProducts.length; i++) {
        if (searchMood == "title") {
            if (allProducts[i].title.toLowerCase().includes(value.toLowerCase())) {
            selectedProducts.push(allProducts[i]);
            }
        }else if (searchMood == "category") {
            if (allProducts[i].category.toLowerCase().includes(value.toLowerCase())) {
            selectedProducts.push(allProducts[i]);
            }
        }
    }
    displayProducts(selectedProducts);
}
