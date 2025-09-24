// ===================== SLIDESHOW =====================
// Controla la presentación automática de imágenes (slideshow) en el inicio
let slideIndex = 0; // Índice actual del slide

function showSlides(){
    // Obtiene todos los elementos con clase "slide"
    let slides = document.getElementsByClassName("slide");

    // Oculta todos los slides
    for(let i = 0; i < slides.length; i++){
        slides[i].style.display = "none";
    }

    // Avanza al siguiente slide
    slideIndex++;
    if(slideIndex > slides.length) slideIndex = 1; // Reinicia si se pasa del último

    // Muestra el slide actual
    if(slides[slideIndex-1]) slides[slideIndex-1].style.display = "block";

    // Llama recursivamente a la función cada 3 segundos para efecto automático
    setTimeout(showSlides, 3000);
}

// Inicia el slideshow cuando el DOM está completamente cargado
document.addEventListener('DOMContentLoaded', showSlides);


// ===================== RECOMENDACIONES =====================
// Muestra reseñas o valoraciones según la categoría seleccionada
const categorias = document.querySelectorAll('.categoria'); // Todas las tarjetas de especialidad
const recomendacionContent = document.getElementById('recomendacion-content'); // Contenedor donde se mostrarán las recomendaciones

// Diccionario con recomendaciones para cada especialidad
const recomendaciones = {
    "ginecologia": "⭐⭐⭐⭐⭐ Muy profesionales y atentos.",
    "nutricion": "⭐⭐⭐⭐ Excelente atención, planes personalizados.",
    "dermatologia": "⭐⭐⭐⭐⭐ Trato amable y resultados efectivos.",
    "psicologia": "⭐⭐⭐⭐⭐ Psicólogos confiables."
};

// Mensaje inicial que se muestra al cargar la página
if(recomendacionContent){
    recomendacionContent.innerHTML = `<p>Pincha en una categoría para ver la valoración ⭐⭐⭐⭐⭐</p>`;
}

// Recorre cada tarjeta de especialidad y le agrega eventos
categorias.forEach(cat => {
    const catName = cat.getAttribute('data-cat'); // Obtiene el nombre de la especialidad

    // Cuando el mouse entra en la tarjeta, muestra la recomendación
    cat.addEventListener('mouseenter', () => {
        if(recomendacionContent){
            recomendacionContent.innerHTML = `<h3>Recomendaciones de ${catName.charAt(0).toUpperCase() + catName.slice(1)}</h3>
                                              <p>${recomendaciones[catName]}</p>`;
        }
    });

    // Cuando el mouse sale de la tarjeta, vuelve al mensaje por defecto
    cat.addEventListener('mouseleave', () => {
        if(recomendacionContent){
            recomendacionContent.innerHTML = `<p>Pincha en una categoría para ver la valoración ⭐⭐⭐⭐⭐</p>`;
        }
    });

    // Cuando se hace click en la tarjeta, redirige a la página de agendar hora con la especialidad
    cat.addEventListener('click', () => {
        window.location.href = `agenda.html?especialidad=${catName}`;
    });
});


// ===================== LOGIN =====================
// Maneja el formulario de inicio de sesión
const loginForm = document.getElementById('loginForm');
if(loginForm){
    loginForm.addEventListener('submit', function(e){
        e.preventDefault(); // Evita que el formulario se envíe por defecto

        const email = document.getElementById('email').value; // Obtiene email
        const password = document.getElementById('password').value; // Obtiene contraseña

        if(email && password){
            // Muestra mensaje de bienvenida
            const welcomeDiv = document.getElementById('welcomeMessage');
            welcomeDiv.innerHTML = `¡Bienvenido(a), ${email}! Has iniciado sesión correctamente.`;
            welcomeDiv.style.display = 'block';
            console.log(`Usuario logueado: ${email}`);
        } else {
            alert('Completa todos los campos.');
        }
    });
}


// ===================== REGISTRO =====================
// Maneja el formulario de registro
const registroForm = document.getElementById('registroForm');
if(registroForm){
    registroForm.addEventListener('submit', function(e){
        e.preventDefault(); // Evita el envío por defecto

        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        const confirmPassword = document.getElementById('confirm-password').value;
        const terminos = document.getElementById('terminos').checked; // Verifica aceptación de términos

        // Validaciones
        if(password !== confirmPassword){ 
            alert("Contraseñas no coinciden."); 
            return; 
        }
        if(!terminos){ 
            alert("Debes aceptar los términos."); 
            return; 
        }

        // Muestra mensaje de éxito
        const successDiv = document.getElementById('successMessage');
        successDiv.innerHTML = "¡Registro exitoso! Serás redirigido(a) al login.";
        successDiv.style.display = 'block';
        console.log(`Usuario registrado: ${email}`);

        // Redirige al login tras 2 segundos
        setTimeout(()=>{ 
            window.location.href = `login.html?email=${encodeURIComponent(email)}`; 
        }, 2000);
    });
}


// ===================== AGENDA =====================
// Maneja el formulario de agendar cita en pasos
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
        if(!esp){ 
            alert('Selecciona una especialidad'); 
            return; 
        }
        // Llena el select de profesionales según la especialidad
        const profSelect = document.getElementById('profesional');
        profSelect.innerHTML = '<option value="" disabled selected>Selecciona un profesional</option>';
        profesionalesPorEspecialidad[esp].forEach(p => {
            const opt = document.createElement('option');
            opt.value = p; 
            opt.textContent = p;
            profSelect.appendChild(opt);
        });
    }
    // Muestra el siguiente paso y oculta el actual
    steps[current-1].style.display = 'none';
    steps[current].style.display = 'block';
}

// Función para retroceder al paso anterior
function prevStep(current){
    steps[current-1].style.display = 'none';
    steps[current-2].style.display = 'block';
}

// Cambia placeholder según tipo de identificación (Rut o Otro)
function showIdField(){
    const tipo = document.querySelector('input[name="idtipo"]:checked').value;
    const input = document.getElementById('idvalue');
    input.placeholder = (tipo === 'rut') ? 'Ingresa tu Rut' : 'Ingresa tu identificación';
}

// Función para enviar la cita
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
