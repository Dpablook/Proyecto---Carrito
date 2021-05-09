//primero creamos variables
//
const carrito = document.querySelector('#carrito');
const contenedorCarrito = document.querySelector('lista-carrito, tbody');//el tbody es un elemento vacio en donde se agregan los elementos
const listaCursos = document.querySelector('#lista-cursos');
const vaciarCarrito = document.querySelector('#vaciar-carrito');
let articuloCarrito = [];


/*
* Recomendable poner todos los eventos juntos separados de las funciones
*
*/
cargarEventListener();
function cargarEventListener(){
	//cuando agregas un curso presionando agregar al carrito
	listaCursos.addEventListener('click', agregarCurso)

	//Elimina cursos de carrito
	carrito.addEventListener('click', eliminarCurso);

	//Vaciar el carrito
	vaciarCarrito.addEventListener('click', () => {
		articuloCarrito= [];

		limpiarHTML();
	})
}

//funciones

//funcion para agregar al carrito
function agregarCurso(e){
	if (e.target.classList.contains('agregar-carrito')) {
	const cursoSeleccionados = e.target.parentElement.parentElement;
	leerDatosCursos(cursoSeleccionados);
	}
}

//Elimina el curso del carrito
function eliminarCurso(e){
	if(e.target.classList.contains('borrar-curso')){
		const cursoId = e.target.getAttribute('data-id');
		console.log(e.target.getAttribute('data-id'));	
		//Elimina del arreglo de articulos por el data-id
		articuloCarrito = articuloCarrito.filter(curso => curso.id !== cursoId);
		carritoHTML();//volvemos a llamar la funcion para actualizar
	}
}



//Funcion para leer los datos del curso y extraer la informacion del curso
function leerDatosCursos(curso){
	//console.log(curso);

	//Crear un objeto para extraer los datos del curso que queremos agregar
	const infoCurso = {
		imagen: curso.querySelector('img').src,
		titulo: curso.querySelector('h4').textContent,
		precio: curso.querySelector('span').textContent,
		id: curso.querySelector('a').getAttribute('data-id'),
		cantidad: 1,
	}

	//Revisar si un elemento se repite en el carrito o ya existe
	const existe = articuloCarrito.some( curso => curso.id === infoCurso.id);
	if (existe){
		//Actualizamos la cantidad
		const cursos = articuloCarrito.map( curso => {
			if( curso.id === infoCurso.id ){
				curso.cantidad++;
				return curso; //este retorna el objeto actualizado
			}else{
				return curso; //este retorna los objetos que no son los duplicados
			}
		});
		articuloCarrito = [...cursos];
	}else {
		//Agregar elemento al areglo de carrito
		articuloCarrito = [...articuloCarrito, infoCurso];//tambien se podria usar el .push
	}

	//la funcion de abajo
	carritoHTML();
}

//Muestra el carrito en el HTML
function carritoHTML(){
	//Limpiar el HTML
	limpiarHTML();

	//Recorrer el carrito y generar el HTML
	articuloCarrito.forEach(curso => {
		const row = document.createElement('tr');
		row.innerHTML = `
			<td>
				<img src="${curso.imagen}" width="100px", height="100px">
			</td>

			<td>
				${curso.titulo}
			</td>
			<td>
				${curso.precio}
			</td>
			<td>
				${curso.cantidad}
			</td>
			<td>
	            <a href="#" class="borrar-curso" data-id="${curso.id}">X</a>
			</td>
		`;

		//Agregar al HTML en el tbody
		contenedorCarrito.appendChild(row);
	})
}

//Elimina los cursos del contenedor
function limpiarHTML(){
	//Forma lenta no recomendable
	//contenedorCarrito.innerHTML = '';
	
	//Mejor forma es esta:
	while(contenedorCarrito.firstChild){
		contenedorCarrito.removeChild(contenedorCarrito.firstChild)
	}
}
