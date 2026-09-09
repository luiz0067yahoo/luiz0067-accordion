(function(wp, jQuery) {
	'use strict';

	if (!wp || !wp.blocks || !wp.blocks.registerBlockType || !wp.element) {
		return;
	}

	var el = wp.element.createElement;
	var RichText = (wp.blockEditor && wp.blockEditor.RichText) || (wp.editor && wp.editor.RichText);

	function getRandomArbitrary(min, max) {
		return Math.random() * (max - min) + min;
	}

	function getSafe2DArray(source, cols, rowsPerCol) {
		var result = [];
		for (var c = 0; c < cols; c++) {
			var col = (source && Array.isArray(source[c])) ? [...source[c]] : [];
			if (col.length === 0) {
				for (var r = 0; r < rowsPerCol; r++) {
					col.push("");
				}
			}
			result.push(col);
		}
		return result;
	}

	var blockConfigSingle = {
		title: 'Menu Retrátil', // Block name visible to user
		icon: 'menu',
		description: 'Menu retrátil de coluna única ideal para dividir conteúdos em tópicos',
		example: {
			attributes: {
				backgroundColor: '#000000',
				opacity: 0.8,
				textColor: '#FFFFFF'
			},
		},
		category: 'design',
		supports: {
			multiple: true,
		},
		attributes: {
			title: {
				type: 'array',
				default: [["", ""]]
			},
			description: {
				type: 'array',
				default: [["", ""]]
			},
			timenumber: {
				type: 'array',
				default: ["0_col"]
			}
		},
		edit: function(props) {
			var sizecols = 1;
			var uniqueId = Date.now().toString(36) + "_" + Math.floor(getRandomArbitrary(1000, 9999));
			var defaultTime = [uniqueId + "_col"];

			// Garantir IDs únicos por instância para evitar que blocos no mesmo post interfiram entre si
			if (!props.attributes.timenumber || !Array.isArray(props.attributes.timenumber) || props.attributes.timenumber.length === 0 || props.attributes.timenumber[0] === "0_col") {
				props.setAttributes({ timenumber: defaultTime });
			}

			function updateTitle(event, optCol, optIdx) {
				var val = (event && event.target) ? event.target.value : event;
				var positionContainer = (optCol !== undefined) ? optCol : 0;
				var position = optIdx;

				if (position === undefined || position < 0 || positionContainer < 0) {
					return;
				}

				var acc_title = getSafe2DArray(props.attributes.title, sizecols, 2);
				if (!acc_title[positionContainer]) {
					acc_title[positionContainer] = [];
				}
				acc_title[positionContainer][position] = (val !== undefined && val !== null) ? String(val) : "";
				props.setAttributes({ title: acc_title });
			}

			function updateDescription(newdata, optCol, optIdx) {
				var positionContainer = (optCol !== undefined) ? optCol : 0;
				var position = optIdx;

				if (position === undefined || position < 0 || positionContainer < 0) {
					return;
				}

				var acc_description = getSafe2DArray(props.attributes.description, sizecols, 2);
				if (!acc_description[positionContainer]) {
					acc_description[positionContainer] = [];
				}
				acc_description[positionContainer][position] = (newdata !== undefined && newdata !== null) ? String(newdata) : "";
				props.setAttributes({ description: acc_description });
			}

			function addlinkdata(event, optCol, optIdx) {
				var positionContainer = (optCol !== undefined) ? optCol : 0;
				var position = (optIdx !== undefined) ? optIdx : 0;

				if (positionContainer < 0 || position < 0) {
					return;
				}

				var acc_title = getSafe2DArray(props.attributes.title, sizecols, 2);
				var acc_description = getSafe2DArray(props.attributes.description, sizecols, 2);

				if (!acc_title[positionContainer]) {
					acc_title[positionContainer] = ["", ""];
				}
				if (!acc_description[positionContainer]) {
					acc_description[positionContainer] = ["", ""];
				}

				acc_title[positionContainer].splice(position + 1, 0, "");
				acc_description[positionContainer].splice(position + 1, 0, "");

				props.setAttributes({
					title: acc_title,
					description: acc_description
				});
			}

			function removelinkdata(event, optCol, optIdx) {
				var positionContainer = (optCol !== undefined) ? optCol : 0;
				var position = (optIdx !== undefined) ? optIdx : 0;

				if (positionContainer < 0 || position < 0) {
					return;
				}

				var acc_title = getSafe2DArray(props.attributes.title, sizecols, 2);
				var acc_description = getSafe2DArray(props.attributes.description, sizecols, 2);

				if (acc_title[positionContainer] && acc_title[positionContainer].length > 1) {
					acc_title[positionContainer].splice(position, 1);
					acc_description[positionContainer].splice(position, 1);

					props.setAttributes({
						title: acc_title,
						description: acc_description
					});
				}
			}

			var titlesAttr = getSafe2DArray(props.attributes.title, sizecols, 2);
			var descAttr = getSafe2DArray(props.attributes.description, sizecols, 2);
			var timenumberAttr = (props.attributes.timenumber && Array.isArray(props.attributes.timenumber) && props.attributes.timenumber.length >= sizecols) ? props.attributes.timenumber : defaultTime;

			var timenumber = timenumberAttr[0] || (uniqueId + "_col");
			var idAccordionSection = "accordionSection_" + timenumber + "_0";
			var selectorIdAccordionSection = "#" + idAccordionSection;
			var colTitles = titlesAttr[0] || ["", ""];
			var colDescs = descAttr[0] || ["", ""];
			var sizelines = Math.max(colDescs.length, colTitles.length, 1);
			var lines_editor = [];

			for (var index = 0; index < sizelines; index++) {
				(function(colI, itemI, currentTitles, currentDescs, itemTime, sectionSelector) {
					var itemCollapseId = "collapse_" + itemTime + "_" + colI + "_" + itemI;
					var itemTitle = (currentTitles[itemI] !== undefined && currentTitles[itemI] !== null) ? String(currentTitles[itemI]) : "";
					var itemDesc = (currentDescs[itemI] !== undefined && currentDescs[itemI] !== null) ? String(currentDescs[itemI]) : "";

					lines_editor.push(
						el('div', { className: "accordion-item accordion-flush bg-3 position-relative mb-2", key: "item_" + colI + "_" + itemI },
							el('h2', { className: "accordion-header accordion" },
								el('button', {
									type: "button",
									className: "accordion-button collapsed bg-3 color-1",
									"data-bs-toggle": "collapse",
									"data-bs-target": "#" + itemCollapseId,
									"aria-controls": itemCollapseId,
									"aria-expanded": "false",
									onClick: function(e) {
										if (e.target.tagName !== 'INPUT') {
											var collapseEl = document.getElementById(itemCollapseId);
											if (collapseEl) {
												var btn = e.currentTarget;
												var willShow = !collapseEl.classList.contains("show");
												var accordionParent = collapseEl.closest('.accordion');

												if (willShow && accordionParent) {
													var otherCollapses = accordionParent.querySelectorAll('.accordion-collapse');
													otherCollapses.forEach(function(oc) {
														if (oc !== collapseEl) oc.classList.remove("show");
													});
													var otherBtns = accordionParent.querySelectorAll('.accordion-button');
													otherBtns.forEach(function(ob) {
														if (ob !== btn) {
															ob.classList.add("collapsed");
															ob.setAttribute("aria-expanded", "false");
														}
													});
												}

												if (willShow) {
													collapseEl.classList.add("show");
													if (btn) {
														btn.classList.remove("collapsed");
														btn.setAttribute("aria-expanded", "true");
													}
												} else {
													collapseEl.classList.remove("show");
													if (btn) {
														btn.classList.add("collapsed");
														btn.setAttribute("aria-expanded", "false");
													}
												}
											}
										}
									}
								},
									el('input', {
										type: "text",
										value: itemTitle,
										placeholder: 'Coloque titulo aqui...',
										className: "bg-3 color-1 w-100",
										onClick: function(e) { e.stopPropagation(); },
										onChange: function(e) { updateTitle(e, colI, itemI); }
									})
								)
							),
							el('div', {
								className: "accordion-collapse collapse border",
								id: itemCollapseId,
								"data-bs-parent": sectionSelector
							},
								el('div', { className: "accordion-body bg-0 color-1" },
									el(
										RichText, {
											tagName: 'div',
											multiline: 'p',
											identifier: 'desc_' + colI + '_' + itemI,
											onChange: function(newdata) { updateDescription(newdata, colI, itemI); },
											value: itemDesc,
											placeholder: 'Coloque seu texto aqui...'
										}
									)
								)
							),
							el('div', {
								className: "accordion-action-buttons",
								style: { position: "absolute", top: "8px", right: "8px", zIndex: "1000", display: "flex", gap: "3px" }
							},
								el(
									'input', {
										type: 'button',
										ariaLabel: "Remover Linha",
										value: '-',
										onClick: function(e) { removelinkdata(e, colI, itemI); },
										style: { width: '25px', height: '25px', backgroundColor: 'black', color: 'white', padding: '0px', lineHeight: '25px', textAlign: 'center', border: 'none', cursor: 'pointer', borderRadius: '3px' }
									}
								),
								el(
									'input', {
										type: 'button',
										ariaLabel: "Adiciona Linha",
										value: '+',
										onClick: function(e) { addlinkdata(e, colI, itemI); },
										style: { width: '25px', height: '25px', backgroundColor: 'black', color: 'white', padding: '0px', lineHeight: '25px', textAlign: 'center', border: 'none', cursor: 'pointer', borderRadius: '3px' }
									}
								)
							)
						)
					);
				})(0, index, colTitles, colDescs, timenumber, selectorIdAccordionSection);
			}

			return el('div', { className: 'row menu-accordion-block menu-accordion-single-block w-100 d-flex m-0' },
				el('div', { className: 'col-12 w-100 p-0', key: 'col_0' },
					el('div', {
						className: 'accordion w-100 accordion-col',
						id: idAccordionSection
					},
						lines_editor
					)
				)
			);
		},

		save: function(props) {
			var titlesAttr = (props.attributes.title && Array.isArray(props.attributes.title)) ? props.attributes.title : [["", ""]];
			var descAttr = (props.attributes.description && Array.isArray(props.attributes.description)) ? props.attributes.description : [["", ""]];
			var timenumberAttr = (props.attributes.timenumber && Array.isArray(props.attributes.timenumber)) ? props.attributes.timenumber : ["0_col"];

			var timenumber = timenumberAttr[0] || "0_col";
			var idAccordionSection = "accordionSection_" + timenumber + "_0";
			var selectorIdAccordionSection = "#" + idAccordionSection;
			var colTitles = (titlesAttr[0] && Array.isArray(titlesAttr[0])) ? titlesAttr[0] : ["", ""];
			var colDescs = (descAttr[0] && Array.isArray(descAttr[0])) ? descAttr[0] : ["", ""];
			var sizelines = Math.max(colDescs.length, colTitles.length, 1);
			var lines_save = [];

			for (var index = 0; index < sizelines; index++) {
				var descContent = (colDescs[index] !== undefined && colDescs[index] !== null) ? String(colDescs[index]) : "";
				var renderedBody;
				if (typeof window !== 'undefined' && typeof window.HTMLReactParser === 'function') {
					renderedBody = window.HTMLReactParser(descContent);
				} else {
					renderedBody = el(wp.element.RawHTML, null, descContent);
				}

				var itemCollapseId = "collapse_" + timenumber + "_0_" + index;

				lines_save.push(
					el('div', { className: "accordion-item accordion-flush bg-3 position-relative mb-2", key: "save_item_0_" + index },
						el('h2', { className: "accordion-header accordion" },
							el('button', {
								type: "button",
								className: "accordion-button collapsed bg-3 color-1",
								"data-bs-toggle": "collapse",
								"data-bs-target": "#" + itemCollapseId,
								"aria-controls": itemCollapseId,
								"aria-expanded": "false"
							},
								(colTitles[index] !== undefined && colTitles[index] !== null) ? String(colTitles[index]) : ""
							)
						),
						el('div', { className: "accordion-collapse collapse border", id: itemCollapseId, "data-bs-parent": selectorIdAccordionSection },
							el('div', { className: "accordion-body bg-0 color-1" },
								renderedBody
							)
						)
					)
				);
			}

			return el('div', { className: 'row menu-accordion-block menu-accordion-single-block w-100 d-flex m-0' },
				el('div', { className: 'col-12 w-100 p-0', key: 'save_col_0' },
					el('div', {
						className: 'accordion w-100 accordion-col',
						id: idAccordionSection
					},
						lines_save
					)
				)
			);
		}
	};

	// Register single column block
	wp.blocks.registerBlockType('luiz0067/accordion', blockConfigSingle);

	// Remove native WordPress core/accordion suite and core/details (Sanfona)
	function unregisterCoreAccordion() {
		if (!window.wp || !window.wp.blocks || !window.wp.blocks.unregisterBlockType) {
			return;
		}
		var coreBlocksToRemove = [
			'core/accordion',
			'core/accordion-heading',
			'core/accordion-item',
			'core/accordion-panel',
			'core/details'
		];
		coreBlocksToRemove.forEach(function(slug) {
			if (wp.blocks.getBlockType(slug)) {
				wp.blocks.unregisterBlockType(slug);
			}
		});
		if (wp.blocks.getBlockTypes) {
			wp.blocks.getBlockTypes().forEach(function(b) {
				if (b && b.name && b.name.indexOf('luiz0067/') !== 0) {
					var title = (b.title || '').toLowerCase();
					if (title.indexOf('sanfona') !== -1 || (b.name.indexOf('core/accordion') === 0) || b.name === 'core/details') {
						wp.blocks.unregisterBlockType(b.name);
					}
				}
			});
		}
	}

	if (window.wp && window.wp.domReady) {
		window.wp.domReady(function() {
			unregisterCoreAccordion();
			setTimeout(unregisterCoreAccordion, 200);
			setTimeout(unregisterCoreAccordion, 600);
			setTimeout(unregisterCoreAccordion, 1500);
		});
	}

})(window.wp, window.jQuery);
