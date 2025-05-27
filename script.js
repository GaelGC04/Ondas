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
        'fondo' //TODO
    ]
    const contenedor = document.getElementById('contenedorOndas');
    const velocidad_x = 0.3;
    const velocidad_y = 0.5;
    const nFilas = 15;
    const nColumnas = 27;
    const ondasMouse = false;
        const formaOnda = opcionesOnda[0];
        const angulo = 135;
        const velocidadOnda = 5;
    const ondaEncoge = true;
    const ondaAncho = 250;
    const fuerzaOnda = 0.1;
    const friccionParticulas = 0.99;
    const colorFondo = '5,0,12';
    const tamanioParticulas = 0.5;
    const tamanioMaximoParticulas = 20;
    const colores = ['#000000'];
    const fondoImg = 'https://cdn.pixabay.com/photo/2023/04/13/17/08/forest-7922999_1280.jpg';

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
        velocidadOnda,
        colores,
        fondoImg
    );
});