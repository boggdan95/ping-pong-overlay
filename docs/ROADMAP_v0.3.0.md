# 🗺️ Roadmap v0.3.0 - Animaciones y Características Avanzadas

## 📅 Fecha de Inicio
Pendiente

## 🎯 Objetivo General
Agregar animaciones profesionales, temas visuales, y características avanzadas para mejorar la experiencia de streaming.

---

## ✨ Nuevas Características Prioritarias

### 1. 🎬 Animaciones y Transiciones

**Descripción:**
- Animaciones suaves al cambiar puntos y sets
- Transiciones al cambiar de jugador en servicio
- Efectos visuales al ganar un set
- Animación de entrada/salida del scoreboard

**Animaciones Propuestas:**
- **Punto anotado**: Pulso en el número + flash de color
- **Set ganado**: Confetti animation + celebración
- **Cambio de servicio**: Rotación suave de la pelota
- **Entrada**: Slide-in desde arriba/abajo
- **Salida**: Fade-out suave

**Implementación Técnica:**
```javascript
// CSS animations
@keyframes pointScore {
  0% { transform: scale(1); }
  50% { transform: scale(1.3); color: #FFD700; }
  100% { transform: scale(1); }
}

@keyframes setWin {
  0% { transform: scale(1) rotate(0deg); }
  25% { transform: scale(1.1) rotate(5deg); }
  50% { transform: scale(1.2) rotate(-5deg); }
  75% { transform: scale(1.1) rotate(3deg); }
  100% { transform: scale(1) rotate(0deg); }
}
```

**UI en control.html:**
- Toggle para activar/desactivar animaciones
- Selector de velocidad (lenta/normal/rápida)
- Preview de animaciones

---

### 2. 🎨 Temas de Colores Predefinidos

**Descripción:**
- Temas visuales completos para el scoreboard
- Paletas de colores coordinadas
- Cambio rápido entre temas

**Temas Propuestos:**
- 🌙 **Oscuro Moderno**: Grises oscuros, acentos neón
- ☀️ **Claro Minimalista**: Blancos, grises claros, azul suave
- 🔥 **Neón Vibrante**: Negro + colores neón (rosa, verde, azul)
- 🏆 **Dorado Elegante**: Azul oscuro + dorado + blanco
- 🌊 **Océano**: Azules y turquesas degradados
- 🌲 **Bosque**: Verdes naturales + marrón

**Implementación Técnica:**
```javascript
const themes = {
  dark: {
    scoreboard: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)',
    text: '#ffffff',
    accent: '#00f5ff',
    serviceBall: '#00f5ff'
  },
  light: {
    scoreboard: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
    text: '#333333',
    accent: '#0052CC',
    serviceBall: '#0052CC'
  },
  neon: {
    scoreboard: '#000000',
    text: '#ffffff',
    accent: '#ff00ff',
    serviceBall: '#00ff00'
  }
  // ... más temas
};
```

**UI en control.html:**
- Grid de temas con preview
- Botón de aplicar
- Opción de crear tema personalizado
- Guardar temas favoritos

---

### 3. 📊 Historial de Puntos (Rally Tracker)

**Descripción:**
- Mostrar últimos 5-10 puntos anotados
- Indicador visual de quién ganó cada rally
- Timeline horizontal o vertical

**Diseño Visual:**
```
Últimos rallies:
J1 | J2 | J1 | J1 | J2
●  | ○  | ●  | ●  | ○
```

**Implementación Técnica:**
```javascript
gameState = {
  // ... campos existentes
  pointHistory: [
    { player: 1, timestamp: 1234567890 },
    { player: 2, timestamp: 1234567892 },
    // ... máximo 10
  ]
}
```

**UI en overlay:**
- Barra horizontal debajo del scoreboard
- Puntos como círculos coloreados
- Fade-in al agregar nuevo punto
- Auto-scroll al llegar al límite

