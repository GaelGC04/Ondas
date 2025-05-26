class Particula {
    // Se contruye la particula con estos parámetros
    constructor(x, y, tamanio, tamanioMaximo, color, velocidad, friccion, fuerzaOnda, gridWidth, gridHeight) {
        this.x = x;
        this.y = y;
        this.tamanio = tamanio;
        this.tamanioMaximo = tamanioMaximo;
        this.color = color;
        this.velocidad = velocidad;
        this.friccion = friccion;
        this.fuerzaOnda = fuerzaOnda;
        this.gridWidth = gridWidth;
        this.gridHeight = gridHeight;
    }

    dibujar(contexto) {
        contexto.save();
        contexto.globalAlpha = 1;
        contexto.fillStyle = this.color;
        contexto.beginPath();
        contexto.arc(this.x, this.y, this.tamanio, 0, Math.PI * 2);
        contexto.closePath();
        contexto.fill();
        contexto.restore();
    }

    actualizar(contexto, mouse, ondaAncho, ondasMouse, tamanioParticulas) {
        // Actualizar posición
        this.x += this.velocidad.x;
        this.y += this.velocidad.y;
        
        const canvasWidth = contexto.canvas.width;
        const canvasHeight = contexto.canvas.height;
        
        const limiteDerecho = canvasWidth + (2 * this.gridWidth);
        const limiteIzquierdo = - (2 * this.gridWidth);
        const limiteInferior = canvasHeight + (2 * this.gridHeight);
        const limiteSuperior = - (2 * this.gridHeight);

        // Se ajusta la posición en X
        if (this.velocidad.x > 0 && this.x > limiteDerecho) {
            this.x = limiteIzquierdo;
            this.tamanio = tamanioParticulas;
        } else if (this.velocidad.x < 0 && this.x < limiteIzquierdo) {
            this.x = limiteDerecho;
            this.tamanio = tamanioParticulas;
        }
        
        // Se ajusta la posición en Y
        if (this.velocidad.y > 0 && this.y > limiteInferior) {
            this.y = limiteSuperior;
            this.tamanio = tamanioParticulas;
        } else if (this.velocidad.y < 0 && this.y < limiteSuperior) {
            this.y = limiteInferior;
            this.tamanio = tamanioParticulas;
        }

        // Se controla la interacción con ondas
        if (ondasMouse) {
            if (mouse.x && mouse.y) {
                const dx = this.x - mouse.x;
                const dy = this.y - mouse.y;
                const distancia = Math.sqrt(dx * dx + dy * dy);

                if (this.tamanio > tamanioParticulas) {
                    this.tamanio *= this.friccion;
                    if (this.tamanio < tamanioParticulas) {
                        this.tamanio = tamanioParticulas;
                    }
                }

                if (ondaAncho > distancia) {
                    const normalizado = 1 - (distancia / ondaAncho); 
                    const tamanioFuerza = tamanioParticulas + (normalizado * this.tamanioMaximo);

                    if (this.tamanio < tamanioFuerza) {
                        this.tamanio += (tamanioFuerza - this.tamanio) * this.fuerzaOnda;
                    }
                    if (this.tamanio > this.tamanioMaximo) {
                        this.tamanio = this.tamanioMaximo;
                    }
                }
            } else {
                if (this.tamanio > tamanioParticulas) {
                    this.tamanio *= this.friccion;
                    if (this.tamanio < tamanioParticulas) {
                        this.tamanio = tamanioParticulas;
                    }
                }
            }
        }
        
        this.dibujar(contexto);
    }
}

export default Particula;