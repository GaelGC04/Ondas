import Particula from './Particula.js';

class Ondas {
    constructor(contenedor, velocidad_x, velocidad_y, nFilas, nColumnas, ondasMouse, ondaAncho, angulo, fuerzaOnda, friccionParticulas, colorFondo, tamanioParticulas, tamanioMaximoParticulas, formaOnda, velocidadOnda, colores, fondoImg, particulasImg, formaParticula) {
        this.contenedor = contenedor;
        this.contexto = contenedor.getContext('2d'); // Se da que hay un contexto de graficos 2D
        
        this.particulas = []; // Arreglo donde se guardan las particulas
        this.mouse = { x: null, y: null };
        
        this.velocidad_x = velocidad_x; // Velocidad de las particulas en eje x
        this.velocidad_y = velocidad_y; // Velocidad de las particulas en eje y
        this.nFilas = nFilas; // Cantidad de particulas en filas
        this.nColumnas = nColumnas; // Cantidad de particulas en columnas
        this.ondasMouse = ondasMouse; // Se toma en cuenta el mouse, en caso de ser falso las ondas son automáticas
        this.ondaAncho = ondaAncho; // Anchura de mouse
        this.angulo = (angulo >= 0 && angulo <= 180) ? angulo : 0; // Ángulo de la línea
        this.fuerzaOnda = fuerzaOnda; // Fuerza del mouse y velocidad con que crecen las particulas
        this.friccionParticulas = friccionParticulas; // Fricción de las partículas
        this.colorFondo = colorFondo; // Color del fondo del canvas
        this.tamanioParticulas = tamanioParticulas; // Tamaño de las partículas
        this.tamanioMaximoParticulas = tamanioMaximoParticulas; // Tamaño máximo de las partículas
        this.formaOnda = formaOnda; // Forma de la onda que se genera al pasar el mouse
        this.colores = colores; // Colores de las partículas

        this.velocidadOnda = velocidadOnda; // Velocidad de la onda
        this.velocidadOndaX; // Velocidad de la onda en x
        this.velocidadOndaY; // Velocidad de la onda en y

        this.mousePresionado = false; // Sirve para indicar cuando el mouse está presionado siendo que no ocurren errores al sacarlo de la ventana o al moverlo

        this.posOndaX; // Posición de la onda en eje x
        this.posOndaY; // Posición de la onda en eje y

        this.fondoImg = null; // Imagen de fondo del canvas
        if (fondoImg) {
            this.fondoImg = new Image();
            this.fondoImg.crossOrigin = "Anonymous";
            this.fondoImg.onerror = () => {
                this.fondoImg = '';
            };
            this.fondoImg.src = fondoImg;
        }

        this.particulasImg = particulasImg; // Imagen de las partículas
        this.formaParticula = formaParticula; // Forma de las partículas

        this.setup();
        this.animar();
    }

