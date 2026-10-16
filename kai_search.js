/**
 * KAI ACADEMIC PLATFORM — GLOBAL SEARCH ENGINE (FTS5 + BM25 + FALLBACK)
 * Connects the web interface to /api/search?q=... with debouncing,
 * keyboard navigation, module color badges, snippet highlighting,
 * direct section anchor navigation, and offline client-side fallback.
 */

(function () {
  'use strict';

  // Module Subject Color Map & Metadata
  const MODULE_THEMES = {
    'R1.01': { name: 'Langage C', color: '#287271', badgeBg: '#e6f4f1', badgeText: '#134e48', badgeBorder: '#99f6e4' },
    'R1.02': { name: 'Interfaces Web', color: '#366687', badgeBg: '#eff6ff', badgeText: '#1e40af', badgeBorder: '#bfdbfe' },
    'R1.03': { name: 'Architecture Ordinateurs', color: '#A85834', badgeBg: '#fff7ed', badgeText: '#9a3412', badgeBorder: '#fed7aa' },
    'R1.04': { name: 'Systèmes Linux POSIX', color: '#454E75', badgeBg: '#eef2ff', badgeText: '#3730a3', badgeBorder: '#c7d2fe' },
    'R1.05': { name: 'Bases de Données & SQL', color: '#6E4970', badgeBg: '#faf5ff', badgeText: '#6b21a8', badgeBorder: '#e9d5ff' },
    'R1.06': { name: 'Maths Discrètes', color: '#B85042', badgeBg: '#fff1f2', badgeText: '#9f1239', badgeBorder: '#fecdd3' },
    'R1.07': { name: 'Outils Maths (Gauss)', color: '#C25444', badgeBg: '#fff7ed', badgeText: '#c2410c', badgeBorder: '#fed7aa' },
    'R1.08': { name: 'Gestion & TVA', color: '#5B8C5A', badgeBg: '#f0fdf4', badgeText: '#166534', badgeBorder: '#bbf7d0' },
    'R1.09': { name: 'Éco-conception & RGESN', color: '#55784E', badgeBg: '#f7fee7', badgeText: '#3f6212', badgeBorder: '#d9f99d' },
    'R1.10': { name: 'Anglais Technique', color: '#2B6E7F', badgeBg: '#ecfeff', badgeText: '#155e75', badgeBorder: '#a5f3fc' },
    'R1.11': { name: 'Communication', color: '#965670', badgeBg: '#fdf2f8', badgeText: '#831843', badgeBorder: '#fbcfe8' },
    'R1.12': { name: 'PPP Projet Pro', color: '#926628', badgeBg: '#fffbeb', badgeText: '#92400e', badgeBorder: '#fde68a' },
    'S1.01': { name: 'SAÉ Implémentation', color: '#2B527A', badgeBg: '#eff6ff', badgeText: '#1e40af', badgeBorder: '#bfdbfe' },
    'S1.02': { name: 'SAÉ Algorithmique', color: '#5E527D', badgeBg: '#f5f3ff', badgeText: '#5b21b6', badgeBorder: '#ddd6fe' },
    'S1.03': { name: 'SAÉ Installation Dev', color: '#3D6878', badgeBg: '#f0f9ff', badgeText: '#075985', badgeBorder: '#bae6fd' },
    'S1.04': { name: 'SAÉ Base de Données', color: '#7E4868', badgeBg: '#fdf4ff', badgeText: '#86198f', badgeBorder: '#f5d0fe' },
    'S1.05': { name: 'SAÉ Recueil Besoins', color: '#8F4351', badgeBg: '#fff1f2', badgeText: '#9f1239', badgeBorder: '#fecdd3' },
    'S1.06': { name: 'SAÉ Environnement Éco', color: '#4E6E45', badgeBg: '#f7fee7', badgeText: '#3f6212', badgeBorder: '#d9f99d' },
    'MTU': { name: 'Méthodologie Univ.', color: '#5A6275', badgeBg: '#f8fafc', badgeText: '#334155', badgeBorder: '#e2e8f0' },
    'P1.01': { name: 'PPP Pitch Vidéo', color: '#945E35', badgeBg: '#fffbeb', badgeText: '#92400e', badgeBorder: '#fde68a' }
  };

  // Comprehensive Client-Side Offline Fallback Index
  const OFFLINE_FALLBACK_INDEX = [
    {
      module_code: 'R1.05',
      title: 'Modélisation Conceptuelle Merise (MCD) & Règles Marquesuzaà',
      chapter: 'Ch. 1 • Modélisation Conceptuelle Merise (MCD)',
      snippet: 'Règle formelle absolue : <mark class="bg-amber-200 text-slate-900 px-0.5 rounded font-semibold">ZÉRO clé étrangère en MCD</mark>. Entités, associations et cardinalités (0,1), (1,1), (0,N), (1,N).',
      url: '/courses/R1.05/chap1_merise_mcd.html#merise_rules'
    },
    {
      module_code: 'R1.05',
      title: 'Passage MCD vers MLD Relationnel (Cardinalités 1:N et N:M)',
      chapter: 'Ch. 2 • Modèle Logique de Données (MLD)',
      snippet: 'Dérivation systématique : la clé primaire de la table 1:1 migre comme <mark class="bg-amber-200 text-slate-900 px-0.5 rounded font-semibold">clé étrangère</mark> dans la table fille. Association N:M devient table de liaison.',
      url: '/courses/R1.05/chap2_mld_relationnel.html#mld_derivation'
    },
    {
      module_code: 'R1.05',
      title: 'Normalisation Relationnelle et Troisième Forme Normale (3FN)',
      chapter: 'Ch. 3 • Normalisation & Formes Normales (3FN)',
      snippet: '1FN : valeurs atomiques. 2FN : dépendance totale de la clé. 3FN : <mark class="bg-amber-200 text-slate-900 px-0.5 rounded font-semibold">aucune dépendance transitive</mark> entre attributs non-clés.',
      url: '/courses/R1.05/chap3_normalisation_3nf.html#nf_rules'
    },
    {
      module_code: 'R1.05',
      title: 'Langage SQL DDL & DML : SELECT, JOIN, GROUP BY, Constraints',
      chapter: 'Ch. 4 • Langage & Requêtes SQL',
      snippet: 'Requêtes d\'interrogation, contraintes <mark class="bg-amber-200 text-slate-900 px-0.5 rounded font-semibold">FOREIGN KEY, CHECK, NOT NULL</mark>, jointures internes et externes.',
      url: '/courses/R1.05/chap4_langage_sql.html#sql_syntax'
    },
    {
      module_code: 'R1.01',
      title: 'Pointeurs, Adresses Mémoire et Passage par Référence (&)',
      chapter: 'Ch. 3 • Fonctions, Références & Pointeurs',
      snippet: 'Maîtrise de la pile (stack), de l\'opérateur d\'adresse & et du <mark class="bg-amber-200 text-slate-900 px-0.5 rounded font-semibold">déréférencement *ptr</mark>. Passage par référence sécurisé.',
      url: '/courses/R1.01/chap3_fonctions_pointeurs.html#pointers'
    },
    {
      module_code: 'R1.01',
      title: 'Structures de Données & Allocation Dynamique Zéro Fuite',
      chapter: 'Ch. 5 • Structures de Données & Mémoire Dynamique',
      snippet: 'Règle d\'Anglet : Un malloc = un free. Validation intégrale sous <mark class="bg-amber-200 text-slate-900 px-0.5 rounded font-semibold">Valgrind sans aucune perte mémoire</mark>.',
      url: '/courses/R1.01/chap5_structures_memoire.html#heap'
    },
    {
      module_code: 'R1.06',
      title: 'Logique Propositionnelle, Prédicats et Tables de Vérité',
      chapter: 'Ch. 2 • Logique Propositionnelle & Prédicats',
      snippet: 'Connecteurs logiques ET, OU, NON, Implication =>, équivalences et <mark class="bg-amber-200 text-slate-900 px-0.5 rounded font-semibold">quantificateurs universel ∀ et existentiel ∃</mark>.',
      url: '/courses/R1.06/chap2_logique_predicats.html#predicates'
    },
    {
      module_code: 'R1.06',
      title: 'Arithmétique Modulaire, Théorème de Bézout & Inverses',
      chapter: 'Ch. 3 • Arithmétique Modulaire & Bézout',
      snippet: 'Division euclidienne, algorithme d\'Euclide étendu, identité de <mark class="bg-amber-200 text-slate-900 px-0.5 rounded font-semibold">Bézout au + bv = PGCD(a,b)</mark> et inverse modulo n.',
      url: '/courses/R1.06/chap3_arithmetique_modulaire.html#division'
    },
    {
      module_code: 'R1.07',
      title: 'Algèbre Linéaire, Pivot de Gauss-Jordan & Systèmes Linéaires',
      chapter: 'Ch. 1 • Pivot de Gauss-Jordan & Systèmes',
      snippet: 'Échelonnement de matrices, résolution de systèmes AX=B par la méthode du <mark class="bg-amber-200 text-slate-900 px-0.5 rounded font-semibold">pivot de Gauss-Jordan</mark>.',
      url: '/courses/R1.07/chap1_pivot_gauss_systemes.html#method'
    },
    {
      module_code: 'R1.07',
      title: 'Calcul Matriciel, Inversion de Matrices et Notebooks Python',
      chapter: 'Ch. 2 • Calcul Matriciel & Inversion',
      snippet: 'Multiplication matricielle, déterminant, inverse de matrice A^-1 et implémentation sous <mark class="bg-amber-200 text-slate-900 px-0.5 rounded font-semibold">NumPy / Jupyter Notebooks</mark>.',
      url: '/courses/R1.07/chap2_calcul_matriciel_inversion.html#operations'
    },
    {
      module_code: 'R1.08',
      title: 'La TVA et les Mécanismes Fiscaux : Neutralité & Déductibilité',
      chapter: 'Ch. 2 • La TVA & Mécanismes Fiscaux',
      snippet: 'Principe fondamental : la TVA est indolore pour l\'entreprise. Calcul <mark class="bg-amber-200 text-slate-900 px-0.5 rounded font-semibold">TVA collectée - TVA déductible</mark> = TVA à décaisser.',
      url: '/courses/R1.08/chap2_fiscalite_tva.html#tva_calc'
    },
    {
      module_code: 'R1.08',
      title: 'Formes Juridiques et Typologie des Entreprises (SARL, SAS, SA)',
      chapter: 'Ch. 1 • Typologie des Entreprises & Formes Juridiques',
      snippet: 'Critères de choix : responsabilité financière, gouvernance, régime social des dirigeants et statuts juridiques.',
      url: '/courses/R1.08/chap1_entreprises_formes_juridiques.html#governance'
    },
    {
      module_code: 'R1.08',
      title: 'Bilan Comptable, Actif, Passif & Compte de Résultat',
      chapter: 'Ch. 3 • Bilan Comptable & Compte de Résultat',
      snippet: 'Photographie du patrimoine : Actif = Passif. Produits et charges de l\'exercice comptable.',
      url: '/courses/R1.08/chap3_bilan_compte_resultat.html#balance_sheet'
    },
    {
      module_code: 'R1.02',
      title: 'Architecture HTTP, Méthodes GET/POST, En-têtes et Sécurité Web',
      chapter: 'Cours R1.02',
      snippet: 'Architecture client-serveur, méthodes idempotentes, codes de statut HTTP 200 à 500, en-têtes CSP et HTTPS.',
      url: '/courses/R1.02.html'
    },
    {
      module_code: 'R1.03',
      title: 'Architecture des Ordinateurs, Binaire & Modèle de Von Neumann',
      chapter: 'Cours R1.03',
      snippet: 'Codage de l\'information en base 2, algèbre de Boole, registres processeur et bus mémoire.',
      url: '/courses/R1.03.html'
    },
    {
      module_code: 'R1.04',
      title: 'Systèmes Linux POSIX, Processus & Scripts Shell Bash',
      chapter: 'Cours R1.04',
      snippet: 'Commandes Unix fondamentales, gestion des droits chmod/chown, redirections pipes et signaux.',
      url: '/courses/R1.04.html'
    },
    {
      module_code: 'R1.09',
      title: 'Éco-conception Logicielle, RGESN et Cycle de Vie (ACV)',
      chapter: 'Cours R1.09',
      snippet: '79 critères du référentiel RGESN, sobriété numérique, effet rebond et analyse du cycle de vie.',
      url: '/courses/R1.09.html'
    },
    {
      module_code: 'S1.04',
      title: 'SAÉ 1.04 Ongi Etorri — Conception & Implémentation BDD',
      chapter: 'Cours S1.04',
      snippet: 'Projet réel : MCD de réservation touristique, dérivation relationnelle et scripts SQL sous Oracle/PostgreSQL.',
      url: '/courses/S1.04.html'
    },
    {
      module_code: 'S1.05',
      title: 'SAÉ 1.05 Recueil de Besoins — User Stories & Matrice MoSCoW',
      chapter: 'Cours S1.05',
      snippet: 'Interviews utilisateurs, formalisation User Stories, priorisation MoSCoW (Must, Should, Could, Won\'t).',
      url: '/courses/S1.05.html'
    },
    {
      module_code: 'P1.01',
      title: 'PPP Pitch Vidéo — Script & Grille d\'Évaluation Officielle',
      chapter: 'Cours P1.01',
      snippet: 'Présentation de projet en 120 secondes, articulation de la problématique et posture professionnelle.',
      url: '/courses/P1.01.html'
    }
  ];

  let debounceTimer = null;
  let activeIndex = -1;
  let currentResults = [];

  // DOM elements cache
  function getElements() {
    return {
      modal: document.getElementById('searchModal'),
      input: document.getElementById('searchInput'),
      container: document.getElementById('searchResults')
    };
  }

  // Ensure Search Modal DOM exists (Injects clean modal if missing on a page)
  function ensureSearchModalDOM() {
    let { modal } = getElements();
    if (modal) return;

    const modalHTML = `
      <div id="searchModal" class="hidden fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-start justify-center pt-16 sm:pt-20 px-4 transition-opacity">
        <div class="bg-white w-full max-w-2xl rounded-2xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[80vh] animate-in fade-in zoom-in-95 duration-150">
          <div class="p-3.5 sm:p-4 border-b border-slate-200 flex items-center gap-3 bg-slate-50/60">
            <svg class="w-5 h-5 text-slate-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
            <input type="text" id="searchInput" placeholder="Rechercher un cours, chapitre, 3FN, Merise, TVA, C++..." class="w-full text-sm bg-transparent border-none outline-none text-slate-800 placeholder-slate-400 font-sans" autocomplete="off" spellcheck="false">
            <kbd class="hidden sm:inline-block px-2 py-0.5 text-[10px] font-mono text-slate-400 bg-white border border-slate-200 rounded">Échap</kbd>
            <button type="button" onclick="window.closeSearchModal && window.closeSearchModal()" class="text-slate-400 hover:text-slate-600 p-1 sm:hidden">✕</button>
          </div>
          <div id="searchResults" class="overflow-y-auto p-2 space-y-1.5 text-xs flex-1">
            <div class="p-8 text-center text-slate-400 text-xs">Tapez votre recherche pour explorer la base académique (FTS5 BM25)...</div>
          </div>
          <div class="px-4 py-2 border-t border-slate-100 bg-slate-50 flex items-center justify-between text-[11px] text-slate-500">
            <span class="flex items-center gap-2">
              <span class="inline-block w-2 h-2 rounded-full bg-emerald-500"></span> FTS5 Plein-Texte KAI
            </span>
            <span class="hidden sm:inline">Utilisez ↑ ↓ pour naviguer, Entrée pour ouvrir</span>
          </div>
        </div>
      </div>
    `;
    document.body.insertAdjacentHTML('beforeend', modalHTML);
  }

  // Open Search Modal
  window.openSearchModal = function () {
    ensureSearchModalDOM();
    const { modal, input } = getElements();
    if (!modal) return;

    modal.classList.remove('hidden');
    modal.classList.add('open');
    if (input) {
      input.focus();
      if (input.value && input.value.trim().length >= 2) {
        performSearch(input.value.trim());
      }
    }
  };

  // Close Search Modal
  window.closeSearchModal = function () {
    const { modal } = getElements();
    if (!modal) return;
    modal.classList.add('hidden');
    modal.classList.remove('open');
    activeIndex = -1;
  };

  // Backdrop click listener
  window.closeSearchModalOnBackdrop = function (e) {
    if (e.target && e.target.id === 'searchModal') {
      window.closeSearchModal();
    }
  };

  // Debounced input handler (250ms)
  function onSearchInput(val) {
    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(() => {
      performSearch(val);
    }, 250);
  }

  function resolveTargetUrl(rawUrl) {
    if (!rawUrl || rawUrl === '#') return '#';
    if (window.location.protocol === 'file:' && rawUrl.startsWith('/')) {
      const pathname = window.location.pathname.replace(/\\/g, '/');
      const marker = '/data/web_library';
      const markerIdx = pathname.indexOf(marker);
      if (markerIdx !== -1) {
        return pathname.substring(0, markerIdx + marker.length) + rawUrl;
      }
      if (pathname.includes('/courses/')) {
        return '..' + rawUrl;
      }
      return '.' + rawUrl;
    }
    return rawUrl;
  }

  // Render search results
  function renderResults(results, isOfflineFallback = false) {
    const { container } = getElements();
    if (!container) return;

    currentResults = results || [];
    activeIndex = -1;

    if (!currentResults.length) {
      container.innerHTML = `
        <div class="p-8 text-center text-slate-400 text-xs space-y-1">
          <div class="font-semibold text-slate-600">Aucun résultat trouvé</div>
          <div>Essayez d'autres mots-clés : <em>Merise, 3FN, TVA, Pointeur, Gauss, Linux...</em></div>
        </div>
      `;
      return;
    }

    let html = '';
    if (isOfflineFallback) {
      html += `
        <div class="px-3 py-1.5 mb-1 rounded-lg bg-amber-50 border border-amber-200 text-amber-800 text-[11px] flex items-center justify-between">
          <span>⚡ Index local hors-ligne activé</span>
          <span class="font-mono">${currentResults.length} résultats</span>
        </div>
      `;
    }

    currentResults.forEach((item, idx) => {
      const mod = item.module_code || 'AUTRE';
      const theme = MODULE_THEMES[mod] || {
        name: mod,
        color: '#475569',
        badgeBg: '#f1f5f9',
        badgeText: '#334155',
        badgeBorder: '#cbd5e1'
      };

      const title = item.title || 'Sans titre';
      const chapter = item.chapter || `Module ${mod}`;
      const snippet = item.snippet || '';
      const resolvedUrl = resolveTargetUrl(item.url || item.canonical_url || '#');

      html += `
        <a href="${resolvedUrl}" data-index="${idx}" class="search-result-item block p-3 rounded-xl border border-transparent hover:border-slate-200 hover:bg-slate-50 transition-all text-slate-800 cursor-pointer group focus:outline-none">
          <div class="flex items-start justify-between gap-3">
            <div class="flex-1 min-w-0">
              <div class="flex items-center gap-2 flex-wrap mb-1">
                <span class="inline-flex items-center px-2 py-0.5 rounded-md font-mono text-[10px] font-bold border" style="background-color: ${theme.badgeBg}; color: ${theme.badgeText}; border-color: ${theme.badgeBorder};">
                  ${mod}
                </span>
                <span class="text-[11px] font-medium text-slate-500 truncate">
                  ${chapter}
                </span>
              </div>
              <h4 class="text-xs sm:text-sm font-bold text-slate-900 group-hover:text-blue-600 transition-colors leading-snug">
                ${title}
              </h4>
              <p class="text-[11px] sm:text-xs text-slate-600 mt-1 line-clamp-2 leading-relaxed">
                ${snippet}
              </p>
            </div>
            <div class="shrink-0 pt-1 text-slate-400 group-hover:text-blue-600 group-hover:translate-x-0.5 transition-all">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path></svg>
            </div>
          </div>
        </a>
      `;
    });

    container.innerHTML = html;
  }

  // Update active highlighted item for keyboard navigation
  function updateActiveItem() {
    const items = document.querySelectorAll('.search-result-item');
    items.forEach((item, idx) => {
      if (idx === activeIndex) {
        item.classList.add('bg-blue-50', 'border-blue-300', 'ring-2', 'ring-blue-400/40');
        item.classList.remove('border-transparent');
        item.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
      } else {
        item.classList.remove('bg-blue-50', 'border-blue-300', 'ring-2', 'ring-blue-400/40');
        item.classList.add('border-transparent');
      }
    });
  }

  // Execute Search query (API with offline fallback)
  async function performSearch(query) {
    const { container } = getElements();
    if (!container) return;

    const q = (query || '').trim();
    if (q.length < 2) {
      container.innerHTML = `
        <div class="p-8 text-center text-slate-400 text-xs">
          Tapez au moins 2 lettres pour chercher instantanément dans tous les cours, chapitres et documents...
        </div>
      `;
      currentResults = [];
      activeIndex = -1;
      return;
    }

    // Display loading state
    container.innerHTML = `
      <div class="p-8 text-center text-slate-400 text-xs flex items-center justify-center gap-2">
        <svg class="animate-spin h-4 w-4 text-blue-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
          <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"></path>
        </svg>
        <span>Recherche dans l'Academic Vault FTS5...</span>
      </div>
    `;

    try {
      const resp = await fetch('/api/search?q=' + encodeURIComponent(q), {
        headers: { 'Accept': 'application/json' }
      });

      if (!resp.ok) {
        throw new Error('API search status ' + resp.status);
      }

      const data = await resp.json();
      const results = (data && (data.results || [])) || [];
      renderResults(results, false);
    } catch (err) {
      // Offline fallback search
      const qLower = q.toLowerCase();
      const localMatches = OFFLINE_FALLBACK_INDEX.filter(item => {
        const titleMatch = item.title.toLowerCase().includes(qLower);
        const modMatch = item.module_code.toLowerCase().includes(qLower);
        const chapterMatch = item.chapter.toLowerCase().includes(qLower);
        const snippetMatch = item.snippet.toLowerCase().includes(qLower);
        return titleMatch || modMatch || chapterMatch || snippetMatch;
      });
      renderResults(localMatches, true);
    }
  }

  // Bind keyboard navigation & global shortcuts
  function initKeyboard() {
    document.addEventListener('keydown', (e) => {
      // Global Ctrl+K / Cmd+K
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        window.openSearchModal();
        return;
      }

      const { modal, input } = getElements();
      const isModalOpen = modal && (modal.classList.contains('open') || (!modal.classList.contains('hidden') && modal.style.display !== 'none'));

      if (!isModalOpen) return;

      if (e.key === 'Escape') {
        e.preventDefault();
        window.closeSearchModal();
      } else if (e.key === 'ArrowDown') {
        e.preventDefault();
        if (currentResults.length > 0) {
          activeIndex = (activeIndex + 1) % currentResults.length;
          updateActiveItem();
        }
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        if (currentResults.length > 0) {
          activeIndex = (activeIndex - 1 + currentResults.length) % currentResults.length;
          updateActiveItem();
        }
      } else if (e.key === 'Enter') {
        if (activeIndex >= 0 && activeIndex < currentResults.length) {
          e.preventDefault();
          const target = currentResults[activeIndex];
          const targetUrl = target.url || target.canonical_url;
          if (targetUrl) {
            window.closeSearchModal();
            window.location.href = resolveTargetUrl(targetUrl);
          }
        }
      }
    });
  }

  // Bind input listeners
  function initEvents() {
    ensureSearchModalDOM();
    const { input, modal } = getElements();

    if (input) {
      input.addEventListener('input', (e) => onSearchInput(e.target.value));
    }

    if (modal) {
      modal.addEventListener('click', (e) => {
        if (e.target === modal) window.closeSearchModal();
      });
    }

    // Expose global filterSearchResults and handleSearch aliases for existing templates
    window.filterSearchResults = function () {
      const { input } = getElements();
      if (input) onSearchInput(input.value);
    };

    window.handleSearch = function (val) {
      onSearchInput(val);
    };
  }

  // Auto initialize on DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      initEvents();
      initKeyboard();
    });
  } else {
    initEvents();
    initKeyboard();
  }

})();
