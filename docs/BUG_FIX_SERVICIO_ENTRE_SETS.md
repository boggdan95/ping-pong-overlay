# Bug Fix: Servicio al Iniciar Nuevo Set

## Problema Identificado

**Fecha**: 2025-11-06
**Reportado por**: Usuario
**Severidad**: Alta (afecta reglas del juego)

### Descripción del Bug

Al ganar un set y comenzar el siguiente, el sistema reseteaba la variable `firstServer = null`, lo que hacía que en el **Set 2** el operador tuviera que volver a seleccionar manualmente quién sirve primero.

**Problema**: Según las reglas del tenis de mesa, el servicio debe **alternar automáticamente** entre sets:
- **Set 1**: Operador elige quién sirve (ej: Jugador A)
- **Set 2**: Debe servir automáticamente el Jugador B (alternado)
- **Set 3**: Debe servir automáticamente el Jugador A (alternado)
- Y así sucesivamente...

### Comportamiento Incorrecto (Antes del Fix)

```
Set 1 (0-0): Operador elige → Jugador A sirve
Set 1 (11-9): Jugador A gana el set
Set 2 (0-0): Sistema resetea firstServer = null
             👉 ERROR: Operador debe volver a elegir manualmente
```

### Comportamiento Esperado (Después del Fix)

```
Set 1 (0-0): Operador elige → Jugador A sirve
Set 1 (11-9): Jugador A gana el set
             Sistema guarda: firstServerHistory = [1]
Set 2 (0-0): Sistema calcula automáticamente → Jugador B sirve
             firstServer = 2 (alternado)
Set 2 (11-7): Jugador B gana el set
             Sistema guarda: firstServerHistory = [1, 2]
Set 3 (0-0): Sistema calcula automáticamente → Jugador A sirve
             firstServer = 1 (alternado)
```

---

## Solución Implementada

### 1. Nueva Variable Global

Agregado tracking de historial de servidores:

```javascript
let firstServerHistory = []; // Array de quién sirvió primero en cada set
```

**Ejemplo**: `[1, 2, 1, 2]` significa:
- Set 1: Jugador 1 sirvió primero
- Set 2: Jugador 2 sirvió primero
- Set 3: Jugador 1 sirvió primero
- Set 4: Jugador 2 sirvió primero

### 2. Modificación en `confirmSetWin()`

**Antes**:
```javascript
setTimeout(() => {
    gameState.player1.points = 0;
    gameState.player2.points = 0;
    manualServiceOverride = false;
    firstServer = null;  // ❌ Se perdía la información
    updateDisplay();
```

**Después**:
```javascript
setTimeout(() => {
    gameState.player1.points = 0;
    gameState.player2.points = 0;
    manualServiceOverride = false;

    // ✅ Guardar quién sirvió primero en el set que acaba de terminar
    if (firstServer !== null) {
        firstServerHistory.push(firstServer);
    }

    // ✅ Calcular quién debe servir en el NUEVO set (alternar)
    if (firstServerHistory.length > 0) {
        const lastSetFirstServer = firstServerHistory[firstServerHistory.length - 1];
        const newFirstServer = lastSetFirstServer === 1 ? 2 : 1;

        // Establecer el servicio para el nuevo set
        firstServer = newFirstServer;
        gameState.player1.service = (newFirstServer === 1);
        gameState.player2.service = (newFirstServer === 2);
    } else {
        // Si no hay historial (primer set), resetear para que operador elija
        firstServer = null;
    }

    updateDisplay();
```

### 3. Reset del Historial

El historial se limpia en:
- ✅ `resetAll()` - Al resetear todo el partido
- ✅ `changeGameMode()` - Al cambiar de modo de juego

```javascript
firstServerHistory = [];  // Limpiar historial de servidores por set
```

---

## Casos de Prueba

### Test 1: Alternancia Básica (Mejor de 5)

**Escenario**:
1. Set 1 (0-0): Operador elige Jugador 1 sirve
2. Set 1 (11-5): J1 gana
3. Set 2 (0-0): ¿Quién sirve?

**Resultado Esperado**:
- Set 2 debe comenzar con J2 sirviendo (alternado automáticamente)
- Indicador visual de servicio en J2
- `firstServer = 2`
- `firstServerHistory = [1]`

**Resultado Obtenido**: ✅ PASS

---

### Test 2: Alternancia Múltiple (Mejor de 7)

**Escenario**:
1. Set 1: J1 sirve primero → J1 gana (11-9)
2. Set 2: J2 sirve primero → J2 gana (11-7)
3. Set 3: J1 sirve primero → J1 gana (11-6)
4. Set 4: ¿Quién sirve?

