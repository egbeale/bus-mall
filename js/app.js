'use script';

// ************************* GLOBAL VARIABLES ***************************

let products = ['bag', 'banana', 'bathroom', 'boots', 'breakfast', 'bubblegum', 'chair', 'cthulhu', 'dog-duck', 'dragon', 'pen', 'pet-sweep', 'scissors', 'shark', 'sweep', 'tauntaun', 'unicorn', 'water-can', 'wine-glass'];
let productArray = [];
let votingRounds = 25;
let indexNew = [];

// ***************************** DOM REFERENCES ***************************

let imgContainer = document.getElementById('img-container');
let img1 = document.getElementById('img-1');
let img2 = document.getElementById('img-2');
let img3 = document.getElementById('img-3');
// let productVotes = [];
// let productViews = [];
// let productNames = [];
let resultsBtn = document.getElementById('show-results-btn');


// ********************** CANVAS ELEMENT FOR CHART ********************

let ctx = document.getElementById('my-chart').getContext('2d');



//*************** LOCAL STORAGE ****************

let getArr = localStorage.getItem('products');
console.log(getArr);

let parsedArr = JSON.parse(getArr);
console.log(parsedArr);




// ************************* CONSTRUCTOR *****************************
// fileExtension = default parameter. assigning value of jpg

function Product(name, fileExtension = 'jpg') {
  this.productName = name;
  this.image = `images/${name}.${fileExtension}`;
  this.views = 0;
  this.clicks = 0;

  productArray.push(this);
}

if(getArr){
  productArray = parsedArr;
} else {
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
}

// for(let i = 0; i < products.length; i++){
//   if(products[i] === 'sweep') {
//     new Product('sweep', 'png');
//   } else {
//     new Product(`${products[i]}`);
//   }
// }


// ********************** HELPER FUNCTIONS **************************
function getRandomIndex(){
  return Math.floor(Math.random() * productArray.length);
}

function renderImages(){

  while (indexNew.length < 6) {
    let imgIndex = getRandomIndex();
    if (!indexNew.includes(imgIndex)) {
      indexNew.push(imgIndex);
    }
  }

  if(indexNew.length === 6) {
    indexNew.splice(0, 3);
  }

  //**** RENDER IMGS ON SCREEN **** */
  img1.src = productArray[indexNew[0]].image;
  img1.alt = productArray[indexNew[0]].productName;
  productArray[indexNew[0]].views++;

  img2.src = productArray[indexNew[1]].image;
  img2.alt = productArray[indexNew[1]].productName;
  productArray[indexNew[1]].views++;

  img3.src = productArray[indexNew[2]].image;
  img3.alt = productArray[indexNew[2]].productName;
  productArray[indexNew[2]].views++;

}

renderImages();

// ************************ EVENT HANDLEERS ************************

function handleClick(event){
  let imgClicked =  event.target.alt;

  for (let i = 0; i < productArray.length; i++){
    if (imgClicked === productArray[i].productName){
      productArray[i].clicks++;
    }
  }

  votingRounds--;
  if(votingRounds === 0){
    imgContainer.removeEventListener('click', handleClick);

    let strArr = JSON.stringify(productArray);
    localStorage.setItem('product', strArr);
    // return;
  }
  renderImages();
}

function handleShowResults(){

  let productVotes = [];
  let productViews = [];
  let productNames = [];


  for(let i = 0; i < productArray.length; i++) {
    productVotes.push(productArray[i].clicks);
    productViews.push(productArray[i].views);
    productNames.push(productArray[i].name);
  }

  if (votingRounds === 0) {
    let myChartObj = {
      type: 'bar',
      data: {
        labels: products,
        datasets: [{
          label: '# of Votes',
          data: productVotes,
          backgroundColor: [
            'olive'
          ],
          borderColor: [
            'olive'
          ],
          borderWidth: 1
        },
        { label:'# of Views',
          data: productViews,
          backgroundColor: [
            'royalblue'
          ],
          borderColor: [
            'royalblue'
          ],
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    };
    new Chart(ctx, myChartObj);
  }
}

// *********************** EVENT LISTENERS ************************

imgContainer.addEventListener('click', handleClick);
resultsBtn.addEventListener('click', handleShowResults);
