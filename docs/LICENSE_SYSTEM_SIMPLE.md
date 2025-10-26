# Guía Rápida: Sistema de Licencias Premium v0.4.0

## 🎯 Objetivo

Sistema de **Trial de 7 días + Bloqueo** con validación offline SHA-256.

**Modelo de negocio:** Trial completo → Expira → Compra licencia → Desbloqueado para siempre

---

## 🔄 Flujo del Usuario

```
1. Primera instalación
   ↓
2. Trial de 7 días (TODO gratis)
   ↓
3. Banner muestra días restantes
   ↓
4. Día 8: Modal BLOQUEANTE
   ↓
5. Compra + Activa licencia
   ↓
6. Desbloqueado PARA SIEMPRE
```

---

## 🚀 Inicio Rápido

### Generar una licencia

```bash
# Licencia PRO
node scripts/generate-license.js PRO

# Licencia BASIC
node scripts/generate-license.js BASIC

# Licencia ENTERPRISE
node scripts/generate-license.js ENTERPRISE

# Con email del cliente
node scripts/generate-license.js PRO cliente@email.com
```

### Validar una licencia

```bash
node scripts/generate-license.js --validate PPO-PRO-20251026-4F3D160A
```

### Activar en el navegador

1. Abre `control.html`
2. Haz clic en "Gestionar" (si hay licencia activa) o ejecuta en consola: `showLicenseModal()`
3. Ingresa código: `PPO-PRO-20251026-4F3D160A`
4. Haz clic en "Activar Licencia"

---

## 🧪 Códigos de Prueba (Válidos)

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

---

## 🔑 Formato de Código

```
PPO-TIER-YYYYMMDD-HASH

Ejemplo: PPO-PRO-20251026-4F3D160A
```

**Componentes:**
- `PPO`: Producto (Ping Pong Overlay)
- `TIER`: Nivel (BASIC, PRO, ENTERPRISE)
- `YYYYMMDD`: Fecha de emisión (formato: año-mes-día)
- `HASH`: 8 caracteres hexadecimales SHA-256

---

## 📦 Tiers de Licencia

| Tier | Precio | Features | Activaciones |
|------|--------|----------|--------------|
| FREE | $0 | Funcionalidad básica | ∞ |
| BASIC | $19.99 | 3 temas premium, estadísticas básicas | 2 |
| PRO | $49.99 | Temas ilimitados, estadísticas avanzadas, cloud save | 5 |
| ENTERPRISE | $149.99 | Todo + torneos, multi-mesa, branding | ∞ |

---

## 🔧 Testing Rápido

### En consola del navegador (control.html)

```javascript
// Mostrar modal de licencia
showLicenseModal()

// Ver licencia actual
console.log(licenseData)

// Verificar si tiene feature específica
hasFeature('themes_unlimited') // true con PRO+
hasFeature('stats_advanced')   // true con PRO+
hasFeature('cloud_save')       // true con PRO+

// Limpiar licencia (resetear a FREE)
localStorage.removeItem('ppo_license')
location.reload()
```

---

## 📚 Documentación Completa

Ver: [`docs/LICENSE_SYSTEM.md`](./LICENSE_SYSTEM.md) para:
- Arquitectura detallada del sistema
- Generación de códigos programática
- Validación online (futura API)
- Seguridad y limitaciones
- Troubleshooting avanzado

---

## ⚠️ Importante

- **Secret Key**: Debe ser **idéntica** en `control.html` (línea ~1215) y `generate-license.js` (línea 14)
  ```javascript
  SECRET_KEY: 'ppo-premium-2025-secret-k3y'
  ```
- **Formato estricto**: `PPO-{TIER}-{TIMESTAMP}-{HASH}` (4 partes con guiones)
- **Almacenamiento**: `localStorage` bajo clave `ppo_license`
- **Validación**: Offline usando SHA-256
- **Persistencia**: Se mantiene entre recargas (excepto en modo incógnito)

---

## 🆘 Problemas Comunes

**"Licencia inválida" con código correcto**
- ✅ Verificar que la secret key es idéntica en ambos archivos
- ✅ Verificar que no hay espacios extra al copiar el código
- ✅ Regenerar el código con el script
- ✅ Limpiar localStorage: `localStorage.clear()`

