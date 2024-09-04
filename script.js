document.addEventListener('DOMContentLoaded', function () {
    const steps = document.querySelectorAll('.step');
    const nextButtons = document.querySelectorAll('.next-button');
    const prevButtons = document.querySelectorAll('.prev-button');
    const startButton = document.getElementById('startButton'); // Botón "Comenzar"
    let currentStep = 0;

    function showStep(index) {
        steps.forEach((step, i) => {
            step.classList.toggle('active', i === index);
        });
    }

    function goToNextStep() {
        if (currentStep < steps.length - 1) {
            currentStep++;
            showStep(currentStep);
        }
    }

    function goToPreviousStep() {
        if (currentStep > 0) {
            currentStep--;
            showStep(currentStep);
        }
    }

    nextButtons.forEach(button => {
        button.addEventListener('click', goToNextStep);
    });

    prevButtons.forEach(button => {
        button.addEventListener('click', goToPreviousStep);
    });

    if (startButton) {
        startButton.addEventListener('click', goToNextStep);
    }

   // Agregar interacción para bordes
const borderOptions = document.querySelectorAll('.border-option');
const labelBorder = document.getElementById('labelBorder');

borderOptions.forEach(option => {
    option.addEventListener('click', function () {
        const borderUrl = this.getAttribute('data-border');
        labelBorder.style.backgroundImage = `url('${borderUrl}')`;
        labelBorder.style.backgroundSize = 'cover'; // Ajusta el tamaño de la imagen al contenedor
        labelBorder.style.backgroundPosition = 'center'; // Centra la imagen
        labelBorder.style.backgroundRepeat = 'no-repeat'; // Evita que la imagen se repita
        borderOptions.forEach(opt => opt.classList.remove('selected'));
        this.classList.add('selected');
    });
});

// Agregar interacción para marcos
const frameOptions = document.querySelectorAll('.frame-option');
const labelFrame = document.getElementById('labelFrame');

frameOptions.forEach(option => {
    option.addEventListener('click', function () {
        const frameUrl = this.getAttribute('data-frame');
        labelFrame.style.backgroundImage = `url('${frameUrl}')`;
        labelFrame.style.backgroundSize = 'cover'; // Ajusta el tamaño de la imagen al contenedor
        labelFrame.style.backgroundPosition = 'center'; // Centra la imagen
        labelFrame.style.backgroundRepeat = 'no-repeat'; // Evita que la imagen se repita
        frameOptions.forEach(opt => opt.classList.remove('selected'));
        this.classList.add('selected');
    });
});


    // Configurar la posición y el estilo del texto principal
    const mainTextInput = document.getElementById('mainText');
    const mainTextColor = document.getElementById('mainTextColor');
    const mainTextSize = document.getElementById('mainTextSize');
    const mainTextFont = document.getElementById('mainTextFont');
    const mainTextAlign = document.getElementById('mainTextAlign');
    const labelText = document.getElementById('labelText');

    mainTextInput.addEventListener('input', function () {
        labelText.textContent = this.value;
    });

    mainTextColor.addEventListener('input', function () {
        labelText.style.color = this.value;
    });

    mainTextSize.addEventListener('input', function () {
        labelText.style.fontSize = `${this.value}px`;
    });

    mainTextFont.addEventListener('change', function () {
        labelText.style.fontFamily = this.value;
    });

    mainTextAlign.addEventListener('change', function () {
        labelText.style.textAlign = this.value;
    });

    // Configurar la posición y el estilo del texto adicional
    const additionalTextInput = document.getElementById('additionalText');
    const additionalTextColor = document.getElementById('additionalTextColor');
    const additionalTextSize = document.getElementById('additionalTextSize');
    const additionalTextFont = document.getElementById('additionalTextFont');
    const additionalTextAlign = document.getElementById('additionalTextAlign');
    const labelAdditionalText = document.getElementById('labelAdditionalText');

    additionalTextInput.addEventListener('input', function () {
        labelAdditionalText.textContent = this.value;
    });

    additionalTextColor.addEventListener('input', function () {
        labelAdditionalText.style.color = this.value;
    });

    additionalTextSize.addEventListener('input', function () {
        labelAdditionalText.style.fontSize = `${this.value}px`;
    });

    additionalTextFont.addEventListener('change', function () {
        labelAdditionalText.style.fontFamily = this.value;
    });

    additionalTextAlign.addEventListener('change', function () {
        labelAdditionalText.style.textAlign = this.value;
    });

    // Inicializar en el primer paso (la pantalla de bienvenida)
    showStep(currentStep);

    // Hacer que el texto sea arrastrable
    interact('#labelText, #labelAdditionalText')
        .draggable({
            listeners: {
                start (event) {
                    // Opcional: puedes agregar código para cuando comienza el arrastre
                },
                move (event) {
                    const target = event.target;
                    // Mantener la posición inicial del texto en relación con el contenedor
                    const x = (parseFloat(target.getAttribute('data-x')) || 0) + event.dx;
                    const y = (parseFloat(target.getAttribute('data-y')) || 0) + event.dy;

                    target.style.transform = `translate(${x}px, ${y}px)`;

                    target.setAttribute('data-x', x);
                    target.setAttribute('data-y', y);
                },
                end (event) {
                    // Opcional: puedes agregar código para cuando termina el arrastre
                }
            },
            modifiers: [
                interact.modifiers.restrictRect({
                    restriction: 'parent',
                    endOnly: true
                })
            ],
            inertia: true
        });
});
// Exportar la imagen
document.getElementById('download-button').addEventListener('click', function() {
    console.log('Botón de exportar clickeado');  // Mensaje de depuración

    // Ocultar las líneas de referencia
    document.querySelector('.center-line').classList.add('hide-during-export');
    document.querySelector('.vertical-line').classList.add('hide-during-export');

    // Usar html2canvas para tomar una captura del elemento
    html2canvas(document.getElementById('label'), { scale: 3 }).then(canvas => {
        console.log('Captura realizada con éxito');  // Mensaje de depuración
        const link = document.createElement('a');
        link.download = 'etiqueta.png';
        link.href = canvas.toDataURL('image/png');
        link.click();

        // Mostrar las líneas de referencia nuevamente
        document.querySelector('.center-line').classList.remove('hide-during-export');
        document.querySelector('.vertical-line').classList.remove('hide-during-export');
    }).catch(error => {
        console.error('Error al exportar la imagen:', error);  // Mensaje de error
        // Mostrar las líneas de referencia nuevamente en caso de error
        document.querySelector('.center-line').classList.remove('hide-during-export');
        document.querySelector('.vertical-line').classList.remove('hide-during-export');
    });
});

