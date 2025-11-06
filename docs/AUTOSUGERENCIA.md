# 📋 Sistema de Autosugerencia de Jugadores

## Descripción

El sistema de autosugerencia permite cargar una base de datos de jugadores desde un archivo CSV para autocompletar nombres y banderas rápidamente durante la operación en vivo.

## Características

- ✅ Carga de jugadores desde archivo CSV
- ✅ Autocompletado inteligente al escribir
- ✅ Búsqueda por nombre (mínimo 2 caracteres)
- ✅ Autocompletado de nombre + bandera automático
- ✅ Persistencia en localStorage (los datos se mantienen entre sesiones)
- ✅ Funciona en modo Individual y modo Equipos
- ✅ Lista desplegable al hacer click en el campo vacío

## Cómo Usar

### 1. Preparar el archivo CSV

Crea un archivo CSV con el siguiente formato:

```
Nombre Completo,CÓDIGO_BANDERA,País
```

**Ejemplo:**
```
Juan Pérez,ESP,España
María González,ARG,Argentina
Carlos Rodríguez,MEX,México
```

**Campos:**
- **Nombre Completo**: Nombre y apellido del jugador
- **CÓDIGO_BANDERA**: Código de 3 letras del país (ej: ESP, ARG, MEX)
- **País**: Nombre completo del país (opcional, solo para visualización)

### 2. Cargar el CSV

1. Abre `control.html`
2. Ve a la pestaña **⚙️ Configuración**
3. Busca la sección **"📋 Base de Datos de Jugadores"**
4. Click en **"📁 Cargar CSV de Jugadores"**
5. Selecciona tu archivo CSV
6. Verás un mensaje de confirmación con la cantidad de jugadores cargados

### 3. Usar el Autocompletado

#### Opción 1: Escribir para buscar
1. En la pestaña **🏓 Partido** o en **⚙️ Configuración**, click en el campo de nombre
2. Escribe al menos 2 letras del nombre
3. Aparecerá una lista con sugerencias
4. Click en la sugerencia deseada
5. El nombre y la bandera se rellenan automáticamente

#### Opción 2: Ver todos los jugadores
1. Click en el campo de nombre (debe estar vacío)
2. Aparecerá la lista completa de jugadores
3. Scroll para ver todos
4. Click en el jugador deseado

### 4. Gestionar la Base de Datos

#### Ver estado
En la sección **"📋 Base de Datos de Jugadores"** verás:
```
✅ 15 jugadores cargados
```

#### Limpiar base de datos
1. Click en **"🗑️ Limpiar Base de Datos"**
2. Confirma la acción
3. La base de datos se eliminará completamente

#### Actualizar jugadores
Para actualizar o agregar jugadores:
1. Modifica tu archivo CSV
2. Carga el archivo nuevamente
3. Los jugadores anteriores serán reemplazados

## Ejemplo de Archivo CSV Completo

Incluimos un archivo de ejemplo: `jugadores-ejemplo.csv`

```csv
Juan Pérez,ESP,España
María González,ARG,Argentina
Carlos Rodríguez,MEX,México
Ana Martínez,COL,Colombia
Luis Fernández,CHI,Chile
Sofia Torres,PER,Perú
Diego Sánchez,URU,Uruguay
Laura Ramírez,VEN,Venezuela
Miguel Ángel López,ESP,España
Patricia Silva,BRA,Brasil
Fernando Castro,ECU,Ecuador
Daniela Morales,BOL,Bolivia
Roberto Gutiérrez,PAR,Paraguay
Carmen Vargas,CRI,Costa Rica
Javier Mendoza,PAN,Panamá
```

## Códigos de Banderas Comunes

| País | Código | País | Código |
|------|--------|------|--------|
| España | ESP | México | MEX |
| Argentina | ARG | Colombia | COL |
| Chile | CHI | Perú | PER |
| Uruguay | URU | Venezuela | VEN |
| Brasil | BRA | Ecuador | ECU |
| Bolivia | BOL | Paraguay | PAR |
| Costa Rica | CRI | Panamá | PAN |
| Guatemala | GUA | El Salvador | ESA |
| Honduras | HON | Nicaragua | NCA |

## Troubleshooting

**P: El autocompletado no aparece**
- R: Verifica que hayas cargado un archivo CSV primero
- R: Asegúrate de escribir al menos 2 letras

**P: Los datos desaparecen al cerrar el navegador**
- R: Los datos se guardan en localStorage. Si usas modo incógnito, se perderán al cerrar.
- R: Asegúrate de no limpiar los datos del navegador

**P: El archivo CSV no se carga**
- R: Verifica que el formato sea correcto (nombre,bandera,país)
- R: Asegúrate de que no haya líneas vacías al inicio
- R: Verifica que el archivo sea texto plano (.csv o .txt)

**P: Algunos jugadores no aparecen**
- R: Verifica que cada línea tenga al menos nombre y código de bandera
- R: Las líneas incompletas son ignoradas

## Almacenamiento Técnico

Los datos se guardan en `localStorage` con la clave `playersDatabase`:

```javascript
[
  {
    "name": "Juan Pérez",
    "flag": "ESP",
    "country": "España"
  },
  ...
]
```

Esto permite:
- ✅ Persistencia entre sesiones
- ✅ Acceso rápido sin archivos externos
- ✅ Sincronización en el mismo navegador
- ❌ No sincroniza entre diferentes navegadores
- ❌ Se pierde al limpiar datos del navegador

## Consejos Profesionales

1. **Mantén una lista maestra**: Guarda tu CSV en un lugar seguro para reutilizarlo
2. **Nombres completos**: Usa nombre + apellido para mejor identificación
3. **Actualiza frecuentemente**: Agrega nuevos jugadores después de cada torneo
4. **Backup**: Haz respaldo del archivo CSV periódicamente
5. **Testing previo**: Prueba cargar el CSV antes del evento en vivo

## Compatibilidad

- ✅ Chrome / Edge / Opera
- ✅ Firefox
- ✅ Safari
- ✅ Navegadores modernos con soporte localStorage

---

**Desarrollado con ❤️ para operadores de streaming de tenis de mesa**
