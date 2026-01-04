# 🏓 Ping Pong Overlay

🌐 [English Version](README.md)

Un overlay profesional para transmisiones de tenis de mesa con control en tiempo real de puntos, sets, nombres de jugadores y indicador de servicio.

## 📋 Descripción

Este proyecto proporciona:
- **Overlay visual** con diseño profesional (fondo azul degradado)
- **Panel de control** para gestionar el marcador en tiempo real
- **Sincronización automática** entre overlay y panel de control
- **Diseño responsive** que se adapta a diferentes resoluciones
- **Compatible con OBS** para captura con chroma key

## ✨ Características

### Core Features
- ✅ Dos filas verticales (una por jugador)
- ✅ Bandera por país (customizable con códigos de 3 letras)
- ✅ Nombre del jugador
- ✅ Contador de puntos y sets
- ✅ Indicador visual de servicio (pelota azul)
- ✅ Fondo transparente o chroma key para captura en OBS
- ✅ Controles rápidos por teclado (1, 2, S)
- ✅ Almacenamiento local (localStorage)

### ✨ NEW in v1.0.0 (En desarrollo)
- 📋 **Sistema de Autosugerencia**: Carga jugadores desde CSV para autocompletado rápido
- 🎮 **Modalidades de Juego**: Individual (1v1), Dobles (2v2), Equipos
- 🏆 **Pantalla de Ganador**: Overlay automático al ganar el partido
- ⚙️ **Configuración de Sets**: Mejor de 3, 5 o 7 sets
- ✏️ **Edición Manual**: Click en puntos/sets para corregir errores
- 📊 **Historial de Sets**: Visualización completa de sets jugados

### ✨ Features v0.3.x
- 🎬 **Animaciones**: Efectos visuales al anotar puntos, ganar sets y cambiar servicio
- 🎨 **Sistema de Temas**: 6 temas predefinidos para el scoreboard
- 🎮 **Panel de Control Mejorado**: Interfaz con 2 tabs (Partido/Configuración)
- 👁️ **Toggle de Visibilidad**: Oculta el overlay mientras configuras
- 🖼️ **Sistema de Logo**: Sube logos que se adaptan automáticamente
- 📱 **Diseño Responsive**: Panel compacto para usar en cuarto de pantalla

## 📁 Estructura del Proyecto

```
ping-pong-overlay/
├── 📄 LEEME.txt               # ⭐ Instrucciones rápidas (empieza aquí)
├── 🌐 hub.html                # ⭐ Página de inicio con botones
├── 🖥️ index.html              # Overlay principal (capturar en OBS)
├── 🎮 control.html            # Panel de control
├── 🗑️ clear-storage.html     # Utilidad para limpiar localStorage
├── 📋 jugadores-ejemplo.csv   # Ejemplo de CSV para autosugerencia
├── docs/                      # Documentación técnica y guías
│   ├── GUIA_OBS.md           # Guía completa de OBS
│   ├── DESCARGAR.txt         # Guía de descarga
│   ├── AUTOSUGERENCIA.md     # ⭐ Guía del sistema de autosugerencia
│   ├── ROADMAP_v1.0.0.md     # Roadmap actual
│   ├── SETUP_GITHUB.md       # Configuración de GitHub
│   └── START.md              # Guía de inicio rápido
├── logos/                     # Logos para el overlay
├── CLAUDE.md                  # Guía para Claude Code AI
├── CONTRIBUTING.md            # Guía de contribución
├── LICENSE                    # Licencia MIT
├── package.json               # Metadata del proyecto
└── README.md                  # Este archivo
```

## 🚀 Cómo Usar en OBS

### 🎯 Punto de Entrada

**Primera vez**: Abre `hub.html` o lee `LEEME.txt` para instrucciones rápidas.

### ⚡ Configuración Rápida (5 minutos)

1. **En OBS Studio:**
   - Agrega una fuente → **Browser** (Fuente de Navegador)
   - ✅ Marca "Local file"
   - Selecciona `index.html` de este proyecto
   - Width: 1920, Height: 1080
   - Click OK

