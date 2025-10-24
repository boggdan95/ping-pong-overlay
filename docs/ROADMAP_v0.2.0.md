# 🗺️ Roadmap v0.2.0 - Mejoras Planificadas

## 📅 Fecha de Inicio
Octubre 2025

## 🎯 Objetivo General
Mejorar la experiencia de uso con una sola pantalla y agregar personalización visual (logo + selector de fondo para mejor chroma key).

---

## ✨ Nuevas Características

### 1. 🖼️ Logo Personalizable

**Descripción:**
- Logo dentro del cintillo del scoreboard (a la izquierda o derecha)
- Carga flexible: archivo local O URL de imagen
- Persistencia en localStorage

**Implementación Técnica:**
```javascript
gameState = {
  // ... campos existentes
  logo: {
    url: '',           // URL de la imagen o data URI
    position: 'left',  // 'left' o 'right'
    enabled: true      // mostrar/ocultar logo
  }
}
```

**UI en control.html:**
- Campo de texto para URL
- Botón de upload para archivo local
- Radio buttons para posición (izquierda/derecha)
- Toggle para mostrar/ocultar
- Preview del logo cargado

**Diseño en index.html:**
- Logo integrado dentro del `.scoreboard` container
- Tamaño: ~80-100px altura
- Posición ajustable vía flex/grid
- Mantener responsive design

---

### 2. 🎨 Selector de Color de Fondo (Chroma Key Mejorado)

**Descripción:**
- Selector de color para el fondo del overlay
- Colores predefinidos optimizados para chroma key
- Color personalizado (color picker)

**Colores Predefinidos:**
- 🟢 Verde Chroma: `#00FF00`
- 🔵 Azul Chroma: `#0000FF`
- 🟣 Magenta Chroma: `#FF00FF`
- 🔴 Rojo Chroma: `#FF0000`
- ⚪ Transparente (actual)
- 🎨 Degradado Azul (actual por defecto)
- ✏️ Personalizado (color picker)

**Implementación Técnica:**
```javascript
gameState = {
  // ... campos existentes
  background: {
    type: 'gradient',  // 'solid', 'gradient', 'transparent'
    color: '#00FF00',  // color sólido
    gradient: {
      start: '#003d8c',
      end: '#0052CC',
      angle: '135deg'
    }
  }
}
```

**UI en control.html:**
- Botones de colores predefinidos
- Color picker para personalizado
- Preview del color seleccionado
- Guardar y aplicar

**CSS Dinámico en index.html:**
```javascript
function applyBackground() {
  const bg = gameState.background;
  if (bg.type === 'solid') {
    scoreboard.style.background = bg.color;
  } else if (bg.type === 'gradient') {
    scoreboard.style.background = `linear-gradient(${bg.gradient.angle}, ${bg.gradient.start}, ${bg.gradient.end})`;
  } else if (bg.type === 'transparent') {
    scoreboard.style.background = 'transparent';
  }
}
```

---

### 3. 🪟 Panel de Control Compacto y Flotante

**Descripción:**
- Diseño minimalista y compacto
- Ventana flotante redimensionable
- Fácil de posicionar mientras usas OBS
- Optimizado para trabajar con una sola pantalla

**Mejoras UI:**
- Reducir padding y márgenes
- Botones más compactos
- Layout en columnas (2-3 columnas)
- Max-width: 600px → 400px
- Secciones colapsables (acordeón)

**Características Adicionales:**
- Botón "Modo Compacto" / "Modo Completo"
- Guardar posición de ventana
- Always-on-top (si es posible con CSS)
- Drag & drop para reposicionar

**CSS para Modo Flotante:**
```css
.compact-mode {
  max-width: 350px;
  max-height: 80vh;
  overflow-y: auto;
  position: fixed;
  top: 20px;
  right: 20px;
  z-index: 9999;
}

.collapsible-section {
  /* Secciones que se pueden minimizar */
}
```

---

## 🔧 Mejoras Técnicas

