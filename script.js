function percentX(percent) {
  return Math.round((percent / 100) * window.innerWidth);
}
function percentY(percent) {
  return Math.round((percent / 100) * window.innerHeight);
}

// return a random integer between two values, inclusive
function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1) + min);
}

const Engine = Matter.Engine,
      Bodies = Matter.Bodies,
      Body = Matter.Body,
      Svg = Matter.Svg,
      Vertices = Matter.Vertices,
      Constraint = Matter.Constraint,
      Composite = Matter.Composite,
      Mouse = Matter.Mouse,
      MouseConstraint = Matter.MouseConstraint,
      Render = Matter.Render,
      Runner = Matter.Runner;

// create an engine
const engine = Engine.create(),
      world = engine.world;

// create a renderer
const render = Render.create({
  element: document.body,
  engine: engine,
  options: {
    wireframes: false,
    showInternalEdges: false,
    width: percentX(100),
    height: percentY(100),
    background: "transparent"
  }
});

let bodies = [],
    bgColor = "#F9F9F9";

// boundaries

var ceiling = Bodies.rectangle(percentX(100) / 2, percentY(0) - 10, percentX(100), 20, { isStatic: true });
var floor = Bodies.rectangle(percentX(100) / 2, percentY(100) + 10, percentX(100), 20, { isStatic: true });
var rightWall = Bodies.rectangle(percentX(100) + 10, percentY(100) / 2, 20, percentY(100), { isStatic: true });
var leftWall = Bodies.rectangle(percentX(0) - 10, percentY(100) / 2, 20, percentY(100), { isStatic: true });
ceiling.render.visible = false;
floor.render.visible = false;
rightWall.render.visible = false;
leftWall.render.visible = false;
bodies.push(ceiling);
bodies.push(floor);
bodies.push(rightWall);
bodies.push(leftWall);



// add all bodies (boundaries and circles) to the world
Composite.add(world, bodies);


let letterSizeHorizontal = 0.8,
    letterSizeVertical = 0.8;
// semicircles

const semiCircles = [
  ...Array(30).fill().map(() => {
    const path = document.querySelector(".semi > path");
   let randomColor = Math.floor(Math.random()*16777215).toString(16);
    let randomScale = Math.random() / 2 + 1.5;
    const semi = Bodies.fromVertices(
      Math.random() * window.innerWidth, // x
      Math.random() * window.innerHeight, // y

      Vertices.scale(Svg.pathToVertices(path, 2), // vertexSets
        letterSizeHorizontal,
    letterSizeVertical),             
      {
        render: {
          fillStyle: "#" + randomColor,
          strokeStyle: "#" + randomColor,
          lineWidth: 2
        }
      }, // options
      true, // flag internal
    );
    const scale = randomScale;
    Matter.Body.scale(semi, scale, scale);
    return semi;
  }),
];

// add all semicircles to the world
Composite.add(world, semiCircles);

// SVGs

let vertexSets = [],
    svgOne,
    svgTwo,
    svgThree,
    svgFour,
    svgFourCounter;

let cX = percentX(20);
let cY = percentY(20);

let iX = percentX(40);
let iY = percentY(30);

let aX = percentX(60);
let aY = percentY(20);

let aXLegOne = aX - 43;
let aYLegOne = aY + 49;

let aXLegTwo = aX + 43;
let aYLegTwo = aY + 49;

let oX = percentX(50);
let oY = percentY(20);

// let letterSize = (window.innerWidth / 1000);




// C

$('#svg-1').find('path').each(function(i, path) {
  
  let randomColor = Math.floor(Math.random()* 16777215).toString(16);
  svgOne = Bodies.fromVertices(
   cX,
    cY,

    Vertices.scale(Svg.pathToVertices(path, 10), 
    letterSizeHorizontal,
    letterSizeVertical), {
     render: {
       fillStyle: "#" + randomColor,
       strokeStyle: "#" + randomColor,
       lineWidth: 2
     }
    }, true);

  vertexSets.push(svgOne);

});

// I

$('#svg-2').find('path').each(function(i, path) {
  
  let randomColor = Math.floor(Math.random()*16777215).toString(16);

  svgTwo = Bodies.fromVertices(
      iX,
    iY,
    Vertices.scale(Svg.pathToVertices(path, 5), 
    letterSizeHorizontal,
    letterSizeVertical), {
      render: {
        fillStyle: "#" + randomColor,
        strokeStyle: "#" + randomColor,
        lineWidth: 2
      }
    }, true);

  vertexSets.push(svgTwo);

});

// A

let randomColorLetterA = Math.floor(Math.random()*16777215).toString(16);

$('#svg-3').find('path').each(function(i, path) {

  svgThree = Bodies.fromVertices(
    aX,
    aY,
    Vertices.scale(Svg.pathToVertices(path, 9), 
    letterSizeHorizontal,
    letterSizeVertical), {
      render: {
        fillStyle: "#" + randomColorLetterA,
        strokeStyle: "#" + randomColorLetterA,
        lineWidth: 1.5
      }
    }, true);

  vertexSets.push(svgThree);

});




// O

$('#svg-4').find('path').each(function(i, path) {
  
  let randomColor = Math.floor(Math.random()*16777215).toString(16);

  svgFour = Bodies.fromVertices(
    oX,
    oY,
    Vertices.scale(Svg.pathToVertices(path, 6), 
    letterSizeHorizontal,
    letterSizeVertical), {
      render: {
        fillStyle: "#" + randomColor,
        strokeStyle: "#" + randomColor,
        lineWidth: 1
      }
    }, true);

  vertexSets.push(svgFour);

});


// add all SVGs to the world
Composite.add(world, vertexSets);

// run the renderer
Render.run(render);

// create runner
const runner = Runner.create();

// run the engine
Runner.run(runner, engine);

// gravity

let intervalID;

function changeGravity() {
  if (!intervalID) {
    intervalID = setInterval(setGravity, 3000);
  }
}

let intervalNumber = 1;
function setGravity() {
  if (intervalNumber === 1) {
    // console.log("interval " + intervalNumber + ", down");
    world.gravity.y = 0.5;
    world.gravity.x = 0;
    intervalNumber += 1;
  } else if (intervalNumber === 2) {
    // console.log("interval " + intervalNumber + ", up");
    world.gravity.y = -0.5;
    world.gravity.x = 0;
    intervalNumber += 1;
  } else if (intervalNumber === 3) {
    // console.log("interval " + intervalNumber + ", right");
    world.gravity.x = 0.5;
    world.gravity.y = 0;
    intervalNumber += 1;
  } else {
    // console.log("interval " + intervalNumber + ", left");
    world.gravity.x = -0.5;
    world.gravity.y = 0;
    intervalNumber = 1;
  }
}

// hold in place for testing
// world.gravity.y = 0;
// world.gravity.x = 0;

changeGravity();

// mouse control

let mouse = Mouse.create(render.canvas),
    mouseConstraint = MouseConstraint.create(engine, {
      mouse: mouse,
      constraint: {
          stiffness: 0.2,
          render: {
              visible: false
          }
      }
    });

Composite.add(world, mouseConstraint);
