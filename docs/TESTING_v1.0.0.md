# Testing v1.0.0 - Reporte de Pruebas

**Fecha**: 2025-11-05
**Versión**: v1.0.0-rc
**Tester**: Claude Code AI

---

## 1. Sistema de Autosugerencia (Feature 5)

### 1.1 Carga de CSV
- [ ] **Test 1.1.1**: Cargar archivo CSV válido con 15 jugadores
  - **Pasos**:
    1. Ir a Configuración → Base de Datos de Jugadores
    2. Click en "📁 Cargar CSV de Jugadores"
    3. Seleccionar `jugadores-ejemplo.csv`
  - **Resultado esperado**:
    - Mensaje "✅ 15 jugadores cargados exitosamente"
    - Contador muestra "✅ 15 jugadores cargados"
    - Toggle de autocompletado visible
    - Botón limpiar DB visible

- [ ] **Test 1.1.2**: Cargar archivo CSV con formato incorrecto
  - **Pasos**: Cargar CSV con líneas incompletas o malformadas
  - **Resultado esperado**: Solo se cargan líneas válidas, se ignoran las incorrectas

- [ ] **Test 1.1.3**: Cargar archivo CSV vacío
  - **Pasos**: Cargar CSV sin contenido
  - **Resultado esperado**: Mensaje "❌ No se encontraron jugadores válidos"

### 1.2 Autocompletado en Modo Individual
- [ ] **Test 1.2.1**: Autocompletado al escribir (Jugador 1)
  - **Pasos**:
    1. Tab Configuración → Individual → Nombre Jugador 1
    2. Escribir "Juan"
  - **Resultado esperado**:
    - Dropdown muestra "Juan Pérez"
    - Muestra código "ESP" y país "España"

- [ ] **Test 1.2.2**: Seleccionar jugador del dropdown
  - **Pasos**:
    1. Escribir "Mar"
    2. Click en "María González"
  - **Resultado esperado**:
    - Campo nombre: "María González"
    - Campo bandera: "ARG"
    - Dropdown se oculta
    - updateData() se ejecuta

- [ ] **Test 1.2.3**: Autocompletado con focus en campo vacío
  - **Pasos**: Click en campo vacío "Nombre Jugador 1"
  - **Resultado esperado**:
    - Dropdown muestra todos los 15 jugadores
    - Scroll disponible si no caben todos

- [ ] **Test 1.2.4**: Autocompletado Jugador 2
  - **Pasos**: Repetir tests 1.2.1-1.2.3 en campo Jugador 2
  - **Resultado esperado**: Mismo comportamiento

### 1.3 Autocompletado en Modo Equipos
- [ ] **Test 1.3.1**: Autocompletado Jugador Equipo 1
  - **Pasos**:
    1. Cambiar a modo Equipos
    2. Escribir en "Jugador (Equipo 1)"
  - **Resultado esperado**: Autocompletado funciona igual

- [ ] **Test 1.3.2**: Autocompletado Jugador Equipo 2
  - **Pasos**: Escribir en "Jugador (Equipo 2)"
  - **Resultado esperado**: Autocompletado funciona igual

### 1.4 Toggle On/Off del Autocompletado
- [ ] **Test 1.4.1**: Desactivar autocompletado
  - **Pasos**:
    1. Con jugadores cargados
    2. Click en "🚫 Desactivado"
  - **Resultado esperado**:
    - Botón "Desactivado" se marca activo
    - Al escribir en nombres, NO aparece dropdown
    - Al hacer focus, NO aparece dropdown

- [ ] **Test 1.4.2**: Reactivar autocompletado
  - **Pasos**: Click en "✅ Activado"
  - **Resultado esperado**:
    - Botón "Activado" se marca activo
    - Autocompletado funciona normalmente

- [ ] **Test 1.4.3**: Persistencia del estado
  - **Pasos**:
    1. Desactivar autocompletado
    2. Refrescar página (F5)
  - **Resultado esperado**:
    - Estado sigue desactivado
    - Botón "Desactivado" sigue activo