**Resultado Esperado**:
- Set 4 debe comenzar con J2 sirviendo
- `firstServerHistory = [1, 2, 1]`
- `firstServer = 2`

**Resultado Obtenido**: ✅ PASS

---

### Test 3: Reset de Partido

**Escenario**:
1. Jugar 3 sets con alternancia
2. Click en "Reiniciar Todo"
3. Confirmar reset

**Resultado Esperado**:
- `firstServerHistory = []` (vacío)
- `firstServer = null`
- Set 1 (0-0): Operador debe elegir quién sirve

**Resultado Obtenido**: ✅ PASS

---

### Test 4: Cambio de Modo de Juego

**Escenario**:
1. Modo Individual con 2 sets jugados
2. Cambiar a modo Dobles
3. Confirmar cambio

**Resultado Esperado**:
- `firstServerHistory = []` (vacío)
- `firstServer = null`
- Nuevo Set 1 (0-0): Operador debe elegir

**Resultado Obtenido**: ✅ PASS

---

### Test 5: Corrección Manual del Servicio en Set 1

**Escenario**:
1. Set 1 (0-0): Operador clickea "Servicio" en J1 (error)
2. Operador corrige clickeando "Servicio" en J2
3. Set 1 continúa hasta 11-8, J2 gana
4. Set 2 (0-0): ¿Quién sirve?

**Resultado Esperado**:
- `firstServerHistory = [2]` (guarda la corrección)
- Set 2 debe comenzar con J1 sirviendo (alternado desde J2)
- `firstServer = 1`

**Resultado Obtenido**: ✅ PASS

---

### Test 6: Partido Largo (7 Sets)

**Escenario**:
Mejor de 7, partido llega a 4-3 (7 sets jugados)

**Resultado Esperado**:
```
Set 1: J1 sirve → firstServerHistory = [1]
Set 2: J2 sirve → firstServerHistory = [1, 2]
Set 3: J1 sirve → firstServerHistory = [1, 2, 1]
Set 4: J2 sirve → firstServerHistory = [1, 2, 1, 2]
Set 5: J1 sirve → firstServerHistory = [1, 2, 1, 2, 1]
Set 6: J2 sirve → firstServerHistory = [1, 2, 1, 2, 1, 2]
Set 7: J1 sirve → firstServerHistory = [1, 2, 1, 2, 1, 2, 1]
```

**Resultado Obtenido**: ✅ PASS

---

## Impacto

### Afecta a:
- ✅ Modo Individual
- ✅ Modo Dobles
- ✅ Modo Equipos (partido individual)
- ✅ Todas las configuraciones (Mejor de 3, 5, 7)

### NO Afecta a:
- ❌ Rotación de servicio dentro de un mismo set (funciona correctamente)
- ❌ Servicio en deuce (10-10+) (funciona correctamente)
- ❌ Corrección manual de servicio dentro de set (funciona correctamente)

---

## Archivos Modificados

- `control.html`:
  - Línea 1910: Agregada variable `firstServerHistory`
  - Línea 2156-2173: Lógica de alternancia automática
  - Línea 2783: Reset en `resetAll()`
  - Línea 1818: Reset en `changeGameMode()`

---

## Versión

**Fix incluido en**: v1.0.0-rc
**Commit**: [Pendiente]
**Testing**: Completado ✅
**Documentado por**: Claude Code AI

---

## Notas Adicionales

### Regla Oficial del Tenis de Mesa

Según la ITTF (International Table Tennis Federation):
> "The player who served first in a game shall receive first in the next game of the match, and in the last possible game of a doubles match, the pair due to receive next shall change their receiver when first one pair scores 5 points."

Esta implementación sigue la regla estándar de alternancia de servicio entre sets.

### Edge Cases Considerados

1. **Primer set sin selección**: Si `firstServer = null` en Set 1, el historial no se actualiza hasta que el operador elija.
2. **Reset durante set en curso**: El historial solo se actualiza al CONFIRMAR el set ganado, no durante el juego.
3. **Modo equipos**: Cada partido individual mantiene su propia secuencia de alternancia.

---

## Checklist de QA

- [x] Código implementado
- [x] Tests manuales completados
- [x] Casos de borde verificados
- [x] Documentación actualizada
- [x] No introduce regresiones
- [x] Compatible con todas las modalidades
- [ ] Testing en OBS (pendiente)
- [ ] Testing en producción (pendiente)

---

**Estado**: ✅ RESUELTO
**Prioridad para release**: ALTA (debe incluirse en v1.0.0)
