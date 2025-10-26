# Guía de Usuario - Ping Pong Overlay Premium

## 🎯 Cómo Funciona

### **Primera Vez que Usas la Aplicación**

1. **Descarga/Clona el proyecto**
2. **Abre `control.html` en tu navegador**
3. **Verás un banner naranja** que dice: "⏰ Trial: Te quedan 7 días de prueba"
4. **¡Listo!** Puedes usar TODA la aplicación gratis por 7 días

### **Durante el Trial (7 días)**

- ✅ **Funcionalidad completa** - Todo está desbloqueado
- ✅ **Sin limitaciones** - Usa todos los features
- ✅ **Contador visible** - El banner te muestra cuántos días te quedan
- ✅ **Puedes activar licencia en cualquier momento** - Click en "Activar Ahora"

### **Cuando Expira el Trial (Día 8)**

- 🚫 **La aplicación se BLOQUEA**
- 🚫 **No puedes cerrar el modal** - Necesitas ingresar una licencia
- 💳 **Debes comprar una licencia** para continuar

### **Después de Activar la Licencia**

- ✅ **Desbloqueado para SIEMPRE**
- ✅ **No vuelve a pedir licencia** - Se guarda permanentemente
- ✅ **Barra morada arriba** - Muestra tu tier (BASIC, PRO, ENTERPRISE)
- ✅ **Botón "Gestionar"** - Ver información de tu licencia

---

## 🔑 Cómo Activar una Licencia

### **Durante el Trial:**

1. Haz clic en el botón **"Activar Ahora"** del banner naranja
2. Ingresa tu código de licencia (ej: `PPO-PRO-20251026-4F3D160A`)
3. Haz clic en **"Activar Licencia"**
4. ¡Listo! Ya no verás más el trial

### **Cuando Expira el Trial:**

1. Se abrirá automáticamente un **modal bloqueante**
2. Ingresa tu código de licencia
3. Haz clic en **"Activar Licencia"**
4. La aplicación se recarga y ya puedes usarla

### **Desde la Consola (Avanzado):**

```javascript
// Abrir modal de activación
showLicenseModal()
```

---

## 📦 Tiers de Licencia

### **BASIC - $19.99 USD**
- Todo lo del trial permanente
- 3 temas premium adicionales
- Estadísticas básicas
- 2 activaciones simultáneas
- Actualizaciones por 1 año

### **PRO - $49.99 USD** ⭐ Recomendado
- Todo lo de BASIC +
- Temas ilimitados personalizables
- Estadísticas avanzadas con gráficos
- Guardado en la nube (5 GB)
- Control remoto desde móvil
- 5 activaciones simultáneas
- **Actualizaciones de por vida**
- Soporte prioritario

### **ENTERPRISE - $149.99 USD**
- Todo lo de PRO +
- Gestión de torneos completos
- Multi-mesa (hasta 8 simultáneas)
- Branding personalizado (logo, colores)
- Activaciones ilimitadas
- Soporte dedicado 24/7

---

## ❓ Preguntas Frecuentes

### **¿Qué pasa si no activo una licencia después del trial?**
No podrás usar la aplicación. El modal bloqueante te pedirá una licencia cada vez que abras `control.html`.

### **¿La licencia expira?**
No. Una vez activada, es **permanente** (excepto BASIC que tiene 1 año de actualizaciones, pero sigue funcionando después).

### **¿Puedo usar la licencia en varios dispositivos?**
Sí, dependiendo del tier:
- BASIC: 2 dispositivos
- PRO: 5 dispositivos
- ENTERPRISE: Ilimitado

### **¿Puedo ver cuántos días de trial me quedan?**
Sí. En la consola del navegador (F12), ejecuta:

```javascript
const firstInstall = localStorage.getItem('ppo_first_install');
const daysPassed = Math.floor((Date.now() - parseInt(firstInstall)) / (1000 * 60 * 60 * 24));
const daysLeft = 7 - daysPassed;
console.log('Días restantes:', Math.max(0, daysLeft));
```

### **¿Cómo reseteo el trial para testing?**
⚠️ **Solo para desarrollo/testing:**

```javascript
localStorage.removeItem('ppo_first_install');
location.reload();
```

### **¿Puedo cambiar mi licencia después?**
Sí. Haz clic en **"Gestionar"** en la barra morada y contacta soporte.

### **¿Qué pasa si pierdo mi código de licencia?**
Está guardado en la aplicación. Haz clic en **"Gestionar"** para verlo.

O en consola:
```javascript
JSON.parse(localStorage.getItem('ppo_license')).key
```

### **¿Necesito internet para usar la aplicación?**
No. El sistema de licencias funciona **completamente offline**.

### **¿Dónde se guarda mi licencia?**
En el `localStorage` del navegador. No se envía a ningún servidor.

---

## 🛠️ Troubleshooting

### **El banner de trial no aparece**

Verifica en consola (F12):
```javascript
localStorage.getItem('ppo_first_install')
// Si retorna null, no se registró la instalación
```

**Solución:**
```javascript
localStorage.setItem('ppo_first_install', Date.now().toString());
location.reload();
```

### **Dice que el trial expiró pero no debería**

Verifica cuándo se instaló:
```javascript
const install = parseInt(localStorage.getItem('ppo_first_install'));
console.log('Instalado el:', new Date(install));
console.log('Días pasados:', Math.floor((Date.now() - install) / (1000 * 60 * 60 * 24)));
```

**Resetear trial (solo testing):**
```javascript
localStorage.removeItem('ppo_first_install');
location.reload();
```

### **Activé la licencia pero sigue pidiendo**

Verifica que se guardó:
```javascript
localStorage.getItem('ppo_license')
// Debería retornar JSON con tu licencia
```

**Si retorna null:**
```javascript
// Activa manualmente:
showLicenseModal()
// Ingresa el código de nuevo
```

### **No puedo cerrar el modal de expiración**

Es **intencional**. Debes ingresar una licencia válida para continuar.

Si necesitas acceso temporal para testing:
```javascript
// Solo para desarrollo:
document.getElementById('trialExpiredOverlay').remove();
```

---

## 📞 Soporte

- **Email**: soporte@pingpongoverlay.com
- **GitHub Issues**: [Reportar problema](https://github.com/tu-usuario/ping-pong-overlay/issues)

---

## 🔐 Privacidad

- ✅ Tu licencia se guarda **solo en tu navegador**
- ✅ **No se envía a ningún servidor**
- ✅ **No requiere internet** para funcionar
- ✅ **No hay tracking ni analytics**

---

**Versión**: 0.4.0-beta
**Última actualización**: 2025-10-26
