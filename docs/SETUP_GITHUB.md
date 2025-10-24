# 🚀 Guía: Crear Repositorio en GitHub

Sigue estos pasos para configurar el proyecto en GitHub:

---

## Paso 1: Crear Repositorio en GitHub

1. Ve a [github.com/new](https://github.com/new)
2. **Repository name**: `ping-pong-overlay`
3. **Description**: `Professional overlay for table tennis streaming with OBS integration`
4. **Visibility**: Público (Public)
5. **Initialize with**:
   - ✅ Add a README file (la crearemos nosotros)
   - ✅ Add .gitignore (la crearemos nosotros)
   - ✅ Choose a license: MIT
6. Click "Create repository"

---

## Paso 2: Clonar Repositorio Localmente

```bash
git clone https://github.com/tu-usuario/ping-pong-overlay.git
cd ping-pong-overlay
```

---

## Paso 3: Agregar Archivos

Descarga estos archivos al directorio:

```
ping-pong-overlay/
├── docs/               # Documentación técnica
│   ├── DESCARGAR.txt
│   ├── PROMPT.md      # Prompt para desarrollo
│   ├── SETUP_GITHUB.md
│   └── START.md
├── index.html         # Overlay principal
├── control.html       # Panel de control
├── README.md          # Documentación principal
├── CLAUDE.md          # Guía para Claude Code
├── CONTRIBUTING.md    # Guía de contribución
├── .gitignore         # Archivos a ignorar
├── package.json       # Metadata del proyecto
└── LICENSE            # MIT License
```

---

## Paso 4: Confirmaciones Iniciales

```bash
# Agregar todos los archivos
git add .

# Crear primer commit
git commit -m "Initial commit: Add ping pong overlay with control panel"

# Enviar a GitHub
git push -u origin main
```

---

## Paso 5: Configurar GitHub Pages (Opcional)

Para servir el overlay online:

1. Ve a tu repositorio en GitHub
2. Settings → Pages
3. **Source**: Deploy from branch
4. **Branch**: main
5. **Folder**: / (root)
6. Click Save

Tu overlay estará disponible en: `https://tu-usuario.github.io/ping-pong-overlay/overlay.html`

---

## Paso 6: Usar en OBS (Remote)

Si usas GitHub Pages, la URL sería:

**Para el Overlay:**
```
https://tu-usuario.github.io/ping-pong-overlay/index.html
```

**Para el Control:**
```
https://tu-usuario.github.io/ping-pong-overlay/control.html
```

En OBS:
1. Source → Add → Browser Source
2. URL: la de arriba
3. Width: 1920, Height: 1080 (o tu resolución)
4. Click OK

---

## Paso 7: Actualizaciones Futuras

Cuando hagas cambios:

```bash
# Ver cambios
git status

# Agregar archivos modificados
git add .

# O agregar archivo específico
git add index.html

# Confirmar cambios
git commit -m "Descripción concisa del cambio"

# Enviar a GitHub
git push
```

---

## 📝 Ejemplos de Commits

```bash
git commit -m "Add animation when points change"
git commit -m "Fix: Service ball not updating correctly"
git commit -m "Docs: Update README with OBS setup instructions"
git commit -m "Refactor: Simplify updateDisplay function"
git commit -m "Add support for custom team colors"
```

---

## 🏷️ Crear Releases

Para versiones estables:

1. Ve a GitHub → Releases → Draft a new release
2. **Tag version**: v1.0.0
3. **Release title**: Ping Pong Overlay v1.0.0
4. **Description**: 
   ```
   ## Features
   - Professional overlay design
   - Real-time score control
   - OBS integration
   
   ## Changes
   - Initial release
   ```
5. Click "Publish release"

---

## 🔐 Proteger Rama Main

(Opcional pero recomendado)

1. Settings → Branches
2. Add rule
3. **Branch name pattern**: main
4. Requiere: Pull request review antes de merge
5. Save changes

Así evitas cambios accidentales directamente a main.

---

## 👥 Agregar Colaboradores

1. Settings → Collaborators
2. Add people
3. Busca usuario de GitHub
4. Selecciona permisos (Maintain o Push)

---

## 📊 Monitorear Proyecto

En el README, puedes agregar badges:

```markdown
# Ping Pong Overlay

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![GitHub stars](https://img.shields.io/github/stars/tu-usuario/ping-pong-overlay.svg?style=social)](https://github.com/tu-usuario/ping-pong-overlay)
[![Last commit](https://img.shields.io/github/last-commit/tu-usuario/ping-pong-overlay.svg)]()
```

---

## 🎯 Próximos Pasos

Después de crear el repo:

1. ✅ Prueba que GitHub Pages funcione
2. ✅ Verifica OBS con la URL remote
3. ✅ Crea primeras Issues si hay mejoras planeadas
4. ✅ Crea Projects si quieres un Kanban
5. ✅ Comparte el repositorio en redes

---

## 📚 Recursos Útiles

- [GitHub Docs](https://docs.github.com)
- [Git Cheatsheet](https://github.github.com/training-kit/downloads/github-git-cheat-sheet.pdf)
- [GitHub Pages Docs](https://pages.github.com/)
- [Markdown Guide](https://www.markdownguide.org/)

---

## ❓ Troubleshooting

**P: GitHub Pages no muestra el archivo**
R: Espera 5-10 minutos después de push. Luego limpia caché del navegador.

**P: Git no reconoce mis cambios**
R: Ejecuta `git status` para verificar. Asegúrate de estar en el directorio correcto.

**P: Quiero hacer un cambio pero crear una rama**
R: `git checkout -b feature/mi-mejora`

**P: Cometí un error en el último commit**
R: `git amend --no-edit` para cambios sin editar mensaje

---

## 🎉 ¡Listo!

Tu repositorio está configurado y listo para desarrollar. Ahora puedes:
- Colaborar con otros
- Hacer seguimiento de cambios
- Servir el overlay online
- Compartir el código con la comunidad

¡Happy streaming! 🏓