### 1.5 Gestión de Base de Datos
- [ ] **Test 1.5.1**: Limpiar base de datos
  - **Pasos**:
    1. Con jugadores cargados
    2. Click en "🗑️ Limpiar Base de Datos"
    3. Confirmar
  - **Resultado esperado**:
    - Mensaje "✅ Base de datos limpiada"
    - Contador desaparece
    - Toggle desaparece
    - Botón limpiar desaparece
    - Autocompletado no funciona

- [ ] **Test 1.5.2**: Recargar jugadores
  - **Pasos**:
    1. Cargar CSV con 15 jugadores
    2. Cargar CSV diferente con 10 jugadores
  - **Resultado esperado**:
    - Jugadores anteriores reemplazados
    - Contador muestra "✅ 10 jugadores cargados"

---

## 2. Cambio de Modo de Juego

### 2.1 Reset al Cambiar Modo
- [ ] **Test 2.1.1**: Cambiar de Individual a Dobles
  - **Pasos**:
    1. Modo Individual con puntos 5-3, sets 1-0
    2. Cambiar selector a "👥 Dobles (2v2)"
    3. Confirmar modal
  - **Resultado esperado**:
    - Modal: "Al cambiar el modo de juego se resetearán todos los puntos y sets. ¿Deseas continuar?"
    - Al confirmar: Puntos 0-0, Sets 0-0
    - Servicio resetea a Jugador 1
    - Historial limpio
    - Ganador resetea

- [ ] **Test 2.1.2**: Cancelar cambio de modo
  - **Pasos**:
    1. Modo Individual con puntos 7-4
    2. Intentar cambiar a Equipos
    3. Cancelar modal
  - **Resultado esperado**:
    - Selector vuelve a "👤 Individual (1v1)"
    - Puntos y sets se mantienen 7-4

- [ ] **Test 2.1.3**: Cambiar entre todos los modos
  - **Pasos**: Individual → Dobles → Equipos → Individual
  - **Resultado esperado**:
    - Cada cambio muestra modal
    - Cada cambio resetea todo
    - Secciones correctas visibles

### 2.2 Visibilidad de Secciones
- [ ] **Test 2.2.1**: Modo Individual
  - **Resultado esperado**:
    - Visible: individualSection
    - Oculto: doublesSection, teamsSection
    - Botón "Siguiente Partido" oculto

- [ ] **Test 2.2.2**: Modo Dobles
  - **Resultado esperado**:
    - Visible: doublesSection
    - Oculto: individualSection, teamsSection
    - Botón "Siguiente Partido" oculto

- [ ] **Test 2.2.3**: Modo Equipos
  - **Resultado esperado**:
    - Visible: teamsSection
    - Oculto: individualSection, doublesSection
    - Botón "Siguiente Partido" visible

---

## 3. Edición Manual de Marcadores (Feature 1)

### 3.1 Editar Puntos
- [ ] **Test 3.1.1**: Click en puntos Jugador 1
  - **Pasos**: Click en el número de puntos
  - **Resultado esperado**:
    - Aparece input temporal
    - Input tiene valor actual
    - Foco automático en input

- [ ] **Test 3.1.2**: Cambiar puntos manualmente
  - **Pasos**:
    1. Click en puntos (valor: 5)
    2. Escribir "8"
    3. Enter o blur
  - **Resultado esperado**:
    - Puntos cambian a 8
    - Input desaparece
    - Número 8 visible
    - updateData() ejecutado

- [ ] **Test 3.1.3**: Valores negativos
  - **Pasos**: Intentar poner puntos negativos "-3"
  - **Resultado esperado**: Se convierte a 0

### 3.2 Editar Sets
- [ ] **Test 3.2.1**: Click en sets Jugador 1
  - **Pasos**: Click en número de sets
  - **Resultado esperado**: Input temporal con valor actual