2. **Abre el Panel de Control:**
   - Abre `control.html` en tu navegador (Chrome/Edge/Firefox)
   - Configura nombres, banderas, etc.
   - Los cambios se reflejan **INSTANTÁNEAMENTE** en OBS

3. **Durante el partido:**
   - Usa el panel de control para cambiar puntajes
   - O usa atajos de teclado: `1` = +1 J1, `2` = +1 J2, `S` = Cambiar servicio

### 📚 Guía Completa

**⚠️ IMPORTANTE:** NO uses "Captura de Ventana". Usa "Browser Source" para mejor calidad y transparencia nativa.

👉 **[Guía Completa de OBS](docs/GUIA_OBS.md)** - Incluye:
- Configuración paso a paso con screenshots conceptuales
- Uso de chroma key (opcional)
- Workflow para 1 o 2 pantallas
- Troubleshooting común
- Tips profesionales

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

## 📋 Roadmap v1.0.0

### Completado ✅
- [x] Sistema de autosugerencia desde CSV
- [x] Soporte para múltiples modos (individual, dobles, equipos)
- [x] Animaciones y transiciones
- [x] Sistema de temas visuales
- [x] Historial de sets
- [x] Pantalla de ganador automática

### Pendiente
- [ ] Base de datos para guardar partidos
- [ ] Exportar resultados en múltiples formatos
- [ ] API REST para control remoto
- [ ] Sistema de estadísticas avanzadas

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

## 📋 Changelog

### v1.0.0 (2025-11-06) 🎉
**🚀 Release Oficial - Sistema Completo de Overlay Profesional**

#### Nuevas Funcionalidades Mayores

**📋 Sistema de Autosugerencia desde CSV (Feature 5)**
- ✅ Carga de jugadores desde archivo CSV (formato: nombre,bandera,país)
- ✅ Autocompletado inteligente al escribir (mínimo 2 caracteres)
- ✅ Dropdown con todos los jugadores al hacer focus
- ✅ Toggle On/Off para activar/desactivar según necesidad
- ✅ Relleno automático de nombre + bandera
- ✅ Persistencia en localStorage entre sesiones
- ✅ Compatible con modo Individual y Equipos
- ✅ Archivo de ejemplo incluido: `jugadores-ejemplo.csv`
- 📚 Documentación: `docs/AUTOSUGERENCIA.md`

**🎮 Modalidades de Juego Completas (Feature 4)**
- ✅ Individual (1v1) - Modo clásico
- ✅ Dobles (2v2) - Parejas con formato apellidos
- ✅ Equipos (País vs País) - Tracking de partidos individuales + puntos por país

**🏆 Pantalla de Ganador Automática (Feature 3)**
- ✅ Detección automática al alcanzar sets necesarios
- ✅ Modal de confirmación antes de declarar ganador
- ✅ Overlay fullscreen con nombre, bandera y score final
- ✅ Animación de confetti (configurable)
- ✅ Selector de emoji (🏆, 🥇, 🏅, ⭐, 👑)
- ✅ Flujo post-ganador: Ganador (7s) → Historial (5s) → Diálogo ocultar overlay

**⚙️ Configuración de Sets (Feature 2)**
- ✅ Mejor de 3 (primero en ganar 2)
- ✅ Mejor de 5 (primero en ganar 3)
- ✅ Mejor de 7 (primero en ganar 4)
- ✅ Detección automática de ganador

**✏️ Edición Manual de Marcadores (Feature 1)**
- ✅ Click en puntos/sets para editar directamente
- ✅ Input temporal con validación
- ✅ Sincronización automática con overlay

#### Bug Fixes Críticos

**🔧 Alternancia Automática de Servicio Entre Sets**
- ❌ Problema: Al ganar set, sistema no alternaba servicio automáticamente
- ✅ Solución: Sistema de tracking `firstServerHistory[]`
- ✅ Ahora alterna correctamente: Set 1 (J1) → Set 2 (J2) → Set 3 (J1)
- ✅ Respeta regla ITTF de alternancia oficial
- 📚 Documentación completa: `docs/BUG_FIX_SERVICIO_ENTRE_SETS.md`

