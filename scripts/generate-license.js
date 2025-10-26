#!/usr/bin/env node

/**
 * Script para generar códigos de licencia para Ping Pong Overlay Premium
 *
 * Uso:
 *   node scripts/generate-license.js PRO usuario@email.com
 *   node scripts/generate-license.js BASIC
 *   node scripts/generate-license.js ENTERPRISE cliente@empresa.com
 */

const crypto = require('crypto');

// IMPORTANTE: Este SECRET_KEY debe ser el MISMO que en control.html
const SECRET_KEY = 'ppo-premium-2025-secret-k3y';
const PRODUCT_CODE = 'PPO';

const VALID_TIERS = ['BASIC', 'PRO', 'ENTERPRISE'];

/**
 * Genera un hash SHA-256 simplificado (primeros 8 caracteres)
 */
function generateHash(input) {
    return crypto.createHash('sha256')
        .update(input)
        .digest('hex')
        .substring(0, 8)
        .toUpperCase();
}

/**
 * Genera un código de licencia
 *
 * @param {string} tier - BASIC, PRO, o ENTERPRISE
 * @param {string} email - Email del cliente (opcional, para registro)
 * @param {Date} date - Fecha de emisión (opcional, por defecto: hoy)
 * @returns {object} Objeto con la licencia generada
 */
function generateLicense(tier = 'PRO', email = null, date = new Date()) {
    // Validar tier
    if (!VALID_TIERS.includes(tier.toUpperCase())) {
        throw new Error(`Tier inválido. Debe ser uno de: ${VALID_TIERS.join(', ')}`);
    }

    tier = tier.toUpperCase();

    // Formato de timestamp: YYYYMMDD
    const timestamp = date.toISOString().slice(0, 10).replace(/-/g, '');

    // Generar hash
    const hashInput = `${PRODUCT_CODE}-${tier}-${timestamp}-${SECRET_KEY}`;
    const hash = generateHash(hashInput);

    // Ensamblar código de licencia
    const licenseKey = `${PRODUCT_CODE}-${tier}-${timestamp}-${hash}`;

    return {
        key: licenseKey,
        tier: tier,
        email: email,
        timestamp: timestamp,
        createdAt: date.toISOString(),
        product: PRODUCT_CODE
    };
}

/**
 * Validar un código de licencia existente
 */
function validateLicense(licenseKey) {
    const parts = licenseKey.split('-');

    if (parts.length !== 4) {
        return { valid: false, error: 'Formato inválido' };
    }

    const [product, tier, timestamp, hash] = parts;

    if (product !== PRODUCT_CODE) {
        return { valid: false, error: 'Código de producto inválido' };
    }

    if (!VALID_TIERS.includes(tier)) {
        return { valid: false, error: 'Tier inválido' };
    }

    if (!/^\d{8}$/.test(timestamp)) {
        return { valid: false, error: 'Timestamp inválido' };
    }

    // Verificar hash
    const hashInput = `${product}-${tier}-${timestamp}-${SECRET_KEY}`;
    const expectedHash = generateHash(hashInput);

    if (hash !== expectedHash) {
        return { valid: false, error: 'Hash inválido' };
    }

    return {
        valid: true,
        product,
        tier,
        timestamp,
        createdAt: `${timestamp.slice(0, 4)}-${timestamp.slice(4, 6)}-${timestamp.slice(6, 8)}`
    };
}

/**
 * Generar múltiples licencias de una vez
 */
function generateBulk(tier, count = 10) {
    const licenses = [];

    for (let i = 0; i < count; i++) {
        licenses.push(generateLicense(tier, null));
    }

    return licenses;
}

// CLI Interface
if (require.main === module) {
    const args = process.argv.slice(2);

    if (args.length === 0 || args[0] === '--help' || args[0] === '-h') {
        console.log(`
╔═══════════════════════════════════════════════════════════════╗
║     Generador de Licencias - Ping Pong Overlay Premium       ║
╚═══════════════════════════════════════════════════════════════╝

USO:
  node generate-license.js <TIER> [EMAIL] [OPCIONES]

TIERS DISPONIBLES:
  BASIC       - Licencia básica ($19.99)
  PRO         - Licencia profesional ($49.99)
  ENTERPRISE  - Licencia empresarial ($149.99)

OPCIONES:
  --validate <KEY>   Validar un código de licencia existente
  --bulk <N>         Generar N licencias del tier especificado
  --help, -h         Mostrar esta ayuda

EJEMPLOS:
  # Generar licencia PRO
  node generate-license.js PRO

  # Generar licencia BASIC con email
  node generate-license.js BASIC usuario@email.com

  # Validar licencia
  node generate-license.js --validate PPO-PRO-20250124-A3F9E2C1

  # Generar 5 licencias PRO
  node generate-license.js PRO --bulk 5
        `);
        process.exit(0);
    }

    // Validar licencia
    if (args[0] === '--validate') {
        if (!args[1]) {
            console.error('❌ Error: Debes proporcionar un código de licencia para validar');
            process.exit(1);
        }

        const result = validateLicense(args[1]);

        if (result.valid) {
            console.log('\n✅ LICENCIA VÁLIDA\n');
            console.log(`  Producto:  ${result.product}`);
            console.log(`  Tier:      ${result.tier}`);
            console.log(`  Emitida:   ${result.createdAt}`);
        } else {
            console.log('\n❌ LICENCIA INVÁLIDA\n');
            console.log(`  Error: ${result.error}`);
        }

        process.exit(result.valid ? 0 : 1);
    }

    // Generar múltiples licencias
    if (args.includes('--bulk')) {
        const tier = args[0];
        const bulkIndex = args.indexOf('--bulk');
        const count = parseInt(args[bulkIndex + 1]) || 10;

        console.log(`\n🎫 Generando ${count} licencias ${tier}...\n`);

        const licenses = generateBulk(tier, count);

        licenses.forEach((license, i) => {
            console.log(`${i + 1}. ${license.key}`);
        });

        console.log(`\n✅ ${count} licencias generadas exitosamente!\n`);
        process.exit(0);
    }

    // Generar licencia única
    const tier = args[0];
    const email = args[1] || null;

    try {
        const license = generateLicense(tier, email);

        console.log('\n' + '═'.repeat(70));
        console.log('🎫  LICENCIA GENERADA EXITOSAMENTE');
        console.log('═'.repeat(70));
        console.log();
        console.log(`  Código de Licencia:  ${license.key}`);
        console.log();
        console.log(`  Tier:                ${license.tier}`);
        console.log(`  Producto:            ${license.product}`);
        console.log(`  Fecha de emisión:    ${license.createdAt.split('T')[0]}`);
        if (email) {
            console.log(`  Email cliente:       ${license.email}`);
        }
        console.log();
        console.log('═'.repeat(70));
        console.log();
        console.log('📋 INSTRUCCIONES PARA EL CLIENTE:');
        console.log();
        console.log('  1. Abre control.html en tu navegador');
        console.log('  2. Haz clic en "Gestionar" en la barra de licencia');
        console.log('  3. Ingresa el código de licencia mostrado arriba');
        console.log('  4. Haz clic en "Activar Licencia"');
        console.log();
        console.log('═'.repeat(70));
        console.log();

    } catch (error) {
        console.error(`\n❌ Error: ${error.message}\n`);
        process.exit(1);
    }
}

// Exportar funciones para uso como módulo
module.exports = {
    generateLicense,
    validateLicense,
    generateBulk
};