- [ ] **Test 3.2.2**: Cambiar sets manualmente
  - **Pasos**: Cambiar de 1 a 2 sets
  - **Resultado esperado**: Sets actualizados correctamente

---

## 4. Configuración de Sets (Feature 2)

### 4.1 Mejor de 3
- [ ] **Test 4.1.1**: Seleccionar Mejor de 3
  - **Pasos**: Click en botón "Mejor de 3"
  - **Resultado esperado**:
    - Botón marcado activo
    - Label: "Primero en ganar 2 sets"
    - gameState.matchMode = 'best-of-3'

- [ ] **Test 4.1.2**: Detectar ganador en mejor de 3
  - **Pasos**:
    1. Modo: Mejor de 3
    2. J1 gana set 11-5 (J1: 1 set)
    3. J1 gana set 11-8 (J1: 2 sets)
  - **Resultado esperado**:
    - Modal ganador aparece
    - J1 declarado ganador
    - Score final: "2-0"

### 4.2 Mejor de 5
- [ ] **Test 4.2.1**: Seleccionar Mejor de 5
  - **Resultado esperado**:
    - Label: "Primero en ganar 3 sets"
    - gameState.matchMode = 'best-of-5'

- [ ] **Test 4.2.2**: Detectar ganador en mejor de 5
  - **Pasos**: J1 gana 3 sets
  - **Resultado esperado**: Ganador detectado a los 3 sets

### 4.3 Mejor de 7
- [ ] **Test 4.3.1**: Seleccionar Mejor de 7
  - **Resultado esperado**:
    - Label: "Primero en ganar 4 sets"
    - gameState.matchMode = 'best-of-7'

- [ ] **Test 4.3.2**: Detectar ganador en mejor de 7
  - **Pasos**: J2 gana 4 sets
  - **Resultado esperado**: Ganador detectado a los 4 sets

---

## 5. Pantalla de Ganador (Feature 3)

### 5.1 Detección Automática
- [ ] **Test 5.1.1**: Ganador detectado al cumplir sets
  - **Pasos**:
    1. Mejor de 5 (ganar 3 sets)
    2. J1: 3 sets, J2: 1 set
  - **Resultado esperado**:
    - Modal confirmar ganador aparece
    - Nombre: Jugador 1
    - Score: "3-1"

### 5.2 Modal de Confirmación
- [ ] **Test 5.2.1**: Confirmar ganador
  - **Pasos**: Click en "✅ Confirmar"
  - **Resultado esperado**:
    - Overlay de ganador visible en index.html
    - Confetti animado (si activado)
    - Emoji seleccionado visible
    - Botón toggle ganador visible en control

- [ ] **Test 5.2.2**: Cancelar ganador
  - **Pasos**: Click en "❌ Cancelar"
  - **Resultado esperado**:
    - Modal se cierra
    - Marcador actual se mantiene
    - Permite corrección con botón "−"

### 5.3 Selector de Emoji
- [ ] **Test 5.3.1**: Cambiar emoji a Medalla
  - **Pasos**:
    1. Configuración → Emoji: "🥇 Medalla"
    2. Detectar ganador
  - **Resultado esperado**: Overlay muestra 🥇

- [ ] **Test 5.3.2**: Todos los emojis
  - **Pasos**: Probar 🏆, 🥇, 🏅, ⭐, 👑
  - **Resultado esperado**: Cada emoji se muestra correctamente

### 5.4 Toggle de Animaciones
- [ ] **Test 5.4.1**: Desactivar animaciones
  - **Pasos**:
    1. Configuración → Animaciones: "🚫 Desactivadas"
    2. Detectar ganador
  - **Resultado esperado**:
    - Overlay visible
    - SIN confetti

- [ ] **Test 5.4.2**: Activar animaciones
  - **Resultado esperado**: Confetti se muestra

---

## 6. Modalidades de Juego (Feature 4)

