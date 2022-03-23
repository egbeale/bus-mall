'use script';

// ************************* GLOBAL VARIABLES ***************************

let productArray = [];
let votingRounds = 25;

// ***************************** DOM REFERENCES *****************************

let imgContainer = document.getElementById('img-container');
let img1 = document.getElementById('img-1');
let img2 = document.getElementById('img-2');
let img3 = document.getElementById('img-3');

let resultsBtn = document.getElementById('show-results-btn');
let resultsList = document.getElementById('show-result-list');

// ************************* CONSTRUCTOR *****************************

function Product(name, fileExtension = 'jpg') {
  this.productName = name;
  this.image = `images/${name}.${fileExtension}`;
  this.views = 0;
  this.clicks = 0;

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

function getRandomIndex(){
  return Math.floor(Math.random() * productArray.length);
  // from w3resource.com

}

function renderImages(){

  let prodIndex1 = getRandomIndex();
  let prodIndex2 = getRandomIndex();
  let prodIndex3 = getRandomIndex();

  //make sure no repeat images
  while (prodIndex1 === prodIndex2 || prodIndex1 === prodIndex3){
    prodIndex1 = getRandomIndex();
  }
  while (prodIndex2 === prodIndex3){
    prodIndex2 = getRandomIndex();
  }

  //**** RENDER IMGS ON SCREEN **** */
  img1.src = productArray[prodIndex1].image;
  img1.alt = productArray[prodIndex1].productName;
  productArray[prodIndex1].views++;

  img2.src = productArray[prodIndex2].image;
  img2.alt = productArray[prodIndex2].productName;
  productArray[prodIndex2].views++;

  img3.src = productArray[prodIndex3].image;
  img3.alt = productArray[prodIndex3].productName;
  productArray[prodIndex3].views++;

}

renderImages();

// ************************ EVENT HANDLEERS ************************

function handleClick(event){

  let imgClicked = event.target.alt;

  for(let i = 0; i < productArray.length; i++){
    if(imgClicked === productArray[i].productName){
      productArray[i].clicks++;
    }
  }
  //rerender 2 new imgs ??????????

  votingRounds--;
  if(votingRounds === 0){
    imgContainer.removeEventListener('click', handleClick);
    return;
  }
  renderImages();
}

function handleShowResults(){
  if(votingRounds === 0){
    for(let i = 0; i < productArray.length; i++){
      let li = document.createElement('li');

      li.textContent = `${productArray[i].productName} was viewed ${productArray[i].views} times and clicked on ${productArray[i].clicks} times.`;
      resultsList.appendChild(li);
    }
  }
  // resultsBtn.removeEventListener('click', handleShowResults);
}

// *********************** EVENT LISTENERS ************************

imgContainer.addEventListener('click', handleClick);
resultsBtn.addEventListener('click', handleShowResults);
