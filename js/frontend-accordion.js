(function() {
	'use strict';

	if (typeof document === 'undefined') return;

	function setupAccordionBehavior() {
		// Event listener delegado no document para interceptar cliques no front-end
		document.addEventListener('click', function(e) {
			var btn = e.target.closest('.menu-accordion-block .accordion-button');
			if (!btn) {
				var header = e.target.closest('.menu-accordion-block .accordion-header');
				if (header) {
					btn = header.querySelector('.accordion-button');
				}
			}
			if (!btn) return;

			// Interrompe outros scripts para garantir comportamento uniforme idêntico ao do bloco no editor
			e.preventDefault();
			e.stopPropagation();

			var accordionItem = btn.closest('.accordion-item');
			if (!accordionItem) return;

			var collapseEl = accordionItem.querySelector('.accordion-collapse');
			if (!collapseEl) return;

			var accordionParent = accordionItem.closest('.accordion') || accordionItem.closest('.accordion-col') || accordionItem.closest('.menu-accordion-block');

			var willOpen = !collapseEl.classList.contains('show');

			// Quando um item for abrir, recolhe imediatamente qualquer outro do mesmo grupo
			if (willOpen && accordionParent) {
				var otherCollapses = accordionParent.querySelectorAll('.accordion-collapse');
				otherCollapses.forEach(function(oc) {
					if (oc !== collapseEl) {
						oc.classList.remove('show');
					}
				});

				var otherButtons = accordionParent.querySelectorAll('.accordion-button');
				otherButtons.forEach(function(ob) {
					if (ob !== btn) {
						ob.classList.add('collapsed');
						ob.setAttribute('aria-expanded', 'false');
					}
				});
			}

			// Alterna o item clicado
			if (willOpen) {
				collapseEl.classList.add('show');
				btn.classList.remove('collapsed');
				btn.setAttribute('aria-expanded', 'true');
			} else {
				collapseEl.classList.remove('show');
				btn.classList.add('collapsed');
				btn.setAttribute('aria-expanded', 'false');
			}
		}, true); // useCapture: true garante prioridade total sobre qualquer outro listener
	}

	if (document.readyState === 'loading') {
		document.addEventListener('DOMContentLoaded', setupAccordionBehavior);
	} else {
		setupAccordionBehavior();
	}
})();
