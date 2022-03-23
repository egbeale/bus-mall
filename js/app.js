'use script';

// ************************* GLOBAL VARIABLES ***************************

let productArray = [];
let votes = 25;

// ***************************** DOM REFERENCES *****************************

let button = document.getElementById('result-button')
let resultList = document.getElementById('result-list');

let imgContainer = document.getElementById('img-container');
let img1 = document.getElementById('img1');
let img2 = document.getElementById('img2');
let img3 = document.getElementById('img3');

// ************************* CONSTRUCTOR *****************************

function Product(name, fileExtension = 'jpg') {
  this.name = name;
  this.image = `images/${name}.${fileExtension}`;
  this.views = 0;
  this.votes = 0;

  productArray.push(this);
}

//instantiate all the image objects
new Product('bag');
new Product('banana');
new Product('bathroom');
new Product('boots');
new Product('breakfast');
new Product('bubblegum');
new Product('chair');
new Product('cthulhu');
new Product('dog-duck');
new Product('dragon');
new Product('pen');
new Product('pet-sweep');
new Product('scissors');
new Product('shark');
new Product('sweep', 'png');
new Product('tauntaun');
new Product('unicorn');
new Product('water-can');
new Product('wine-glass');



// ************************* HELPER FUNCTIONS *****************************

function getRandomProduct(){
  return Math.floor(Math.random() * productArray.length);

}

function renderImages(){
  let prodIndex1 = getRandomProduct();
  let prodIndex2 = getRandomProduct();
  let prodIndex3 = getRandomProduct();

  while (prodIndex1 === prodIndex2 || prodIndex1 === prodIndex3){
    prodIndex1 = getRandomProduct();
  }

  while (prodIndex2 === prodIndex3){
    prodIndex2 = getRandomProduct();
  }

  //**** RENDER IMGS ON SCREEN **** */
  img1.src = productArray[prodIndex1].image;
  img1.alt = productArray[prodIndex1].name;
  productArray[prodIndex1].views++;

  img2.src = productArray[prodIndex2].image;
  img2.alt = productArray[prodIndex2].name;
  productArray[prodIndex2].views++;

  img3.src = productArray[prodIndex3].image;
  img3.alt = productArray[prodIndex3].name;
  productArray[prodIndex3].views++;

}

renderImages();

// ***************************** EVENT HANDLEERS *****************************

function getClick(event){
  let imgClicked = event.target.alt;

  for(let i = 0; i < productArray.length; i++){
    if(productArray[i].name === imgClicked){
      productArray[i].clicks++;
    }
  }

  if(votes === 0) {
    imgContainer.removeEventListener('click', getClick);
    return;
  }

  renderImages();
}

function getSeeResults(){
  if(votes === 0){
    for(let i = 0; i < productArray.length; i++){
      let liElem = document.createElement('li');

      liElem.textContent = `${productArray[i].name} was viewed ${productArray[i].views} times and chosen ${productArray[i].votes} times.`;
    }
  }
  button.removeEventListener('click', getSeeResults);
}

// ***************************** EVENT LISTENERS *****************************

imgContainer.addEventListener('click', getClick);
button.addEventListener('click', getSeeResults);