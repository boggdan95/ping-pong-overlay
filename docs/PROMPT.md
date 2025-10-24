# 📋 PROMPT PARA DESARROLLO - Ping Pong Overlay

**Objetivo General**: Mantener y mejorar un overlay profesional para transmisiones de tenis de mesa que funcione con OBS.

---

## 🎯 Estado Actual del Proyecto

El proyecto actualmente tiene:

### Archivos Principales
1. **index.html** - Overlay visual con diseño azul profesional
   - Dos filas verticales (una por jugador)
   - Bandera (emoji customizable) en la izquierda
   - Nombre y rol del jugador
   - Puntos y Sets mostrados
   - Pelota de servicio (azul activa, gris inactiva)
   - Fondo transparente para captura en OBS
   - Sincronización via localStorage

2. **control.html** - Panel de control
   - Interfaz para editar nombres, roles y banderas
   - Controles +/- para puntos y sets
   - Selector de quién está sirviendo
   - Botón de reinicio
   - Sincronización automática con overlay

### Características Implementadas
- ✅ Diseño responsive
- ✅ localStorage para persistencia
- ✅ Atajos de teclado (1, 2, S)
- ✅ Sincronización entre ventanas
- ✅ Interfaz limpia y profesional
- ✅ Compatible con OBS

---

## 🛠️ Cómo Usar Este Prompt

### Para Nuevas Funcionalidades
Cuando solicites una mejora o nueva función, incluye:
```
Objetivo: [Descripción clara]
Donde: [index.html / control.html / ambos]
Requisitos:
- [Requisito 1]
- [Requisito 2]
Ejemplo de cómo debería verse: [Descripción o screenshot]
```

### Para Reportar Bugs
```
Bug: [Descripción del problema]
Pasos para reproducir:
1. [Paso 1]
2. [Paso 2]
Comportamiento esperado: [Qué debería pasar]
Comportamiento actual: [Qué está pasando]
Archivos afectados: [index.html / control.html]
```

### Para Mantenimiento General
```
Tarea: [Descripción]
Prioridad: [Alta / Media / Baja]
Archivos a modificar: [Listar archivos]
Notas: [Información adicional]
```

---

## 📚 Estructura de Código

### index.html (Overlay)
```javascript
// Estado global que se sincroniza
let gameState = {
    player1: { name, role, points, sets, service, flag },
    player2: { name, role, points, sets, service, flag }
};

// Funciones principales
updateDisplay()  // Actualiza DOM
loadState()      // Carga de localStorage
window.addEventListener('storage')  // Escucha cambios
document.addEventListener('keydown')  // Atajos de teclado
```

### control.html (Panel)
```javascript
// Mismo gameState
let gameState = { ... };

// Funciones principales
loadState()      // Carga estado
updateData()     // Guarda cambios
changePoints()   // Incrementa/decrementa puntos
changeSets()     // Incrementa/decrementa sets
setService()     // Cambia quién sirve
resetAll()       // Reinicia todo
```

---

## 🎨 Guía de Estilo

### Colores Principales
- Fondo: Gradiente azul `#003d8c` → `#0052CC`
- Texto principal: Blanco `#ffffff`
- Texto secundario: Azul claro `#5ba3ff`
- Acentos: Azul `#0052CC`

### Tipografía
- Font: Arial, sans-serif
- Título/Nombre: 28px, bold, white
- Rol: 13px, italic, azul claro
- Puntos/Sets: 36px, bold, white
- Etiquetas: 10px, uppercase, gris

### Espaciado
- Padding filas: 30px horizontal, 30px vertical
- Gap entre elementos: 25-30px
- Separador entre jugadores: 1px rgba(255,255,255,0.15)

---

## 🔄 Flujo de Sincronización

```
Usuario edita en control.html
    ↓
updateData() / changePoints() / changeSets() / setService()
    ↓
localStorage.setItem('gameState', JSON.stringify(gameState))
    ↓
index.html escucha event 'storage'
    ↓
updateDisplay() actualiza DOM
    ↓
Overlay se actualiza en tiempo real
```

---

## ✅ Testing Manual

Cuando hagas cambios, verifica:

### Funcionalidad
- [ ] Editar nombres y roles actualiza overlay
- [ ] Cambiar banderas se refleja en overlay
- [ ] Botones +/- en puntos funcionan correctamente
- [ ] Botones +/- en sets funcionan correctamente
- [ ] Selector de servicio cambia la pelota azul
- [ ] Atajos de teclado (1, 2, S) funcionan en overlay
- [ ] Reinicio limpia todos los datos

### Sincronización
- [ ] Cambios en control.html aparecen en index.html
- [ ] Cambios en index.html (teclado) no afectan control.html
- [ ] Ambos usan el mismo navegador
- [ ] localStorage está habilitado

