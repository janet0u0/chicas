// ===================== SLIDESHOW =====================
let slideIndex = 0;
function showSlides(){
    let slides = document.getElementsByClassName("slide");
    for(let i=0;i<slides.length;i++) slides[i].style.display="none";
    slideIndex++;
    if(slideIndex>slides.length) slideIndex=1;
    if(slides[slideIndex-1]) slides[slideIndex-1].style.display="block";
    setTimeout(showSlides,3000);
}
document.addEventListener('DOMContentLoaded', showSlides);

// ===================== RECOMENDACIONES =====================
const categorias = document.querySelectorAll('.categoria');
const recomendacionContent = document.getElementById('recomendacion-content');
const recomendaciones = {
    "ginecologia":"⭐⭐⭐⭐⭐ Muy profesionales y atentos.",
    "nutricion":"⭐⭐⭐⭐ Excelente atención, planes personalizados.",
    "dermatologia":"⭐⭐⭐⭐⭐ Trato amable y resultados efectivos.",
    "psicologia":"⭐⭐⭐⭐⭐ Psicólogos confiables."
};
categorias.forEach(cat=>{
    cat.addEventListener('mouseover',()=>{
        const catName=cat.getAttribute('data-cat');
        if(recomendacionContent) recomendacionContent.innerHTML=`<p>${recomendaciones[catName]}</p>`;
    });
    cat.addEventListener('mouseout',()=>{
        if(recomendacionContent) recomendacionContent.innerHTML=`<p>Pincha en una categoría para ver la valoración ⭐⭐⭐⭐⭐</p>`;
    });
});

// ===================== LOGIN =====================
const loginForm=document.getElementById('loginForm');
if(loginForm){
    loginForm.addEventListener('submit',function(e){
        e.preventDefault();
        const email=document.getElementById('email').value;
        const password=document.getElementById('password').value;
        if(email && password){
            const welcomeDiv=document.getElementById('welcomeMessage');
            welcomeDiv.innerHTML=`¡Bienvenido(a), ${email}! Has iniciado sesión correctamente.`;
            welcomeDiv.style.display='block';
            console.log(`Usuario logueado: ${email}`);
        } else alert('Completa todos los campos.');
    });
}

// ===================== REGISTRO =====================
const registroForm=document.getElementById('registroForm');
if(registroForm){
    registroForm.addEventListener('submit',function(e){
        e.preventDefault();
        const email=document.getElementById('email').value;
        const password=document.getElementById('password').value;
        const confirmPassword=document.getElementById('confirm-password').value;
        const terminos=document.getElementById('terminos').checked;

        if(password!==confirmPassword){ alert("Contraseñas no coinciden."); return; }
        if(!terminos){ alert("Debes aceptar los términos."); return; }

        const successDiv=document.getElementById('successMessage');
        successDiv.innerHTML="¡Registro exitoso! Serás redirigido(a) al login.";
        successDiv.style.display='block';
        console.log(`Usuario registrado: ${email}`);

        setTimeout(()=>{ window.location.href=`login.html?email=${encodeURIComponent(email)}`; },2000);
    });
}

// ===================== AGENDA =====================
const steps=document.querySelectorAll('.step');
steps.forEach((step,index)=>{ if(index!==0) step.style.display='none'; });

const profesionalesPorEspecialidad = {
    "ginecologia":["Dra. Pérez","Dra. López"],
    "nutricion":["Lic. González","Lic. Martínez"],
    "dermatologia":["Dr. Ramírez","Dra. Torres"],
    "psicologia":["Lic. Fernández","Dra. Silva"]
};

function nextStep(current){
    if(current===1){
        const esp=document.getElementById('especialidad').value;
        if(!esp){ alert('Selecciona una especialidad'); return; }
        const profSelect=document.getElementById('profesional');
        profSelect.innerHTML='<option value="" disabled selected>Selecciona un profesional</option>';
        profesionalesPorEspecialidad[esp].forEach(p=>{
            const opt=document.createElement('option');
            opt.value=p; opt.textContent=p;
            profSelect.appendChild(opt);
        });
    }
    steps[current-1].style.display='none';
    steps[current].style.display='block';
}

function prevStep(current){
    steps[current-1].style.display='none';
    steps[current-2].style.display='block';
}

function showIdField(){
    const tipo=document.querySelector('input[name="idtipo"]:checked').value;
    const input=document.getElementById('idvalue');
    input.placeholder=(tipo==='rut') ? 'Ingresa tu Rut':'Ingresa tu identificación';
}

function submitAgenda(){
    const especialidad=document.getElementById('especialidad').value;
    const profesional=document.getElementById('profesional').value;
    const fecha=document.getElementById('fecha').value;
    const hora=document.getElementById('hora').value;
    const idvalor=document.getElementById('idvalue').value;

    if(!especialidad || !profesional || !fecha || !hora || !idvalor){
        alert('Completa todos los campos antes de agendar.'); return;
    }

    document.getElementById('confirmation').style.display='block';
    steps.forEach(s=>s.style.display='none');

    console.log(`Correo enviado: Especialidad: ${especialidad}, Profesional: ${profesional}, Fecha: ${fecha}, Hora: ${hora}, ID: ${idvalor}`);
}
