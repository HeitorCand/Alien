// Objeto que guardara variáveis do jogo
const gameState = {
  larguraJogo: 700,
  alturaJogo: 850,
};

// Configurações gerais do jogo
const config = {
  type: Phaser.AUTO,          // Tipo de renderização automática
  width: gameState.larguraJogo,  // Largura do jogo
  height: gameState.alturaJogo,  // Altura do jogo
  backgroundColor: "#b9eaff",  // Cor de fundo
  physics: {
    default: 'arcade',         // Motor de física padrão (Arcade)
    arcade: {
      gravity: { y: 300 },      // Gravidade aplicada aos objetos
      debug: true,              // Modo de depuração (visualização de colisões)
      enableBody: true,         // Habilita a física para os objetos do jogo
    }
  },
  scene: [GameScene]           // Cenas do jogo a serem carregadas
};

// Instância principal do jogo
const game = new Phaser.Game(config);