### Diseño
- [ ] Overlay se ve bien en 1920x1080
- [ ] Responsive en resoluciones menores
- [ ] Fondo es transparente
- [ ] Colores son legibles
- [ ] Fuentes tienen tamaño correcto

### OBS
- [ ] Captura de navegador funciona
- [ ] Chroma key oculta el fondo
- [ ] Posición y tamaño son ajustables
- [ ] No hay parpadeos o glitches

---

## 🚀 Mejoras Futuras Sugeridas

### Corto Plazo
- [ ] Agregar animación suave cuando cambian puntos
- [ ] Soporte para dobles (4 jugadores)
- [ ] Historial de puntos últimos 5 juegos
- [ ] Sonido cuando cambia servicio
- [ ] Botón para invertir orden de jugadores

### Mediano Plazo
- [ ] Base de datos para guardar partidos
- [ ] Mostrar histórico de sets ganados
- [ ] Timer automático para cambio de servicio
- [ ] Temas de colores personalizables
- [ ] Exportar resultados como JSON

### Largo Plazo
- [ ] API REST para control remoto
- [ ] App móvil para control
- [ ] Integración con plataformas de streaming
- [ ] Estadísticas avanzadas
- [ ] Modo multiples mesas simultáneas

---

## 📝 Convenciones de Código

### Variables
```javascript
// Siempre en camelCase
playerName, setScore, serviceActive, flagEmoji

// ID de elementos con guion
id="player1Name", id="sets1", id="serviceBall1"
```

### Funciones
```javascript
// Verbo + Sustantivo
updateDisplay()
changePoints()
loadState()
setService()
```

### Comentarios
```javascript
// Comentarios simples para una línea
/* Comentarios multi-línea
   para explicaciones complejas */
```

### Clases CSS
```css
/* kebab-case para clases */
.player-row
.stat-block
.service-ball
.player-info
```

---

## 🔍 Debugging

Si algo no funciona:

1. **localStorage no funciona**
   - Verifica si estás en navegación privada/incógnito
   - Abre DevTools → Application → LocalStorage

2. **Cambios no se sincronizan**
   - Verifica que ambas ventanas usen el MISMO navegador
   - Recarga el overlay (F5)
   - Limpia localStorage y reinicia

3. **Overlay no muestra cambios**
   - Abre DevTools (F12) en el overlay
   - Verifica console por errores
   - Confirma que localStorage tiene datos

4. **Estilos no se aplican**
   - Limpia caché del navegador (Ctrl+Shift+Delete)
   - Verifica que los selectores CSS sean correctos
   - Asegúrate que no hay conflictos de especificidad

---

## 📦 Desplegarse

### Opción 1: GitHub Pages
1. Crea repositorio en GitHub
2. Habilita GitHub Pages (Settings → Pages)
3. Renombra `index.html` → `overlay.html` (opcional)
4. URL será: `https://usuario.github.io/ping-pong-overlay/`

### Opción 2: Servidor Web
1. Sube `index.html` y `control.html` a tu servidor
2. URL será: `https://tu-dominio.com/ping-pong-overlay/`

### Para OBS
- Si es local: `file:///ruta/completa/a/index.html`
- Si es online: `https://tu-url/overlay.html`

---

## 🤝 Colaboración

Si otros desarrolladores contribuyen:
1. Deben seguir las convenciones de código
2. Cada feature en una rama separada
3. PR debe incluir descripción de cambios
4. Verificar que tests manuales pasen
5. Actualizar README si es necesario

---

## 📞 Notas Importantes

- **NUNCA** cambies el nombre de gameState sin sincronizar ambos archivos
- **SIEMPRE** serializa/deserializa JSON al usar localStorage
- **SIEMPRE** prueba en múltiples navegadores
- **SIEMPRE** verifica responsive design
- **SIEMPRE** mantén localStorage.setItem() al final de cambios

---

## 📄 Formato de Issues y PRs

### Issue Title
`[TIPO] Descripción breve - contexto si es necesario`

Ejemplos:
- `[BUG] Overlay no se sincroniza con control`
- `[FEATURE] Agregar timer automático para servicio`
- `[MEJORA] Optimizar performance en cambios rápidos`

### PR Description
```markdown
## Descripción
Qué cambios se hacen y por qué

## Tipo de cambio
- [ ] Bug fix
- [ ] Nueva feature
- [ ] Mejora de código
- [ ] Actualización de docs

## Cambios
- [ ] index.html
- [ ] control.html
- [ ] README.md
- [ ] .gitignore

## Testing
- [ ] Funcionalidad verificada
- [ ] Diseño responsive verificado
- [ ] localStorage funciona
- [ ] OBS compatible

## Screenshots (si aplica)
[Agregar imágenes]
```

---

**Este prompt se actualiza conforme el proyecto evoluciona. Última actualización: Octubre 2025**
