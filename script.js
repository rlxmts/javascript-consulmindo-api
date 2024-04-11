const listaVideos = document.querySelector('.videos__container');

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
                    <h3>${video.titulo}</h3>
                    <p>${video.descricao}</p>
                </div>
            </li>
            `
        })
    }catch(erro){
        listaVideos.innerHTML = `<p>Não foi possivel carregar os videos: ${erro}</p>`
    }
};
;

buscarVideos();