# Roadmap v1.0.0

## Objetivo
Lanzar la versión 1.0.0 del sistema de overlay de ping pong con funcionalidades completas para streaming profesional.

## Features a implementar

### 1. Edición manual de marcadores ✅ Prioridad Alta
**Objetivo:** Permitir corrección de errores cuando se confirma un resultado incorrecto.

**Implementación:**
- Click en el número de puntos/sets en `control.html` para editar directamente
- Input numérico temporal que reemplaza el botón +/-
- Validación básica (no negativos)
- Sincronización automática con `index.html` vía localStorage

**Archivos a modificar:**
- `control.html` (agregar event listeners y input temporal)

---

### 2. Configuración de sets para ganar ✅ Prioridad Alta
**Objetivo:** Definir cuántos sets se necesitan para ganar el partido (mejor de 3, mejor de 5, etc.)

**Implementación:**
- Dropdown en `control.html` con opciones:
  - Mejor de 3 (gana con 2 sets)
  - Mejor de 5 (gana con 3 sets)
  - Mejor de 7 (gana con 4 sets)
  - Libre (sin límite)
- Guardar en `gameState.matchConfig.setsToWin`
- Detección automática de ganador cuando se alcanza el objetivo

**Archivos a modificar:**
- `control.html` (UI del selector)
- `index.html` (lógica de detección de ganador)

---

### 3. Pantalla de ganador con resultado final ✅ Prioridad Alta
**Objetivo:** Mostrar overlay cuando alguien gana el partido con nombre, bandera y resultado.

**Implementación:**
- Overlay fullscreen en `index.html` que aparece al detectar ganador
- Mostrar:
  - Nombre del ganador
  - Bandera
  - Resultado final (ej: "3-1")
  - Texto "¡GANADOR!" o similar
- Animación opcional (fade in + confetti/fuegos artificiales)
- Toggle en `control.html` para:
  - Activar/desactivar animaciones
  - Mostrar/ocultar manualmente la pantalla de ganador
  - Botón "Reset" que limpia ganador y vuelve al juego

**Archivos a modificar:**
- `index.html` (overlay de ganador + CSS + animaciones)
- `control.html` (controles de activación/desactivación)

---

### 4. Sistema de modalidades de juego ✅ Prioridad Media
**Objetivo:** Soportar diferentes formatos de competencia.

**Implementación:**

#### 4.1 Individual (actual)
- Mantener como está: 1v1

#### 4.2 Dobles (2v2)
- Mostrar 2 nombres por lado en el overlay
- Input doble en `control.html`:
  - Jugador 1A / Jugador 1B
  - Jugador 2A / Jugador 2B
- Layout ajustado en `index.html` para mostrar ambos nombres

#### 4.3 Equipos (marcador global)
- Marcador de sets representa victorias de equipo
- Opcional: Registro de partidos individuales jugados
- Mostrar nombres de equipos en lugar de jugadores individuales
- Sub-marcador opcional con historial de partidos

**Archivos a modificar:**
- `control.html` (selector de modalidad + inputs dinámicos)
- `index.html` (layouts diferentes según modalidad)

---

### 5. Sistema de autosugerencia desde CSV ✅ Prioridad Baja
**Objetivo:** Facilitar ingreso rápido de jugadores frecuentes.

**Implementación:**
- Input de archivo CSV en `control.html`
- Formato esperado: `nombre,bandera,rol`
  ```
  Juan Pérez,🇪🇸,Jugador 1
  María González,🇦🇷,Jugador 2
  ```
- Al escribir en los inputs de nombre, mostrar sugerencias filtradas
- Click en sugerencia autocompleta nombre + bandera
- Datos guardados en localStorage para persistencia

**Archivos a modificar:**
- `control.html` (upload CSV + autocomplete UI + parsing)

---

### 6. Preparar release v1.0.0 ✅ Última etapa
**Tareas finales:**
- [ ] Testing completo de todas las features
- [ ] Verificar sincronización localStorage en todos los flujos
- [ ] Probar integración con OBS (chroma key + crop)
- [ ] Actualizar README.md con nuevas features
- [ ] Crear tag v1.0.0
- [ ] Publicar en repositorio público

---

## Estado actual del proyecto
- ✅ Sistema de donaciones implementado y testeado
- ✅ Documentación de sistema premium eliminada
- ✅ Sincronización localStorage funcionando
- ✅ Integración OBS validada (1 ventana + 3 pestañas)

## Notas técnicas importantes

### Estructura gameState (actualizar según features)
```javascript
{
  // Actual
  player1: { name, role, points, sets, service, flag },
  player2: { name, role, points, sets, service, flag },

  // Nuevo en v1.0.0
  matchConfig: {
    mode: 'individual' | 'doubles' | 'teams',
    setsToWin: 2 | 3 | 4 | null, // null = libre
    animationsEnabled: true | false
  },

  winner: {
    detected: true | false,
    player: 'player1' | 'player2',
    finalScore: '3-1'
  },

  // Solo para modo dobles
  doubles: {
    player1A: { name, flag },
    player1B: { name, flag },
    player2A: { name, flag },
    player2B: { name, flag }
  },

  // Solo para modo equipos
  teams: {
    team1: { name, wins: 0 },
    team2: { name, wins: 0 }
  }
}
```

### Orden de implementación
1. Edición manual de marcadores (rápido, útil inmediatamente)
2. Configuración de sets (base para detectar ganador)
3. Pantalla de ganador con resultado (usa la config anterior)
4. Modalidades de juego (más complejo)
5. Autosugerencia CSV (feature adicional)

---

## Contexto de trabajo
- Sistema actual funciona bien con OBS: captura de ventana + croma + crop
- 3 pestañas abiertas en mismo navegador para sincronización
- No cambiar arquitectura de sincronización localStorage
- Mantener compatibilidad con diseño actual (transparente + gradiente azul)
