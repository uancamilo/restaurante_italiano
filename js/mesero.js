document.addEventListener("DOMContentLoaded", () => {
    const tablaPorEntregar = document.querySelector("#Pizza tbody");
    const tablaEntregado = document.querySelector("#Pasta tbody");

    cargarPedidos();

    async function cargarPedidos() {
        console.log("Cargando pedidos...");
        try {
            const response = await fetch("http://localhost:3005/mesero");
            const result = await response.json();

            console.log("Pedidos recibidos:", result);

            if (!result.success) {
                throw new Error("Error al obtener pedidos");
            }

            tablaPorEntregar.innerHTML = "";
            tablaEntregado.innerHTML = "";

            const pedidosPorEntregar = result.data.porEntregar || [];
            const pedidosEntregados = result.data.entregado || [];

            pedidosPorEntregar.forEach(pedido => {
                const fila = document.createElement("tr");
                fila.innerHTML = `
                    <td>${pedido.platillo}</td>
                    <td>${pedido.mesa}</td>
                    <td>${pedido.cliente}</td>
                    <td>
                        <button class="entregar" data-id="${pedido.id}">Entregar</button>
                    </td>
                `;
                tablaPorEntregar.appendChild(fila);
            });

            pedidosEntregados.forEach(pedido => {
                const fila = document.createElement("tr");
                fila.innerHTML = `
                    <td>${pedido.platillo}</td>
                    <td>${pedido.mesa}</td>
                    <td>${pedido.cliente}</td>
                    <td>Entregado</td>
                `;
                tablaEntregado.appendChild(fila);
            });
    
        } catch (error) {
            console.error("Error cargando pedidos:", error);
        }
    }

    document.addEventListener("click", async (event) => {
        if (event.target.classList.contains("entregar")) {
            const idPedido = event.target.getAttribute("data-id");
            try {
                await fetch("http://localhost:3005/entregado", {
                    method: "PUT",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ id: idPedido })
                });
                cargarPedidos(); 
            } catch (error) {
                console.error("Error actualizando pedido", error);
            }
        }
    });
});