    setup() {
        this.redimensionar();
        window.addEventListener('resize', this.redimensionar.bind(this));

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
        
        if ((this.angulo < 45 && this.angulo >= 0) || (this.angulo > 135 && this.angulo <= 180)) {
            this.velocidadOndaY = this.velocidadOnda;
            this.velocidadOndaX = 0;
        } else {
            this.velocidadOndaX = this.velocidadOnda;
            this.velocidadOndaY = 0;
        }

        const margen = 1.5 * this.ondaAncho;
        const limiteIzquierdo = this.contenedor.offsetLeft - margen;
        const limiteDerecho = this.contenedor.offsetLeft + this.contenedor.width + margen;
        const limiteSuperior = this.contenedor.offsetTop - margen;
        const limiteInferior = this.contenedor.offsetTop + this.contenedor.height + margen;

        if (this.angulo >= 0 && this.angulo < 45) {
            if (this.velocidadOnda < 0) {
                this.posOndaX = this.velocidadOndaX < 0 ? limiteIzquierdo : limiteDerecho;
                this.posOndaY = this.velocidadOndaY < 0 ? limiteInferior : limiteSuperior;
            } else {
                this.posOndaX = this.velocidadOndaX < 0 ? limiteDerecho : limiteIzquierdo;
                this.posOndaY = this.velocidadOndaY < 0 ? limiteInferior : limiteSuperior;
            }
        } else if (this.angulo >= 45 && this.angulo <= 90) {
            if (this.velocidadOnda < 0) {
                this.posOndaX = this.velocidadOndaX < 0 ? limiteDerecho : limiteIzquierdo;
                this.posOndaY = this.velocidadOndaY < 0 ? limiteSuperior : limiteInferior;
            } else {
                this.posOndaX = this.velocidadOndaX < 0 ? limiteDerecho : limiteIzquierdo;
                this.posOndaY = this.velocidadOndaY < 0 ? limiteInferior : limiteSuperior;
            }
        } else if (this.angulo > 90 && this.angulo <= 135) {
            if (this.velocidadOnda < 0) {
                this.posOndaX = this.velocidadOndaX < 0 ? limiteDerecho : limiteIzquierdo;
                this.posOndaY = this.velocidadOndaY < 0 ? limiteInferior : limiteSuperior;
            } else {
                this.posOndaX = this.velocidadOndaX < 0 ? limiteDerecho : limiteIzquierdo;
                this.posOndaY = this.velocidadOndaY < 0 ? limiteSuperior : limiteInferior;
            }
        } else if (this.angulo > 135 && this.angulo <= 180) {
            if (this.velocidadOnda < 0) {
                this.posOndaX = this.velocidadOndaX < 0 ? limiteDerecho : limiteIzquierdo;
                this.posOndaY = this.velocidadOndaY < 0 ? limiteInferior : limiteSuperior;
            } else {
                this.posOndaX = this.velocidadOndaX < 0 ? limiteIzquierdo : limiteDerecho;
                this.posOndaY = this.velocidadOndaY < 0 ? limiteInferior : limiteSuperior;
            }
        }

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
            this.formaOnda,
            this.particulasImg,
            this.formaParticula
        ));
    }

    animar() {
        requestAnimationFrame(this.animar.bind(this));
        
        if (this.ondasMouse == false) {
            this.posOndaX += this.velocidadOndaX;
            this.posOndaY += this.velocidadOndaY;

            const margen = 1.5 * this.ondaAncho;
            const limiteIzquierdo = this.contenedor.offsetLeft - margen;
            const limiteDerecho = this.contenedor.offsetLeft + this.contenedor.width + margen;
            const limiteSuperior = this.contenedor.offsetTop - margen;
            const limiteInferior = this.contenedor.offsetTop + this.contenedor.height + margen;

            // Se ajusta la posición de X y Y de la onda a partir del ángulo y velocidad
            if ((this.angulo < 45 && this.angulo >= 0) || (this.angulo > 135 && this.angulo <= 180)) {
                if (this.posOndaX < limiteIzquierdo - this.contenedor.width || this.posOndaX > limiteDerecho + this.contenedor.width) {
                    this.posOndaX = this.velocidadOndaX < 0 ? limiteDerecho : limiteIzquierdo;
                }

                if (this.posOndaY < limiteSuperior - this.contenedor.height || this.posOndaY > limiteInferior + this.contenedor.height) {
                    this.posOndaY = this.velocidadOndaY < 0 ? limiteInferior : limiteSuperior;
                }
            } else {
                if (this.posOndaX < limiteIzquierdo - this.contenedor.width || this.posOndaX > limiteDerecho + this.contenedor.width) {
                    this.posOndaX = this.velocidadOndaX < 0 ? limiteDerecho : limiteIzquierdo;
                }

                if (this.posOndaY < limiteSuperior - this.contenedor.height || this.posOndaY > limiteInferior + this.contenedor.height) {
                    this.posOndaY = this.velocidadOndaY < 0 ? limiteSuperior : limiteInferior;
                }
            }
        }

        if (this.fondoImg != '' && this.fondoImg.complete) {
            const aspectoImg = this.fondoImg.width / this.fondoImg.height;
            const aspectoCanvas = this.contenedor.width / this.contenedor.height;
            let drawWidth, drawHeight, offsetX, offsetY;

            if (aspectoImg > aspectoCanvas) {
                // Por si la imagen es más ancha que el canvas
                drawHeight = this.contenedor.height;
                drawWidth = drawHeight * aspectoImg;
                offsetX = (this.contenedor.width - drawWidth) / 2;
                offsetY = 0;
            } else {
                // Por si la imagen es más alta que el canvas
                drawWidth = this.contenedor.width;
                drawHeight = drawWidth / aspectoImg;
                offsetX = 0;
                offsetY = (this.contenedor.height - drawHeight) / 2;
            }

            this.contexto.drawImage(
                this.fondoImg,
                offsetX,
                offsetY,
                drawWidth,
                drawHeight
            );

        } else {
            this.contexto.fillStyle = `rgba(${this.colorFondo})`;
            this.contexto.fillRect(0, 0, this.contenedor.width, this.contenedor.height);
        }
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
                this.posOndaY,
            );
        }
    }
}

export default Ondas;