const contenedor = document.getElementById("contenedor");
const btnAnterior = document.getElementById("btnAnterior");
const btnSiguiente = document.getElementById("btnSiguiente");

let pagina = 1;

btnSiguiente.addEventListener("click", () => {
  if (pagina < 1000) {
    pagina += 1;
    cargarPeliculas();
  }
});

btnAnterior.addEventListener("click", () => {
  if (pagina > 1) {
    pagina -= 1;
    cargarPeliculas();
  }
});

const cargarPeliculas = async () => {
  try {
    const solicitud = await fetch(
      `https://api.themoviedb.org/3/movie/popular?api_key=d9953a55971c489830b60d9b130bc1b7&language=es-MX&page=${pagina}`
    );
    console.log(solicitud);

    if (solicitud.status === 200) {
      datos = await solicitud.json();
      let peliculas = "";
      datos.results.forEach((pelicula) => {
        peliculas += `
       <div class="pelicula">
            <img class ="poster" src="https://image.tmdb.org/t/p/w500/${pelicula.poster_path}">

       <h3 class="titulo">${pelicula.title}</h3>
        <p>popularidad ${pelicula.popularity} </p>
               
   
       </div>
       `;
       console.log(pelicula)
      });
      contenedor.innerHTML = peliculas;
    } else if (solicitud.status === 401) {
      console.info(`pusiste la llave mal  ${solicitud.status}`);
    } else if (solicitud.status === 404) {
      console.error(`error pelicula no exite ${solicitud.status}`);
    } else {
      console.log("Error no identificado");
    }
  } catch (error) {
    console.error();
  }
};
cargarPeliculas();