**UI en control.html:**
- Toggle para mostrar/ocultar historial
- Botón de limpiar historial
- Número de puntos a mostrar (5/10/15)

---

### 4. ⏱️ Timer y Estadísticas de Tiempo

**Descripción:**
- Timer de partido (duración total)
- Tiempo promedio por rally
- Tiempo entre puntos
- Pausas automáticas

**Características:**
- **Timer de partido**: Cuenta desde inicio hasta fin
- **Pausa automática**: Al cambiar de set
- **Estadísticas**: Rally más largo, más corto, promedio
- **Countdown**: Para warmup o descansos (opcional)

**Implementación Técnica:**
```javascript
gameState = {
  // ... campos existentes
  timer: {
    matchStart: null,
    matchDuration: 0,
    isPaused: false,
    rallyStart: null,
    rallyTimes: []
  }
}
```

**UI en overlay:**
- Timer en esquina superior
- Formato: MM:SS
- Color cambia según estado (activo/pausado)

**UI en control.html:**
- Botones: Start/Pause/Reset timer
- Mostrar estadísticas de tiempo
- Toggle para mostrar/ocultar timer en overlay

---

### 5. 🎮 Soporte para Dobles (4 Jugadores)

**Descripción:**
- Modo dobles con 4 jugadores
- Equipos con nombres
- Rotación de servicio en dobles

**Diseño de Equipos:**
```
Equipo 1: J1 + J2
Equipo 2: J3 + J4
```

**Implementación Técnica:**
```javascript
gameState = {
  mode: 'singles', // o 'doubles'
  team1: {
    name: 'Equipo A',
    player1: { name: 'Juan', flag: 'GUA' },
    player2: { name: 'Pedro', flag: 'ESA' },
    points: 0,
    sets: 0,
    service: true
  },
  team2: { /* ... */ }
}
```

**UI en overlay:**
- Layout ajustado para mostrar 4 jugadores
- Nombres de equipo destacados
- Indicador de quién sirve en el equipo

**UI en control.html:**
- Toggle: Singles/Doubles
- Inputs para 4 jugadores
- Selector de servicio por jugador

---

### 6. 💾 Exportar/Importar Configuración

**Descripción:**
- Exportar configuración completa a JSON
- Importar configuración guardada
- Compartir configuraciones entre usuarios
- Presets de torneos

**Funcionalidades:**
- **Exportar**: Descargar JSON con toda la configuración
- **Importar**: Cargar JSON desde archivo
- **Presets**: Configuraciones predefinidas (torneo local, internacional, etc.)
- **Compartir**: Copiar configuración como texto

**Implementación Técnica:**
```javascript
function exportConfig() {
  const config = {
    version: '0.3.0',
    timestamp: Date.now(),
    gameState: gameState,
    settings: { /* tema, animaciones, etc. */ }
  };

  const blob = new Blob([JSON.stringify(config, null, 2)],
    { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  // Trigger download
}

function importConfig(file) {
  const reader = new FileReader();
  reader.onload = (e) => {
    const config = JSON.parse(e.target.result);
    // Validar y aplicar
    gameState = config.gameState;
    updateDisplay();
  };
  reader.readAsText(file);
}
```

**UI en control.html:**
- Botón "Exportar Configuración"
- Botón "Importar Configuración"
- Sección de Presets
- Preview de configuración antes de importar

---

### 7. 🔄 Rotación de Logos (Sponsors)

**Descripción:**
- Múltiples logos que rotan automáticamente
- Intervalos configurables
- Transiciones suaves entre logos

**Características:**
- Agregar hasta 5-10 logos
- Intervalo de rotación: 5/10/15/30 segundos
- Transición: Fade/Slide/Zoom
- Pausar rotación en hover

