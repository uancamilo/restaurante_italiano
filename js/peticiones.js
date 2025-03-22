document
	.getElementById("formRegistro")
	.addEventListener("submit", async function (event) {
		event.preventDefault();
		const user = document.getElementById("user").value;
		const name = document.getElementById("name").value;
		const rol = document.getElementById("rol").value;
		const password = document.getElementById("password").value;

		const usuario = {
			user: user,
			name: name,
			rol: rol,
			password: password,
		};

		try {
			console.log(JSON.stringify(usuario));
			const response = await fetch("http://localhost:3005/register", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(usuario),
			});

			if (response.ok) {
				const result = await response.json();
				alert("Usuario guardado con éxito: " + result.message);
			} else {
				alert("Error al guardar usuario");
			}
		} catch (error) {
			console.error("Error en la solicitud:", error);
		}
	});