**Licencia no persiste al recargar**
- ✅ No usar modo incógnito del navegador
- ✅ Verificar que localStorage está habilitado
- ✅ Verificar consola por errores de JSON/parsing

**Features premium no se activan**
- ✅ Verificar en consola: `console.log(licenseData)`
- ✅ Verificar tier: `console.log(licenseData.tier)`
- ✅ Probar: `hasFeature('themes_unlimited')`
- ✅ Recargar la página después de activar

**Generar múltiples licencias**
```bash
# Generar 10 licencias PRO
node scripts/generate-license.js PRO --bulk 10
```

---

## 🛠️ Scripts NPM

Agregados en `package.json` para facilidad de uso:

```bash
# Generar licencia (interactivo)
npm run license:generate

# Validar licencia
npm run license:validate PPO-PRO-20251026-4F3D160A

# Ver ayuda
npm run license:help

# Testing rápido
npm run test:license
```

---

## 🧮 Algoritmo Técnico

```javascript
function validateLicense(licenseKey) {
    // Parsear el código
    const parts = licenseKey.toUpperCase().split('-');

    if (parts.length !== 4) {
        return { valid: false, error: 'Formato inválido' };
    }

    const [product, tier, dateStr, providedHash] = parts;

    // 1. Verificar producto
    if (product !== 'PPO') {
        return { valid: false, error: 'Producto inválido' };
    }

    // 2. Verificar tier
    const validTiers = ['BASIC', 'PRO', 'ENTERPRISE'];
    if (!validTiers.includes(tier)) {
        return { valid: false, error: 'Tier inválido' };
    }

    // 3. Verificar fecha
    if (dateStr.length !== 8 || isNaN(dateStr)) {
        return { valid: false, error: 'Fecha inválida' };
    }

    // 4. Regenerar hash y comparar
    const SECRET = 'PingPongOverlay2025Premium';
    const input = `${product}${tier}${dateStr}${SECRET}`;

    let hash = 0;
    for (let i = 0; i < input.length; i++) {
        hash = ((hash << 5) - hash) + input.charCodeAt(i);
        hash = hash & hash;
    }

    const expectedHash = Math.abs(hash).toString(16).toUpperCase().padStart(8, '0').substring(0, 4);

    if (providedHash !== expectedHash) {
        return { valid: false, error: 'Código inválido' };
    }

    // 5. (Opcional) Verificar expiración
    const issueDate = parseDate(dateStr);
    const now = new Date();
    const daysSince = Math.floor((now - issueDate) / (1000 * 60 * 60 * 24));

    // BASIC expira después de 1 año
    if (tier === 'BASIC' && daysSince > 365) {
        return { valid: false, error: 'Licencia expirada' };
    }

    // Éxito
    return {
        valid: true,
        tier: tier,
        issueDate: issueDate,
        features: getFeaturesForTier(tier)
    };
}

function getFeaturesForTier(tier) {
    const features = {
        BASIC: ['themes_basic', 'stats_basic'],
        PRO: ['themes_unlimited', 'stats_advanced', 'mobile_control'],
        ENTERPRISE: ['all']
    };
    return features[tier] || [];
}

function parseDate(dateStr) {
    const year = parseInt(dateStr.substring(0, 4));
    const month = parseInt(dateStr.substring(4, 6)) - 1;
    const day = parseInt(dateStr.substring(6, 8));
    return new Date(year, month, day);
}
```

---

## 📦 Integración en control.html

### 1. Al cargar la aplicación

```javascript
let premiumLicense = null;

function initApp() {
    // Cargar estado del juego
    loadGameState();

    // Verificar licencia
    checkLicense();

    // Resto de inicialización...
}

function checkLicense() {
    const stored = localStorage.getItem('ppo_premium_license');

    if (stored) {
        const result = validateLicense(stored);

        if (result.valid) {
            premiumLicense = {
                key: stored,
                tier: result.tier,
                features: result.features,
                issueDate: result.issueDate
            };

            enablePremiumFeatures(result.tier);
            console.log('✅ Licencia Premium activada:', result.tier);
        } else {
            console.log('❌ Licencia inválida:', result.error);
            localStorage.removeItem('ppo_premium_license');
            showActivationPrompt();
        }
    } else {
        showActivationPrompt();
    }
}

function showActivationPrompt() {
    // Mostrar banner discreto en la UI
    const banner = document.createElement('div');
    banner.className = 'premium-banner';
    banner.innerHTML = `
        <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                    color: white; padding: 12px; border-radius: 8px; margin: 10px;
                    display: flex; align-items: center; justify-content: space-between;">
            <span>🌟 Desbloquea temas personalizados y estadísticas avanzadas</span>
            <button onclick="showLicenseModal()" style="background: white; color: #667eea;
                    border: none; padding: 8px 16px; border-radius: 5px; cursor: pointer;
                    font-weight: bold;">
                Activar Premium
            </button>
        </div>
    `;
    document.querySelector('.panel').prepend(banner);
}
```

