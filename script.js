const listaVideos = document.querySelector('.videos__container');
const barraPesquisa = document.querySelector('.pesquisar__input');
const listaCategorias = document.querySelectorAll('.superior__item');

async function buscarVideos() {
    try{
        const busca = await fetch('http://localhost:3000/videos');
        const videos = await busca.json();
        
        videos.forEach( (video) => {
            listaVideos.innerHTML += `
            <li class="videos__item">
            <iframe src="${video.url}" title"${video.titulo}" frameborder="0" allowfullscreen></iframe>  
                <div class="descricao-video">
                <img class="img-canal" src="${video.imagem}" alt="logo do canal">
                <h3 class="titulo-video">${video.titulo}</h3>
                <p>${video.descricao}</p>
                <p class="video-categoria" hidden>${video.categoria}</p>
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


