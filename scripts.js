const uploadBtn = document.getElementById("upload-btn");
const inputUpload = document.getElementById("image-upload"); 
const imagemPrincipal = document.querySelector(".main-imagem");
const nomeDaImagem = document.querySelector(".container-imagem-nome p");

// dispara o seletor nativo de ficheiros ao carregar no botão
uploadBtn.addEventListener("click", () => {
    inputUpload.click();
});

// leitura do ficheiro e devolve uma Promise com o URL e o nome
function lerConteudoDoArquivo(arquivo) {
    return new Promise((resolve, reject) => {
        const leitor = new FileReader();

        leitor.onload = () => {
            resolve({ 
                url: leitor.result, 
                nome: arquivo.name 
            });
        };

        leitor.onerror = () => {
            reject(`Erro na leitura do ficheiro ${arquivo.name}`);
        };
    
        leitor.readAsDataURL(arquivo);
    });
}

// escuta/interpreta a selecao do ficheiro
inputUpload.addEventListener("change", async (evento) => {
    const arquivo = evento.target.files[0];

    if (arquivo) {
        try {
            const conteudoDoArquivo = await lerConteudoDoArquivo(arquivo);
            imagemPrincipal.src = conteudoDoArquivo.url;
            if (nomeDaImagem) {
                nomeDaImagem.textContent = conteudoDoArquivo.nome;
            }
        } catch (error) {
            console.error("Erro na leitura do ficheiro!", error);
        }
    }
});

// manipulação das tags
const inputTags = document.getElementById("input-tags");
const listaTags = document.getElementById("lista-tags");

// remover tags existentes na lista
listaTags.addEventListener("click", (evento) => {
    if (evento.target.classList.contains("remove-tag")) {
        const tagRemovida = evento.target.parentElement; // Corrigido: 'parentElement'
        listaTags.removeChild(tagRemovida);
    }
});

// lista de tags válidas do sistema
const tagsDisponiveis = [
    "Front-end",
    "Programação", 
    "Data Science", 
    "Full-stack", 
    "HTML", 
    "CSS", 
    "JavaScript"
];

// validaocao da tag
async function verificaTagsDisponiveis(tagTexto) {
    return new Promise((resolve) => {
        setTimeout(() => {
            // Comparação ignorando maiúsculas e minúsculas
            const existe = tagsDisponiveis.some(
                tag => tag.toLowerCase() === tagTexto.toLowerCase()
            );
            resolve(existe);
        }, 500);
    });
}

// insercao de nova tag ao pressionar Enter
inputTags.addEventListener("keypress", async (evento) => {
    if (evento.key === "Enter") {
        evento.preventDefault();
        const tagTexto = inputTags.value.trim();
        
        if (tagTexto !== "") {
            try {
                const tagExiste = await verificaTagsDisponiveis(tagTexto);
                if (tagExiste) {
                    const tagNova = document.createElement("li");
                    tagNova.innerHTML = `<p>${tagTexto}</p><img src="./img/close.svg" class="remove-tag" style="cursor: pointer;" alt="Remover tag">`;
                    listaTags.appendChild(tagNova);
                    inputTags.value = "";
                } else {
                    alert("Tag não encontrada no catálogo de tags permitidas!");
                }
            } catch (error) {
                console.error("Erro ao verificar a existência da tag", error);
                alert("Erro ao verificar a tag. Consulte a consola do programador.");
            }
        }
    }
});

// submissão e publicação do formulário
const botaoPublicar = document.querySelector(".botao-publicar");

async function publicarProjeto(nomeDoProjeto, descricaoDoProjeto, tagsProjeto) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const sucesso = Math.random() > 0.2; 

            if (sucesso) {
                resolve("Projeto publicado com sucesso!");
            } else {
                reject("Erro ao publicar projeto na base de dados.");
            }
        }, 1000);
    });
}

botaoPublicar.addEventListener("click", async (evento) => {
    evento.preventDefault();

    const nomeDoProjeto = document.getElementById("nome").value;
    const descricaoDoProjeto = document.getElementById("descricao").value;
    const tagsProjeto = Array.from(listaTags.querySelectorAll("p")).map(tag => tag.textContent);

    if (!nomeDoProjeto || !descricaoDoProjeto) {
        alert("Por favor, preencha todos os campos obrigatórios antes de publicar.");
        return;
    }

    try {
        const mensagemSucesso = await publicarProjeto(nomeDoProjeto, descricaoDoProjeto, tagsProjeto);
        alert(mensagemSucesso);
        console.log("Dados gravados:", { nomeDoProjeto, descricaoDoProjeto, tagsProjeto });
    } catch (erro) {
        alert(erro);
        console.error(erro);
    }
});


const botaoDescartar = document.querySelector(".botao-descartar");

botaoDescartar.addEventListener("click", (evento) => {
    evento.preventDefalut();
    //procura em todo codigo o elemento form
    const formulario = document.querySelector("form");
    //reseta todas respostas ao formulario
    formulario.reset();

    imagemPrincipal.scr = "./img/imagem1.png";
    nomeDaImagem.textContent = "image_projeto.png";

    listaTags.innerHTML = "";

})