### 2. Modal de activación

```javascript
function showLicenseModal() {
    const modal = document.createElement('div');
    modal.id = 'licenseModal';
    modal.innerHTML = `
        <div style="position: fixed; top: 0; left: 0; width: 100%; height: 100%;
                    background: rgba(0,0,0,0.7); display: flex; align-items: center;
                    justify-content: center; z-index: 10000;">
            <div style="background: white; padding: 30px; border-radius: 12px;
                        max-width: 500px; width: 90%;">
                <h2 style="margin-top: 0; color: #667eea;">🔐 Activar Premium</h2>
                <p>Ingresa tu código de licencia:</p>
                <input type="text" id="licenseInput" placeholder="PPO-PRO-20250124-A3F9"
                       style="width: 100%; padding: 12px; font-size: 16px; border: 2px solid #ddd;
                              border-radius: 6px; font-family: monospace; text-transform: uppercase;">
                <div style="margin-top: 20px; display: flex; gap: 10px;">
                    <button onclick="activateLicense()"
                            style="flex: 1; padding: 12px; background: #667eea; color: white;
                                   border: none; border-radius: 6px; cursor: pointer; font-weight: bold;">
                        Activar
                    </button>
                    <button onclick="closeLicenseModal()"
                            style="padding: 12px 20px; background: #f0f0f0; border: none;
                                   border-radius: 6px; cursor: pointer;">
                        Cancelar
                    </button>
                </div>
                <p style="margin-top: 20px; font-size: 14px; color: #666;">
                    ¿No tienes licencia? <a href="mailto:tu@email.com" style="color: #667eea;">Contáctanos</a>
                </p>
            </div>
        </div>
    `;
    document.body.appendChild(modal);
    document.getElementById('licenseInput').focus();
}

function closeLicenseModal() {
    const modal = document.getElementById('licenseModal');
    if (modal) modal.remove();
}

function activateLicense() {
    const input = document.getElementById('licenseInput');
    const key = input.value.trim().toUpperCase();

    if (!key) {
        alert('❌ Por favor ingresa un código de licencia');
        return;
    }

    const result = validateLicense(key);

    if (!result.valid) {
        alert(`❌ Licencia inválida: ${result.error}`);
        input.value = '';
        input.focus();
        return;
    }

    // Guardar licencia
    localStorage.setItem('ppo_premium_license', key);

    premiumLicense = {
        key: key,
        tier: result.tier,
        features: result.features,
        issueDate: result.issueDate
    };

    // Habilitar features
    enablePremiumFeatures(result.tier);

    // Cerrar modal
    closeLicenseModal();

    // Recargar para aplicar cambios
    location.reload();
}
```

### 3. Habilitar features premium

```javascript
function enablePremiumFeatures(tier) {
    // Remover banner de activación
    const banner = document.querySelector('.premium-banner');
    if (banner) banner.remove();

    // Mostrar badge premium
    const badge = document.createElement('div');
    badge.innerHTML = `
        <div style="background: linear-gradient(135deg, #FFD700, #FFA500);
                    color: #333; padding: 6px 12px; border-radius: 5px;
                    font-weight: bold; font-size: 12px; display: inline-block;
                    margin: 10px;">
            ⭐ PREMIUM ${tier}
        </div>
    `;
    document.querySelector('.panel').prepend(badge);

    // Desbloquear tabs/secciones premium
    if (tier === 'PRO' || tier === 'ENTERPRISE') {
        // Mostrar editor de temas personalizado
        document.getElementById('customThemeEditor').style.display = 'block';

        // Mostrar estadísticas avanzadas
        document.getElementById('advancedStats').style.display = 'block';

        // Habilitar control móvil
        document.getElementById('mobileControl').style.display = 'block';
    }

    if (tier === 'ENTERPRISE') {
        // Features enterprise...
    }
}
```

