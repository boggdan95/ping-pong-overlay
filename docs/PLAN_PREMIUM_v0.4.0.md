# Plan: Ping Pong Overlay Premium v0.4.0

## 🎯 Objetivo

Crear una versión premium con sistema de licencias híbrido que:
- Funciona offline con códigos de activación
- Valida online cuando hay conexión
- Archivos públicos en GitHub pero bloqueados sin licencia
- Fácil distribución y activación

---

## 🏗️ Arquitectura del Sistema de Licencias

### 1. Validación Offline (Local)

**Algoritmo de generación de códigos:**
```
LICENCIA = [PRODUCTO]-[TIER]-[TIMESTAMP]-[HASH]

Ejemplo: PPO-PRO-20250124-A3F9E2C1
```

**Componentes:**
- `PRODUCTO`: "PPO" (Ping Pong Overlay)
- `TIER`: "BASIC", "PRO", "ENTERPRISE"
- `TIMESTAMP`: Fecha de emisión (YYYYMMDD)
- `HASH`: Hash único basado en datos + secret key

**Validación:**
```javascript
function validateLicenseOffline(licenseKey) {
    const parts = licenseKey.split('-');
    if (parts.length !== 4) return false;

    const [product, tier, timestamp, hash] = parts;

    // Verificar producto
    if (product !== 'PPO') return false;

    // Verificar tier válido
    if (!['BASIC', 'PRO', 'ENTERPRISE'].includes(tier)) return false;

    // Verificar hash
    const expectedHash = generateHash(product, tier, timestamp, SECRET_KEY);
    if (hash !== expectedHash) return false;

    // Opcional: Verificar expiración
    const issueDate = parseTimestamp(timestamp);
    const daysSinceIssue = daysBetween(issueDate, new Date());
    if (tier === 'BASIC' && daysSinceIssue > 365) return false; // 1 año

    return true;
}
```

### 2. Validación Online (API)

**Endpoint de validación:**
```
POST https://api.pingpongoverlay.com/v1/licenses/validate
{
    "licenseKey": "PPO-PRO-20250124-A3F9E2C1",
    "machineId": "unique-device-identifier"
}

Response:
{
    "valid": true,
    "tier": "PRO",
    "features": ["themes", "stats", "cloud_save"],
    "expiresAt": "2026-01-24T00:00:00Z",
    "activations": 2,
    "maxActivations": 5
}
```

**Base de datos:**
```sql
CREATE TABLE licenses (
    id UUID PRIMARY KEY,
    license_key VARCHAR(50) UNIQUE NOT NULL,
    tier VARCHAR(20) NOT NULL,
    email VARCHAR(255),
    created_at TIMESTAMP,
    expires_at TIMESTAMP,
    max_activations INT DEFAULT 5,
    status VARCHAR(20) DEFAULT 'active'
);

CREATE TABLE activations (
    id UUID PRIMARY KEY,
    license_id UUID REFERENCES licenses(id),
    machine_id VARCHAR(255),
    activated_at TIMESTAMP,
    last_validated_at TIMESTAMP
);
```

### 3. Flujo de Activación

```
1. Usuario compra licencia
   ↓
2. Sistema genera código único: PPO-PRO-20250124-A3F9E2C1
   ↓
3. Envía código por email
   ↓
4. Usuario abre control.html
   ↓
5. Modal de activación aparece (si no hay licencia válida)
   ↓
6. Usuario ingresa código
   ↓
7. Validación offline: ¿Formato correcto? ¿Hash válido?
   ↓
8. Si hay internet: Validar online + registrar activación
   ↓
9. Guardar en localStorage: { licenseKey, tier, features, validatedAt }
   ↓
10. Desbloquear features premium
```

---

## 🔐 Implementación Técnica

### A. Modificaciones a `control.html`

**1. Agregar modal de activación:**
```html
<div id="licenseModal" class="modal">
    <div class="modal-content">
        <h2>🔐 Activar Ping Pong Overlay Premium</h2>
        <p>Ingresa tu código de licencia:</p>
        <input type="text" id="licenseInput" placeholder="PPO-PRO-20250124-A3F9E2C1">
        <button onclick="activateLicense()">Activar</button>
        <p class="license-info">
            ¿No tienes licencia? <a href="https://pingpongoverlay.com/buy">Comprar aquí</a>
        </p>
    </div>
</div>
```

