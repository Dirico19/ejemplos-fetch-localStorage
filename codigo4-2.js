const enlaceCarrito = document.querySelector(".enlace-carrito");
const contenido = document.querySelector(".contenido");
const subtotal = document.querySelector(".subtotal");
const descuento = document.querySelector(".descuento");
const total = document.querySelector(".total");

const obtenerProductosLS = ()=>{
    let productosLS;
    if (localStorage.getItem("productos") === null)
        productosLS = [];
    else
        productosLS = JSON.parse(localStorage.getItem("productos"));
    return productosLS;
}

const eliminarProductoLS = (index)=>{
    let productosLS = obtenerProductosLS();
    for (let i = 0; i < productosLS.length; i++) {
        if (productosLS[i].id == index){
            productosLS.splice(i,1);
            localStorage.setItem("productos", JSON.stringify(productosLS));
        }
    }
}

const MostrarContenido = ()=>{
    contenido.innerHTML = "";
    let productosLS = obtenerProductosLS();
    for (let i = 0; i < productosLS.length; i++) {
        let tr = `
            <tr>
                <th class="imagen" scope="row"><img src=${productosLS[i].imagen} alt=""></th>
                <td class="nombre">${productosLS[i].nombre}</td>
                <td class="precio">S/ ${productosLS[i].precio}</td>
                <td class="cantidad"><input type="number" name="cantidad" id="" min="1" value="1"></td>
                <td class="total-producto">S/ ${productosLS[i].precio}</td>
                <td class="eliminar"><a href="#" class="rounded-circle text-decoration-none bg-primary text-white px-2 pb-1">x</a></td>
                <td class="d-none">${productosLS[i].id}</td>
            </tr>
        `
        contenido.innerHTML += tr;
    }
}

const eliminarProducto = e =>{
    if (e.target.parentElement.className === "eliminar"){
        let index = e.target.parentElement.nextElementSibling.textContent;
        e.target.parentElement.parentElement.remove();
        eliminarProductoLS(index);
    }
}

const calcularTotalProducto = e =>{
    if (e.target.name === "cantidad"){
        let precio = e.target.parentElement.previousElementSibling.textContent.substring(3);
        let cantidad = e.target.value;
        let subtotal = precio * cantidad;
        e.target.parentElement.nextElementSibling.textContent = `S/ ${subtotal.toFixed(2)}`;
    }
}

const calcularSubtotal = ()=>{
    const totalProducto = document.querySelectorAll(".total-producto");
    let suma = 0;
    for (let i = 0; i < totalProducto.length; i++) {
        suma += parseFloat(totalProducto[i].textContent.substring(3));
    }
    subtotal.textContent = `S/ ${suma.toFixed(2)}`;
}

const calcularDescuento = ()=>{
    let SubtotalFinal = parseFloat(subtotal.textContent.substring(3));
    if (parseFloat(SubtotalFinal) >= 100)
        descuento.textContent = `S/ ${(0.1 * SubtotalFinal).toFixed(2)}`;
}

const calcularTotal = ()=>{
    let SubtotalFinal = parseFloat(subtotal.textContent.substring(3));
    let descuentoFinal = parseFloat(descuento.textContent.substring(3));
    total.textContent = `S/ ${(SubtotalFinal - descuentoFinal).toFixed(2)}`;
}

const CarritoVacio = ()=>{
    if (obtenerProductosLS().length === 0){
        document.querySelector(".alerta").innerHTML = `
            <div class="modal fade" tabindex="-1" id="modal-inicio">
                <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header alert-danger">
                    <h5 class="modal-title">Atención</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                    <p>El carrito de compras está vacío, vuelve al inicio para agregar los productos deseados</p>
                    </div>
                    <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                    </div>
                </div>
                </div>
            </div>
        `;
        let modalInicio = new bootstrap.Modal(document.getElementById("modal-inicio"));
        modalInicio.show();
    }
}

addEventListener("load", ()=> {
    enlaceCarrito.innerHTML = `Carrito (${obtenerProductosLS().length})`;
    MostrarContenido();
    calcularSubtotal();
    calcularDescuento();
    calcularTotal();
    CarritoVacio();
});

contenido.addEventListener("click", (e)=>{
    eliminarProducto(e);
    enlaceCarrito.innerHTML = `Carrito (${obtenerProductosLS().length})`
    calcularTotalProducto(e);
    calcularSubtotal();
    calcularDescuento();
    calcularTotal();
    CarritoVacio();
});