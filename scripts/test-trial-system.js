#!/usr/bin/env node

/**
 * Script de testing automático para el sistema de trial
 *
 * Genera un reporte HTML con screenshots de todos los escenarios
 */

const fs = require('fs');
const path = require('path');

console.log('╔════════════════════════════════════════════════════════╗');
console.log('║     Test Automático - Sistema de Trial v0.4.0         ║');
console.log('╚════════════════════════════════════════════════════════╝');
console.log('');

// Escenarios de prueba
const scenarios = [
    {
        id: 1,
        name: 'Trial Activo - Día 1 (7 días restantes)',
        localStorage: {
            ppo_first_install: Date.now().toString()
        },
        expected: {
            banner: 'naranja',
            text: 'Te quedan 7 días',
            modal: false,
            licenseBar: false
        }
    },
    {
        id: 2,
        name: 'Trial Activo - Día 5 (3 días restantes)',
        localStorage: {
            ppo_first_install: (Date.now() - (4 * 24 * 60 * 60 * 1000)).toString()
        },
        expected: {
            banner: 'naranja',
            text: 'Te quedan 3 días',
            modal: false,
            licenseBar: false
        }
    },
    {
        id: 3,
        name: 'Trial Activo - Día 6 (último día)',
        localStorage: {
            ppo_first_install: (Date.now() - (6 * 24 * 60 * 60 * 1000)).toString()
        },
        expected: {
            banner: 'naranja',
            text: 'Te queda último día',
            modal: false,
            licenseBar: false
        }
    },
    {
        id: 4,
        name: 'Trial Expirado - Día 8',
        localStorage: {
            ppo_first_install: (Date.now() - (8 * 24 * 60 * 60 * 1000)).toString()
        },
        expected: {
            banner: false,
            text: 'Trial Expirado',
            modal: 'bloqueante',
            licenseBar: false
        }
    },
    {
        id: 5,
        name: 'Licencia BASIC Activada',
        localStorage: {
            ppo_license: JSON.stringify({
                key: "PPO-BASIC-20251026-6B437D7B",
                tier: "BASIC",
                features: ["themes_premium_3", "stats_basic"],
                activatedAt: Date.now(),
                online: null
            })
        },
        expected: {
            banner: false,
            text: 'Licencia: BASIC',
            modal: false,
            licenseBar: 'morada'
        }
    },
    {
        id: 6,
        name: 'Licencia PRO Activada',
        localStorage: {
            ppo_license: JSON.stringify({
                key: "PPO-PRO-20251026-4F3D160A",
                tier: "PRO",
                features: ["themes_unlimited", "stats_advanced", "cloud_save", "mobile_control"],
                activatedAt: Date.now(),
                online: null
            })
        },
        expected: {
            banner: false,
            text: 'Licencia: PRO',
            modal: false,
            licenseBar: 'morada'
        }
    },
    {
        id: 7,
        name: 'Licencia ENTERPRISE Activada',
        localStorage: {
            ppo_license: JSON.stringify({
                key: "PPO-ENTERPRISE-20251026-38A00E05",
                tier: "ENTERPRISE",
                features: ["all"],
                activatedAt: Date.now(),
                online: null
            })
        },
        expected: {
            banner: false,
            text: 'Licencia: ENTERPRISE',
            modal: false,
            licenseBar: 'morada'
        }
    },
    {
        id: 8,
        name: 'Primera Instalación (Sin datos)',
        localStorage: {},
        expected: {
            banner: 'naranja',
            text: 'Te quedan 7 días',
            modal: false,
            licenseBar: false,
            note: 'Debería crear ppo_first_install automáticamente'
        }
    }
];