### 6.1 Modo Individual (1v1)
- [ ] **Test 6.1.1**: Mostrar nombres
  - **Pasos**:
    1. Individual: J1 "Carlos", J2 "Ana"
    2. Ver overlay
  - **Resultado esperado**:
    - Overlay muestra "Carlos" y "Ana"
    - Banderas correctas

### 6.2 Modo Dobles (2v2)
- [ ] **Test 6.2.1**: Mostrar parejas
  - **Pasos**:
    1. Dobles: Pareja 1 "López / García"
    2. Pareja 2: "Martínez / Rodríguez"
  - **Resultado esperado**:
    - Overlay muestra ambos apellidos
    - Formato: "Apellido1 / Apellido2"

### 6.3 Modo Equipos (País vs País)
- [ ] **Test 6.3.1**: Mostrar equipos + jugadores
  - **Pasos**:
    1. Equipos: España vs Argentina
    2. Jugador actual: "Carlos (ESP)" vs "María (ARG)"
  - **Resultado esperado**:
    - Overlay muestra nombres de equipos
    - Overlay muestra jugadores individuales
    - Sets = partidos ganados por país

- [ ] **Test 6.3.2**: Botón "Siguiente Partido"
  - **Pasos**: Click en "▶️ Siguiente Partido"
  - **Resultado esperado**:
    - Puntos resetean a 0-0
    - Sets del partido individual resetean
    - Sets de país se mantienen
    - Indicador: cambiar jugadores en Configuración

---

## 7. Historial de Sets

### 7.1 Registro de Sets
- [ ] **Test 7.1.1**: Ganar set 11-7
  - **Resultado esperado**:
    - setsHistory guarda: {player1Points: 11, player2Points: 7}

- [ ] **Test 7.1.2**: Ganar 3 sets
  - **Resultado esperado**:
    - setsHistory tiene 3 entradas
    - Control panel muestra historial

### 7.2 Visualización de Historial
- [ ] **Test 7.2.1**: Toggle historial en overlay
  - **Pasos**:
    1. Tab Partido → "📊 Mostrar Historial en Pantalla"
  - **Resultado esperado**:
    - index.html cambia a vista historial
    - Muestra todos los sets jugados
    - Sets pendientes en gris (0-0)
    - Sets ganados en dorado

- [ ] **Test 7.2.2**: Volver a marcador actual
  - **Pasos**:
    1. Con historial visible
    2. Sumar un punto
  - **Resultado esperado**:
    - Transición suave (fade)
    - Vuelve a marcador actual automáticamente

---

## 8. Sincronización localStorage

### 8.1 Control → Overlay
- [ ] **Test 8.1.1**: Cambiar nombre en control
  - **Pasos**:
    1. control.html: Cambiar "Jugador 1" a "Roberto"
    2. Ver index.html
  - **Resultado esperado**:
    - Overlay actualiza a "Roberto" instantáneamente

- [ ] **Test 8.1.2**: Cambiar puntos con botones
  - **Pasos**: Click en "+" Jugador 1
  - **Resultado esperado**:
    - Overlay actualiza puntos inmediatamente

### 8.2 Atajos de Teclado en Overlay
- [ ] **Test 8.2.1**: Presionar tecla "1"
  - **Pasos**: En index.html, presionar "1"
  - **Resultado esperado**:
    - J1 puntos +1
    - control.html se actualiza

- [ ] **Test 8.2.2**: Presionar tecla "2"
  - **Resultado esperado**: J2 puntos +1

- [ ] **Test 8.2.3**: Presionar tecla "S"
  - **Resultado esperado**: Cambio de servicio

### 8.3 Persistencia
- [ ] **Test 8.3.1**: Refresh del navegador
  - **Pasos**:
    1. Puntos 8-5, sets 2-1
    2. F5 en ambas páginas
  - **Resultado esperado**:
    - Estado se mantiene
    - Puntos y sets igual

---

## 9. Integración con OBS

