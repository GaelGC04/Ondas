import Ondas from './Ondas.js';

document.addEventListener('DOMContentLoaded', () => {
    const opcionesOnda = [
        'circulo',
        'rombo',
        'linea-angulo',
        'cruz',
        'cuadrado',
        'elipse-x',
        'elipse-y',
    ]
    const contenedor = document.getElementById('contenedorOndas');
    const velocidad_x = 0.3;
    const velocidad_y = 0.5;
    const nFilas = 20;
    const nColumnas = 36;
    const ondasMouse = true;
        const formaOnda = opcionesOnda[1];
        const angulo = 45;
        const velocidad_xOnda = 0.0;
        const velocidad_yOnda = 0.0;
    const ondaEncoge = true;
    const ondaAncho = 300;
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
        ondaAncho,
        angulo,
        fuerzaOnda,
        friccionParticulas,
        colorFondo,
        tamanioParticulas,
        tamanioMaximoParticulas,
        formaOnda,
        velocidad_xOnda,
        velocidad_yOnda,
        colores
    );
});