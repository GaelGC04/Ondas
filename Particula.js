class Particula {
    // Se contruye la particula con estos parámetros
    constructor(x, y, tamanio, tamanioMaximo, color, velocidad, friccion, fuerzaOnda, gridWidth, gridHeight, formaOnda, imagenParticula, formaParticula) {
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
        this.formaOnda = formaOnda;
        this.imagenParticula = imagenParticula;
        if (imagenParticula) {
            this.imagenParticula = new Image();
            this.imagenParticula.crossOrigin = "Anonymous";
            this.imagenParticula.onerror = () => {
                this.imagenParticula = '';
            };
            this.imagenParticula.src = imagenParticula;
        }
        this.formaParticula = formaParticula;
    }

    dibujar(contexto) {
        if (this.imagenParticula != '' && this.imagenParticula.complete) {
            contexto.save();
            contexto.globalAlpha = 1;
            const tamanioImagen = this.tamanio * 2;
            contexto.drawImage(
                this.imagenParticula,
                this.x - tamanioImagen/2,
                this.y - tamanioImagen/2,
                tamanioImagen,
                tamanioImagen
            );
            contexto.restore();
        } else {
            contexto.save();
            contexto.globalAlpha = 1;
            contexto.fillStyle = this.color;
            contexto.beginPath();
            // Se hacen las figuras de las partículas
            switch (this.formaParticula) {
                case 'circulo':
                    contexto.arc(this.x, this.y, this.tamanio, 0, Math.PI * 2);
                    break;
                case 'cuadrado':
                    contexto.rect(this.x - this.tamanio, this.y - this.tamanio, this.tamanio * 2, this.tamanio * 2);
                    break;
                case 'rombo':
                    contexto.moveTo(this.x, this.y - this.tamanio);
                    contexto.lineTo(this.x + this.tamanio, this.y);
                    contexto.lineTo(this.x, this.y + this.tamanio);
                    contexto.lineTo(this.x - this.tamanio, this.y);
                    break;
                case 'triangulo':
                    contexto.moveTo(this.x, this.y - this.tamanio);
                    contexto.lineTo(this.x + this.tamanio, this.y + this.tamanio);
                    contexto.lineTo(this.x - this.tamanio, this.y + this.tamanio);
                    break;
                case 'estrella':
                    const radioInterior = this.tamanio / 2;
                    contexto.moveTo(this.x, this.y - this.tamanio);
                    for (let iteradorLados = 0; iteradorLados < 5; iteradorLados++) {
                        contexto.lineTo(
                            this.x + this.tamanio * Math.cos((iteradorLados * 2 * Math.PI) / 5 - Math.PI / 2),
                            this.y + this.tamanio * Math.sin((iteradorLados * 2 * Math.PI) / 5 - Math.PI / 2)
                        );
                        contexto.lineTo(
                            this.x + radioInterior * Math.cos(((iteradorLados * 2 + 1) * Math.PI) / 5 - Math.PI / 2),
                            this.y + radioInterior * Math.sin(((iteradorLados * 2 + 1) * Math.PI) / 5 - Math.PI / 2)
                        );
                    }
                    break;
                case 'elipse-x':
                    contexto.ellipse(this.x, this.y, this.tamanio, this.tamanio * 0.6, 0, 0, Math.PI * 2);
                    break;
                case 'elipse-y':
                    contexto.ellipse(this.x, this.y, this.tamanio * 0.6, this.tamanio, 0, 0, Math.PI * 2);
                    break;
                default:
                    contexto.arc(this.x, this.y, this.tamanio, 0, Math.PI * 2);
                    break;
            }
            contexto.closePath();
            contexto.fill();
            contexto.restore();
        }
    }

    actualizar(contexto, mouse, ondaAncho, ondasMouse, tamanioParticulas, angulo, posOndaX, posOndaY) {
        // Actualizar posición
        this.x += this.velocidad.x;
        this.y += this.velocidad.y;
        
        const canvasWidth = contexto.canvas.width;
        const canvasHeight = contexto.canvas.height;
        
        // Se definen los límites del canva
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
                let distancia = Math.sqrt(dx * dx + dy * dy);
                
                switch (this.formaOnda) {
                    case 'cuadrado':
                        distancia = Math.max(Math.abs(dx), Math.abs(dy));
                        break;
                    case 'rombo':
                        distancia = Math.abs(Math.abs(dy) + Math.abs(dx));
                        break;
                    case 'linea-angulo':
                        angulo = -angulo;
                        const theta = (angulo + 90) * Math.PI / 180;
                        distancia = Math.abs(dx * Math.cos(theta) + dy * Math.sin(theta));
                        break;
                    case 'cruz':
                        distancia = Math.abs(Math.abs(dy) - Math.abs(dx));
                        break;
                    case 'elipse-x':
                        distancia = Math.sqrt((dx * 0.6)**2 + (dy)**2);
                        break;
                    case 'elipse-y':
                        distancia = Math.sqrt((dx)**2 + (dy * 0.6)**2);
                        break;
                    default:
                        break;
                }



                // En caso de ser mayor al tamaño normal se encoge
                if (this.tamanio > tamanioParticulas) {
                    this.tamanio *= this.friccion;
                    if (this.tamanio < tamanioParticulas) {
                        this.tamanio = tamanioParticulas;
                    }
                }
                
                if (ondaAncho > distancia) {
                    // Siempre y cuando sea menor al tamaño máximo se cambia el tamaño
                    if (this.tamanio < this.tamanioMaximo) {
                        const normalizado = 1 - (distancia / ondaAncho); 
                        const tamanioFuerza = tamanioParticulas + (normalizado * this.tamanioMaximo);

                        // Se evita de que partículas que se siguen encogiendo no se encojan rápido al pasar la onda
                        if (this.tamanio < tamanioFuerza) {
                            this.tamanio += (tamanioFuerza - this.tamanio) * this.fuerzaOnda;
                        }
                    }
                }
            } else {
                // En caso de que no haya mouse, se encogen todas las partículas
                if (this.tamanio > tamanioParticulas) {
                    this.tamanio *= this.friccion;
                    if (this.tamanio < tamanioParticulas) {
                        this.tamanio = tamanioParticulas;
                    }
                }
            }
        } else {
            // En caso de que se deshabilite el mouse se pone una linea con dirección en el contenedor automáticamente
            const dx = this.x - posOndaX;
            const dy = this.y - posOndaY;
            angulo = -angulo;
            const theta = (angulo + 90) * Math.PI / 180;
            let distancia = Math.abs(dx * Math.cos(theta) + dy * Math.sin(theta));
            if (this.tamanio > tamanioParticulas) {
                this.tamanio *= this.friccion;
                if (this.tamanio < tamanioParticulas) {
                    this.tamanio = tamanioParticulas;
                }
            }
                
            if (ondaAncho > distancia) {
                // Siempre y cuando sea menor al tamaño máximo se cambia el tamaño
                if (this.tamanio < this.tamanioMaximo) {
                    const normalizado = 1 - (distancia / ondaAncho); 
                    const tamanioFuerza = tamanioParticulas + (normalizado * this.tamanioMaximo);

                    // Se evita de que partículas que se siguen encogiendo no se encojan rápido al pasar la onda
                    if (this.tamanio < tamanioFuerza) {
                        this.tamanio += (tamanioFuerza - this.tamanio) * this.fuerzaOnda;
                    }
                }
            }
        }
        
        this.dibujar(contexto);
    }
}

export default Particula;