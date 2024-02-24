class GameScene extends Phaser.Scene {
  constructor() {
    super({ key: "GameScene" });
  }

  // Pré-carrega os recursos necessários para o jogo
  preload() {
    this.load.image('background', 'assets/bg.png');
    this.load.image('player', 'assets/alienigena.png');
    this.load.image('turbo', 'assets/turbo.png');
    this.load.image('tijolo', 'assets/tijolos.png');
    this.load.image('moeda', 'assets/moeda.png');
  }

  // Cria os elementos iniciais do jogo
  create() {
    // Configuração do plano de fundo
    this.add.image(gameState.larguraJogo / 2, gameState.alturaJogo / 2, 'background');

    // Configuração do turbo
    gameState.fogo = this.add.sprite(0, 0, 'turbo');
    gameState.fogo.setVisible(false);

    // Configuração do personagem principal (alien)
    gameState.alien = this.physics.add.sprite(gameState.larguraJogo / 2, 0, 'player');
    gameState.alien.setCollideWorldBounds(true);

    // * DESAFIO *
    // Configuração da plataforma EM LISTA (Física e img)
    // Define a física da plataforma como estática
    gameState.plataforma = this.physics.add.staticGroup();
    // Define as coordenadas da plataforma e cria cada uma
    const platPositions = [
      { x: gameState.larguraJogo / 2, y: gameState.alturaJogo / 2 },
      { x: gameState.larguraJogo / 4, y: gameState.alturaJogo / 4 },
      { x: gameState.larguraJogo / 1.4, y: gameState.alturaJogo / 1.4 },
    ];
    // Cria cada plataforma
    platPositions.forEach(plat => {
      gameState.plataforma.create(plat.x, plat.y, 'tijolo')
    });

    //gameState.plataforma = this.physics.add.staticImage(gameState.larguraJogo / 2, gameState.alturaJogo / 2, 'tijolo')
    this.physics.add.collider(gameState.alien, gameState.plataforma);

    // Configuração da moeda (Física e sprite)
    gameState.moeda = this.physics.add.sprite(50, 0, 'moeda');
    gameState.moeda.setCollideWorldBounds(true);
    gameState.moeda.setBounce(0.7);
    this.physics.add.collider(gameState.moeda, gameState.plataforma);

    // Configuração do teclado
    gameState.teclado = this.input.keyboard.createCursorKeys();

    // Configuração do placar
    gameState.pontuacao = 0;
    gameState.placar = this.add.text(50, 50, 'Moedas:' + gameState.pontuacao, { fontSize: '45px', fill: '#495613' });

    // Configuração da colisão entre o alien e a moeda
    this.physics.add.overlap(gameState.alien, gameState.moeda, function () {
      gameState.moeda.setVisible(false);

      // "Gera" uma nova moeda (apenas reposiciona a antiga)
      let posicaoMoedaY = Phaser.Math.RND.between(50, 650);
      gameState.moeda.setPosition(posicaoMoedaY, 100);

      gameState.pontuacao++; // aumenta a pontuação
      gameState.placar.setText('Moeda: ' + gameState.pontuacao); // atualiza a pontuação
      gameState.moeda.setVisible(true);
    });

  }

  // Atualizações contínuas durante o jogo
  update() {
    // Movimento horizontal do alien (seta direita e seta esquerda do teclado)
    if (gameState.teclado.left.isDown) {
      gameState.alien.setVelocityX(-160);
    } else if (gameState.teclado.right.isDown) {
      gameState.alien.setVelocityX(160);
    } else {
      gameState.alien.setVelocityX(0);
    }

    // Verifica se o jogador está pulando (Apertando tecla espaço ou seta para cima)
    if (gameState.teclado.up.isDown || gameState.teclado.space.isDown) {
      gameState.alien.setVelocityY(-150);
      this.ativarTurbo();
    } else {
      this.semTurbo();
    }

    // Posiciona o turbo em relação ao alien
    gameState.fogo.setPosition(gameState.alien.x, gameState.alien.y + gameState.alien.height / 2)
  }

  // Ativa a exibição do turbo
  ativarTurbo() {
    gameState.fogo.setVisible(true);
  }

  // Desativa a exibição do turbo
  semTurbo() {
    gameState.fogo.setVisible(false);
  }
}
