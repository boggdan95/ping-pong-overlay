# 🤝 Contributing to Ping Pong Overlay

¡Gracias por tu interés en contribuir! Aquí te explico cómo hacerlo.

## 🐛 Reportar Bugs

Si encuentras un bug, abre un Issue con:
1. **Descripción clara** del problema
2. **Pasos para reproducir** el bug
3. **Comportamiento esperado** vs **comportamiento actual**
4. **Screenshots** si es posible
5. **Navegador y OS** que usas

## 💡 Sugerir Mejoras

Para nuevas funcionalidades:
1. Describe **qué quieres agregar** y **por qué**
2. Da **ejemplos de uso**
3. Explica cómo afectaría a usuarios actuales

## 🔧 Haciendo Cambios

### Configuración
```bash
git clone https://github.com/tu-usuario/ping-pong-overlay.git
cd ping-pong-overlay
```

### Crear una rama
```bash
git checkout -b feature/nombre-del-feature
# o
git checkout -b fix/nombre-del-bug
```

### Hacer cambios
- Edita los archivos necesarios
- Prueba en múltiples navegadores
- Verifica responsive design
- Asegúrate que localStorage funciona

### Commit
```bash
git add .
git commit -m "Descripción clara del cambio"
# Formato: [TIPO] Descripción
# Ejemplos:
# [FEATURE] Add animation when points change
# [FIX] Service ball not updating correctly
# [DOCS] Update README with examples
```

### Push
```bash
git push origin feature/nombre-del-feature
```

### Pull Request
1. Ve a GitHub → Pull Requests → New PR
2. **Base**: main | **Compare**: tu rama
3. **Title**: Descripción concisa
4. **Description**: Explica qué y por qué
5. Referencia Issues relevantes: `Fixes #123`
6. Click "Create Pull Request"

## ✅ Checklist para PRs

- [ ] Código sigue las convenciones del proyecto
- [ ] Probado en Chrome, Firefox, Safari
- [ ] Responsive en móvil (768px, 1024px, 1920px)
- [ ] localStorage funciona correctamente
- [ ] Sin errores en console (F12)
- [ ] README actualizado si es necesario
- [ ] Sin cambios innecesarios

## 📝 Convenciones

### Nombres de ramas
```
feature/agregar-historial          # Nueva funcionalidad
fix/pelota-servicio-no-cambia     # Arreglando bug
docs/actualizar-readme             # Cambios en documentación
refactor/simplificar-funciones     # Mejora de código
```

### Commits
```
[FEATURE] Add ...
[FIX] Resolve ...
[DOCS] Update ...
[REFACTOR] Improve ...
[STYLE] Format ...
```

### Nombres de variables
```javascript
playerName      // camelCase
serviceActive   // descriptivo
flagEmoji       // claro
```

### Clases CSS
```css
.player-row     /* kebab-case */
.stat-block
.service-ball
```

## 🎨 Estilo de Código

### HTML
```html
<!-- Indentación: 4 espacios -->
<div class="player-row">
    <div class="player-info">
        <div class="flag"></div>
    </div>
</div>
```

### CSS
```css
/* Orden: Propiedad, Valor; */
.elemento {
    background: linear-gradient(...);
    padding: 30px;
    border-radius: 10px;
}
```

### JavaScript
```javascript
// Comentarios claros
// Usa const/let, no var
const gameState = { ... };
let currentScore = 0;

// Funciones cortas y enfocadas
function updateDisplay() {
    // código aquí
}
```

## 📱 Testing

### Resoluciones a probar
- 1920x1080 (desktop normal)
- 1366x768 (laptop común)
- 768x1024 (tablet)
- 375x812 (móvil)

### Navegadores
- Chrome/Edge
- Firefox
- Safari (si tienes Mac)

### Checklist
- [ ] Overlay se ve correctamente
- [ ] Panel de control es usable
- [ ] Sincronización funciona
- [ ] Atajos de teclado responden
- [ ] Sin errores en console

## 🎯 Areas Donde Podemos Ayuda

### Fácil (Bueno para comenzar)
- Mejorar documentación
- Agregar comentarios al código
- Reportar typos
- Sugerir mejoras de UI

### Medio
- Agregar nuevas funcionalidades simples
- Mejorar responsive design
- Optimizar performance
- Agregar animaciones

### Complejo
- Refactorizar código
- Agregar sistema de eventos
- Base de datos
- API REST

## 📚 Recursos

- [Git Cheatsheet](https://github.github.com/training-kit/)
- [Markdown Guide](https://www.markdownguide.org/)
- [CSS Tricks](https://css-tricks.com/)
- [JavaScript.info](https://javascript.info/)

## ❓ Preguntas

Si tienes dudas:
1. Revisa Issues existentes
2. Lee el [docs/PROMPT.md](docs/PROMPT.md)
3. Abre una Discussion
4. Deja un comentario en el código

## 🎉 Gracias

¡Agradecemos cualquier contribución! Aunque sea pequeña, ayuda a mejorar el proyecto para todos.

---

**¡Happy coding! 🚀**