**Implementación Técnica:**
```javascript
gameState = {
  // ... campos existentes
  logos: [
    { url: 'logo1.png', position: 'left', duration: 10 },
    { url: 'logo2.png', position: 'left', duration: 10 },
    // ... más logos
  ],
  logoRotation: {
    enabled: true,
    currentIndex: 0,
    interval: 10000 // ms
  }
}

setInterval(() => {
  if (gameState.logoRotation.enabled) {
    gameState.logoRotation.currentIndex =
      (gameState.logoRotation.currentIndex + 1) % gameState.logos.length;
    updateLogo();
  }
}, gameState.logoRotation.interval);
```

**UI en control.html:**
- Lista de logos con preview
- Botón "Agregar logo"
- Configurar intervalo
- Toggle de rotación automática

---

## 🔧 Mejoras Técnicas

### Performance y Optimización
- Lazy loading de imágenes
- Debounce en inputs para reducir actualizaciones
- Service Worker para cache offline
- Optimización de animaciones con `will-change`

### Accesibilidad
- Contraste mejorado para temas claros
- ARIA labels para screen readers
- Keyboard navigation mejorada
- Soporte para reducción de movimiento (`prefers-reduced-motion`)

### Testing
- Unit tests para funciones críticas
- E2E tests con Playwright
- Testing en diferentes navegadores
- Performance benchmarks

---

## 📝 Prioridades Sugeridas

### Alta Prioridad (Must Have)
1. ✅ Animaciones básicas (puntos/sets)
2. ✅ Temas de colores (3-4 temas)
3. ✅ Exportar/Importar configuración

### Media Prioridad (Should Have)
4. ⚡ Historial de puntos
5. ⚡ Timer de partido
6. ⚡ Rotación de logos

### Baja Prioridad (Nice to Have)
7. 🎯 Soporte para dobles
8. 🎯 Estadísticas avanzadas
9. 🎯 Temas personalizados

---

## 🎨 Mockups de Nuevas Características

### Animación de Punto
```
┌────────────────────────┐
│  Player 1             │
│  Puntos: 7 → 8 ✨     │  ← Pulso + Flash
└────────────────────────┘
```

### Historial de Rallies
```
┌───────────────────────────────────┐
│ Últimos rallies: ● ○ ● ● ○       │
└───────────────────────────────────┘
```

### Selector de Temas
```
┌─────────┬─────────┬─────────┐
│ Oscuro  │  Claro  │  Neón   │
│  [👁️]   │  [👁️]   │  [👁️]   │
└─────────┴─────────┴─────────┘
```

---

## 📊 Criterios de Éxito

✅ Animaciones fluidas (60fps)
✅ Temas aplicables en <1 segundo
✅ Historial visible y claro
✅ Timer preciso (±1 segundo)
✅ Exportar/importar sin errores
✅ Dobles funcional con 4 jugadores
✅ Rotación de logos smooth

---

## 🚀 Release Plan

1. **Desarrollo en rama:** `feature/v0.3.0`
2. **Fases:**
   - Fase 1: Animaciones + Temas (2 semanas)
   - Fase 2: Historial + Timer (1 semana)
   - Fase 3: Exportar/Importar (1 semana)
   - Fase 4: Features avanzadas (2 semanas)
3. **Testing:** Pruebas extensivas con OBS
4. **Merge a main:** Cuando todo esté listo
5. **Tag:** `v0.3.0`
6. **GitHub Release:** Con changelog detallado

---

## 🔮 Ideas para Futuras Versiones (v0.4.0+)

- [ ] Modo torneo (bracket/eliminatorias)
- [ ] Integración con APIs externas (resultados en vivo)
- [ ] Efectos de sonido configurables
- [ ] Overlays adicionales (lower thirds, banners)
- [ ] Multi-idioma (ES/EN/PT)
- [ ] Dashboard web para control remoto
- [ ] WebSocket para sincronización en tiempo real
- [ ] Modo espectador (solo lectura)
- [ ] Replays de puntos destacados
- [ ] Integración con Twitch chat

---

**Última actualización:** Octubre 2024
**Estado:** 📋 Planificación Inicial
**Versión objetivo:** v0.3.0
