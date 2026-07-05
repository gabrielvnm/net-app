
(function() {
"use strict";

// get all tab buttons and panels
const tabs = document.querySelectorAll('.nav-tab');
const panels = {
    totais: document.getElementById('panel-totais'),
    usuarios: document.getElementById('panel-usuarios'),
    transacoes: document.getElementById('panel-transacoes')
};

// helper: deactivate all tabs & panels
function deactivateAll() {
    tabs.forEach(tab => {
    tab.classList.remove('active');
    tab.setAttribute('aria-selected', 'false');
    });
    Object.values(panels).forEach(panel => {
    panel.classList.remove('active-panel');
    });
}

// activate a specific tab by its data-tab value
function activateTab(tabId) {
    deactivateAll();

    // find the button with matching data-tab
    const activeButton = Array.from(tabs).find(tab => tab.dataset.tab === tabId);
    if (activeButton) {
    activeButton.classList.add('active');
    activeButton.setAttribute('aria-selected', 'true');
    }

    // show corresponding panel
    const panel = panels[tabId];
    if (panel) {
    panel.classList.add('active-panel');
    }
}

// attach click event to each tab
tabs.forEach(tab => {
    tab.addEventListener('click', function(e) {
    const tabId = this.dataset.tab;
    if (tabId) {
        activateTab(tabId);
    }
    });

    // optional: keyboard accessibility (Enter/Space already handled by button)
    tab.addEventListener('keydown', function(e) {
    if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        this.click();
    }
    });
});

// set initial active state (ensures consistency)
// if any tab has 'active' class, use its data-tab, otherwise default to totais
const initialActiveTab = document.querySelector('.nav-tab.active');
if (initialActiveTab && initialActiveTab.dataset.tab) {
    const tabId = initialActiveTab.dataset.tab;
    // ensure panel matches (in case HTML has mismatch)
    deactivateAll(); 
    initialActiveTab.classList.add('active');
    initialActiveTab.setAttribute('aria-selected', 'true');
    const panel = panels[tabId];
    if (panel) panel.classList.add('active-panel');
} else {
    // fallback: activate totais
    const totaisTab = document.querySelector('.nav-tab[data-tab="totais"]');
    if (totaisTab) {
    deactivateAll();
    totaisTab.classList.add('active');
    totaisTab.setAttribute('aria-selected', 'true');
    if (panels.totais) panels.totais.classList.add('active-panel');
    }
}

console.log('NET-APP prototype · tabs ready');
})();