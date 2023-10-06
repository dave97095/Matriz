// JavaScript para la interacción con la matriz
const matrizElement = document.getElementById('matriz');
const botonSeleccionarAleatorio = document.getElementById('seleccionarAleatorio');
const botonCaracter = document.getElementById('caracter');
const botonColorear = document.getElementById('colorear');
const matriz = [];
const filas = 10;
const columnas = 5;
const maxDeshabilitadas = 5; // Límite de casillas deshabilitadas
let deshabilitadas = 0; // Contador de casillas deshabilitadas
let seleccionadas = 0; // Contador de casillas seleccionadas aleatoriamente
let caracterSeleccionado = false;
let colorearSeleccionado = false;

// Función para generar la matriz y agregar eventos a las casillas
function generarMatriz() {
    const table = document.createElement('table'); // Crea una tabla nueva
    for (let i = 0; i < filas; i++) {
        const fila = document.createElement('tr');
        matriz.push([]);
        for (let j = 0; j < columnas; j++) {
            const casilla = document.createElement('td');
            casilla.addEventListener('click', () => agregarChulo(casilla));
            fila.appendChild(casilla);
            matriz[i][j] = casilla;
        }
        table.appendChild(fila);
    }
    matrizElement.appendChild(table); // Agrega la tabla a la matriz
}

// Función para agregar un símbolo de "chulo" o caracter/colorear según la selección
function agregarChulo(casilla) {
    if (caracterSeleccionado && seleccionadas < maxDeshabilitadas) {
        casilla.textContent = '✔️'; // Simbolo
        casilla.classList.add('clicked');
        casilla.classList.remove('hoverable');
        casilla.removeEventListener('click', () => agregarChulo(casilla)); // Evita más clics en la casilla
        seleccionadas++;
    } else if (colorearSeleccionado && seleccionadas < maxDeshabilitadas) {
        casilla.style.backgroundColor = 'yellow'; // Color personalizado
        casilla.classList.add('clicked');
        casilla.removeEventListener('click', () => agregarChulo(casilla)); // Evitar más clics en la casilla
        seleccionadas++;
    } else if (!casilla.classList.contains('disabled') && casilla.textContent === '' && seleccionadas < maxDeshabilitadas) {
        casilla.textContent = '✔️'; // Símbolo de "chulo"
        casilla.classList.add('clicked');
        casilla.classList.remove('hoverable');
        casilla.removeEventListener('click', () => agregarChulo(casilla)); // Evita más clics en la casilla
        seleccionadas++;
    }
}

// Función para seleccionar aleatoriamente una casilla no deshabilitada
function seleccionarAleatorio() {
    if (seleccionadas < maxDeshabilitadas) {
        const casillasDisponibles = matriz.flat().filter(casilla => !casilla.classList.contains('disabled') && casilla.textContent === '');
        if (casillasDisponibles.length > 0) {
            const casillaAleatoria = casillasDisponibles[Math.floor(Math.random() * casillasDisponibles.length)];
            agregarChulo(casillaAleatoria);
        }
    }
}

// Event listener para el botón "Caracter"
botonCaracter.addEventListener('click', () => {
    if (seleccionadas < maxDeshabilitadas) {
        caracterSeleccionado = true;
        colorearSeleccionado = false;
    }
});

// Event listener para el botón "Colorear"
botonColorear.addEventListener('click', () => {
    if (seleccionadas < maxDeshabilitadas) {
        caracterSeleccionado = false;
        colorearSeleccionado = true;
    }
});

generarMatriz();
botonSeleccionarAleatorio.addEventListener('click', seleccionarAleatorio);