### 9.1 Browser Source
- [ ] **Test 9.1.1**: Cargar index.html en OBS
  - **Pasos**:
    1. OBS → Añadir Browser Source
    2. Local file: index.html
    3. Resolución: 1920x1080
  - **Resultado esperado**:
    - Overlay visible
    - Fondo verde (chroma key por defecto)
    - Scoreboard en esquina inferior izquierda

- [ ] **Test 9.1.2**: Aplicar Chroma Key
  - **Pasos**:
    1. Filtros → Chroma Key
    2. Color: Verde
  - **Resultado esperado**:
    - Fondo transparente
    - Solo scoreboard visible

### 9.2 Control en Navegador Separado
- [ ] **Test 9.2.1**: control.html en navegador
  - **Pasos**:
    1. OBS con index.html capturado
    2. Chrome con control.html
    3. Cambiar puntos en control
  - **Resultado esperado**:
    - OBS actualiza en tiempo real
    - Sin lag visible

---

## 10. Temas y Personalización

### 10.1 Temas del Scoreboard
- [ ] **Test 10.1.1**: Cambiar a "Oscuro Elegante"
  - **Resultado esperado**:
    - Overlay cambia colores
    - Fondo degradado oscuro

- [ ] **Test 10.1.2**: Probar todos los temas
  - **Temas**: Azul Moderno, Oscuro Elegante, Claro Minimalista, Neón Nocturno, Dorado Premium, Verde Deportivo
  - **Resultado esperado**: Cada tema aplica colores correctos

### 10.2 Fondos de Chroma Key
- [ ] **Test 10.2.1**: Cambiar a fondo Azul
  - **Resultado esperado**: body background = #0000FF

- [ ] **Test 10.2.2**: Cambiar a Transparente
  - **Resultado esperado**: background = transparent

### 10.3 Logo Personalizado
- [ ] **Test 10.3.1**: Cargar logo por URL
  - **Pasos**: Pegar URL de imagen
  - **Resultado esperado**:
    - Preview muestra logo
    - Overlay muestra logo

- [ ] **Test 10.3.2**: Cargar logo por archivo
  - **Pasos**: Click "📁 Subir", seleccionar PNG
  - **Resultado esperado**: Logo cargado

- [ ] **Test 10.3.3**: Cambiar posición (Izquierda/Derecha)
  - **Resultado esperado**: Logo se mueve

- [ ] **Test 10.3.4**: Desactivar logo
  - **Resultado esperado**: Logo desaparece del overlay

---

## 11. Casos de Borde y Errores

### 11.1 Valores Extremos
- [ ] **Test 11.1.1**: Puntos muy altos (deuce largo)
  - **Pasos**: 20-20, 30-30
  - **Resultado esperado**:
    - Servicio cada 1 punto (en 10-10+)
    - No crashes

### 11.2 localStorage Deshabilitado
- [ ] **Test 11.2.1**: Modo incógnito
  - **Pasos**: Abrir en incógnito
  - **Resultado esperado**:
    - Funciona pero sin persistencia
    - Al cerrar se pierden datos

### 11.3 Múltiples Tabs
- [ ] **Test 11.3.1**: 3 tabs abiertas
  - **Pasos**:
    1. index.html (tab 1)
    2. control.html (tab 2)
    3. index.html (tab 3)
  - **Resultado esperado**:
    - Las 3 tabs sincronizadas
    - Cambios en control → ambos index actualizan

---

## Resumen de Resultados

**Total de Tests**: ~90
**Tests Pasados**: [Pendiente de ejecución]
**Tests Fallados**: [Pendiente de ejecución]
**Bloqueadores**: [Pendiente de identificación]

---

## Bugs Encontrados

[Se completará durante el testing]

---

## Recomendaciones

[Se completará al finalizar el testing]

---

**Nota**: Este documento debe ser completado ejecutando cada test manualmente en un navegador con las herramientas de desarrollo abiertas para verificar errores de consola.