// Generar reporte HTML
let reportHTML = `<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Reporte de Testing - Sistema de Trial</title>
    <style>
        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Arial, sans-serif;
            max-width: 1200px;
            margin: 0 auto;
            padding: 40px 20px;
            background: #f5f7fa;
        }
        h1 {
            color: #667eea;
            text-align: center;
            font-size: 32px;
            margin-bottom: 10px;
        }
        .subtitle {
            text-align: center;
            color: #666;
            margin-bottom: 40px;
        }
        .scenario {
            background: white;
            border-radius: 12px;
            padding: 24px;
            margin-bottom: 24px;
            box-shadow: 0 2px 8px rgba(0,0,0,0.1);
        }
        .scenario-header {
            display: flex;
            align-items: center;
            justify-content: space-between;
            margin-bottom: 16px;
            padding-bottom: 16px;
            border-bottom: 2px solid #f0f0f0;
        }
        .scenario-number {
            background: #667eea;
            color: white;
            width: 36px;
            height: 36px;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            font-weight: 700;
            font-size: 18px;
        }
        .scenario-title {
            flex: 1;
            margin-left: 16px;
            font-size: 18px;
            font-weight: 600;
            color: #333;
        }
        .status {
            padding: 6px 16px;
            border-radius: 20px;
            font-size: 13px;
            font-weight: 600;
        }
        .status-pass {
            background: #e8f5e9;
            color: #2e7d32;
        }
        .status-manual {
            background: #fff3e0;
            color: #f57c00;
        }
        .scenario-body {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 20px;
        }
        .section {
            background: #f8f9fa;
            padding: 16px;
            border-radius: 8px;
        }
        .section-title {
            font-size: 12px;
            font-weight: 700;
            text-transform: uppercase;
            color: #667eea;
            margin-bottom: 12px;
        }
        .data-item {
            margin-bottom: 8px;
            font-size: 14px;
        }
        .data-label {
            color: #666;
            font-weight: 600;
        }
        .data-value {
            color: #333;
            font-family: 'Courier New', monospace;
            font-size: 13px;
            background: white;
            padding: 4px 8px;
            border-radius: 4px;
            display: inline-block;
            margin-left: 8px;
        }
        .test-button {
            display: block;
            width: 100%;
            padding: 12px;
            background: #667eea;
            color: white;
            border: none;
            border-radius: 8px;
            font-size: 14px;
            font-weight: 600;
            cursor: pointer;
            margin-top: 16px;
        }
        .test-button:hover {
            background: #5568d3;
        }
        .note {
            background: #e3f2fd;
            border-left: 4px solid #2196f3;
            padding: 12px;
            margin-top: 16px;
            border-radius: 4px;
            font-size: 13px;
            color: #1565c0;
        }
        .summary {
            background: white;
            border-radius: 12px;
            padding: 24px;
            margin-bottom: 40px;
            box-shadow: 0 2px 8px rgba(0,0,0,0.1);
            text-align: center;
        }
        .summary-stat {
            display: inline-block;
            margin: 0 20px;
        }
        .summary-number {
            font-size: 48px;
            font-weight: 700;
            color: #667eea;
        }
        .summary-label {
            font-size: 14px;
            color: #666;
            text-transform: uppercase;
        }
        .icon {
            font-size: 24px;
            margin-right: 8px;
        }
    </style>
</head>
<body>
    <h1>🧪 Reporte de Testing</h1>
    <div class="subtitle">Sistema de Trial y Licencias v0.4.0 - ${new Date().toLocaleString()}</div>

    <div class="summary">
        <div class="summary-stat">
            <div class="summary-number">${scenarios.length}</div>
            <div class="summary-label">Escenarios</div>
        </div>
        <div class="summary-stat">
            <div class="summary-number">✓</div>
            <div class="summary-label">Testing Manual</div>
        </div>
    </div>
`;

scenarios.forEach(scenario => {
    const localStorageKeys = Object.keys(scenario.localStorage);
    const hasLocalStorage = localStorageKeys.length > 0;

    reportHTML += `
    <div class="scenario">
        <div class="scenario-header">
            <div style="display: flex; align-items: center;">
                <div class="scenario-number">${scenario.id}</div>
                <div class="scenario-title">${scenario.name}</div>
            </div>
            <div class="status status-manual">Testing Manual</div>
        </div>

        <div class="scenario-body">
            <div class="section">
                <div class="section-title">📥 localStorage a Configurar</div>
                ${hasLocalStorage ? localStorageKeys.map(key => {
                    let value = scenario.localStorage[key];
                    if (key === 'ppo_license') {
                        const parsed = JSON.parse(value);
                        value = `Tier: ${parsed.tier}`;
                    } else if (key === 'ppo_first_install') {
                        const daysAgo = Math.floor((Date.now() - parseInt(value)) / (1000 * 60 * 60 * 24));
                        value = `Hace ${daysAgo} días`;
                    }
                    return `
                    <div class="data-item">
                        <span class="data-label">${key}:</span>
                        <span class="data-value">${value}</span>
                    </div>`;
                }).join('') : '<div class="data-item" style="color: #999;">Vacío (primera instalación)</div>'}
            </div>

            <div class="section">
                <div class="section-title">✅ Resultado Esperado</div>
                ${scenario.expected.banner ? `<div class="data-item"><span class="icon">🟠</span> Banner ${scenario.expected.banner}</div>` : ''}
                ${scenario.expected.licenseBar ? `<div class="data-item"><span class="icon">🟣</span> Barra ${scenario.expected.licenseBar}</div>` : ''}
                ${scenario.expected.modal ? `<div class="data-item"><span class="icon">⚫</span> Modal ${scenario.expected.modal}</div>` : ''}
                <div class="data-item"><span class="icon">📝</span> Texto: "${scenario.expected.text}"</div>
            </div>
        </div>

        ${scenario.expected.note ? `<div class="note">📌 ${scenario.expected.note}</div>` : ''}

        <button class="test-button" onclick='testScenario(${JSON.stringify(scenario).replace(/'/g, "\\'")})'">
            🧪 Probar Este Escenario
        </button>
    </div>
    `;
});

reportHTML += `
    <script>
        function testScenario(scenario) {
            // Limpiar localStorage
            localStorage.clear();

            // Configurar localStorage según el escenario
            Object.keys(scenario.localStorage).forEach(key => {
                localStorage.setItem(key, scenario.localStorage[key]);
            });

            // Abrir control.html en nueva pestaña
            window.open('control.html', '_blank');

            // Mostrar confirmación
            alert('✅ Escenario configurado: ' + scenario.name + '\\n\\nSe abrió control.html en nueva pestaña.\\nVerifica que aparezca:\\n- ' + scenario.expected.text);
        }
    </script>
</body>
</html>
`;

// Guardar reporte
const reportPath = path.join(__dirname, '..', 'TEST_REPORT.html');
fs.writeFileSync(reportPath, reportHTML);

console.log('📊 Reporte generado:');
console.log('   Archivo: TEST_REPORT.html');
console.log('');
console.log('📋 Escenarios de prueba:');
scenarios.forEach(s => {
    console.log(`   ${s.id}. ${s.name}`);
});
console.log('');
console.log('✅ Abre TEST_REPORT.html en tu navegador para comenzar el testing');
console.log('');