**🔒 Reset Automático al Cambiar Modo de Juego**
- ❌ Problema: Se perdían datos sin confirmación
- ✅ Solución: Modal de confirmación con opción de cancelar
- ✅ Reset completo de estado: puntos, sets, servicio, historial

#### Mejoras de UX/DX

- ✅ Flujo post-ganador profesional (Ganador → Historial → Preparar siguiente)
- ✅ Confirmaciones antes de acciones destructivas
- ✅ Toggle para habilitar/deshabilitar autocompletado
- ✅ Plan de testing exhaustivo (90+ tests documentados)
- ✅ Limpieza del repositorio (archivos obsoletos eliminados)

#### Documentación Nueva

- 📚 `docs/AUTOSUGERENCIA.md` - Guía completa del sistema de autocompletado
- 📚 `docs/TESTING_v1.0.0.md` - Plan de testing con 90+ tests
- 📚 `docs/BUG_FIX_SERVICIO_ENTRE_SETS.md` - Análisis del bug crítico
- 📚 `jugadores-ejemplo.csv` - 15 jugadores latinoamericanos de ejemplo

#### Archivos del Release

**Total de líneas agregadas:** ~1,200
- `control.html`: ~350 líneas nuevas
- Documentación: ~850 líneas
- 6 commits en esta versión

#### Estado Final

- ✅ Todas las features planificadas (6/6 - 100%)
- ✅ 0 bugs críticos conocidos
- ✅ Documentación exhaustiva
- ✅ Listo para producción
- ✅ Compatible con OBS Studio

---

### v0.3.4 (2025-01-24)
**🚨 Selección Manual del Servidor Inicial - Hotfix Crítico**

#### Problema Resuelto (Bug Crítico)
- ❌ El sistema asignaba automáticamente el servicio al Jugador 1 en 0-0
- ❌ No había forma de elegir quién sirve primero al inicio del set
- ❌ La rotación automática asumía siempre que J1 servía primero
- ❌ Al corregir el servicio, la rotación posterior era incorrecta

#### Solución: Sistema de Primer Servidor
- ✅ **Selección libre en 0-0**: Operador elige quién sirve primero clickeando botón de servicio
- ✅ **Tracking de firstServer**: Sistema guarda quién sirvió primero (1 o 2)
- ✅ **Rotación inteligente**: Cálculo automático se basa en firstServer
  - Si J1 sirve primero: J1 en bloques pares (0-1, 4-5), J2 en impares (2-3, 6-7)
  - Si J2 sirve primero: J2 en bloques pares, J1 en impares
- ✅ **Reset correcto**: firstServer se limpia al ganar set o resetear partido
- 🎯 **Flujo operativo**: Permite operación profesional con elección de servidor inicial

#### Flujo de Uso
1. Inicio 0-0: Operador click en "🎾 Servicio" del jugador que servirá primero
2. Sistema mantiene ese servidor por el bloque 0-1
3. En total=2: Rotación automática cambia correctamente al otro jugador
4. Rotación continúa cada 2 puntos basada en quién sirvió primero

#### Implementación Técnica
- Agregado `firstServer` variable (null, 1, o 2)
- Modificado `setService()` para guardar firstServer en total ≤ 1
- Modificado `updateService()` para calcular rotación basada en firstServer
- Reset en `confirmSetWin()` y `resetAll()`

### v0.3.3 (2025-01-24)
**🔧 Corrección Manual de Servicio - Hotfix**

#### Problema Resuelto
- ❌ Si un operador corregía manualmente el servicio, solo duraba 1 punto
- ❌ No respetaba los bloques de 2 puntos antes del 10-10
- ❌ Causaba rotaciones incorrectas en puntos subsecuentes

#### Solución: Override Inteligente con Bloques
- ✅ **Corrección respeta bloques**: Al cambiar servicio en 6-0, se mantiene por 2 puntos (6-1 y 7-0)
- ✅ **Detección de bloques**: Calcula `Math.floor(totalPoints / 2)` para determinar bloques de servicio
- ✅ **Manejo de Deuce**: En 10-10+, override solo dura 1 punto (regla correcta)
- ✅ **Reset automático**: Override se limpia al cambiar bloque o iniciar nuevo set
- 🎯 **Flujo operativo**: Permite corregir errores sin afectar rotación automática posterior

