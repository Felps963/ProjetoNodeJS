const player1 = {
    nome: "Mario",
    velocidade: 4,
    manobrabilidade: 3,
    poder: 3,
    pontos: 0
}

const player2 = {
    nome: "Luigi",
    velocidade: 3,
    manobrabilidade: 4,
    poder: 4,
    pontos: 0
}

async function rollDice() {
  return Math.floor(Math.random() * 6) + 1;
}

async function declareWinner(character1, character2) {
  console.log("Resultado da corrida:");
  console.log(`👤 ${character1.nome}: ${character1.pontos} pontos`);
  console.log(`👤 ${character2.nome}: ${character2.pontos} pontos`);
  
  if(character1.pontos > character2.pontos) 
    console.log(`/n ${character1.nome} venceu a corrida!`);
  else if (character2.pontos > character1.pontos) 
    console.log(`/n ${character2.nome} venceu a corrida!`);
  else 
    console.log(`/n Empate!`);
  }


(async function main(){
  console.log(`🚨😶‍🌫️Corrida entre ${player1.nome} e ${player2.nome} começando! \n`);

    await playRaceEngine(player1, player2);
    await declareWinner(player1, player2);
})();

async function getRandomBlock() {
  let random = Math.random()
  let result 

  switch (true) {
    case random < 0.33:
      result = "RETA"
      break;
    case random < 0.66:
        result = "CURVA"
        break;
    default:
      result = "Confronto"
      break;
  }

  return result
}

async function logRollResult(characterName, block, diceResult, attribute) {
  console.log(`👤 ${characterName}: ${block} ${diceResult} + ${attribute} = ${diceResult + attribute}`);
}

async function playRaceEngine(character1, character2){
  for(let round = 1; round <= 5; round++) {
    console.log(`! Rodada ! ${round}`);

    // sortear bloco
    let block = await getRandomBlock()
    console.log(`Bloco: ${block}`);

    // rolar os dados
  let diceResult1 = await rollDice();
  let diceResult2 = await rollDice();
  
  // teste de habilidade
  let TotalTestSkill1 = 0;
  let TotalTestSkill2 = 0;

  if(block === "RETA") {
    TotalTestSkill1 = diceResult1 + character1.velocidade;
    TotalTestSkill2 = diceResult2 + character2.velocidade;

    await logRollResult(character1.nome, "velocidade", diceResult1, character1.velocidade);
    await logRollResult(character2.nome, "velocidade", diceResult2, character2.velocidade);

  }
  if(block ==="CURVA"){
    TotalTestSkill1 = diceResult1 + character1.manobrabilidade;
    TotalTestSkill2 = diceResult2 + character2.manobrabilidade;

    await logRollResult(character1.nome, "manobrabilidade", diceResult1, character1.manobrabilidade);
    await logRollResult(character2.nome, "manobrabilidade", diceResult2, character2.manobrabilidade);
  }

  if(block === "Confronto"){
    let powerResult1 = diceResult1 + character1.poder;
    let powerResult2 = diceResult2 + character2.poder;

    console.log(`👤 ${character1.nome}: confrontrou com ${character2.nome}`);
  
    character2.pontos -= powerResult1 > powerResult2 && character2.pontos > 0 ? 1 : 0;
    character1.pontos -= powerResult1 < powerResult2 && character1.pontos > 0 ? 1 : 0;
  
    console.log(`👤 ${powerResult2 === powerResult1} confronto empatado!`);
  }

    // verificando o vencedor

  if(TotalTestSkill1 > TotalTestSkill2) {
    character1.pontos += 1;
    console.log(`👤 ${character1.nome} venceu o confronto!`);
    character1.pontos++;
  }else if (TotalTestSkill1 < TotalTestSkill2) {
    character2.pontos ++;
    console.log(`👤 ${character2.nome} venceu o confronto!`);
    character2.pontos++;
  }
  }
  }