### localStorage Schema v2
```javascript
{
  version: '0.2.0',  // Nuevo campo para versionado
  player1: { name, role, points, sets, service, flag },
  player2: { name, role, points, sets, service, flag },
  logo: {
    url: '',
    position: 'left',
    enabled: true
  },
  background: {
    type: 'gradient',
    color: '#00FF00',
    gradient: { start, end, angle }
  },
  settings: {
    compactMode: false,
    panelPosition: { x: 0, y: 0 }
  }
}
```

### Migración de Datos
- Detectar versión antigua (sin campo `version`)
- Migrar automáticamente agregando campos nuevos
- Mantener compatibilidad hacia atrás

---

## 📝 Tareas de Desarrollo

### Fase 1: Logo (Prioridad Alta)
- [ ] Diseñar layout del logo en el cintillo
- [ ] Implementar upload de archivo local
- [ ] Implementar carga por URL
- [ ] Guardar en localStorage (base64 para archivos)
- [ ] Toggle izquierda/derecha
- [ ] Preview en control.html
- [ ] Responsive design

### Fase 2: Selector de Color (Prioridad Alta)
- [ ] Crear botones de colores predefinidos
- [ ] Implementar color picker personalizado
- [ ] Aplicar color dinámicamente en index.html
- [ ] Guardar preferencia en localStorage
- [ ] Preview en tiempo real
- [ ] Documentar mejores colores para chroma

### Fase 3: Panel Compacto (Prioridad Media)
- [ ] Diseño compacto responsive
- [ ] Toggle modo compacto/completo
- [ ] Secciones colapsables (acordeón)
- [ ] Guardar estado de secciones
- [ ] Optimizar para pantallas pequeñas
- [ ] Mejorar UX en móvil/tablet

### Fase 4: Testing & Documentación (Prioridad Alta)
- [ ] Probar en OBS con diferentes colores chroma
- [ ] Probar carga de logos (PNG, JPG, SVG, GIF)
- [ ] Verificar performance con imágenes grandes
- [ ] Actualizar README.md
- [ ] Actualizar docs/PROMPT.md
- [ ] Crear guía de uso de nuevas features
- [ ] Screenshots/GIFs demostrativos

---

## 🎨 Diseño Visual Propuesto

### Opción A: Logo a la Izquierda
```
┌────────────────────────────────────────────────────┐
│  [LOGO]  Player 1 | Puntos: 7 | Sets: 1 | ●       │
├────────────────────────────────────────────────────┤
│  [LOGO]  Player 2 | Puntos: 5 | Sets: 0 | ○       │
└────────────────────────────────────────────────────┘
```

### Opción B: Logo a la Derecha
```
┌────────────────────────────────────────────────────┐
│  Player 1 | Puntos: 7 | Sets: 1 | ●       [LOGO]  │
├────────────────────────────────────────────────────┤
│  Player 2 | Puntos: 5 | Sets: 0 | ○       [LOGO]  │
└────────────────────────────────────────────────────┘
```

---

## 📊 Criterios de Éxito

✅ Logo se carga correctamente (local y URL)
✅ Logo aparece en la posición seleccionada
✅ Selector de color funciona en tiempo real
✅ Chroma key mejora con colores sólidos
✅ Panel compacto es usable en una pantalla
✅ localStorage persiste todos los cambios
✅ Documentación actualizada
✅ Sin bugs en navegadores modernos

---

## 🚀 Release Plan

1. **Desarrollo en rama:** `feature/v0.2.0`
2. **Testing:** Pruebas en local con OBS
3. **Merge a main:** Cuando todo esté listo
4. **Tag:** `v0.2.0`
5. **GitHub Release:** Con changelog detallado
6. **Documentación:** Actualizar README y docs

---

## 🔮 Ideas Futuras (v0.3.0+)

- [ ] Temas de colores predefinidos (oscuro, claro, neón)
- [ ] Animaciones al cambiar puntos/sets
- [ ] Historial de puntos (últimos 5 rallies)
- [ ] Timer automático para cambio de servicio
- [ ] Soporte para dobles (4 jugadores)
- [ ] Exportar configuración (JSON)
- [ ] Importar configuración
- [ ] Múltiples logos (sponsor rotation)

---

**Última actualización:** Octubre 2025
**Estado:** 🚧 En Planificación
