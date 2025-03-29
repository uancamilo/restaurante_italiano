document
	.getElementById("formLogin")
	.addEventListener("submit", async function (event) {
		event.preventDefault();
		const form = event.target;

		const user = document.getElementById("user").value;
		const password = document.getElementById("password").value;

		const credentials = {
			user: user,
			password: password,
		};

		try {
			const response = await fetch("http://localhost:3005/login", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(credentials),
			});

			const data = await response.json();

			if (response.ok) {
				alert("Inicio de sesión exitoso");
				form.reset();
			} else {
				alert(data.message || "Error en el inicio de sesión");
			}
		} catch (error) {
			console.error("Error en la solicitud:", error);
		}
	});
