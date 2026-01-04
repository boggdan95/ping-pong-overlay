# 🎥 Guía Completa: Usar Ping Pong Overlay en OBS

## 📋 Índice
1. [Método Recomendado: Captura de Ventana](#método-recomendado-captura-de-ventana)
2. [¿Por qué NO usar Browser Source?](#por-qué-no-usar-browser-source)
3. [Configuración Paso a Paso](#configuración-paso-a-paso)
4. [Usar Chroma Key (Obligatorio)](#usar-chroma-key-obligatorio)
5. [Workflow con Una Sola Pantalla](#workflow-con-una-sola-pantalla)
6. [Workflow con Dos Pantallas](#workflow-con-dos-pantallas)
7. [Atajos de Teclado](#atajos-de-teclado)
8. [Troubleshooting](#troubleshooting)

---

## 🎯 Método Recomendado: Captura de Ventana

### Resumen
✅ **SÍ recomendado:**
- **Captura de Ventana** (Window Capture) + Chroma Key

❌ **NO funciona para sincronización:**
- Browser Source (Fuente de Navegador)

### ¿Por qué Captura de Ventana?
- ✅ **Sincronización real** entre overlay y panel de control
- ✅ Ambos archivos comparten localStorage en el mismo navegador
- ✅ Cambios instantáneos desde control.html
- ✅ Funciona 100% con el sistema de comunicación del overlay

---

## ⚠️ ¿Por qué NO usar Browser Source?

### El Problema Técnico
El **Browser Source de OBS** usa un navegador Chromium integrado (CEF - Chromium Embedded Framework) que es **completamente independiente** de tu navegador del sistema.

**Esto significa:**
- `index.html` en Browser Source = navegador CEF de OBS
- `control.html` en Chrome/Edge/Firefox = tu navegador del sistema
- localStorage **NO se comparte** entre navegadores diferentes
- **Resultado:** Los cambios en control.html **NUNCA** aparecerán en el overlay de OBS

### La Solución
Usar ambos archivos (`index.html` y `control.html`) en el **mismo navegador** de tu sistema, y capturar esa ventana con **Window Capture** + **Chroma Key**.

---

## 🔧 Configuración Paso a Paso

### Paso 1: Preparar el Navegador

1. **Abre `index.html` en tu navegador** (Chrome/Edge/Firefox)
   - Haz doble clic en `index.html`
   - O desde el navegador: File → Open File → index.html

2. **Abre `control.html` en otra pestaña del MISMO navegador**
   - Haz doble clic en `control.html`
   - **IMPORTANTE:** Debe ser el mismo navegador, no otro diferente

3. **Configura el fondo para Chroma Key:**
   - En `control.html`, ve a la pestaña **Configuración**
   - En **COLOR FONDO**, selecciona:
     - 🟢 **Verde** (recomendado)
     - 🔵 Azul (alternativa)
     - 🟣 Magenta (si tu video tiene verde/azul)

4. **Deja la ventana de `index.html` visible:**
   - Cambia a la pestaña de `index.html`
   - Esta es la ventana que capturarás en OBS

### Paso 2: Agregar Captura de Ventana en OBS

1. **Abre OBS Studio**
2. En la sección "Fuentes" (Sources), click en **+**
3. Selecciona **"Window Capture"** (Captura de Ventana)
4. Dale un nombre: `Ping Pong Overlay`
5. Configura:
   - **Window:** Selecciona la ventana del navegador con `index.html`
   - **Capture Method:** Automatic (o Windows Graphics Capture)
6. Click **OK**

### Paso 3: Aplicar Chroma Key

1. **Click derecho** en la fuente "Ping Pong Overlay"
2. Selecciona **Filters** (Filtros)
3. En "Effect Filters", click **+** y selecciona **Chroma Key**
4. Configura:

```
Key Color Type: Green (o el color que elegiste en control.html)
Similarity: 400-500
Smoothness: 80-100
Key Color Spill Reduction: 100

✅ Use similarity for spill reduction: MARCADO
```

5. Ajusta hasta que solo el scoreboard sea visible
6. Click **Close**

### Paso 4: Posicionar el Overlay

1. Arrastra el overlay a la posición deseada
2. Usa las esquinas para redimensionar (mantén Shift para proporciones)
3. **Recomendación:** Parte inferior o superior de la pantalla

---

## 🟢 Usar Chroma Key (Obligatorio)

### ¿Por qué es obligatorio?
Al usar Captura de Ventana, necesitas Chroma Key para:
- Eliminar el fondo del navegador
- Dejar solo el scoreboard visible
- Superponer sobre tu video de la mesa

### Colores Disponibles en control.html

| Color | Cuándo Usarlo |
|-------|---------------|
| 🟢 Verde | Recomendado para la mayoría de casos |
| 🔵 Azul | Si tu video tiene elementos verdes |
| 🟣 Magenta | Si tu video tiene verde Y azul |
| ⚫ Transparente | Solo funciona con Browser Source (no sincroniza) |

### Configuración Óptima del Chroma Key

```
Key Color Type: Green (o tu color elegido)
Similarity: 400-500 (ajusta si hay bordes)
Smoothness: 80-100 (suaviza bordes)
Key Color Spill Reduction: 100
```

**Tip:** Si ves bordes del color de fondo, aumenta Similarity. Si desaparece parte del overlay, disminúyelo.

---

## 💻 Workflow con Una Sola Pantalla

### Layout Recomendado:

```
┌─────────────────────────────────────┐
│                                     │
│          OBS (Mitad Superior)       │
│                                     │
├──────────────────┬──────────────────┤
│                  │                  │
│  Overlay         │  Panel Control   │
│  (index.html)    │  (control.html)  │
│  Cuarto inferior │  Cuarto inferior │
│  [CAPTURAR ESTA] │  [PARA CONTROL]  │
│                  │                  │
└──────────────────┴──────────────────┘
```

### Pasos:

1. **Navegador**: Abre dos ventanas del mismo navegador (o usa pestañas)
   - Ventana 1: `index.html` (overlay) - **Esta es la que capturas**
   - Ventana 2: `control.html` (panel de control)
2. **OBS**: Captura de Ventana de la ventana con `index.html`
3. **Posiciona**: OBS arriba, ventanas del navegador abajo

### Uso durante el stream:

**Opción 1: Usar Panel de Control (Recomendado)**
- Click en los botones +/- para puntos en `control.html`
- Todo se actualiza en tiempo real en OBS
- No necesitas cambiar de ventana

**Opción 2: Usar Atajos de Teclado**
- Con focus en `index.html` (overlay):
  - **1**: +1 punto Jugador 1
  - **2**: +1 punto Jugador 2
  - **S**: Cambiar servicio manualmente
- El panel se actualiza automáticamente

---

## 🖥️ Workflow con Dos Pantallas

### Layout Recomendado:

**Pantalla 1 (Principal - Stream):**
```
┌─────────────────────────┐
│                         │
│     OBS (Full Screen)   │
│                         │
└─────────────────────────┘
```

**Pantalla 2 (Secundaria - Control):**
```
┌─────────────────────────┐
│  Panel de Control       │
│  (control.html)         │
│  Full screen            │
└─────────────────────────┘
```

### Ventajas:
- ✅ Vista completa de OBS sin obstrucciones
- ✅ Panel de control siempre visible
- ✅ Espacio para otras herramientas (chat, stats, etc.)

---

## ⌨️ Atajos de Teclado

### Durante el Partido:

**En el Overlay (index.html) o en OBS:**

| Tecla | Acción                    |
|-------|---------------------------|
| `1`   | +1 punto Jugador 1        |
| `2`   | +1 punto Jugador 2        |
| `S`   | Cambiar servicio manual   |

### Notas:
- ✅ El servicio cambia **automáticamente** cada 2 puntos
- ✅ En deuce (10-10+), cambia cada 1 punto
- ✅ Puedes usar `S` para override manual si es necesario
- ✅ Los sets se incrementan automáticamente al llegar a 11 puntos (con 2 de diferencia)

---

## 🔧 Configuración Avanzada en OBS

### Para Mejor Performance:

1. **FPS del Browser Source:**
   - FPS: 30 (suficiente para overlay estático)
   - Si agregas animaciones (v0.3.0): 60 FPS

2. **Apagar cuando no esté visible:**
   - ✅ "Shutdown source when not visible": MARCADO
   - Ahorra recursos cuando cambias de escena

3. **Prioridad de renderizado:**
   - Click derecho en la fuente → Transform → Order
   - Mover arriba para que esté sobre el video principal

---

## 🎨 Configuraciones Recomendadas

### Para Streaming de Tenis de Mesa:

#### Layout 1: Overlay Abajo
```
┌───────────────────────────────┐
│                               │
│      Cámara Principal         │
│      (Mesa de Ping Pong)      │
│                               │
├───────────────────────────────┤
│   [Scoreboard centrado]       │
└───────────────────────────────┘
```

#### Layout 2: Overlay Arriba
```
┌───────────────────────────────┐
│   [Scoreboard centrado]       │
├───────────────────────────────┤
│                               │
│      Cámara Principal         │
│      (Mesa de Ping Pong)      │
│                               │
└───────────────────────────────┘
```

#### Layout 3: Overlay a un Lado
```
┌────────────────────┬──────────┐
│                    │          │
│  Cámara Principal  │ Score    │
│  (Mesa)            │ board    │
│                    │          │
└────────────────────┴──────────┘
```

### Configurar en OBS:

1. **Redimensiona el scoreboard:**
   - Mantén proporción (Shift + Arrastrar esquina)
   - Recomendado: ~400-600px de ancho

2. **Posiciona según tu cámara:**
   - Arriba si la mesa se ve completa abajo
   - Abajo si la acción está arriba
   - A un lado si queda espacio lateral

---

## ❓ Troubleshooting

### El overlay no se ve en OBS

**Solución 1: Verificar la Captura de Ventana**
- Asegúrate de haber seleccionado la ventana correcta del navegador
- La ventana debe estar visible (no minimizada)

**Solución 2: Verificar el Chroma Key**
- Si el fondo no desaparece, verifica que el color en control.html coincida con el filtro
- Ajusta Similarity si hay problemas

### Los cambios no se actualizan en OBS

**Causa más común**: Navegadores diferentes

**Solución:**
1. Verifica que `index.html` y `control.html` estén en el **MISMO navegador**
2. No uses Browser Source - usa Captura de Ventana
3. Si usas pestañas, ambas deben estar en la misma ventana del navegador
4. Prueba refrescando ambas pestañas (F5)

**¿Por qué no sincroniza con Browser Source?**
- El Browser Source de OBS es un navegador Chromium **separado**
- No comparte localStorage con Chrome/Edge/Firefox
- Esta es una limitación técnica, no un bug

### El chroma key no funciona bien

**Problema**: Bordes del color de fondo visibles

**Solución:**
1. Aumenta "Smoothness" a 100
2. Aumenta "Similarity" a 500-600
3. Activa "Key Color Spill Reduction" a 100
4. Asegúrate que el color en control.html sea exactamente verde/azul puro

**Problema**: El scoreboard desaparece parcialmente

**Solución:**
1. Reduce "Similarity" a 300-400
2. Verifica que no haya elementos del mismo color en el scoreboard

### Los atajos de teclado no funcionan

**Causa**: La ventana del navegador no tiene foco

**Solución:**
1. Click en la ventana del navegador con `index.html`
2. Ahora los atajos funcionarán

**Alternativa (Recomendada):**
- Usa `control.html` con el mouse
- Es más práctico durante el stream
- Los atajos de teclado son opcionales

### El overlay se ve pixelado

**Solución:**
1. Maximiza la ventana del navegador antes de capturar
2. No escales el overlay demasiado en OBS
3. Usa la resolución nativa del canvas
4. En Chrome: Ctrl+0 para resetear zoom a 100%

---

## 🎬 Ejemplo de Setup Completo

### Escena "Partido en Vivo":

```
Fuentes (de arriba hacia abajo):
1. 🎥 Cámara Web (1920x1080)
2. 🏓 Ping Pong Overlay (Window Capture + Chroma Key)
3. 🎵 Audio/Mic (opcional)
```

### Configuración:

1. **Cámara Web:**
   - Fuente: Cámara apuntando a la mesa
   - Posición: Full screen
   - Filtros: Color Correction (opcional)

2. **Ping Pong Overlay:**
   - Fuente: Window Capture → Ventana del navegador con index.html
   - Filtro: Chroma Key (Verde)
   - Tamaño: Ajustado según necesidad
   - Posición: Centrado abajo o arriba

3. **Panel de Control:**
   - `control.html` abierto en otra pestaña del MISMO navegador
   - Configura fondo Verde para que coincida con el Chroma Key
   - Listo para actualizar puntajes

### Durante el Partido:

1. **Antes de empezar:**
   - Configura nombres de jugadores en `control.html`
   - Configura banderas (GUA, ESA, etc.)
   - Configura logo si es necesario
   - Reset puntajes a 0-0

2. **Durante el partido:**
   - Usa atajos `1` y `2` para puntos
   - O usa botones +/- en control panel
   - El servicio cambia automáticamente

3. **Entre sets:**
   - Los puntajes se resetean automáticamente
   - Los sets se incrementan automáticamente

---

## 🎯 Tips Profesionales

### Para Mejores Resultados:

1. **Usa fondo transparente** en lugar de chroma key
   - Más limpio y sin artefactos
   - Mejor performance

2. **Configura los colores del overlay** según tu streaming
   - Si tu cámara tiene fondo verde → Usa overlay azul
   - Si tu cámara tiene fondo azul → Usa overlay diferente

3. **Practica antes del stream:**
   - Haz un partido de prueba
   - Familiarízate con los atajos
   - Verifica que todo se vea bien

4. **Ten un backup:**
   - Exporta tu configuración (v0.3.0)
   - Guarda una copia de los archivos
   - Ten OBS configurado con escenas alternativas

5. **Usa hotkeys de OBS:**
   - Configura hotkeys para cambiar escenas
   - Ejemplo: F1 = Escena principal, F2 = Replays, etc.

---

## 📚 Recursos Adicionales

- **OBS Documentation**: https://obsproject.com/wiki/
- **Browser Source Plugin**: Incluido en OBS Studio
- **GitHub del Proyecto**: [Tu repositorio]

---

**¿Dudas?** Abre un Issue en GitHub o consulta la documentación del proyecto.

🏓 ¡Feliz streaming!
