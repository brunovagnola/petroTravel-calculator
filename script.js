// 1. Seleccionamos los elementos del DOM y los guardamos en constantes
// Usamos getElementById para vincular el HTML con nuestro código JS
const formulario = document.getElementById('calc-form');
const inputKm = document.getElementById('km');
const inputLitros = document.getElementById('litros');
const listaCargas = document.getElementById('lista-cargas');
const divResultado = document.getElementById('resultado');

//Array con cargas que empujaremos a listaCargas al recorrer su array
let cargas = [];

formulario.addEventListener('submit', function(event){
    event.preventDefault();

    const km = parseFloat(inputKm.value);
    const litros = parseFloat(inputLitros.value);

    //Validamos ingreso de datos
    if (isNaN(km) || isNaN(litros) || litros <= 0) {
        alert("Ingresá valores válidos");
        return;
    }

    //Validamos que el km ingresado sea mayor que el anterior
    if (cargas.length > 0 && km <= cargas[cargas.length -1].km) {
        alert("El kilometraje debe ser mayor al anterior");
        return;
    }

    //Guardamos carga
    cargas.push({km, litros});

    mostrarCargas();
    calcularConsumo();

    formulario.reset(); 
});

//Funcion para mandar nuestra lista de cargas al html
function mostrarCargas() {
    listaCargas.innerHTML = "";

    cargas.forEach((carga, index) => {
        listaCargas.innerHTML += `
            <tr>
                <td>${index + 1}</td>
                <td>${carga.km} km</td>
                <td>${carga.litros} L</td>
            </tr>
        `;
    });
}

function calcularConsumo() {
    //Validamos que se pueda calcular
    if (cargas.length < 2) {
        divResultado.innerHTML = "<p>Agregá al menos 2 cargas</p>";
        return;
    }

    const kmInicial = cargas[0].km;
    const kmFinal = cargas[cargas.length -1].km

    const distancia = kmFinal - kmInicial;

    const litrosTotales = cargas.reduce((acc, carga) => acc + carga.litros, 0);

    const consumo = (litrosTotales / distancia) * 100;

    divResultado.innerHTML = `
        <div class="success-message">
            <p>Distancia total: <strong>${distancia} km</strong></p>
            <p>Litros totales: <strong>${litrosTotales} L</strong></p>
            <p>Consumo promedio: <strong>${consumo.toFixed(2)} L/100km</strong></p>
        </div>
    `;
}