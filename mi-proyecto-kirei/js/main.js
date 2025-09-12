// ===================== SLIDESHOW =====================
// Controla la presentación automática de imágenes (slideshow)
let slideIndex = 0; // Índice actual del slide

function showSlides(){
    // Obtiene todos los elementos con clase "slide"
    let slides = document.getElementsByClassName("slide");

    // Oculta todos los slides
    for(let i=0; i<slides.length; i++) slides[i].style.display = "none";

    // Avanza al siguiente slide
    slideIndex++;
    if(slideIndex > slides.length) slideIndex = 1; // Reinicia si se pasa del último

    // Muestra el slide actual
    if(slides[slideIndex-1]) slides[slideIndex-1].style.display = "block";

    // Llama recursivamente a la función cada 3 segundos
    setTimeout(showSlides, 3000);
}

// Inicia el slideshow cuando el DOM está cargado
document.addEventListener('DOMContentLoaded', showSlides);

// ===================== RECOMENDACIONES =====================
// Muestra reseñas o valoraciones según la categoría seleccionada
const categorias = document.querySelectorAll('.categoria');
const recomendacionContent = document.getElementById('recomendacion-content');

// Diccionario con recomendaciones para cada especialidad
const recomendaciones = {
    "ginecologia":"⭐⭐⭐⭐⭐ Muy profesionales y atentos.",
    "nutricion":"⭐⭐⭐⭐ Excelente atención, planes personalizados.",
    "dermatologia":"⭐⭐⭐⭐⭐ Trato amable y resultados efectivos.",
    "psicologia":"⭐⭐⭐⭐⭐ Psicólogos confiables."
};

// Agrega eventos a cada categoría
categorias.forEach(cat => {
    // Al pasar el mouse, muestra la recomendación correspondiente
    cat.addEventListener('mouseover', () => {
        const catName = cat.getAttribute('data-cat');
        if(recomendacionContent) recomendacionContent.innerHTML = `<p>${recomendaciones[catName]}</p>`;
    });

    // Al salir el mouse, vuelve al mensaje por defecto
    cat.addEventListener('mouseout', () => {
        if(recomendacionContent) recomendacionContent.innerHTML = `<p>Pincha en una categoría para ver la valoración ⭐⭐⭐⭐⭐</p>`;
    });
});

// ===================== LOGIN =====================
// Maneja el formulario de inicio de sesión
const loginForm = document.getElementById('loginForm');
if(loginForm){
    loginForm.addEventListener('submit', function(e){
        e.preventDefault(); // Evita el envío por defecto del formulario

        // Obtiene valores del formulario
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;

        if(email && password){
            const welcomeDiv = document.getElementById('welcomeMessage');
            welcomeDiv.innerHTML = `¡Bienvenido(a), ${email}! Has iniciado sesión correctamente.`;
            welcomeDiv.style.display = 'block';
            console.log(`Usuario logueado: ${email}`);
        } else alert('Completa todos los campos.');
    });
}

// ===================== REGISTRO =====================
// Maneja el formulario de registro
const registroForm = document.getElementById('registroForm');
if(registroForm){
    registroForm.addEventListener('submit', function(e){
        e.preventDefault(); // Evita el envío por defecto del formulario

        // Obtiene valores del formulario
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        const confirmPassword = document.getElementById('confirm-password').value;
        const terminos = document.getElementById('terminos').checked;

        // Validaciones
        if(password !== confirmPassword){ alert("Contraseñas no coinciden."); return; }
        if(!terminos){ alert("Debes aceptar los términos."); return; }

        // Mensaje de éxito
        const successDiv = document.getElementById('successMessage');
        successDiv.innerHTML = "¡Registro exitoso! Serás redirigido(a) al login.";
        successDiv.style.display = 'block';
        console.log(`Usuario registrado: ${email}`);

        // Redirige al login tras 2 segundos, pasando el email como parámetro
        setTimeout(()=>{ 
            window.location.href = `login.html?email=${encodeURIComponent(email)}`; 
        }, 2000);
    });
}

// ===================== AGENDA =====================
// Manejo de pasos del formulario de agendar cita
const steps = document.querySelectorAll('.step');
// Oculta todos los pasos excepto el primero
steps.forEach((step, index) => { if(index !== 0) step.style.display = 'none'; });

// Lista de profesionales por especialidad
const profesionalesPorEspecialidad = {
    "ginecologia":["Dra. Pérez","Dra. López","Dra. González"],
    "nutricion":["Dra. González","Lic. Martínez","Dra. Medina"],
    "dermatologia":["Dra. Ramírez","Dra. Torres","Dra. Salvador"],
    "psicologia":["Dra. Fernández","Dra. Silva","Dra. Rubio"]
};

// Función para avanzar al siguiente paso
function nextStep(current){
    if(current === 1){
        const esp = document.getElementById('especialidad').value;
        if(!esp){ alert('Selecciona una especialidad'); return; }

        // Llena el select de profesionales según la especialidad
        const profSelect = document.getElementById('profesional');
        profSelect.innerHTML = '<option value="" disabled selected>Selecciona un profesional</option>';
        profesionalesPorEspecialidad[esp].forEach(p => {
            const opt = document.createElement('option');
            opt.value = p; opt.textContent = p;
            profSelect.appendChild(opt);
        });
    }
    // Oculta el paso actual y muestra el siguiente
    steps[current-1].style.display = 'none';
    steps[current].style.display = 'block';
}

// Función para retroceder al paso anterior
function prevStep(current){
    steps[current-1].style.display = 'none';
    steps[current-2].style.display = 'block';
}

// Muestra el campo de identificación según el tipo seleccionado (Rut o otro)
function showIdField(){
    const tipo = document.querySelector('input[name="idtipo"]:checked').value;
    const input = document.getElementById('idvalue');
    input.placeholder = (tipo === 'rut') ? 'Ingresa tu Rut' : 'Ingresa tu identificación';
}

// Función para enviar la agenda
function submitAgenda(){
    const especialidad = document.getElementById('especialidad').value;
    const profesional = document.getElementById('profesional').value;
    const fecha = document.getElementById('fecha').value;
    const hora = document.getElementById('hora').value;
    const idvalor = document.getElementById('idvalue').value;

    // Validación de campos
    if(!especialidad || !profesional || !fecha || !hora || !idvalor){
        alert('Completa todos los campos antes de agendar.');
        return;
    }

    // Muestra mensaje de confirmación y oculta los pasos
    document.getElementById('confirmation').style.display = 'block';
    steps.forEach(s => s.style.display = 'none');

    // Log en consola de la cita agendada
    console.log(`Correo enviado: Especialidad: ${especialidad}, Profesional: ${profesional}, Fecha: ${fecha}, Hora: ${hora}, ID: ${idvalor}`);
}
