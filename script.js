const listaVideos = document.querySelector('.videos__container');
const barraPesquisa = document.querySelector('.pesquisar__input');


async function buscarVideos() {
    try{
        const busca = await fetch('https://api-vidflow.vercel.app/api/videos');
        const videos = await busca.json();

        console.log(busca)
        
        videos.forEach( (video) => {
            listaVideos.innerHTML += `
            <li class="videos__item">
            <iframe src="${video.url}" title"${video.titulo}" frameborder="0" allowfullscreen></iframe>  
                <div class="descricao-video">
                <img class="img-canal" src="${video.imagem}" alt="logo do canal">
                <h3 class="titulo-video">${video.titulo}</h3>
                <p>${video.descricao}</p>
                <p class="categoria" hidden>${video.categoria}</p>
                </div>
                </li>
                `
            })
        }catch(erro){
            listaVideos.innerHTML = `<p>Não foi possivel carregar os videos: ${erro}</p>`
        }
    };
    
buscarVideos();

function filtrarVideos(){
    const videos = document.querySelectorAll('.videos__item');
    if(barraPesquisa != ""){
        videos.forEach( video => {
            let titulo = video.querySelector('.titulo-video').textContent.toLocaleLowerCase();
            let valorFiltro = barraPesquisa.value.toLocaleLowerCase();
            
            if(!titulo.includes(valorFiltro)){
                video.style.display = 'none';
            }else{
                video.style.display = 'block';
            }
        })
    }else{
        videos.style.display = 'block';
    }
}
barraPesquisa.addEventListener( 'input', filtrarVideos);


const categoriaBt = document.querySelectorAll('.superior__item');
categoriaBt.forEach( (botao) => {
    const categoriaSelecionada = botao.getAttribute('name');    
    botao.addEventListener( 'click', ()=> filtrarCategoria(categoriaSelecionada));
});

function filtrarCategoria(filtro){
    const videos = document.querySelectorAll('.videos__item');
    for( let video of videos){
        let categoria = video.querySelector('.categoria').textContent.toLocaleLowerCase();
        let valorFiltro = filtro.toLocaleLowerCase();

        if(!categoria.includes(valorFiltro) && valorFiltro != "tudo"){
            video.style.display = 'none';
        }else{
            video.style.display = 'block';
        }
    }
}

