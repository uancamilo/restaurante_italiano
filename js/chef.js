document.addEventListener("DOMContentLoaded", function () {
    obtenerPedidos()
})

function obtenerPedidos() {
    fetch("http://localhost:3005/chef")
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                cargarPedidos(data.data.porPreparar, "tablaPorPreparar", "preparar")
                cargarPedidos(data.data.preparando, "tablaPreparando", "entregar")
            }
        })
        .catch(error => console.error("Error obteniendo pedidos:", error))
}


function cargarPedidos(pedidos, tablaId, nuevoEstado) {
    const tabla = document.getElementById(tablaId)
    tabla.innerHTML = ""

    pedidos.forEach(pedido => {
        let fila = document.createElement("tr")
        fila.innerHTML = `
            <td>${pedido.platillo}</td>
            <td>${pedido.mesa}</td>
            <td>
                <button class="btn btn-warning" onclick="actualizarEstado(${pedido.id}, '${nuevoEstado}')">
                    Pasar a ${nuevoEstado}
                </button>
            </td>
        `
        tabla.appendChild(fila)
    })
}

function actualizarEstado(id, estado) {
    let endpoint = estado === "preparar" ? "preparando" : "listo"
    fetch(`http://localhost:3005/${endpoint}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id })
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            alert(`Pedido actualizado a ${estado}`)
            obtenerPedidos()
        } else {
            alert("Error al actualizar pedido")
        }
    })
    .catch(error => console.error("Error actualizando pedido:", error))
}