let spritesheet;
let spritedata;

let animation = [];


let particleSystem = [];


function preload() {
  spritedata = loadJSON('birdJSON.json');
  spritesheet = loadImage('birdSketch.png');
  
}

let realSky;
function setup() {
  createCanvas(windowWidth, windowHeight);
  frameRate(15);
  colorMode(HSB);
    let frames = spritedata.frames;
  for (let i = 0; i < frames.length; i++) {
    let pos = frames[i].position;
    let img = spritesheet.get(pos.x, pos.y, pos.w, pos.h);
    animation.push(img);
  }

  realSky = createVideo(['video/Sky.mp4']);
  realSky.loop();
  realSky.volume(0);
  realSky.hide();
  realSky.speed(1.7);



}

function draw() {
  background(0);
  image(realSky, windowWidth/500, windowHeight/500);
  //create a new particle object

  let particle = new Particle();
  //put new object into array
  particleSystem.push(particle);


  for(let p in particleSystem){
    particleSystem[p].draw();
    particleSystem[p].move();
    
    if(!particleSystem[p].checkAlive()){
      particleSystem.splice(p,1);
    }
  }
  
  
  translate(width/3,height/4);
  scale(2.5);

  
  image(animation[frameCount % animation.length], 0, 0);
  
  
}


class Particle {
  constructor(){
    this.x = 370;
    this.y = 400;
    //determines movement direction of particle
    this.vx = random(2,-200);
    this.vy = random(-1,20);
    this.alive = true;
    this.brightness = 100;
    this.saturation = 100;
    this.hue = random(400);
    this.c = color(this.hue,this.saturation,this.brightness);
  }
  
  //displays particle on screen
  draw(){
    this.c = color(this.hue, this.saturation, this.brightness);
    
   
    fill(this.c);
    ellipse(this.x,this.y,random(60),random(60));


    
    
  }
  
  //adjusts position
  move(){
    this.x += this.vx;
    this.y += this.vy;
    //this.brightness += 10;
    this.brightness -= 1;

  }
  
  //checks if particle has hit edge of screen, returns true if it hasn't, returns false if it has
  checkAlive(){
    if(this.x > width || this.x < 0){
      this.alive = false;
    }
    if(this.y >height || this.y <0){
      this.alive = false;
    }
    return this.alive; 
  }
   
}
