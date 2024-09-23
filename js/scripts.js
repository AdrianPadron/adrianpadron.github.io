document.addEventListener('DOMContentLoaded', function() {
    fetch('data/news.json')
        .then(response => response.json())
        .then(data => {
            const newsContainer = document.getElementById('news-container');
            data.news.forEach(newsItem => {
                const newsElement = document.createElement('div');
                newsElement.innerHTML = `<h3>${newsItem.title}</h3><p>${newsItem.content}</p>`;
                newsContainer.appendChild(newsElement);
            });
        })
        .catch(error => console.error('Error fetching news:', error));
});

document.addEventListener('DOMContentLoaded', function() {
    const gallery = document.getElementById('view/galeria.html');

    // Simulación de una llamada AJAX para obtener imágenes
    const images = [
        'assets/images/img1.jpg',
        'assets/images/img2.jpg',
        'assets/images/img3.jpg'
    ];

    images.forEach(src => {
        const img = document.createElement('assets/images');
        img.src = src;
        gallery.appendChild(img);
    });
});

document.getElementById('presupuestoForm').addEventListener('input', calcularPresupuesto);

        function calcularPresupuesto() {
            let producto = document.getElementById('producto');
            let precioProducto = parseFloat(producto.options[producto.selectedIndex].getAttribute('data-precio'));
            let plazo = parseInt(document.getElementById('plazo').value) || 0;
            let descuento = plazo > 12 ? 0.1 : 0; // 10% de descuento si el plazo es mayor a 12 meses
            let extras = document.querySelectorAll('input[name="extras"]:checked');
            let precioExtras = Array.from(extras).reduce((total, extra) => total + parseFloat(extra.value), 0);

            let presupuestoFinal = (precioProducto + precioExtras) * (1 - descuento);
            document.getElementById('presupuestoFinal').textContent = presupuestoFinal.toFixed(2);
        }

        document.getElementById('nombre').addEventListener('input', validarNombre);
        document.getElementById('apellidos').addEventListener('input', validarApellidos);
        document.getElementById('telefono').addEventListener('input', validarTelefono);
        document.getElementById('email').addEventListener('input', validarEmail);

        function validarNombre() {
            let nombre = document.getElementById('nombre').value;
            let error = document.getElementById('nombreError');
            if (/^[a-zA-Z]+$/.test(nombre)) {
                error.textContent = '';
            } else {
                error.textContent = 'Nombre inválido. Sólo letras.';
            }
        }

        function validarApellidos() {
            let apellidos = document.getElementById('apellidos').value;
            let error = document.getElementById('apellidosError');
            if (/^[a-zA-Z\s]+$/.test(apellidos)) {
                error.textContent = '';
            } else {
                error.textContent = 'Apellidos inválidos. Sólo letras.';
            }
        }

        function validarTelefono() {
            let telefono = document.getElementById('telefono').value;
            let error = document.getElementById('telefonoError');
            if (/^\d{9}$/.test(telefono)) {
                error.textContent = '';
            } else {
                error.textContent = 'Teléfono inválido. Sólo 9 dígitos.';
            }
        }

        function validarEmail() {
            let email = document.getElementById('email').value;
            let error = document.getElementById('emailError');
            let regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (regex.test(email)) {
                error.textContent = '';
            } else {
                error.textContent = 'Correo electrónico inválido.';
            }
        }

        var map = L.map('map').setView([40.416775, -3.703790], 13); // Coordenadas de Madrid, España

        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(map);

        var marker = L.marker([40.416775, -3.703790]).addTo(map)
            .bindPopup('Tu Empresa<br> Calle Falsa 123, Madrid')
            .openPopup();

        L.Routing.control({
            waypoints: [
                L.latLng(40.416775, -3.703790), // Ubicación de tu empresa
                L.latLng(40.416775, -3.703790)  // Cambia esto por la ubicación del cliente
            ],
            routeWhileDragging: true
        }).addTo(map);