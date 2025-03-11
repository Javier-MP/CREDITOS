const API_URL = "http://127.0.0.1:5000/creditos";


async function cargarCreditos() {
    const response = await fetch(API_URL);
    const creditos = await response.json();

    let tabla = document.getElementById("tabla-creditos");
    tabla.innerHTML = ""; 

    creditos.forEach((credito, index) => {
        let fila = `<tr>
            <td>${index + 1}</td>
            <td>${credito.cliente}</td>
            <td>${credito.monto}</td>
            <td>${credito.tasa_interes || "N/A"}</td>
            <td>${credito.plazo || "N/A"}</td>
        </tr>`;
        tabla.innerHTML += fila;
    });
}


document.getElementById("formulario").addEventListener("submit", async (event) => {
    event.preventDefault();

    let cliente = document.getElementById("cliente").value;
    let monto = document.getElementById("monto").value;
    let tasa_interes = document.getElementById("tasa_interes").value;
    let plazo = document.getElementById("plazo").value;

    let nuevoCredito = {
        cliente,
        monto,
        tasa_interes,
        plazo
    };

    const response = await fetch(API_URL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(nuevoCredito)
    });

    if (response.ok) {
        alert("Crédito registrado con éxito!");
        cargarCreditos(); 
    } else {
        alert("Error al registrar crédito.");
    }

    document.getElementById("formulario").reset();
});


window.onload = cargarCreditos;