**2. Sistema de validación:**
```javascript
const LICENSE_CONFIG = {
    SECRET_KEY: 'tu-secret-key-aqui', // Ofuscar en producción
    API_URL: 'https://api.pingpongoverlay.com/v1',
    TIERS: {
        BASIC: {
            name: 'Basic',
            features: ['themes_basic', 'stats_basic'],
            maxActivations: 2
        },
        PRO: {
            name: 'Pro',
            features: ['themes_unlimited', 'stats_advanced', 'cloud_save', 'mobile_control'],
            maxActivations: 5
        },
        ENTERPRISE: {
            name: 'Enterprise',
            features: ['all'],
            maxActivations: 999
        }
    }
};

let licenseData = null;

function initLicense() {
    const saved = localStorage.getItem('ppo_license');
    if (saved) {
        licenseData = JSON.parse(saved);

        // Validar offline
        if (!validateLicenseOffline(licenseData.key)) {
            licenseData = null;
            showLicenseModal();
            return;
        }

        // Validar online en background
        validateLicenseOnline(licenseData.key);

        // Habilitar features
        enablePremiumFeatures(licenseData.tier);
    } else {
        showLicenseModal();
    }
}

async function activateLicense() {
    const key = document.getElementById('licenseInput').value.trim();

    // Validación offline primero
    if (!validateLicenseOffline(key)) {
        alert('❌ Código de licencia inválido');
        return;
    }

    // Extraer tier del código
    const tier = key.split('-')[1];

    // Intentar validación online
    const online = await validateLicenseOnline(key);

    if (online && !online.valid) {
        alert('❌ Licencia no válida o expirada');
        return;
    }

    // Guardar licencia
    licenseData = {
        key: key,
        tier: tier,
        features: LICENSE_CONFIG.TIERS[tier].features,
        validatedAt: Date.now(),
        online: online || null
    };

    localStorage.setItem('ppo_license', JSON.stringify(licenseData));

    // Ocultar modal
    document.getElementById('licenseModal').classList.remove('show');

    // Habilitar features
    enablePremiumFeatures(tier);

    alert('✅ Licencia activada exitosamente!');
}

function enablePremiumFeatures(tier) {
    const features = LICENSE_CONFIG.TIERS[tier].features;

    // Mostrar/habilitar elementos premium
    if (features.includes('themes_unlimited') || features.includes('all')) {
        document.getElementById('premiumThemes').style.display = 'block';
    }

    if (features.includes('stats_advanced') || features.includes('all')) {
        document.getElementById('advancedStats').style.display = 'block';
    }

    // etc...
}
```

### B. Generador de Códigos (Node.js script)

```javascript
// scripts/generate-license.js
const crypto = require('crypto');

const SECRET_KEY = 'tu-secret-key-aqui'; // Mismo que en control.html

function generateLicense(tier = 'PRO', email = null) {
    const product = 'PPO';
    const timestamp = new Date().toISOString().slice(0, 10).replace(/-/g, '');

    // Generar hash
    const hashInput = `${product}-${tier}-${timestamp}-${email || 'anon'}-${SECRET_KEY}`;
    const hash = crypto.createHash('sha256')
        .update(hashInput)
        .digest('hex')
        .substring(0, 8)
        .toUpperCase();

    const licenseKey = `${product}-${tier}-${timestamp}-${hash}`;

    return {
        key: licenseKey,
        tier: tier,
        email: email,
        createdAt: new Date().toISOString()
    };
}

// Uso:
const license = generateLicense('PRO', 'cliente@email.com');
console.log('Código de licencia:', license.key);
// Output: PPO-PRO-20250124-A3F9E2C1
```

### C. API Backend (Node.js + Express ejemplo)

```javascript
// api/index.js
const express = require('express');
const { Pool } = require('pg');

const app = express();
const db = new Pool({ connectionString: process.env.DATABASE_URL });

app.post('/v1/licenses/validate', async (req, res) => {
    const { licenseKey, machineId } = req.body;

    // Buscar licencia en DB
    const license = await db.query(
        'SELECT * FROM licenses WHERE license_key = $1',
        [licenseKey]
    );

    if (!license.rows.length) {
        return res.json({ valid: false, error: 'License not found' });
    }

    const lic = license.rows[0];

    // Verificar status
    if (lic.status !== 'active') {
        return res.json({ valid: false, error: 'License inactive' });
    }

    // Verificar expiración
    if (new Date(lic.expires_at) < new Date()) {
        return res.json({ valid: false, error: 'License expired' });
    }

    // Verificar activaciones
    const activations = await db.query(
        'SELECT COUNT(*) FROM activations WHERE license_id = $1',
        [lic.id]
    );

    if (activations.rows[0].count >= lic.max_activations) {
        // Verificar si esta máquina ya está activada
        const existing = await db.query(
            'SELECT * FROM activations WHERE license_id = $1 AND machine_id = $2',
            [lic.id, machineId]
        );

        if (!existing.rows.length) {
            return res.json({ valid: false, error: 'Max activations reached' });
        }
    } else {
        // Registrar nueva activación
        await db.query(
            'INSERT INTO activations (license_id, machine_id, activated_at, last_validated_at) VALUES ($1, $2, NOW(), NOW())',
            [lic.id, machineId]
        );
    }

    // Actualizar última validación
    await db.query(
        'UPDATE activations SET last_validated_at = NOW() WHERE license_id = $1 AND machine_id = $2',
        [lic.id, machineId]
    );

    res.json({
        valid: true,
        tier: lic.tier,
        features: LICENSE_CONFIG.TIERS[lic.tier].features,
        expiresAt: lic.expires_at,
        activations: parseInt(activations.rows[0].count),
        maxActivations: lic.max_activations
    });
});

app.listen(3000);
```

