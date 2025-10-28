#!/usr/bin/env node

/**
 * Script para generar versión PREMIUM sin trial
 *
 * Uso:
 *   node scripts/build-premium.js
 *   node scripts/build-premium.js cliente@email.com "Cliente Name"
 */

const fs = require('fs');
const path = require('path');

console.log('╔═══════════════════════════════════════════════════════╗');
console.log('║     Build Premium - Ping Pong Overlay v0.4.0         ║');
console.log('╚═══════════════════════════════════════════════════════╝');
console.log('');

// Parámetros
const clientEmail = process.argv[2] || 'cliente@example.com';
const clientName = process.argv[3] || 'Cliente';

console.log(`📦 Generando versión premium para: ${clientName} (${clientEmail})`);
console.log('');

// Leer control.html
const controlPath = path.join(__dirname, '..', 'control.html');
let controlHTML = fs.readFileSync(controlPath, 'utf8');

// Cambiar PREMIUM_BUILD a true
controlHTML = controlHTML.replace(
    'PREMIUM_BUILD: false',
    'PREMIUM_BUILD: true'
);

// Agregar comentario de versión premium
const premiumComment = `
    <!--
    ╔═══════════════════════════════════════════════════════╗
    ║           PING PONG OVERLAY - VERSIÓN PREMIUM         ║
    ╚═══════════════════════════════════════════════════════╝

    Cliente: ${clientName}
    Email: ${clientEmail}
    Fecha: ${new Date().toLocaleDateString()}
    Versión: Premium (Sin Trial)

    Esta es una versión premium sin restricciones de trial.
    Funciona indefinidamente sin necesidad de activar licencia.

    © 2025 - Todos los derechos reservados
    -->
`;

controlHTML = controlHTML.replace('<head>', '<head>' + premiumComment);

// Crear carpeta premium/
const premiumDir = path.join(__dirname, '..', 'premium');
if (!fs.existsSync(premiumDir)) {
    fs.mkdirSync(premiumDir);
}

// Guardar control-premium.html
const premiumControlPath = path.join(premiumDir, 'control-premium.html');
fs.writeFileSync(premiumControlPath, controlHTML);

// Copiar index.html (no cambia)
const indexPath = path.join(__dirname, '..', 'index.html');
const premiumIndexPath = path.join(premiumDir, 'index-premium.html');
fs.copyFileSync(indexPath, premiumIndexPath);

// Crear LICENSE.txt
const licenseText = `
═══════════════════════════════════════════════════════════
  PING PONG OVERLAY - LICENCIA PREMIUM
═══════════════════════════════════════════════════════════

Cliente: ${clientName}
Email: ${clientEmail}
Fecha de compra: ${new Date().toLocaleDateString()}
Versión: Premium v0.4.0

TÉRMINOS DE USO:
- Esta versión es para uso personal/comercial del cliente
- No se permite redistribuir esta versión
- Actualizaciones incluidas durante 1 año
- Soporte por email: soporte@pingpongoverlay.com

INSTALACIÓN:
1. Abre control-premium.html en tu navegador
2. Abre index-premium.html en OBS como Browser Source
3. ¡Disfruta sin restricciones!

NOTAS:
- Esta versión NO tiene trial de 7 días
- Funciona indefinidamente
- No requiere activación de licencia

═══════════════════════════════════════════════════════════
© 2025 - Todos los derechos reservados
═══════════════════════════════════════════════════════════
`;

const licensePath = path.join(premiumDir, 'LICENSE.txt');
fs.writeFileSync(licensePath, licenseText);

// Crear README.txt
const readmeText = `
═══════════════════════════════════════════════════════════
  PING PONG OVERLAY - VERSIÓN PREMIUM
═══════════════════════════════════════════════════════════

¡Gracias por tu compra!

ARCHIVOS INCLUIDOS:
- control-premium.html  → Panel de control
- index-premium.html    → Overlay para OBS
- LICENSE.txt           → Tu licencia

INICIO RÁPIDO:
1. Abre "control-premium.html" en tu navegador
2. Configura los jugadores y el marcador
3. En OBS, agrega "Browser Source"
4. Selecciona "index-premium.html"
5. Configura resolución: 1920x1080
6. ¡Listo!

DIFERENCIAS CON LA VERSIÓN GRATUITA:
✅ SIN trial de 7 días
✅ SIN modal bloqueante
✅ SIN necesidad de activar licencia
✅ Funciona para siempre

SOPORTE:
- Email: soporte@pingpongoverlay.com
- Documentación: docs/

═══════════════════════════════════════════════════════════
`;

const readmePath = path.join(premiumDir, 'README.txt');
fs.writeFileSync(readmePath, readmeText);

console.log('✅ Versión premium generada exitosamente!');
console.log('');
console.log('📂 Archivos creados en: premium/');
console.log('   • control-premium.html');
console.log('   • index-premium.html');
console.log('   • LICENSE.txt');
console.log('   • README.txt');
console.log('');
console.log('📤 Siguiente paso:');
console.log('   1. Comprime la carpeta "premium/"');
console.log('   2. Envía el ZIP por email al cliente');
console.log('   3. ¡Listo!');
console.log('');
console.log(`💰 Cliente: ${clientName} (${clientEmail})`);
console.log('');
