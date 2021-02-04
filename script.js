// vai manipular dino, por ser uma constante não pode ser sobrescrita
// por isso eh const, vai selecionar do css
const dino = document.querySelector('.dino');
const background = document.querySelector('.background')
let isJumping = false;

// keyup 
function handleKeyUp (event) {
    if(event.keyCode === 32) {
        if (!isJumping) {
            jump();
        }
    }
}

function jump() {
    let position = 0; //posição inicial do dino
    //setInterval serve para definir intervalos
    isJumping = true;

    let upInterval = setInterval(() => {
        if(position >= 150) {
            //limpa o intervalo e para de subir
            clearInterval(upInterval);

            //descendo
            let downIterval = setInterval(()=> {
                    if(position <= 0){
                        clearInterval(downIterval);
                        isJumping = false;
                    } else { 
                    position -= 20;                    
                    dino.style.bottom = position + 'px';
                }
            }, 20);
        } else {
        //subindo
        position += 20; //20 milisegundos
        dino.style.bottom = position + 'px';
        }
    }, 20);
}

//cria o cactus
function createCactus () {
    const cactus = document.createElement('div');
    let cactusPosition = 1000;
    let randomTime = Math.random() * 6000;

    cactus.classList.add('cactus');
    cactus.style.left = 1000 + 'px';
    background.appendChild(cactus);

    let leftInterval = setInterval(() => {
        if(cactusPosition < -60) {
            clearInterval(leftInterval);
            //remove o cactus da tela 
           background.removeChild(cactus);
        } else if (cactusPosition > 0 && cactusPosition < 60) {
               clearInterval(leftInterval);
               document.body.innerHTML = '<h1 class="game-over"> Fim do Jogo!</h1>';
        } else {
            cactusPosition -= 10;
            cactus.style.left = cactusPosition + 'px';
        }
    }, 20);

    // executa uma certa funcção por determinado tempo
    setTimeout(createCactus, randomTime);
}


// chama a funcção handleKeyUp
createCactus();
document.addEventListener('keyup', handleKeyUp);