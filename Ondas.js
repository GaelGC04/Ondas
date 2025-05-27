import Particula from './Particula.js';

class Ondas {
    constructor(contenedor, velocidad_x, velocidad_y, nFilas, nColumnas, ondasMouse, ondaEncoge, ondaAncho, angulo, fuerzaOnda, friccionParticulas, colorFondo, tamanioParticulas, tamanioMaximoParticulas, formaOnda, velocidad_xOnda, velocidad_yOnda, colores) {
        this.contenedor = contenedor;
        this.contexto = contenedor.getContext('2d'); // Se da que hay un contexto de graficos 2D
        
        this.particulas = []; // Arreglo donde se guardan las particulas
        this.mouse = { x: null, y: null };
        
        this.velocidad_x = velocidad_x; // Velocidad de las particulas en eje x
        this.velocidad_y = velocidad_y; // Velocidad de las particulas en eje y
        this.nFilas = nFilas; // Cantidad de particulas en filas
        this.nColumnas = nColumnas; // Cantidad de particulas en columnas
        this.ondasMouse = ondasMouse; // Se toma en cuenta el mouse, en caso de ser falso las ondas son automáticas
        this.ondaEncoge = ondaEncoge; // Se encogen las particulas al pasar la onda
        this.ondaAncho = ondaAncho; // Anchura de mouse
        this.angulo = angulo; // Ángulo de la línea
        this.fuerzaOnda = fuerzaOnda; // Fuerza del mouse y velocidad con que crecen las particulas
        this.friccionParticulas = friccionParticulas; // Fricción de las partículas
        this.colorFondo = colorFondo; // Color del fondo del canvas
        this.tamanioParticulas = tamanioParticulas; // Tamaño de las partículas
        this.tamanioMaximoParticulas = tamanioMaximoParticulas; // Tamaño máximo de las partículas
        this.formaOnda = formaOnda; // Forma de la onda que se genera al pasar el mouse
        this.colores = colores; // Colores de las partículas

        this.velocidad_xOnda = velocidad_xOnda; // Velocidad de la onda en eje x
        this.velocidad_yOnda = velocidad_yOnda; // Velocidad de la onda en eje y

        this.mousePresionado = false; // Sirve para indicar cuando el mouse está presionado siendo que no ocurren errores al sacarlo de la ventana o al moverlo

        this.posOndaX; // Posición de la onda en eje x
        this.posOndaY; // Posición de la onda en eje y

        this.setup();
        this.animar();
    }

    setup() {
        this.redimensionar();
        window.addEventListener('resize', this.redimensionar.bind(this));
        
        if (this.velocidad_xOnda < 0) {
            this.posOndaX = this.contenedor.width + this.contenedor.offsetLeft;
        } else {
            this.posOndaX = this.contenedor.offsetLeft;
        }

        if (this.velocidad_yOnda < 0) {
            this.posOndaY = this.contenedor.height + this.contenedor.offsetTop;
        } else {
            this.posOndaY = this.contenedor.offsetTop;
        }

        window.addEventListener('mousemove', (e) => {
            if (this.mousePresionado == false) {
                this.mouse.x = e.clientX;
                this.mouse.y = e.clientY;
            }
        });
        
        window.addEventListener('mouseout', () => {
            this.mouse.x = null;
            this.mouse.y = null;
            this.mousePresionado = false;
        });

        window.addEventListener('mousedown', async (e) => {
            this.mouse.x = null;
            this.mouse.y = null;
            this.mousePresionado = true;
        });

        window.addEventListener('mouseup', async (e) => {
            this.mouse.x = e.clientX;
            this.mouse.y = e.clientY;
            this.mousePresionado = false;
        });

        this.generarParticulas();
    }

    generarParticulas() {
        this.particulas = []; // Se reinicia el arreglo de particulas
        const contenedorSeccionX = this.contenedor.width / this.nColumnas;
        const contenedorSeccionY = this.contenedor.height / this.nFilas;

        // Se añaden 2 filas arriba y abajo
        for (let iteradorFilas = -2; iteradorFilas < this.nFilas + 2; iteradorFilas++) {
            const nuevo_y = contenedorSeccionY * (iteradorFilas + 0.5);
            
            // Se añaden 2 columnas a izquierda y derecha
            for (let iteradorColumnas = -2; iteradorColumnas < this.nColumnas + 2; iteradorColumnas++) {
                const nuevo_x = contenedorSeccionX * (iteradorColumnas + 0.5);
                this.crearParticula(
                    nuevo_x, nuevo_y,
                    contenedorSeccionX, contenedorSeccionY
                );
            }
        }
    }

    redimensionar() {
        this.contenedor.width = window.innerWidth;
        this.contenedor.height = window.innerHeight;
        this.generarParticulas();
    }

    crearParticula(particula_x, particula_y, gridWidth, gridHeight) {
        const velocidad = {
            x: this.velocidad_x,
            y: this.velocidad_y
        };
        
        this.particulas.push(new Particula(
            particula_x,
            particula_y,
            this.tamanioParticulas,
            this.tamanioMaximoParticulas,
            this.colores[Math.floor(Math.random() * this.colores.length)],
            velocidad,
            this.friccionParticulas,
            this.fuerzaOnda,
            gridWidth,
            gridHeight,
            this.formaOnda
        ));
    }

    animar() {
        requestAnimationFrame(this.animar.bind(this));
        if (this.ondasMouse == false) {
            this.velocidad_xOnda += this.velocidad_x;
            this.velocidad_yOnda += this.velocidad_y;
        }
        this.contexto.fillStyle = `rgba(${this.colorFondo})`;
        this.contexto.fillRect(0, 0, this.contenedor.width, this.contenedor.height);
        // Actualizar y dibujar partículas
        for (let iteradorParticulas = 0; iteradorParticulas < this.particulas.length; iteradorParticulas++) {
            // Se actualizan las partículas del arreglo
            this.particulas[iteradorParticulas].actualizar(
                this.contexto,
                this.mouse,
                this.ondaAncho,
                this.ondasMouse,
                this.tamanioParticulas,
                this.angulo,
                this.posOndaX,
                this.posOndaY
            );
        }
    }
}

export default Ondas;