document.querySelector('.btn-pedido').addEventListener('click', function() {
    const platillo = document.querySelector('.platillo').value;
    const cliente = document.querySelector('.cliente').value;
    const cantidad = document.querySelector('.cantidad').value;
    const fecha = document.querySelector('.fecha').value;
    const observaciones = document.querySelector('.observaciones').value;

    const pedidoData = {
        platillo: platillo,
        cliente: cliente,
        cantidad: cantidad,
        fecha: fecha,
        observaciones: observaciones
    };

    fetch('http://localhost:3005/pedido', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(pedidoData)
    })
    .then(response => response.json())
    .then(() => {
        alert('Pedido realizado con éxito');
    })
    .catch(() => {
        alert('Hubo un error al realizar el pedido');
    });
});