#### Implementación Técnica
- Agregado `manualServiceOverride` flag para tracking
- Agregado `manualServiceStartPoint` para calcular bloque inicial
- Modificado `updateService()` para verificar si aún en mismo bloque
- Reset en `confirmSetWin()` y `resetAll()`

### v0.3.2 (2025-01-24)
**🎨 Ajustes UI - Legibilidad y Posicionamiento Mejorados**

#### Mejoras Visuales
- 📍 **Reposicionamiento**: Scoreboard en esquina inferior izquierda (40px margen)
- 📝 **Tipografía aumentada**:
  - Nombres: 28px → **56px** (2x más grande)
  - Puntos/Sets: 36px → **48px**
  - Banderas: 60px → **75px**
  - Pelotas de servicio: 28px → **35px**
- 📦 **Más compacto**: Padding y gaps reducidos para mejor balance

#### Historial Rediseñado
- 🎯 **Mismo diseño que marcador**: Transición fluida sin cambios bruscos
- 📊 **Muestra todos los sets**: 5 o 7 según configuración (best-of-5/7)
- 👻 **Sets pendientes**: Aparecen en gris (0-0) hasta que se jueguen
- 🏆 **Resalta ganadores**: Puntajes ganadores en dorado
- 🚫 **Sin headers**: Más limpio, sin "SET 1, SET 2, etc."

#### Auto-Switch Inteligente
- ⚡ **Cambio automático**: Al sumar punto desde historial, vuelve al marcador
- 🎬 **Transición suave**: Fade out → Fade in (400ms)
- 🔒 **Sin bugs**: Bloqueo durante transición previene actualizaciones rápidas

#### Performance
- ⚙️ **Polling optimizado**: 200ms → 500ms, comparación más eficiente
- 🛡️ **Error handling**: Try-catch para capturar problemas

### v0.3.1 (2025-01-24)
**🐛 Confirmación de Set Ganado - Hotfix Critical**

#### Problema Resuelto
- ❌ Si un operador ingresaba mal un punto que daba como ganado el set, no había forma de corregirlo
- ❌ Los sets se guardaban automáticamente sin posibilidad de verificación

#### Solución: Modal de Confirmación
- ✅ Aparece automáticamente al detectar set ganado (11 pts con 2 de ventaja)
- ✅ Muestra nombres de jugadores y puntajes finales del set
- ✅ Botón "✅ Confirmar" para procesar el set
- ✅ Botón "❌ Cancelar" para corregir error manteniendo puntos actuales
- ✅ Previene errores accidentales durante operación en vivo

#### Mejoras en Animaciones
- ⚡ Transición más lenta y visible al acreditar sets (1.8s vs 0.8s)
- 🎬 Secuencia temporal mejorada:
  1. Muestra marcador ganador (11-9) por 2 segundos
  2. Resetea a 0-0
  3. Acredita el set con animación de celebración más dramática
- 🎨 Animación setWin con más pasos y rotaciones para mejor visibilidad

#### Flujo de Uso
**Caso Normal:**
- Jugador llega a 11-9 → Aparece modal → Confirmar → Animación → Set acreditado

**Caso de Corrección:**
- Error en marcador → Aparece modal → Cancelar → Usar botón "−" para corregir → Continuar partido

### v0.3.0 (2024-10-24)
**🎨 Sistema de Temas y 📊 Historial de Sets**

#### Sistema de Temas
- 🎨 6 temas predefinidos para el scoreboard:
  - Azul Moderno (tema por defecto)
  - Oscuro Elegante
  - Claro Minimalista
  - Neón Nocturno
  - Dorado Premium
  - Verde Deportivo
- Selector de temas en panel de control (tab Configuración)
- Aplicación dinámica de colores a todos los elementos del overlay
- Pelotas de servicio adaptadas automáticamente según el tema

