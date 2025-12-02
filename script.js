let carrito = [];

// función para guardar el carrito al cerrar la pagina con localstorage, .stringify para pasarlo a texto y .parse para leerlo a json.
function guardarCarrito() {
    localStorage.setItem("carrito", JSON.stringify(carrito));
}

function cargarCarrito() {
    const guardado = localStorage.getItem("carrito");
    if (guardado) {
        carrito = JSON.parse(guardado);
    }
}
cargarCarrito();


// Actualización del carrito, itera sobre el, agregando elementos con un .title y .price y un total

function actualizarCarrito() {
    const ul = document.getElementById('carrito-items');
    ul.innerHTML = '';
    let total = 0;

    carrito.forEach(item => {
        const li = document.createElement('li');
        li.textContent = `${item.title} - $${item.price}`;
        ul.appendChild(li);
        total += item.price;
    });

    document.getElementById('carrito-total').textContent = total.toFixed(2);

    guardarCarrito(); // ← guarda cada actualización
}

// se carga la api fake, se pasa a array/objeto para que se pueda leer.
// productos mostrados en un div con clase item para darle estilos, con img, h4, p, y button de agregar al carrito.
// mas abajo está el queryselector para agregar es decir .push para agregar datos como title, price al carrito, y se actualiza el carrito

async function mostrarProductos() {
    try {
        const response = await fetch('https://fakestoreapi.com/products');
        const productos = await response.json();

        const contenedor = document.getElementById('productos-contenedor');

        productos.forEach(p => {
            const caja = document.createElement('div');
            caja.classList.add('item');

            caja.innerHTML = `
                <img src="${p.image}" alt="${p.title}">
                <h4>${p.title}</h4>
                <p>$${p.price}</p>
                <button class="btn-carrito">Agregar al carrito</button>
            `;

            caja.querySelector(".btn-carrito").addEventListener("click", () => {
                carrito.push({ title: p.title, price: p.price });
                actualizarCarrito();
            });

            contenedor.appendChild(caja);
        });

    } catch (error) {
        console.error(error);
    }
}

// se muestran los productos y el carrito guardado.
mostrarProductos();
actualizarCarrito();


// botón de mostrar u ocultar apretando en el botón del carrito (propiedad del .toggle.)
// si apretas en cerrar lo oculta.

const carritoPopup = document.getElementById('carrito-popup');
const shopIcon = document.getElementById('shop-icon');

shopIcon.addEventListener('click', () => {
    carritoPopup.classList.toggle('hidden');
});

document.getElementById('cerrar-carrito').addEventListener('click', () => {
    carritoPopup.classList.add('hidden');
});

// boton de pagar, del carrito

document.getElementById('pagar-carrito').addEventListener('click', () => {
    if (carrito.length === 0) {
        alert("El carrito está vacío");
        return;
    } // el carrito se vacia al apretar en pagar porque intento simular/omitir la parte en la que pedis la información bancaria
    // entonces cuando haces la compra el carrito se vacia.
    carrito = [];
    actualizarCarrito();
});
