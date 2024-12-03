let correo = document.getElementById('email');
let pwd = document.getElementById('pass');
let btn = document.getElementById('btn');

let emailAceptado = false;
let pwdAceptada = false;

function comprobar(evento){
    if(evento.target === correo){
        const correoCorrecto = /^[^@\s]+@[^@\s]+\.[^@\s]+$/; 
        if(correoCorrecto.test(correo.value)){
            document.getElementById('emailError').style.display = 'none';
            emailAceptado = true;
        } else {
            document.getElementById('emailError').style.display = 'block';
            emailAceptado = false;
        }
    }

    if(evento.target === pwd){
        const contraseñaCorrecta = /^.{8,10}$/; 
        if(contraseñaCorrecta.test(pwd.value)){
            document.getElementById('passwordError').style.display = 'none';
            pwdAceptada = true;
        } else {
            document.getElementById('passwordError').style.display = 'block';
            pwdAceptada = false;
        }
    }

    habilitar();
}

function habilitar() {
    btn.disabled = !(emailAceptado && pwdAceptada);
}

correo.addEventListener('blur', comprobar);
pwd.addEventListener('blur', comprobar);
btn.addEventListener('click', () => {
    if (emailAceptado && pwdAceptada) {
        alert('Formulario enviado con éxito');
    }
});
