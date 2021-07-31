const enlaceCarrito = document.querySelector(".enlace-carrito");

const imagenes = document.querySelectorAll(".producto img");
const nombres = document.querySelectorAll(".producto h5");
const precios = document.querySelectorAll(".producto h4");

const botonAñadir = document.querySelectorAll(".producto a");

const añadirAlCarrito = (e)=>{
    e.preventDefault();
    let index;
    for (let i = 0; i < botonAñadir.length; i++) {
        if (botonAñadir[i] == e.target) index = i;
    }
    const producto = {
        id: index,
        imagen: imagenes[index].src,
        nombre: nombres[index].innerHTML,
        precio: precios[index].innerHTML.substring(3)
    }
    
    let productosLS = obtenerProductosLS();

    for (let i = 0; i < productosLS.length; i++) {
        if (productosLS[i].id === index) {
            alertaModal("Error","El producto ya está agregado en el carrito");
            return;
        }
    }
    
    productosLS.push(producto);
    localStorage.setItem("productos", JSON.stringify(productosLS));
    alertaModal("Aviso","El producto ha sido agregado al carrito correctamente");
    enlaceCarrito.innerHTML = `Carrito (${productosLS.length})`;

};

const obtenerProductosLS = ()=>{
    let productosLS;
    if (localStorage.getItem("productos") === null)
        productosLS = [];
    else
        productosLS = JSON.parse(localStorage.getItem("productos"));
    return productosLS;
}

const alertaModal = (titulo = "aviso",mensaje)=>{
    let fondo;
    if (titulo.toLowerCase() === "aviso")
        fondo = "alert-success";
    if (titulo.toLowerCase() === "error")
        fondo = "alert-danger";
    document.querySelector(".alerta").innerHTML = `
        <div class="modal fade" tabindex="-1" id="aviso-modal">
            <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header ${fondo}">
                <h5 class="modal-title">${titulo}</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                <p>${mensaje}</p>
                </div>
                <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
                </div>
            </div>
            </div>
        </div>
    `;
    let avisoModal = new bootstrap.Modal(document.getElementById("aviso-modal"));
    avisoModal.show();
}

addEventListener("load", ()=> enlaceCarrito.innerHTML = `Carrito (${obtenerProductosLS().length})`);

for (let i = 0; i < botonAñadir.length; i++) {
    botonAñadir[i].addEventListener("click", e=> añadirAlCarrito(e));
}