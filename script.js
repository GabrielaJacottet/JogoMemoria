let contador = 0;
let primeiraSelecao = "";
let segundaSelecao = "";

//pegando todos os cards
const cartas = document.querySelectorAll(".carta");

let todosAnimaisCorretos;

let num_tentativas = document.querySelector(".tentativas");
let tentativas = 0;


function embaralhar() {
    cartas.forEach((carta) => {
        let numeroAleatorio = Math.floor(Math.random() * 12);
        carta.style.order = numeroAleatorio;
    })
}

embaralhar();

cartas.forEach((carta) => 
{
    //para cada card, incluir o evento: click
    carta.addEventListener("click", () => 
    {    
        //incluir classe css "clicada"
        carta.classList.add("clicada");


        if(contador === 0)
        {
            primeiraSelecao = carta.getAttribute("id");
            contador++;
        }else 
        {
            segundaSelecao = carta.getAttribute("id");
            contador = 0;

            //verificar se os cards clicados são iguais
            if(primeiraSelecao === segundaSelecao)
            {
                //se forem iguais, adiciona a classe css "correta" e remove a classe css "clicada"
                const animalCorreto = document.querySelectorAll(
                      ".carta[id='" + primeiraSelecao + "']");
                
                animalCorreto[0].classList.add("correta");
                animalCorreto[0].classList.remove("clicada");
                animalCorreto[1].classList.add("correta");
                animalCorreto[1].classList.remove("clicada");
                
            }
            else
            {
                //se forem diferentes, adiciona a classe css "incorreta", aguarda a animação, remove a classe css "clicada" e "incorreta"
                const animalIncorreto = document.querySelectorAll(
                    ".carta.clicada");

                animalIncorreto[0].classList.add("incorreta");    
                animalIncorreto[1].classList.add("incorreta");    

                setTimeout(() =>{
                    animalIncorreto[0].classList.remove("incorreta");
                    animalIncorreto[0].classList.remove("clicada");
                    animalIncorreto[1].classList.remove("incorreta");
                    animalIncorreto[1].classList.remove("clicada");
                },800)

                tentativas++;
                num_tentativas.innerHTML = "";

                novoNumTentativas(tentativas);
            }
        }

        //pegar todos os cards que estão com a classe css correta
        todosAnimaisCorretos = document.querySelectorAll(".carta.correta");

        //se a quantidade de cards com a classe css correta for igual a quantidade de cartas, mostra a mensagem de vitória, retira as classes,
        //zera o número de tentativas e começa o jogo novamente
        if (cartas.length == todosAnimaisCorretos.length)
        {
            setTimeout(() =>{
                alert("Parabéns você ganhou!");
             },300)
            
             todosAnimaisCorretos.forEach((animais) => {
                setTimeout(() =>{
                    animais.classList.remove("correta");
                    animais.classList.remove("clicada");
                    tentativas = 0;
                    num_tentativas.innerHTML = "";
                    novoNumTentativas(tentativas);
                    embaralhar();
                },300)
             });
            
        }
    })
    
});

function novoNumTentativas(tentativas)
{
    let novoNumTentativas = document.createElement("div");
    novoNumTentativas.innerHTML =
    "<div class='tentativas'>"+
    "<p> Tentativas: </p>"+
    "<p class='num_tentativas'>"+tentativas+"</p>"+
    "</div>";
    num_tentativas.appendChild(novoNumTentativas);
}

