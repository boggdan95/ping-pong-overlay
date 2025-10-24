# 🎥 Guía Completa: Usar Ping Pong Overlay en OBS

## 📋 Índice
1. [Método Recomendado: Browser Source](#método-recomendado-browser-source)
2. [Configuración Paso a Paso](#configuración-paso-a-paso)
3. [Usar Chroma Key (Fondo Verde)](#usar-chroma-key-fondo-verde)
4. [Workflow con Una Sola Pantalla](#workflow-con-una-sola-pantalla)
5. [Workflow con Dos Pantallas](#workflow-con-dos-pantallas)
6. [Atajos de Teclado](#atajos-de-teclado)
7. [Troubleshooting](#troubleshooting)

---

## 🎯 Método Recomendado: Browser Source

### ¿Por qué NO usar Captura de Ventana?
❌ **NO recomendado:**
- Captura de Ventana (Window Capture)
- Captura de Pantalla (Display Capture)

✅ **SÍ recomendado:**
- **Browser Source** (Fuente de Navegador)

### Ventajas del Browser Source:
- ✅ Transparencia nativa (sin chroma key necesario)
- ✅ Mejor rendimiento
- ✅ Actualización en tiempo real
- ✅ No necesita ventana visible
- ✅ Calidad perfecta sin pérdida

---

## 🔧 Configuración Paso a Paso

### Opción A: Archivos Locales (Recomendado)

#### 1️⃣ Agregar el Overlay a OBS

1. **Abre OBS Studio**
2. En la sección "Fuentes" (Sources), click en **+**
3. Selecciona **"Browser"** (Fuente de Navegador)
4. Dale un nombre: `Ping Pong Overlay`
5. Configura así:

**Configuración del Browser Source:**
```
✅ Local file: MARCADO
   Busca y selecciona: index.html

Width: 1920
Height: 1080

✅ Shutdown source when not visible: MARCADO
✅ Refresh browser when scene becomes active: DESMARCADO

Custom CSS: (dejar vacío)
```

6. Click **OK**

#### 2️⃣ Ajustar Posición y Tamaño

1. El overlay aparecerá en el canvas
2. Arrastra para posicionar
3. Usa las esquinas para redimensionar si es necesario
4. **Recomendación:** Déjalo centrado y a tamaño completo

#### 3️⃣ Abrir el Panel de Control

1. **Abre `control.html` en tu navegador** (Chrome/Edge/Firefox)
   - Haz doble clic en `control.html`
   - O desde el navegador: File → Open File → control.html

2. **Posiciona la ventana del panel:**
   - Si tienes 2 pantallas: En la segunda pantalla
   - Si tienes 1 pantalla: En 1/4 de la pantalla (lado derecho o abajo)

3. **El panel de control y el overlay están sincronizados:**
   - Los cambios en el panel se reflejan INSTANTÁNEAMENTE en OBS
   - Los atajos de teclado en el overlay actualizan el panel

---

### Opción B: Archivos en la Web (GitHub Pages)

Si subes el proyecto a GitHub Pages:

1. **Configuración del Browser Source:**
```
❌ Local file: DESMARCADO
   URL: https://TU-USUARIO.github.io/ping-pong-overlay/index.html

Width: 1920
Height: 1080

✅ Shutdown source when not visible: MARCADO
✅ Refresh browser when scene becomes active: DESMARCADO
```

2. **Panel de control:**
   - URL: https://TU-USUARIO.github.io/ping-pong-overlay/control.html
   - Ábrelo en una pestaña del navegador

---

## 🟢 Usar Chroma Key (Fondo Verde)

### ¿Cuándo usar Chroma Key?

**NO es necesario** si usas Browser Source con fondo transparente, PERO puedes usarlo si:
- Quieres superponer el overlay sobre video
- Necesitas mayor control sobre el fondo
- Quieres experimentar con composición avanzada

### Configuración del Chroma Key en OBS

#### 1️⃣ Configurar Fondo en el Panel de Control

1. Abre `control.html`
2. En la sección **COLOR FONDO**, selecciona:
   - 🟢 Verde (recomendado para chroma)
   - 🔵 Azul (alternativa)
   - 🟣 Magenta (para fondos verdes/azules en video)

#### 2️⃣ Agregar Filtro Chroma Key en OBS

1. **Haz clic derecho** en el Browser Source "Ping Pong Overlay"
2. **Filters** → **+** (en "Effect Filters")
3. Selecciona **"Chroma Key"**
4. Configura:

```
Key Color Type: Green (o el color que elegiste)
Similarity: 400-500
Smoothness: 80-100
Key Color Spill Reduction: 100

✅ Use similarity for spill reduction: MARCADO
```

5. Ajusta hasta que solo el scoreboard sea visible

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
│                  │                  │
└──────────────────┴──────────────────┘
```

### Pasos:

1. **OBS**: Pantalla completa superior (50%)
2. **Navegador con overlay** (index.html): Cuarto inferior izquierdo (25%)
3. **Navegador con panel** (control.html): Cuarto inferior derecho (25%)

### Uso durante el stream:

**Opción 1: Usar Panel de Control**
- Click en los botones +/- para puntos
- Todo se actualiza en tiempo real en OBS

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

**Solución 1: Verificar la ruta del archivo**
- Asegúrate que la ruta a `index.html` sea correcta
- Usa ruta absoluta: `C:\Users\...\ping-pong-overlay\index.html`

**Solución 2: Refrescar el Browser Source**
- Click derecho en la fuente → Interact
- Presiona F5 para refrescar

**Solución 3: Borrar caché del navegador**
- OBS Settings → Advanced → Browser Source Hardware Acceleration
- Desmarca y vuelve a marcar

### Los cambios no se actualizan en OBS

**Causa**: localStorage no está sincronizando

**Solución:**
1. Cierra `index.html` si lo tienes abierto en navegador
2. El overlay SOLO debe estar en OBS (Browser Source)
3. Usa `control.html` para hacer cambios
4. Los cambios se verán INSTANTÁNEAMENTE en OBS

### El chroma key no funciona bien

**Problema**: Bordes verdes alrededor del scoreboard

**Solución:**
1. Aumenta "Smoothness" a 100
2. Aumenta "Similarity" a 500-600
3. Activa "Key Color Spill Reduction" a 100
4. Si persiste, usa fondo **transparente** en lugar de chroma

### Los atajos de teclado no funcionan

**Causa**: OBS no tiene foco en el Browser Source

**Solución:**
1. Click derecho en el Browser Source → **Interact**
2. Se abrirá una ventana interactiva
3. Click dentro de la ventana
4. Ahora los atajos funcionarán

**Alternativa:**
- Usa `control.html` con el mouse
- Los atajos de teclado son opcionales

### El overlay se ve pixelado

**Solución:**
1. Asegúrate que Width y Height sean 1920x1080
2. No escales el overlay demasiado en OBS
3. Usa la resolución nativa del canvas

---

## 🎬 Ejemplo de Setup Completo

### Escena "Partido en Vivo":

```
Fuentes (de arriba hacia abajo):
1. 🎥 Cámara Web (1920x1080)
2. 🏓 Ping Pong Overlay (Browser Source)
3. 🎵 Audio/Mic (opcional)
```

### Configuración:

1. **Cámara Web:**
   - Fuente: Cámara apuntando a la mesa
   - Posición: Full screen
   - Filtros: Color Correction (opcional)

2. **Ping Pong Overlay:**
   - Fuente: Browser → index.html
   - Tamaño: 1200x400 (ajustado)
   - Posición: Centrado abajo
   - Fondo: Transparente (sin chroma key)

3. **Panel de Control:**
   - Abierto en navegador (fuera de OBS)
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
