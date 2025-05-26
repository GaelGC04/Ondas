import Ondas from './Ondas.js';

document.addEventListener('DOMContentLoaded', () => {
    const opcionesMouse = [
        ''
    ]
    const opcionesOndaDireccion = [
        'x',
        'y',
        'r' // Rotar
    ];
    const contenedor = document.getElementById('contenedorOndas');
    const velocidad_x = 0.3;
    const velocidad_y = 0.5;
    const nFilas = 20;
    const nColumnas = 36;
    const ondasMouse = true;
        const direccionOnda = opcionesOndaDireccion[0];
        const velocidadOnda = 0.5;
    const ondaEncoge = true;
    const hoverLinea = false;
    const ondaAncho = 300;
    const angulo = 90;
    const fuerzaOnda = 0.1;
    const friccionParticulas = 0.99;
    const colorFondo = '5,0,12';
    const tamanioParticulas = 1;
    const tamanioMaximoParticulas = 30;
    const colores = ['#FFFFFF'];

    new Ondas(
        contenedor,
        velocidad_x,
        velocidad_y,
        nFilas,
        nColumnas,
        ondasMouse,
        ondaEncoge,
        hoverLinea,
        ondaAncho,
        angulo,
        fuerzaOnda,
        friccionParticulas,
        colorFondo,
        tamanioParticulas,
        tamanioMaximoParticulas,
        direccionOnda,
        velocidadOnda,
        colores
    );
});