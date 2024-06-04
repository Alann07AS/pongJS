alert("Player 1 'A','Q' \n Player 2 'P','M' \n 'Space' to Start")
console.log('INIT')
const P1 = {div: document.createElement('div')}
const P2 = {div: document.createElement('div')}
const Ball = {div: document.createElement('div')}
const viewPortInfo = document.body.getBoundingClientRect()

Ball.x = viewPortInfo.width/2-20
Ball.y = viewPortInfo.height/2-20
let P1Y
let P2Y

const Pspeed = 6
Ball.speed = 5
Ball.vecteur = {x: 0,y: 0, angle: 0}
Ball.vecteur.angle = [180, 0][Math.round(Math.random())]+((Math.random()*20)-10)// start random angle between 70 - 110
console.log(Ball.vecteur.angle*(Math.PI/180), 'radian', Math.PI);
Ball.vecteur.y = Ball.speed * Math.sin(Ball.vecteur.angle*(Math.PI/180))
Ball.vecteur.x = Ball.speed * Math.cos(Ball.vecteur.angle*(Math.PI/180))
//TEST A SUP
// Ball.vecteur.x = 5
// Ball.vecteur.y = 5


P1.div.id = 'P1'
P2.div.id = 'P2'
P1.div.classList.add('player')
P2.div.classList.add('player')
Ball.div.classList.add('circle')
P1.div.style.left = '10vw'
P2.div.style.left = '90vw'
Ball.div.style.top = Ball.y+"px"
Ball.div.style.left = Ball.x+"px"

document.body.append(P1.div)
document.body.append(P2.div)
document.body.append(Ball.div)

P1.handler = {
    up: false,
    down: false,
}
P2.handler = {
    up: false,
    down: false,
}
const game = {
    start: false,
    listener: document.body.addEventListener('keypress', (input) => {
        if (input.key == ' ') {if(game.start) {game.start = false; console.log('Game Stop');} else {game.start = true; console.log('Game Start');}}
    } )
}
game.timeLoop = 10
//P1
P1.listenerDown = document.body.addEventListener('keydown', (input) => {
    if (input.key == 'a' && !P1.handler.down) {P1.handler.up = true; P1.handler.down = false}
    if (input.key == 'q' && !P1.handler.up) {P1.handler.down = true; P1.handler.up = false}
} )
P1.listenerDown = document.body.addEventListener('keyup', (input) => {
    if (input.key == 'a') {P1.handler.up = false}
    if (input.key == 'q') {P1.handler.down = false}
} )

//P2
P2.listenerDown = document.body.addEventListener('keydown', (input) => {
    if (input.key == 'p' && !P2.handler.down) {P2.handler.up = true; P2.handler.down = false}
    if (input.key == 'm' && !P2.handler.up) {P2.handler.down = true; P2.handler.up = false}
} )
P2.listenerDown = document.body.addEventListener('keyup', (input) => {
    if (input.key == 'p') {P2.handler.up = false}
    if (input.key == 'm') {P2.handler.down = false}
} )

function mainLoop() {
    if (game.start) {
        P1.statut = P1.div.getBoundingClientRect()
        P2.statut = P2.div.getBoundingClientRect()      
    // Player conrtoleur
        //P1
        GoUp(P1)
        GoDown(P1)
        //P2
        GoUp(P2)
        GoDown(P2)

    // BAll controleur
        BallUpdate(P1.statut,P2.statut)
    }
}

setInterval(mainLoop, game.timeLoop);


//Player Action
function GoUp(P) {
    if(P.handler.up) {
        let move = P.statut.top-Pspeed
        if(P.statut.top-Pspeed > 0) {
            P.div.style.top = (move)+"px"
        } else {
            P.div.style.top = (0)+"px"
        }
    }
}
function GoDown(P) {
    if(P.handler.down) {
        let move = P.statut.top+Pspeed
        if(P.statut.top < viewPortInfo.height-P.statut.height) {
            P.div.style.top = (move)+"px"
        } else {
            P.div.style.top = (viewPortInfo.height-P.statut.height)+"px"
        }
    }
}

// Ball controleur
function BallUpdate() {
    Ball.statut = Ball.div.getBoundingClientRect()
//Ball update vector
    let angleBoost = [4, -4][Math.round(Math.random())]
    //P1 colision
    if((Ball.x <= P1.statut.x + P1.statut.width) && (Ball.y+Ball.statut.height/2 >= P1.statut.y && Ball.y+Ball.statut.height/2 <= P1.statut.y+P1.statut.height)&& (Ball.vecteur.x < 0)) {
        console.log(Ball.vecteur.angle, 'before after');
        Ball.vecteur.angle = 180 - Ball.vecteur.angle
        console.log(Ball.vecteur.angle, 'before after');
        if(P1.handler.down) {
            angleBoost = -((Math.random()*13)+1)
        } else if(P1.handler.up) {
            angleBoost = ((Math.random()*13)+1)
        }
        Ball.vecteur.angle += angleBoost
        Ball.vecteur.y = Ball.speed * Math.sin(Ball.vecteur.angle*(Math.PI/180))
        Ball.vecteur.x = Ball.speed * Math.cos(Ball.vecteur.angle*(Math.PI/180))
        console.log(Ball.vecteur.y,'y');
        console.log(Ball.vecteur.x,'x');

    }
    //P2 colision
    if((Ball.x+Ball.statut.width >= P2.statut.x) && (Ball.y+Ball.statut.height/2 >= P2.statut.y && Ball.y+Ball.statut.height/2 <= P2.statut.y+P2.statut.height) && (Ball.vecteur.x > 0)) {
        Ball.vecteur.angle = 180 - Ball.vecteur.angle
        if(P2.handler.down) {
            angleBoost = -((Math.random()*13)+1)
        } else if(P2.handler.up) {
            angleBoost = ((Math.random()*13)+1)
        }
        Ball.vecteur.angle += angleBoost
        Ball.vecteur.y = Ball.speed * Math.sin(Ball.vecteur.angle*(Math.PI/180))
        Ball.vecteur.x = Ball.speed * Math.cos(Ball.vecteur.angle*(Math.PI/180))
        console.log(Ball.vecteur.angle);
        console.log(Ball.vecteur.y,'y');
        console.log(Ball.vecteur.x,'x');

    }
    // Border top and bottom colision
    if(Ball.y+Ball.statut.height >= viewPortInfo.height || Ball.y <= 0) {
        Ball.vecteur.angle = 360 - Ball.vecteur.angle 
        Ball.vecteur.y = Ball.speed * Math.sin(Ball.vecteur.angle*(Math.PI/180))
        Ball.vecteur.x = Ball.speed * Math.cos(Ball.vecteur.angle*(Math.PI/180))
        console.log('Hit top',Ball.vecteur.y, Ball.vecteur.x);
    }
    // if() {
    //     Ball.vecteur.angle = 90
    //     Ball.vecteur.y = Ball.speed * Math.sin(Ball.vecteur.angle*(Math.PI/180))
    //     Ball.vecteur.x = Ball.speed * Math.cos(Ball.vecteur.angle*(Math.PI/180))
    //     console.log('Hit bottom',Ball.vecteur.y, Ball.vecteur.x);
    // }

//Ball update position
    Ball.x += Ball.vecteur.x
    Ball.y += Ball.vecteur.y
    Ball.div.style.left = Ball.x+'px'
    Ball.div.style.top = Ball.y+'px'
}
