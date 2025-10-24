# 🚀 Quick Start - Ping Pong Overlay

## Archivos Principales

```
ping-pong-overlay/
├── index.html           ← Overlay (lo que ves en la transmisión)
├── overlay.html         ← Copia del overlay (alternativa)
├── control.html         ← Panel de control (para controlar)
├── README.md            ← Documentación completa
├── SETUP_GITHUB.md      ← Cómo crear repo en GitHub
├── PROMPT.md            ← Guía para desarrolladores
├── CONTRIBUTING.md      ← Cómo contribuir
├── package.json         ← Metadata del proyecto
├── LICENSE              ← MIT License
└── .gitignore           ← Archivos a ignorar en Git
```

---

## ⚡ Inicio Rápido (Sin GitHub)

### 1️⃣ Descargar Archivos
Necesitas:
- `index.html` (el overlay)
- `control.html` (el panel)

### 2️⃣ Usar Localmente
1. Abre `index.html` en tu navegador (este es el overlay)
2. Abre `control.html` en otra pestaña (panel de control)
3. ¡Edita puntos, nombres y servicio!

### 3️⃣ Usar en OBS
1. **Abre OBS**
2. Fuente → Add → Browser Source
3. URL: `file:///C:/ruta/a/index.html` (Windows)
4. URL: `file:///Users/usuario/ruta/a/index.html` (Mac)
5. Resolución: 1920x1080
6. ✅ Chroma Key (verde/azul)

---

## 🐙 Inicio Rápido (Con GitHub)

### 1️⃣ Crear Repositorio
- Ve a https://github.com/new
- Nombre: `ping-pong-overlay`
- License: MIT
- Create

### 2️⃣ Clonar y Agregar Archivos
```bash
git clone https://github.com/TU_USUARIO/ping-pong-overlay.git
cd ping-pong-overlay

# Copia todos estos archivos al directorio:
# - index.html
# - control.html
# - README.md
# - PROMPT.md
# - SETUP_GITHUB.md
# - CONTRIBUTING.md
# - LICENSE
# - .gitignore
# - package.json
```

### 3️⃣ Subir a GitHub
```bash
git add .
git commit -m "Initial commit: Add ping pong overlay"
git push -u origin main
```

### 4️⃣ Activar GitHub Pages
- Settings → Pages
- Deploy from branch: main
- Folder: /
- Save

Tu overlay estará en: `https://tu-usuario.github.io/ping-pong-overlay/index.html`

---

## 🎮 Cómo Usar

### Panel de Control (`control.html`)
```
Nombre          → Nombre del jugador
Rol/Descripción → Qué es (ej: Campeón, Principiante)
Bandera         → Emoji de país (ej: 🇪🇸, 🇦🇷)
Puntos          → Botones +/-
Sets            → Botones +/-
Servicio        → Quién está sirviendo
Reiniciar       → Vuelve todo a 0
```

### Atajos en Overlay (`index.html`)
- **Tecla 1** → +1 punto Jugador 1
- **Tecla 2** → +1 punto Jugador 2
- **Tecla S** → Cambiar servicio

---

## 🎨 Personalizar

### Colores
En `index.html`, busca:
```css
background: linear-gradient(135deg, #003d8c 0%, #0052CC 100%);
```

Cambia los códigos hex por tus colores.

### Banderas por Defecto
En el script de `index.html`:
```javascript
flag: '🇪🇸'  // Cambiar emoji aquí
```

### Tamaños
```css
.player-name { font-size: 28px; }  /* Cambiar tamaño */
.stat-value { font-size: 36px; }
```

---

## ✅ Verificación

Después de configurar, verifica:

```
[ ] index.html abre sin errores
[ ] control.html abre sin errores
[ ] Editar nombres actualiza el overlay
[ ] Botones +/- funcionan
[ ] Cambiar servicio muestra la pelota azul
[ ] Atajos de teclado (1, 2, S) funcionan
[ ] En OBS se ve transparente (chroma key funciona)
[ ] En móvil se ve responsive
```

---

## 🆘 Problemas Comunes

**P: Los cambios no aparecen en el overlay**
R: Asegúrate de abrir ambos archivos en el MISMO navegador.

**P: No puedo editar los archivos**
R: Descárgalos con un editor de texto (VS Code, Notepad++, Sublime).

**P: GitHub Pages no funciona**
R: Espera 5-10 minutos. Luego limpia caché (Ctrl+Shift+Delete).

**P: En OBS no se ve el overlay**
R: Verifica que la URL sea correcta y que chroma key esté activado.

---

## 📚 Documentación Completa

Para más detalles, ve a:
- **README.md** - Documentación completa
- **PROMPT.md** - Guía para desarrolladores
- **SETUP_GITHUB.md** - Pasos detallados de GitHub
- **CONTRIBUTING.md** - Cómo contribuir

---

## 🎯 Próximos Pasos

- [ ] Prueba localmente
- [ ] Prueba en OBS
- [ ] Crea un repositorio GitHub
- [ ] Personaliza colores/nombres
- [ ] ¡Usa en tu próxima transmisión!

---

## 📞 Necesitas Ayuda?

1. Lee las documentaciones (.md)
2. Abre un Issue en GitHub
3. Revisa el código (está comentado)
4. Experimenta modificando CSS/JS

---

**¡Happy streaming! 🏓✨**