#### Historial de Sets
- 🏆 Configuración de modo de partido (Mejor de 5 o Mejor de 7 sets)
- 💾 Guardado automático de puntajes de cada set jugado
- 📊 Visualización del historial en control panel
- 🔄 Toggle para alternar entre marcador actual e historial completo
- 📋 Tabla con nombres, banderas y columnas de cada set
- ⭐ Puntajes ganadores resaltados en dorado
- 🖼️ Logo se oculta automáticamente en vista de historial

#### Mejoras y Correcciones
- 🐛 Fix: Prevención de múltiples sets al dar clicks rápidos
- ✨ Transiciones suaves entre vistas de marcador e historial
- 🎯 Botón de historial deshabilitado si no hay sets jugados
- 🧹 Historial se limpia automáticamente al resetear partido

### v0.2.1 (2024-10-24)
**🎬 Animaciones y Panel de Control Mejorado**

- ✨ Sistema de animaciones para puntos, sets y cambios de servicio
- 🎮 Panel de control rediseñado con tabs (Partido/Configuración)
- 👁️ Toggle para ocultar overlay durante configuración
- 🖼️ Sistema de logo con auto-expansión del scoreboard
- 📱 Diseño responsive y compacto para cuarto de pantalla
- 🎨 Botones optimizados para uso operativo en vivo
- 🐛 Múltiples correcciones de bugs y mejoras de UX

### v0.2.0 (2024-10-23)
**🎨 Colores Dinámicos y Sistema de Logo**

- Selector de color de fondo (chroma key: verde, azul, magenta, rojo)
- Opción de fondo transparente o degradado
- Sistema de logo con posicionamiento (izquierda/derecha)
- Carga de logo por archivo o URL
- Panel de control ultra-compacto
- Banderas con códigos de 3 letras (GUA, ESA, NCA, etc.)
- Rotación automática de servicio
- Fuente Montserrat

### v0.1.0 (2024-10-22)
**🚀 Lanzamiento Inicial**

- Overlay básico con dos jugadores
- Contador de puntos y sets
- Indicador de servicio
- Panel de control simple
- Sincronización vía localStorage
- Diseño responsive

## 📚 Documentación Adicional

Para más información, consulta la documentación en la carpeta `docs/`:

- **[Guía de Inicio Rápido](docs/START.md)** - Instrucciones rápidas para comenzar
- **[Sistema de Autosugerencia](docs/AUTOSUGERENCIA.md)** - ⭐ Cómo usar el autocompletado de jugadores
- **[Guía Completa de OBS](docs/GUIA_OBS.md)** - Configuración detallada para streaming
- **[Configuración de GitHub](docs/SETUP_GITHUB.md)** - Cómo configurar y desplegar con GitHub Pages
- **[Guía de Descarga](docs/DESCARGAR.txt)** - Instrucciones de descarga e instalación
- **[Roadmap v1.0.0](docs/ROADMAP_v1.0.0.md)** - Plan de desarrollo actual

## 💝 Apoyo al Proyecto

Este proyecto es **100% gratis y de código abierto**. Si te resulta útil, considera apoyarlo:

### ☕ Donaciones
- **PayPal**: [Tu enlace aquí]
- **Ko-fi**: [Tu enlace aquí]
- **GitHub Sponsors**: [Tu enlace aquí]

### 💼 Servicios Profesionales

¿Necesitas ayuda o personalización? Ofrezco:

| Servicio | Precio | Descripción |
|----------|--------|-------------|
| **Setup Rápido** | $15 USD | Instalación en OBS + configuración básica (30 min video call) |
| **Personalización** | $35 USD | Setup + colores custom + logo + tutorial (1 hora) |
| **Torneo/Empresa** | $75+ USD | Todo lo anterior + múltiples overlays + soporte durante evento |

**¿Interesado?** Contáctame en: [tu-email@ejemplo.com]

---

## 📞 Soporte Comunitario

Para problemas técnicos o sugerencias, abre un issue en el repositorio.

---

**Desarrollado con ❤️ para streamers de tenis de mesa**
