'use script';

// ************************* GLOBAL VARIABLES ***************************

let products = ['bag', 'banana', 'bathroom', 'boots', 'breakfast', 'bubblegum', 'chair', 'cthulhu', 'dog-duck', 'dragon', 'pen', 'pet-sweep', 'scissors', 'shark', 'sweep', 'tauntaun', 'unicorn', 'water-can', 'wine-glass'];
let productArray = [];
let votingRounds = 25;
let productVotes = [];
let productViews = [];
let yetAnotherIndex = [];

// ***************************** DOM REFERENCES ***************************

let imgContainer = document.getElementById('img-container');
let img1 = document.getElementById('img-1');
let img2 = document.getElementById('img-2');
let img3 = document.getElementById('img-3');

let resultsBtn = document.getElementById('show-results-btn');

// ********************** CANVAS ELEMENT FOR CHART ********************

let ctx = document.getElementById('my-chart').getContext('2d');

// ************************* CONSTRUCTOR *****************************
// fileExtension = default parameter. assigning value of jpg
function Product(name, fileExtension = 'jpg') {
  this.productName = name;
  this.image = `images/${name}.${fileExtension}`;
  this.views = 0;
  this.clicks = 0;

  productArray.push(this);
}

for(let i = 0; i < products.length; i++){
  if(products[i] === 'sweep') {
    new Product('sweep', 'png');
  } else {
    new Product(`${products[i]}`);
  }
}


// ********************** HELPER FUNCTIONS **************************
function getRandomIndex(){
  return Math.floor(Math.random() * productArray.length);
  // from w3resource.com
}

function renderImages(){

  while (yetAnotherIndex.length < 6) {
    let imgIndex = getRandomIndex();
    if (!yetAnotherIndex.includes(imgIndex)) {
      yetAnotherIndex.push(imgIndex);
    }
  }

  if(yetAnotherIndex.length === 6) {
    yetAnotherIndex.splice(0, 3);
  }

  //**** RENDER IMGS ON SCREEN **** */
  img1.src = productArray[yetAnotherIndex[0]].image;
  img1.alt = productArray[yetAnotherIndex[0]].productName;
  productArray[yetAnotherIndex[0]].views++;

  img2.src = productArray[yetAnotherIndex[1]].image;
  img2.alt = productArray[yetAnotherIndex[1]].productName;
  productArray[yetAnotherIndex[1]].views++;

  img3.src = productArray[yetAnotherIndex[2]].image;
  img3.alt = productArray[yetAnotherIndex[2]].productName;
  productArray[yetAnotherIndex[2]].views++;

}

renderImages();

// ************************ EVENT HANDLEERS ************************

function handleClick(event){
  let imgClicked =  event.target.alt;

  for(let i = 0; i < productArray.length; i++){
    if (imgClicked === productArray[i].productName){
      productArray[i].clicks++;
    }
  }

  votingRounds--;
  if(votingRounds === 0){
    imgContainer.removeEventListener('click', handleClick);
    return;
  }
  renderImages();
}

function handleShowResults(){

  for(let i = 0; i < productArray.length; i++) {
    productVotes.push(productArray[i].clicks);
    productViews.push(productArray[i].views);
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
            'blue'
          ],
          borderColor: [
            'blue'
          ],
          borderWidth: 1
        },
        { label:'# of Views',
          data: productViews,
          backgroundColor: [
            'green'
          ],
          borderColor: [
            'green'
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
    // call the constructor function, and what the chart.js told us is that we need to pass it two arguments. pass it that canvas element, and the actual argument.
    // We're allowed to do this bc
    new Chart(ctx, myChartObj);
  }
}

// *********************** EVENT LISTENERS ************************

imgContainer.addEventListener('click', handleClick);
resultsBtn.addEventListener('click', handleShowResults);