---

## 📦 Features Premium v0.4.0

### Tier BASIC ($19.99 USD - Pago único)
- ✅ 3 temas premium adicionales
- ✅ Estadísticas básicas (puntos ganados, % efectividad)
- ✅ Soporte por email
- ✅ 2 activaciones simultáneas
- ✅ Actualizaciones 1 año

### Tier PRO ($49.99 USD - Pago único)
- ✅ Todo de BASIC +
- ✅ Temas ilimitados personalizables
- ✅ Estadísticas avanzadas (heatmaps, gráficos)
- ✅ Guardado en la nube (5 GB)
- ✅ Control remoto desde móvil (app web)
- ✅ Replay de puntos importantes
- ✅ 5 activaciones simultáneas
- ✅ Actualizaciones de por vida
- ✅ Soporte prioritario

### Tier ENTERPRISE ($149.99 USD - Pago único)
- ✅ Todo de PRO +
- ✅ Gestión de torneos (brackets, eliminatorias)
- ✅ Multi-mesa (hasta 8 mesas simultáneas)
- ✅ Branding personalizado (logo, colores corporativos)
- ✅ Integración con APIs externas
- ✅ Guardado en la nube ilimitado
- ✅ Activaciones ilimitadas
- ✅ Soporte dedicado 24/7
- ✅ Instalación y configuración asistida

---

## 🚀 Roadmap de Implementación

### Fase 1: Infraestructura (1-2 semanas)
- [ ] Crear rama `premium/v0.4.0`
- [ ] Implementar sistema de licencias offline
- [ ] Configurar API backend (Vercel/Railway/Render)
- [ ] Crear base de datos PostgreSQL
- [ ] Script generador de códigos

### Fase 2: UI/UX Premium (1 semana)
- [ ] Modal de activación
- [ ] Panel de licencia en configuración
- [ ] Badges "Premium" en features bloqueadas
- [ ] Temas premium (3 para BASIC, ilimitados para PRO+)

### Fase 3: Features Premium (2-3 semanas)
- [ ] Sistema de estadísticas básicas
- [ ] Sistema de estadísticas avanzadas
- [ ] Editor de temas personalizado
- [ ] (Opcional) Guardado en la nube

### Fase 4: Testing y Distribución (1 semana)
- [ ] Testing de validación offline
- [ ] Testing de validación online
- [ ] Documentación de activación
- [ ] Página de ventas
- [ ] Integración con Gumroad/Stripe

### Fase 5: Lanzamiento
- [ ] Release v0.4.0-beta (closed beta con testers)
- [ ] Ajustes basados en feedback
- [ ] Release v0.4.0 oficial
- [ ] Marketing y promoción

---

## 💰 Plataforma de Ventas Recomendada

**Opción 1: Gumroad** ✅ (Recomendado para empezar)
- Fácil setup
- Maneja pagos y distribución
- Webhook para activar licencias automáticamente
- 10% comisión + fees de pago

**Opción 2: Lemon Squeezy**
- Similar a Gumroad
- Mejor para productos SaaS
- Maneja impuestos automáticamente

**Opción 3: Custom (Stripe + tu web)**
- Control total
- Más trabajo de desarrollo
- Fees más bajos (2.9% + $0.30)

---

## 📝 Notas Importantes

1. **Secret Key**: Debe estar ofuscado en el código cliente (nunca 100% seguro)
2. **Piratería**: El sistema offline siempre será vulnerable, pero dificulta el cracking
3. **UX**: El sistema debe funcionar sin internet para buenos clientes
4. **Actualizaciones**: v0.3.4 gratuita no recibirá nuevas features, solo bugfixes críticos
5. **Migración**: Usuarios de v0.3.4 pueden actualizar comprando licencia

---

## 🎯 Next Steps

1. ¿Aprobar este plan?
2. Decidir plataforma de ventas
3. Crear rama `premium/v0.4.0`
4. Implementar sistema de licencias básico
5. Desarrollar primera feature premium (¿temas personalizables?)