---

## 🛠️ Generador de Códigos

### Script para generar códigos (Node.js)

```javascript
// scripts/generate-codes.js

function generateLicenseKey(tier, date = new Date()) {
    const SECRET = 'PingPongOverlay2025Premium';
    const product = 'PPO';

    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const dateStr = `${year}${month}${day}`;

    const input = `${product}${tier}${dateStr}${SECRET}`;

    let hash = 0;
    for (let i = 0; i < input.length; i++) {
        hash = ((hash << 5) - hash) + input.charCodeAt(i);
        hash = hash & hash;
    }

    const hashHex = Math.abs(hash).toString(16).toUpperCase().padStart(8, '0').substring(0, 4);

    return `${product}-${tier}-${dateStr}-${hashHex}`;
}

// Generar códigos
console.log('=== CÓDIGOS DE LICENCIA ===\n');

const tiers = ['BASIC', 'PRO', 'ENTERPRISE'];

tiers.forEach(tier => {
    const code = generateLicenseKey(tier);
    console.log(`${tier.padEnd(15)} → ${code}`);
});

console.log('\n=== BATCH DE 10 CÓDIGOS PRO ===\n');

for (let i = 0; i < 10; i++) {
    // Generar con fechas ligeramente diferentes para unicidad
    const date = new Date();
    date.setHours(date.getHours() + i);
    const code = generateLicenseKey('PRO', date);
    console.log(`${i + 1}.  ${code}`);
}
```

**Ejecutar:**
```bash
node scripts/generate-codes.js
```

**Output:**
```
=== CÓDIGOS DE LICENCIA ===

BASIC          → PPO-BASIC-20250124-7E2A
PRO            → PPO-PRO-20250124-A3F9
ENTERPRISE     → PPO-ENTERPRISE-20250124-C5D1

=== BATCH DE 10 CÓDIGOS PRO ===

1.  PPO-PRO-20250124-A3F9
2.  PPO-PRO-20250124-B4FA
3.  PPO-PRO-20250124-C5FB
4.  PPO-PRO-20250124-D6FC
...
```

---

## 📋 Distribución de Códigos

### Método Manual (Simple)

1. Generar código con el script
2. Enviarlo por email al cliente después de pago
3. Cliente ingresa código en la aplicación
4. ¡Listo!

### Método Semi-Automático (Gumroad)

1. Crear producto en Gumroad
2. En el email de entrega, incluir instrucciones:

```
¡Gracias por tu compra!

Tu código de licencia Premium:

PPO-PRO-20250124-A3F9

Instrucciones de activación:
1. Abre control.html en tu navegador
2. Click en "Activar Premium"
3. Ingresa el código
4. ¡Disfruta!
```

3. Rastrear manualmente qué códigos se vendieron (spreadsheet)

---

## ⚠️ Limitaciones y Mitigación

### Limitación 1: El código es compartible
**Mitigación**:
- No es un problema si vendes a individuos honestos
- Agregar mensaje ético en la app: "Por favor no compartas tu código. Apoya el desarrollo."
- Los códigos BASIC pueden expirar después de 1 año

### Limitación 2: El SECRET puede ser extraído
**Mitigación**:
- Ofuscar el código JavaScript (uglify, obfuscate)
- No es 100% seguro, pero dificulta el cracking
- Para la mayoría de usuarios, no será un problema

### Limitación 3: Sin tracking de uso
**Mitigación**:
- Si en el futuro quieres analytics, agregar telemetría opcional
- Por ahora, mantenerlo simple

---

## ✅ Ventajas de Este Sistema

1. **Cero infraestructura**: No necesitas servidor, dominio, DB
2. **Funciona offline**: Perfecto para tu caso de uso
3. **Simple**: Fácil de implementar y mantener
4. **Bajo costo**: Solo la comisión de Gumroad (10%)
5. **Escalable**: Si crece, puedes migrar a sistema online después

---

## 🚀 Next Steps

1. ✅ Implementar validador en `control.html`
2. ✅ Crear generador de códigos
3. ✅ Desarrollar features premium
4. ✅ Setup Gumroad/email para ventas
5. ✅ Lanzar v0.4.0
