//variáveis da bolinha
let xBola = 300;
let yBola = 200;
let diametro = 17;
let raio = diametro / 2;

//velocidade da bolinha
let velocidadexBola = 6;
let velocidadeyBola = 6;

//variáveis da raquete
let xRaquete = 5;
let yRaquete = 150;
let comprimentoRaquete = 10;
let alturaRaquete = 90;

//variáveis do oponente
let xRaqueteOponente = 585;
let yRaqueteOponente = 150;
let velocidadeYOponente;
let chanceDeErrar=0;

let colidiu = false;

//placar do jogo
let meusPontos = 0;
let pontosDoOponente = 0;

//sons do jogo
let raquetada;
let ponto;
let trilha;

function preload(){
  trilha = loadSound("trilha.mp3");
  ponto = loadSound("ponto.mp3");
  raquetada = loadSound("raquetada.mp3");
}

function setup() {
  createCanvas(600, 400);
  trilha.loop();
}

function draw() {
  background(0);
  mostraBolinha();
  movimentaBolinha();
  verificaColisaoBorda();
  mostraRaquete(xRaquete, yRaquete);
  movimentaMinhaRaquete();
  verificaColisaoRaquete(xRaquete,yRaquete);
  verificaColisaoRaquete(xRaqueteOponente,yRaqueteOponente);
  mostraRaquete(xRaqueteOponente, yRaqueteOponente);
  movimentaRaqueteOponente();
  incluiPlacar();
  marcaPonto();
  bolinhaNaoFicaPresa();
}

function mostraBolinha() {
  circle(xBola, yBola, diametro)
}

function movimentaBolinha() {
  xBola += velocidadexBola;
  yBola += velocidadeyBola;
}

function verificaColisaoBorda() {
  if (xBola + raio > width || xBola - raio < 0) {
      velocidadexBola *= -1;
  }
  if (yBola + raio > height || yBola - raio < 0) {
      velocidadeyBola *= -1;
  }
}

function mostraRaquete() {
  rect(xRaquete, yRaquete, comprimentoRaquete,
       alturaRaquete);
}

function movimentaMinhaRaquete() {
  if (keyIsDown(UP_ARROW)) {
      yRaquete -= 10;
  }
  if (keyIsDown(DOWN_ARROW)) {
      yRaquete += 10;
  }
}

function verificaColisaoRaquete() {
  if (xBola - raio < xRaquete + comprimentoRaquete
      && yBola - raio < yRaquete + alturaRaquete
      && yBola + raio > yRaquete) {
      velocidadexBola *= -1;
  }
}

function colisaoMinhaRaqueteBiblioteca() {
  collideRectCircle(200, 200, 100, 150, mouseX, mouseY, 
                    100);
}

function verificaColisaoRaquete(x, y) {
  colidiu = collideRectCircle(x, y, comprimentoRaquete, 
            alturaRaquete, xBola, yBola, raio);
  if (colidiu){
    velocidadexBola *= -1;
    raquetada.play();
  }
}

function mostraRaquete(x,y) {
  rect(x, y, comprimentoRaquete, alturaRaquete);
}

function movimentaRaqueteOponente() {
  velocidadeYOponente = yBola -yRaqueteOponente -
  comprimentoRaquete / 2 - 30;
 
  yRaqueteOponente += velocidadeYOponente + chanceDeErrar
  
  calculaChanceDeErrar()
}

function calculaChanceDeErrar() {
  if (pontosDoOponente >= meusPontos) {
    chanceDeErrar += 1
    if (chanceDeErrar >= 39){
    chanceDeErrar = 40
    }
  } else {
    chanceDeErrar -= 1
    if (chanceDeErrar <= 35){
    chanceDeErrar = 35
    }
  }
}

function incluiPlacar() {
  stroke(255);
  textAlign(CENTER);
  textSize(16);
  fill(color(255,140,0))
  rect(200,10,40,20);
  fill(255);
  text(meusPontos, 220, 26);
  fill(color(255,140,0))
  rect(400,10,40,20);
  fill(255);
  text(pontosDoOponente, 420, 26);
}

function marcaPonto() {
  if (xBola > 590) {
    meusPontos += 1;
    ponto.play();
  }
  if (xBola < 10) {
    pontosDoOponente += 1;
    ponto.play();
  }
}

function bolinhaNaoFicaPresa(){
    if (xBola - raio < 0){
        xBola = 23
    }
}