// i18n.js - Sistema de internacionalización
const translations = {
    es: {
        // General
        controlPanel: 'Control Panel',
        match: 'Partido',
        config: 'Configuración',

        // Match tab
        showOverlay: 'Mostrar Overlay',
        hideOverlay: 'Ocultar Overlay',
        reset: 'Reset',
        showHistoryOnScreen: 'Mostrar Historial en Pantalla',
        hideHistoryOnScreen: 'Ocultar Historial en Pantalla',
        nextMatch: 'Siguiente Partido',
        nextMatchHint: 'Resetea puntos y cambia jugadores en Configuración',
        sets: 'Sets',
        points: 'Puntos',
        service: 'Servicio',
        setsHistory: 'Historial de Sets',
        setNumber: 'Set',

        // Config - Game mode
        gameMode: 'Modalidad de Juego',
        individual: 'Individual (1v1)',
        doubles: 'Dobles (2v2)',
        teams: 'Equipos',
        selectMatchType: 'Selecciona el tipo de partido',

        // Config - Players
        players: 'Jugadores',
        playerName: 'Nombre Jugador',
        flag3Letters: 'Bandera (3 letras)',

        // Config - Doubles
        doublesTitle: 'Dobles',
        doublesFormat: 'Usa formato: Apellido1 / Apellido2',
        pair: 'Pareja',

        // Config - Teams
        teamNames: 'Nombres de Equipos',
        team: 'Equipo',
        currentIndividualMatch: 'Partido Individual Actual',
        playersCompetingNow: 'Jugadores que están compitiendo ahora',
        playerFromTeam: 'Jugador (Equipo',
        eachWinAddsPoint: 'Cada partido individual ganado suma 1 punto al país (se usan los "Sets" para contar)',

        // Config - Sets to win
        setsToWin: 'Sets para Ganar',
        bestOf3: 'Mejor de 3',
        bestOf5: 'Mejor de 5',
        bestOf7: 'Mejor de 7',
        firstToWin: 'Primero en ganar {n} sets',

        // Config - Winner screen
        winnerScreen: 'Pantalla de Ganador',
        showsAutomatically: 'Se muestra automáticamente al ganar el partido',
        hideWinnerScreen: 'Ocultar Pantalla de Ganador',
        animations: 'Animaciones (Confetti)',
        enabled: 'Activadas',
        disabled: 'Desactivadas',
        celebrationEmoji: 'Emoji de Celebración',
        trophy: 'Trofeo',
        medal: 'Medalla',
        medal2: 'Medalla 2',
        star: 'Estrella',
        crown: 'Corona',

        // Config - Theme
        scoreboardTheme: 'Tema del Scoreboard',
        blueModern: 'Azul Moderno',
        darkElegant: 'Oscuro Elegante',
        lightMinimalist: 'Claro Minimalista',
        neonNight: 'Neón Nocturno',
        goldPremium: 'Dorado Premium',
        greenSport: 'Verde Deportivo',

        // Config - Background
        chromaKeyBackground: 'Color de Fondo (Chroma Key)',
        green: 'Verde',
        blue: 'Azul',
        magenta: 'Magenta',
        red: 'Rojo',
        gradient: 'Degradado',
        transparent: 'Transparente',

        // Config - Logo
        logo: 'Logo',
        logoUrlPlaceholder: 'URL del logo o pega imagen',
        upload: 'Subir',
        left: 'Izquierda',
        right: 'Derecha',
        logoDisabled: 'Desactivado',
        logoEnabled: 'Activado',
        logoPreviewAlt: 'Vista previa del logo',

        // Config - Players database
        playersDatabase: 'Base de Datos de Jugadores',
        loadCsvHint: 'Carga un CSV para autocompletar nombres rápidamente',
        loadPlayersCsv: 'Cargar CSV de Jugadores',
        csvFormat: 'Formato: nombre,bandera,país (ej: Juan Pérez,ESP,España)',
        playersLoaded: 'jugadores cargados',
        autocomplete: 'Autocompletado',
        clearDatabase: 'Limpiar Base de Datos',

        // Modals
        confirmSetWon: '¿Confirmar Set Ganado?',
        confirmWinner: '¿Confirmar Ganador?',
        confirmMatchWon: '¿Confirmar Partido Ganado?',
        pointForCountry: '+1 punto para',
        cancel: 'Cancelar',
        confirm: 'Confirmar',

        // Overlay (index.html)
        winner: '¡Ganador!',
        player1Default: 'Jugador 1',
        player2Default: 'Jugador 2',
        pair1Default: 'Pareja 1',
        pair2Default: 'Pareja 2',
        team1Default: 'Equipo 1',
        team2Default: 'Equipo 2',

        // Language
        language: 'Idioma',

        // Hub
        hubSubtitle: 'Sistema profesional para transmisiones de tenis de mesa',
        controlPanelTitle: 'Panel de Control',
        controlPanelDesc: 'Gestiona puntos, sets y configuración durante el partido',
        overlayPreviewTitle: 'Preview del Overlay',
        overlayPreviewDesc: 'Vista previa del marcador (se configura en OBS)',
        obsGuideTitle: 'Guía de OBS',
        obsGuideDesc: 'Cómo configurar el overlay en OBS Studio',
        quickStart: 'Inicio Rápido',
        quickStartStep1: 'Abre <code>index.html</code> en tu navegador (Chrome recomendado)',
        quickStartStep2: 'En <strong>OBS Studio</strong>, agrega una fuente <strong>Window Capture</strong> (Captura de Ventana)',
        quickStartStep3: 'Selecciona la ventana del navegador con el overlay',
        quickStartStep4: 'Abre <strong>control.html</strong> en otra pestaña para controlar el marcador',
        quickStartStep5: '¡Listo para transmitir! 🎉',
        footerLicense: 'Proyecto de código abierto bajo licencia MIT',
        footerDocs: 'Documentación completa en'
    },
    en: {
        // General
        controlPanel: 'Control Panel',
        match: 'Match',
        config: 'Settings',

        // Match tab
        showOverlay: 'Show Overlay',
        hideOverlay: 'Hide Overlay',
        reset: 'Reset',
        showHistoryOnScreen: 'Show History on Screen',
        hideHistoryOnScreen: 'Hide History on Screen',
        nextMatch: 'Next Match',
        nextMatchHint: 'Resets points and change players in Settings',
        sets: 'Sets',
        points: 'Points',
        service: 'Service',
        setsHistory: 'Sets History',
        setNumber: 'Set',

        // Config - Game mode
        gameMode: 'Game Mode',
        individual: 'Individual (1v1)',
        doubles: 'Doubles (2v2)',
        teams: 'Teams',
        selectMatchType: 'Select match type',

        // Config - Players
        players: 'Players',
        playerName: 'Player Name',
        flag3Letters: 'Flag (3 letters)',

        // Config - Doubles
        doublesTitle: 'Doubles',
        doublesFormat: 'Use format: LastName1 / LastName2',
        pair: 'Pair',

        // Config - Teams
        teamNames: 'Team Names',
        team: 'Team',
        currentIndividualMatch: 'Current Individual Match',
        playersCompetingNow: 'Players competing now',
        playerFromTeam: 'Player (Team',
        eachWinAddsPoint: 'Each individual match won adds 1 point to the country (using "Sets" to count)',

        // Config - Sets to win
        setsToWin: 'Sets to Win',
        bestOf3: 'Best of 3',
        bestOf5: 'Best of 5',
        bestOf7: 'Best of 7',
        firstToWin: 'First to win {n} sets',

        // Config - Winner screen
        winnerScreen: 'Winner Screen',
        showsAutomatically: 'Shows automatically when match is won',
        hideWinnerScreen: 'Hide Winner Screen',
        animations: 'Animations (Confetti)',
        enabled: 'Enabled',
        disabled: 'Disabled',
        celebrationEmoji: 'Celebration Emoji',
        trophy: 'Trophy',
        medal: 'Medal',
        medal2: 'Medal 2',
        star: 'Star',
        crown: 'Crown',

        // Config - Theme
        scoreboardTheme: 'Scoreboard Theme',
        blueModern: 'Blue Modern',
        darkElegant: 'Dark Elegant',
        lightMinimalist: 'Light Minimalist',
        neonNight: 'Neon Night',
        goldPremium: 'Gold Premium',
        greenSport: 'Green Sport',

        // Config - Background
        chromaKeyBackground: 'Background Color (Chroma Key)',
        green: 'Green',
        blue: 'Blue',
        magenta: 'Magenta',
        red: 'Red',
        gradient: 'Gradient',
        transparent: 'Transparent',

        // Config - Logo
        logo: 'Logo',
        logoUrlPlaceholder: 'Logo URL or paste image',
        upload: 'Upload',
        left: 'Left',
        right: 'Right',
        logoDisabled: 'Disabled',
        logoEnabled: 'Enabled',
        logoPreviewAlt: 'Logo preview',

        // Config - Players database
        playersDatabase: 'Players Database',
        loadCsvHint: 'Load a CSV to autocomplete names quickly',
        loadPlayersCsv: 'Load Players CSV',
        csvFormat: 'Format: name,flag,country (ex: John Smith,USA,United States)',
        playersLoaded: 'players loaded',
        autocomplete: 'Autocomplete',
        clearDatabase: 'Clear Database',

        // Modals
        confirmSetWon: 'Confirm Set Won?',
        confirmWinner: 'Confirm Winner?',
        confirmMatchWon: 'Confirm Match Won?',
        pointForCountry: '+1 point for',
        cancel: 'Cancel',
        confirm: 'Confirm',

        // Overlay (index.html)
        winner: 'Winner!',
        player1Default: 'Player 1',
        player2Default: 'Player 2',
        pair1Default: 'Pair 1',
        pair2Default: 'Pair 2',
        team1Default: 'Team 1',
        team2Default: 'Team 2',

        // Language
        language: 'Language',

        // Hub
        hubSubtitle: 'Professional system for table tennis broadcasts',
        controlPanelTitle: 'Control Panel',
        controlPanelDesc: 'Manage points, sets and settings during the match',
        overlayPreviewTitle: 'Overlay Preview',
        overlayPreviewDesc: 'Scoreboard preview (configured in OBS)',
        obsGuideTitle: 'OBS Guide',
        obsGuideDesc: 'How to set up the overlay in OBS Studio',
        quickStart: 'Quick Start',
        quickStartStep1: 'Open <code>index.html</code> in your browser (Chrome recommended)',
        quickStartStep2: 'In <strong>OBS Studio</strong>, add a <strong>Window Capture</strong> source',
        quickStartStep3: 'Select the browser window with the overlay',
        quickStartStep4: 'Open <strong>control.html</strong> in another tab to control the scoreboard',
        quickStartStep5: 'Ready to stream! 🎉',
        footerLicense: 'Open source project under MIT license',
        footerDocs: 'Full documentation at'
    }
};

// Get current language from localStorage or default to Spanish
function getCurrentLanguage() {
    return localStorage.getItem('overlayLanguage') || 'es';
}

// Set language and save to localStorage
function setLanguage(lang) {
    localStorage.setItem('overlayLanguage', lang);
    if (typeof applyTranslations === 'function') {
        applyTranslations();
    }
}

// Get translation for a key
function t(key) {
    const lang = getCurrentLanguage();
    return translations[lang][key] || translations['es'][key] || key;
}

// Get translation with placeholder replacement
function tReplace(key, replacements) {
    let text = t(key);
    for (const [placeholder, value] of Object.entries(replacements)) {
        text = text.replace(`{${placeholder}}`, value);
    }
    return text;
}
