const boton = document.querySelector("button");
const tabla = document.querySelector(".tabla");

boton.addEventListener("click", ()=>{
    try {
        const table = document.querySelector("table");
        tabla.removeChild(tabla.firstElementChild);
        boton.innerHTML = "Mostrar";
    } catch (error) {
        fetch("info.json")
            .then(res => res.json())
            .then(data => {
                let cuerpo = "";
                for (const datos of data) {
                    let fila = `
                        <tr>
                        <th scope="row">${datos.id}</th>
                        <td>${datos.nombre}</td>
                        <td>${datos.apellido}</td>
                        <td>${datos.edad}</td>
                        </tr>
                    `
                    cuerpo += fila;
                }
                tabla.innerHTML = `
                    <table class="table table-dark table-striped">
                        <thead>
                            <tr>
                            <th scope="col">ID</th>
                            <th scope="col">NOMBRE</th>
                            <th scope="col">APELLIDO</th>
                            <th scope="col">EDAD</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${cuerpo}
                        </tbody>
                    </table>
                `
            })
            .catch(error => alert("LA API FALLÓ"));
        boton.innerHTML = "Ocultar";
    }
});
