import Ondas from './Ondas.js';

document.addEventListener('DOMContentLoaded', () => {
    const opcionesMouse = [
        ''
    ]
    const contenedor = document.getElementById('contenedorOndas');
    const velocidad_x = 0.3;
    const velocidad_y = 0.5;
    const nFilas = 20;
    const nColumnas = 36;
    const ondasMouse = true;
    const ondaEncoge = true;
    const hoverLinea = false;
    const ondaAncho = 300;
    const angulo = 90;
    const rotacionAutomatica = false;
    const fuerzaOnda = 0.1;
    const friccionParticulas = 0.995;
    const colorFondo = '5,0,12';
    const tamanioParticulas = 0;
    const tamanioMaximoParticulas = 30;
    const diferenciaTamanioParticulas = 50;
    const colores = ['#FFFFFF'];

    // TODO Añadir poner opcion de que se puedan mover ondas una y otra vez en x direccion automaticamente
    
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
        rotacionAutomatica,
        fuerzaOnda,
        friccionParticulas,
        colorFondo,
        tamanioParticulas,
        tamanioMaximoParticulas,
        diferenciaTamanioParticulas,
        colores
    );
});