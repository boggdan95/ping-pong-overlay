# Sistema de Licencias Premium v0.4.0

Este documento describe el funcionamiento del sistema de licencias para Ping Pong Overlay Premium.

## 📋 Tabla de Contenidos

- [Arquitectura](#arquitectura)
- [Tiers de Licencia](#tiers-de-licencia)
- [Generación de Códigos](#generación-de-códigos)
- [Validación](#validación)
- [Activación](#activación)
- [Testing](#testing)
- [Seguridad](#seguridad)

---

## 🏗️ Arquitectura

El sistema de licencias utiliza un enfoque **híbrido offline/online**:

1. **Validación Offline**: Los códigos se validan localmente usando criptografía SHA-256
2. **Validación Online** (futuro): API para registro de activaciones y anti-piratería
3. **Almacenamiento Local**: Las licencias se guardan en `localStorage` del navegador

### Formato del Código

```
PPO-{TIER}-{TIMESTAMP}-{HASH}

Ejemplo: PPO-PRO-20251026-4F3D160A
```

**Componentes:**
- `PPO`: Código del producto (Ping Pong Overlay)
- `TIER`: Nivel de licencia (BASIC, PRO, ENTERPRISE)
- `TIMESTAMP`: Fecha de emisión en formato YYYYMMDD
- `HASH`: Hash SHA-256 de 8 caracteres para validación

### Secret Key

El sistema usa una **secret key** compartida entre:
- `control.html` (validación cliente)
- `scripts/generate-license.js` (generación servidor)

**⚠️ IMPORTANTE**: Cambiar la secret key invalida todas las licencias existentes.

```javascript
// Ubicación en control.html (línea ~1215)
SECRET_KEY: 'ppo-premium-2025-secret-k3y'

// Ubicación en generate-license.js (línea 14)
const SECRET_KEY = 'ppo-premium-2025-secret-k3y';
```

---

## 💎 Tiers de Licencia

### FREE (Por Defecto)
- **Precio**: Gratis
- **Features**: Funcionalidad básica del overlay
- **Limitaciones**: No acceso a features premium

### BASIC ($19.99 USD)
- 3 temas premium adicionales
- Estadísticas básicas
- Soporte por email
- **2 activaciones simultáneas**
- Actualizaciones 1 año

### PRO ($49.99 USD)
- Temas ilimitados personalizables
- Estadísticas avanzadas
- Guardado en la nube (5 GB)
- Control remoto desde móvil
- **5 activaciones simultáneas**
- Actualizaciones de por vida
- Soporte prioritario

### ENTERPRISE ($149.99 USD)
- Todo de PRO +
- Gestión de torneos
- Multi-mesa (hasta 8 simultáneas)
- Branding personalizado
- **Activaciones ilimitadas**
- Soporte dedicado 24/7

---

## 🔑 Generación de Códigos

### Usando el Script Node.js

**Requisitos**: Node.js 14+

```bash
# Ayuda
node scripts/generate-license.js --help

# Generar licencia PRO
node scripts/generate-license.js PRO

# Generar licencia con email
node scripts/generate-license.js PRO usuario@email.com

# Generar licencia BASIC
node scripts/generate-license.js BASIC

# Generar 10 licencias PRO
node scripts/generate-license.js PRO --bulk 10

# Validar código
node scripts/generate-license.js --validate PPO-PRO-20251026-4F3D160A
```

### Ejemplo de Salida

```
══════════════════════════════════════════════════════════════════════
🎫  LICENCIA GENERADA EXITOSAMENTE
══════════════════════════════════════════════════════════════════════

  Código de Licencia:  PPO-PRO-20251026-4F3D160A

  Tier:                PRO
  Producto:            PPO
  Fecha de emisión:    2025-10-26
  Email cliente:       test@example.com

══════════════════════════════════════════════════════════════════════
```

### Uso Programático

```javascript
const { generateLicense, validateLicense } = require('./scripts/generate-license.js');

// Generar licencia
const license = generateLicense('PRO', 'cliente@email.com');
console.log(license.key); // PPO-PRO-20251026-4F3D160A

// Validar licencia
const result = validateLicense('PPO-PRO-20251026-4F3D160A');
console.log(result.valid); // true
```

---

## ✅ Validación

### Validación Offline (Cliente)

La validación se realiza en `control.html` usando la función `validateLicenseOffline()`:

```javascript
const isValid = await validateLicenseOffline('PPO-PRO-20251026-4F3D160A');
// Retorna: true o false
```

**Pasos de validación:**
1. Verificar formato (4 partes separadas por guiones)
2. Verificar código de producto = "PPO"
3. Verificar tier válido (BASIC, PRO, ENTERPRISE)
4. Verificar timestamp formato YYYYMMDD
5. Calcular hash esperado y comparar con el recibido

### Validación Online (Futuro)

Cuando se implemente la API, se validará:
- Activaciones máximas permitidas
- Estado de la licencia (activa/revocada)
- Fecha de expiración
- Machine ID del dispositivo

---

## 🚀 Activación

### Flujo de Usuario

1. Usuario abre `control.html`
2. Si no hay licencia activa, NO se muestra modal (modo FREE)
3. Usuario hace clic en "Gestionar" (si hay licencia) o puede activar manualmente
4. Ingresa código de licencia: `PPO-PRO-20251026-4F3D160A`
5. Sistema valida offline
6. Sistema intenta validar online (opcional)
7. Si es válida, se guarda en `localStorage`
8. Features premium se habilitan
9. Barra de estado muestra el tier activo

### Almacenamiento

```javascript
// Estructura en localStorage bajo la clave 'ppo_license'
{
  "key": "PPO-PRO-20251026-4F3D160A",
  "tier": "PRO",
  "features": ["themes_unlimited", "stats_advanced", "cloud_save", ...],
  "activatedAt": 1729900800000,
  "online": null // Resultado de validación online (cuando esté disponible)
}
```

### UI

**Barra de Estado** (cuando hay licencia activa):
```
✨ Licencia: PRO [Gestionar]
```

**Modal de Activación**:
- Input para código de licencia
- Validación en tiempo real
- Mensajes de error claros
- Link para comprar licencia

---

## 🧪 Testing

### Licencias de Prueba

**BASIC:**
```
PPO-BASIC-20251026-6B437D7B
```

**PRO:**
```
PPO-PRO-20251026-4F3D160A
```

**ENTERPRISE:**
```
PPO-ENTERPRISE-20251026-38A00E05
```

### Casos de Prueba

1. **Activación exitosa**
   - Ingresar código válido
   - Verificar que la barra de estado aparece
   - Verificar tier correcto en consola

2. **Código inválido**
   - Ingresar `PPO-INVALID-20251026-12345678`
   - Verificar mensaje de error

3. **Formato incorrecto**
   - Ingresar `INVALID-FORMAT`
   - Verificar mensaje de error

4. **Persistencia**
   - Activar licencia
   - Recargar página
   - Verificar que la licencia sigue activa

5. **Función hasFeature()**
   ```javascript
   // En consola del navegador
   hasFeature('themes_unlimited') // true con PRO
   hasFeature('stats_advanced')   // true con PRO
   hasFeature('cloud_save')       // true con PRO, false con BASIC
   ```

### Testing Manual

1. Abre `control.html` en el navegador
2. Abre la consola (F12)
3. Verifica mensajes de inicialización:
   ```
   ℹ️ No hay licencia activada (modo FREE)
   ```
4. Haz clic en cualquier parte de la página para abrir DevTools
5. Ejecuta:
   ```javascript
   showLicenseModal()
   ```
6. Ingresa código de prueba: `PPO-PRO-20251026-4F3D160A`
7. Haz clic en "Activar Licencia"
8. Verifica consola:
   ```
   ✅ Licencia válida offline
   🎉 Features habilitadas: ["themes_unlimited", "stats_advanced", ...]
   ```

---

## 🔒 Seguridad

### Protecciones Implementadas

1. **Hash criptográfico**: Evita generación de códigos falsos
2. **Validación offline**: Funciona sin conexión
3. **Secret key**: Solo conocida por el servidor
4. **Formato específico**: Dificulta ataques de fuerza bruta

### Limitaciones

⚠️ **El sistema offline NO es 100% seguro contra piratería avanzada:**

1. La secret key está en el código JavaScript (ofuscado pero accesible)
2. No hay límite real de activaciones sin API online
3. Los códigos pueden compartirse entre usuarios
4. localStorage puede ser manipulado

### Recomendaciones

Para un sistema de producción:

1. ✅ Implementar API de validación online
2. ✅ Registrar activaciones por device/machine ID
3. ✅ Limitar activaciones según tier
4. ✅ Ofuscar código JavaScript en producción
5. ✅ Implementar telemetría de uso
6. ✅ Rotación periódica de secret key
7. ✅ Rate limiting en API de validación

### Ofuscación de Producción

```bash
# Usar herramientas como:
npm install -g javascript-obfuscator

javascript-obfuscator control.html \
  --output control.min.html \
  --compact true \
  --controlFlowFlattening true
```

---

## 🛠️ Troubleshooting

### "Licencia inválida" con código correcto

1. Verificar que la secret key es idéntica en ambos archivos
2. Verificar que no hay espacios extra en el código
3. Limpiar localStorage: `localStorage.removeItem('ppo_license')`
4. Regenerar código con el script

### Licencia no persiste al recargar

1. Verificar que localStorage está habilitado
2. Verificar que no estás en modo incógnito
3. Verificar consola por errores de JSON

### Features premium no se habilitan

1. Verificar en consola el tier activo
2. Ejecutar: `console.log(licenseData)`
3. Verificar que `hasFeature()` retorna `true`

---

## 📞 Soporte

Para problemas con el sistema de licencias:

1. Revisar consola del navegador
2. Validar código con el script: `node scripts/generate-license.js --validate CODIGO`
3. Verificar documentación en este archivo

---

**Versión**: 0.4.0-beta
**Última actualización**: 2025-10-26
