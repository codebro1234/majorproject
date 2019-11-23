// Major Project - Bromons
// Abrar Zaher and Nabeel Ramen
//
// This is main code
// 
// 12/30/1867

//input box for name
let inputBox;

//states
let state = 0;
let gameState = 0;
let currentMap = 0;
let introTextNum = 0;

//backgrounds
let introBg;

//background music/sound effects
let introMusic;

let changeState = true;

//characters
let mainPlayer;  

//sprites
let prof;
let mainCharacterSprites;
let grass;

//buttons
let aPressed = false;
let bPressed = false;
let xPressed = false;
let inputButton;

let movingUp = false;
let movingDown = false;
let movingRight = false;
let movingLeft = false;

let checkPokebros;
let checkPlayerCard;
let checkBag;
let exit;

let pokeballIcon;
let bagIcon;
let cardIcon;
let exitIcon;

let menuOptions;
let menuOpen = false;

let cursor = 0;

let menuHeight;
let menuWidth;
let menuXPos;
let menuYPos;
let selectionYPos;

const COLS = 21;
const ROWS = 21;

let mapPos = {
  x: 15,
  y: 15
};

let groundUnit = {
  width: 0,
  height: 0
};

let directions = {
  down: 0,
  up: 1,
  right: 2,
  left: 3
};

let currentDirections = directions.down;

function preload() {
  //backgrounds
  introBg = loadImage("assets/introbackground.PNG");

  //character sprites
  prof = [loadImage("assets/professor1.png"), loadImage("assets/professor1.png"), loadImage("assets/professor2.png"), loadImage("assets/professor1.png"), loadImage("assets/professor4.png")]; 
  mainCharacterSprites = [loadImage("assets/frontSprite.png"), loadImage("assets/backSprite.png"), loadImage("assets/rightSprite.png"), loadImage("assets/leftSprite.png")];
  
  //map sprites
  grass = loadImage("assets/grass.png");

  //music
  introMusic = loadSound("assets/introMusic.mp3"); 

  //maps
  lilFlexTownTxt = loadStrings("maps/lilFlexTown.txt");
  theRanchTxt = loadStrings("maps/theRanch.txt");

  //menu things
  pokeballIcon = loadImage("assets/pokeball.png");
  bagIcon = loadImage("assets/bag.png");
  cardIcon = loadImage("assets/card.png");
  exitIcon = loadImage("assets/exit.png");
}

function setup() {
  createCanvas(3 * (windowWidth/5), (3 * (windowWidth/5))/1.6);

  groundUnit.width = width/COLS;
  groundUnit.height = height/ROWS;

  menuHeight = height * 0.9;
  menuWidth = (width/4);
  menuXPos = (3 * (width/4)) - 30;
  menuYPos = height * 0.05;
  selectionYPos = menuYPos + 60;  

  lilFlexTownGrid = make2DArray(lilFlexTownTxt);
  theRanchGrid = make2DArray(theRanchTxt);

  mainPlayer = new Character("Bro", mainCharacterSprites, [], width/2 + groundUnit.width/2, height/2);
  
  //towns
  lilFlexTown = new Towns("Lil Flex Town", lilFlexTownGrid);
  theRanch = new Towns("The Ranch", theRanchGrid);

  checkPokebros = new MenuOptions("Pokebros", pokeballIcon, menuXPos + 70, selectionYPos, menuWidth, menuHeight/4);
  checkBag = new MenuOptions("Bag", bagIcon, menuXPos + 70, selectionYPos + menuHeight/4, menuWidth, menuHeight/4);
  checkPlayerCard = new MenuOptions("Player Card", cardIcon, menuXPos + 70, selectionYPos + menuHeight/2, menuWidth, menuHeight/4);
  exit = new MenuOptions("Exit", exitIcon, menuXPos + 70, selectionYPos + 3 * (menuHeight/4), menuWidth, menuHeight/4);

  menuOptions = [checkPokebros, checkBag, checkPlayerCard, exit]; 
}

function draw() {
  if (state === 0) {  
    gameIntro();
  } 
  else if (state === 1) {
    playGame();
  }
}

function playGame() {
  let maps = [lilFlexTown, theRanch]; //put maps here
  
  // if (changeState) {
  //   //play music from array
    
  // }

  //background(220);

  if (gameState === 0) {  //moving around on map
    maps[currentMap].displayMap();

    if (menuOpen) {
      //openMenu();
      console.log("dfgdf");
    }
    else {
      mainPlayer.display();
      mainPlayer.move();
    }

    if (xPressed) {
      menuOpen = !menuOpen;
    }
  }
  else if (gameState === 1) {
    //battle tings
    console.log("sfdsfdsfdsfdsfsf");
  }
}

// function openMenu() {

// }

function gameIntro() {
  let introDialog = ["Welcome to the monde de Bromon!!! (Press spacebar to continue)", "I am Songru Tom, the world's leading researcher in the field of flexology.", "Oh, I'm sorry, but what was your name again???", "placeholder", "Well, your journey to becoming the greatest flexer of the century begins now!"];
  
  if (changeState) {
    introMusic.play();
    changeState = false;
  }
  
  imageMode(CORNER);
  background(introBg);
  imageMode(CENTER);
  image(prof[introTextNum], width/2, height/2, width/4, 5 * (height/8));
  
  if (introTextNum === 2) {
    noLoop(); 
    pickName();
  }

  if (introTextNum === 3) {
    textBox("Ah, yes, hello " + mainPlayer.name + "!");
  }
  else {
    textBox(introDialog[introTextNum]);
  }

  if (aPressed) {
    if (introTextNum === 4) {
      state++;
      introMusic.stop();
      changeState = true;
    }
    else {
      introTextNum++;
    }
    aPressed = false;
  }
}

function pickName() {  // remember to format input box
  inputBox = createInput('');
  inputBox.position(width/4 + (inputBox.width * 0.8), 4 * (height/5));

  inputButton = createButton('Submit');
  inputButton.position(inputBox.x + inputBox.width, 4 * (height/5));
  inputButton.mousePressed(setPlayerName);

  greeting = createElement('h2', 'What is your name?');
  greeting.position(width/4 + (inputBox.width * 0.8), 4 * (height/5) - 50);
  
  rect(width/5, 4 * (height/5), 20, 20); // border
  //fill(51, 255, 255);

  textSize(50);
  aPressed = false;
}

function setPlayerName() {
  mainPlayer.name = inputBox.value();

  inputBox.remove();
  inputButton.remove();
  greeting.remove();
  
  introTextNum++;
  loop(); 
}

function make2DArray(textFile) {
  let theArray = [];

  for (let i = 0; i < 31; i++) {
    theArray.push([]);
    for (let j = 0; j < 31; j++) {
      theArray[i].push(textFile[i][j]);
    }
  }

  return theArray;
}

function textBox(theText) {
  fill(255);
  rect(width * 0.01, 3 * (height/4) - height * 0.01, width - width * 0.02, height/4, 20);
  
  fill(0);
  textSize(20);
  text(theText, width * 0.05, 3 * (height/4) + height * 0.03, width - width * 0.05, height/4)
  strokeWeight(4);
}