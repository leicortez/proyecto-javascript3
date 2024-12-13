
const lenceria = [
    { id: 1, nombre: 'Conjunto de Encaje', precio: 5000, categoria: 'Conjuntos', talla: 'M' },
    { id: 2, nombre: 'Bata de Seda', precio: 7000, categoria: 'Batas', talla: 'L' },
    { id: 3, nombre: 'Body de Encaje', precio: 4500, categoria: 'Bodies', talla: 'S' },
    { id: 4, nombre: 'Bralette', precio: 3000, categoria: 'Bras', talla: 'M' },
    { id: 5, nombre: 'Conjunto Deportivo', precio: 4000, categoria: 'Deportivo', talla: 'M' }
];


localStorage.setItem('lenceria', JSON.stringify(lenceria));


const lenceriaStorage = JSON.parse(localStorage.getItem('lenceria'));


const mostrarProductos = (productos) => {
    const tbody = document.getElementById('tablaProductos').getElementsByTagName('tbody')[0];
    tbody.innerHTML = '';
    productos.forEach(producto => {
        const row = tbody.insertRow();
        row.insertCell(0).innerText = producto.nombre;
        row.insertCell(1).innerText = `$${producto.precio}`;
        row.insertCell(2).innerText = producto.categoria;
        row.insertCell(3).innerText = producto.talla;
    });
};


const filtrarPorCategoria = (categoria) => {
    if (!categoria) return lenceriaStorage;
    return lenceriaStorage.filter(producto => producto.categoria === categoria);
};


const calcularPrecioTotal = (categoria) => {
    const productosFiltrados = filtrarPorCategoria(categoria);
    return productosFiltrados.reduce((total, producto) => total + producto.precio, 0);
};

const obtenerNombresDeProductos = (categoria) => {
    const productosFiltrados = filtrarPorCategoria(categoria);
    return productosFiltrados.map(producto => producto.nombre);
};


document.getElementById('categoriaSelect').addEventListener('change', (event) => {
    const categoria = event.target.value;
    const productosFiltrados = filtrarPorCategoria(categoria);
    mostrarProductos(productosFiltrados);
});


mostrarProductos(lenceriaStorage);


document.getElementById('mostrarTodo').addEventListener('click', () => {
    mostrarProductos(lenceriaStorage);
});


document.getElementById('guardarJson').addEventListener('click', () => {
    const json = JSON.stringify(lenceriaStorage, null, 2);
    console.log(json);
    alert('Los datos se han guardado en la consola en formato JSON.');
});


const categoria = 'Conjuntos';
const precioTotalEnCategoria = calcularPrecioTotal(categoria);
const nombresDeProductosEnCategoria = obtenerNombresDeProductos(categoria);

console.log(`Precio total en la categoría "${categoria}": $${precioTotalEnCategoria}`);
console.log(`Nombres de productos en la categoría "${categoria}":`, nombresDeProductosEnCategoria);
