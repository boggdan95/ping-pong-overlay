# 🏓 Ping Pong Overlay

Un overlay profesional para transmisiones de tenis de mesa con control en tiempo real de puntos, sets, nombres de jugadores y indicador de servicio.

## 📋 Descripción

Este proyecto proporciona:
- **Overlay visual** con diseño profesional (fondo azul degradado)
- **Panel de control** para gestionar el marcador en tiempo real
- **Sincronización automática** entre overlay y panel de control
- **Diseño responsive** que se adapta a diferentes resoluciones
- **Compatible con OBS** para captura con chroma key

## ✨ Características

- ✅ Dos filas verticales (una por jugador)
- ✅ Bandera por país (customizable)
- ✅ Nombre y descripción del jugador
- ✅ Contador de puntos y sets
- ✅ Indicador visual de servicio (pelota azul)
- ✅ Fondo transparente para captura en OBS
- ✅ Controles rápidos por teclado (1, 2, S)
- ✅ Almacenamiento local (localStorage)

## 📁 Estructura del Proyecto

```
ping-pong-overlay/
├── docs/                   # Documentación técnica y guías
│   ├── DESCARGAR.txt      # Guía de descarga
│   ├── PROMPT.md          # Guía para desarrolladores
│   ├── SETUP_GITHUB.md    # Configuración de GitHub
│   └── START.md           # Guía de inicio rápido
├── index.html             # Overlay principal (capturar en OBS)
├── control.html           # Panel de control
├── CLAUDE.md              # Guía para Claude Code AI
├── CONTRIBUTING.md        # Guía de contribución
├── LICENSE                # Licencia MIT
├── package.json           # Metadata del proyecto
└── README.md              # Este archivo
```

## 🚀 Cómo Usar

### Opción 1: Local
1. Descarga los archivos `index.html` y `control.html`
2. Abre `index.html` en tu navegador (este es el overlay)
3. Abre `control.html` en otra ventana/pestaña (panel de control)
4. En OBS: Captura la ventana del navegador → Chroma Key

### Opción 2: Online
1. Aloja los archivos en un servidor web
2. Accede a `index.html` desde OBS como fuente de navegador
3. Accede a `control.html` desde tu dispositivo de control

## 🎮 Controles

### Panel de Control
- **Nombres**: Edita nombre y descripción de cada jugador
- **Banderas**: Cambia el emoji de bandera (ej: 🇪🇸, 🇦🇷, 🇲🇽)
- **Puntos**: Usa botones +/− para incrementar/decrementar
- **Sets**: Mismo control que puntos
- **Servicio**: Botones para asignar quién está sirviendo
- **Reiniciar**: Vuelve todo a 0

### Atajos de Teclado (en Overlay)
- **Tecla 1**: +1 punto Jugador 1
- **Tecla 2**: +1 punto Jugador 2
- **Tecla S**: Cambiar servicio

## 🎨 Personalización

### Cambiar colores
Edita las variables de color en `<style>`:
```css
background: linear-gradient(135deg, #003d8c 0%, #0052CC 100%);
```

### Cambiar tamaños de fuente
En el CSS, busca:
```css
.player-name {
    font-size: 28px;  /* Cambiar tamaño */
}
```

### Cambiar banderas por defecto
En el script, modifica:
```javascript
flag: '🇪🇸'  // Jugador 1
flag: '🇦🇷'  // Jugador 2
```

## 💾 Almacenamiento

Los datos se guardan automáticamente en `localStorage` del navegador. Esto significa:
- Los datos persisten entre actualizaciones de página
- Se comparten entre tabs del mismo navegador
- Se pierden si se limpia el almacenamiento del navegador

## 📱 Responsive Design

- ✅ Funciona en pantallas grandes (1920x1080+)
- ✅ Funciona en tablets (768px - 1024px)
- ✅ Funciona en móviles (pequeña escala)

## 🔧 Requisitos

- Navegador moderno (Chrome, Firefox, Safari, Edge)
- JavaScript habilitado
- Conexión a internet (opcional, funciona offline)

## 📝 Ejemplo de Uso en OBS

1. Abre OBS Studio
2. Crea nueva escena
3. Añade "Fuente de navegador" o "Ventana"
4. Si usas navegador local:
   - URL: `file:///C:/ruta/a/index.html` (Windows)
   - URL: `file:///Users/usuario/ruta/a/index.html` (Mac)
5. Resolución: 1920x1080 (ajusta según necesidad)
6. Aplica Chroma Key (verde o azul)
7. Ajusta posición y tamaño

En otra ventana, abre `control.html` para controlar el marcador mientras transmites.

## 🐛 Troubleshooting

**P: El overlay no se sincroniza con el control**
R: Asegúrate de que ambas ventanas usan el mismo navegador y que localStorage no está deshabilitado.

**P: Los cambios no se guardan**
R: Verifica que el navegador permita localStorage. En navegadores privados/incógnito no funciona.

**P: Los colores no se ven bien en OBS**
R: Ajusta el Chroma Key manualmente en OBS. Puede variar según iluminación.

**P: Quiero cambiar el diseño completamente**
R: Edita el CSS en la sección `<style>` de `index.html`.

## 📋 Roadmap

- [ ] Base de datos para guardar partidos
- [ ] Historial de puntos
- [ ] Animaciones de transición
- [ ] Soporte para múltiples modos (individual, dobles)
- [ ] Exportar resultados
- [ ] API REST para control remoto

## 📄 Licencia

MIT - Úsalo libremente en tus proyectos

## 👨‍💻 Contribuir

Si tienes mejoras o encuentras bugs:
1. Haz fork del proyecto
2. Crea una rama con tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## ❓ Preguntas Frecuentes

**¿Puedo usar esto en mis streams?**
Sí, es totalmente libre y gratuito.

**¿Necesito registrarme en algo?**
No, funciona completamente local.

**¿Funciona en todas las plataformas?**
Sí: OBS, StreamLabs, Twitch Studio, etc.

**¿Puedo tener múltiples partidos simultáneos?**
Actualmente no, pero puedes abrir en navegadores diferentes.

## 📚 Documentación Adicional

Para más información, consulta la documentación en la carpeta `docs/`:

- **[Guía de Inicio Rápido](docs/START.md)** - Instrucciones rápidas para comenzar
- **[Configuración de GitHub](docs/SETUP_GITHUB.md)** - Cómo configurar y desplegar con GitHub Pages
- **[Guía para Desarrolladores](docs/PROMPT.md)** - Documentación técnica y estructura de código
- **[Guía de Descarga](docs/DESCARGAR.txt)** - Instrucciones de descarga e instalación

## 📞 Soporte

Para problemas o sugerencias, abre un issue en el repositorio.

---

**Desarrollado con ❤️ para streamers de tenis de mesa**
