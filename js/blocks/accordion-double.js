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

	var blockConfigDouble = {
		title: 'Menu Retrátil Duplo', // Block name visible to user
		icon: 'columns',
		description: 'Menu retrátil duplo é ideal para dividir conteúdos em tópicos em duas colunas',
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
			title: { type: 'array' },
			description: { type: 'array' },
			timenumber: { type: 'array' }
		},
		edit: function(props) {
			var $ = jQuery || window.jQuery;
			var uniqueId = Date.now().toString(36) + "_" + Math.floor(getRandomArbitrary(1000, 9999));

			var needsInit = false;
			var defaultTitle = [
				["", ""],
				["", ""]
			];
			var defaultDesc = [
				["", ""],
				["", ""]
			];
			var defaultTime = [uniqueId + "_left", uniqueId + "_right"];

			if (!props.attributes.title || props.attributes.title.length === 0) {
				props.attributes.title = defaultTitle;
				props.attributes.timenumber = defaultTime;
				needsInit = true;
			} else if (!props.attributes.title[0] || props.attributes.title[0].length === 0) {
				props.attributes.title[0] = ["", ""];
				if (!props.attributes.title[1] || props.attributes.title[1].length === 0) {
					props.attributes.title[1] = ["", ""];
				}
				props.attributes.timenumber = defaultTime;
				needsInit = true;
			}

			if (!props.attributes.description || props.attributes.description.length === 0) {
				props.attributes.description = defaultDesc;
				props.attributes.timenumber = defaultTime;
				needsInit = true;
			} else if (!props.attributes.description[0] || props.attributes.description[0].length === 0) {
				props.attributes.description[0] = ["", ""];
				if (!props.attributes.description[1] || props.attributes.description[1].length === 0) {
					props.attributes.description[1] = ["", ""];
				}
				props.attributes.timenumber = defaultTime;
				needsInit = true;
			}

			if (!props.attributes.timenumber || props.attributes.timenumber.length < 2 || !props.attributes.timenumber[0] || props.attributes.timenumber[0] === "0_left") {
				props.attributes.timenumber = defaultTime;
				needsInit = true;
			}

			if (needsInit) {
				setTimeout(function() {
					props.setAttributes({
						title: props.attributes.title,
						description: props.attributes.description,
						timenumber: props.attributes.timenumber
					});
				}, 0);
			}

			function updateTitle(event, optCol, optIdx) {
				var val = (event && event.target) ? event.target.value : event;
				var positionContainer = optCol;
				var position = optIdx;

				if (positionContainer === undefined || position === undefined) {
					if ($ && event && event.target) {
						var element_ = $(event.target);
						var item = element_.closest(".accordion-item");
						var mainContainer = element_.closest(".accordion-col");
						var topContainer = mainContainer.closest(".menu-accordion-double-block, .menu-accordion-block");
						var all_Itens = mainContainer.find(".accordion-item");
						var allContainer = topContainer.find(".accordion-col");
						position = all_Itens.index(item);
						positionContainer = allContainer.index(mainContainer);
					}
				}

				if (positionContainer === undefined || position === undefined || positionContainer < 0 || position < 0) {
					return;
				}

				var acc_title = props.attributes.title.map(function(arr) { return [...arr]; });
				if (!acc_title[positionContainer]) {
					acc_title[positionContainer] = [];
				}
				var acc_position_title = [...acc_title[positionContainer]];
				acc_position_title[position] = val;
				acc_title[positionContainer] = acc_position_title;
				props.setAttributes({ title: acc_title });
			}

			function updateDescription(newdata, optCol, optIdx) {
				var positionContainer = optCol;
				var position = optIdx;

				if (positionContainer === undefined || position === undefined) {
					var evt = (typeof event !== 'undefined') ? event : (window.event || null);
					if ($ && evt && evt.target) {
						var element_ = $(evt.target);
						var item = element_.closest(".accordion-item");
						var mainContainer = element_.closest(".accordion-col");
						var topContainer = mainContainer.closest(".menu-accordion-double-block, .menu-accordion-block");
						var all_Itens = mainContainer.find(".accordion-item");
						var allContainer = topContainer.find(".accordion-col");
						position = all_Itens.index(item);
						positionContainer = allContainer.index(mainContainer);
					}
				}

				if (positionContainer === undefined || position === undefined || positionContainer < 0 || position < 0) {
					return;
				}

				var acc_description = props.attributes.description.map(function(arr) { return [...arr]; });
				if (!acc_description[positionContainer]) {
					acc_description[positionContainer] = [];
				}
				var acc_position_description = [...acc_description[positionContainer]];
				acc_position_description[position] = newdata;
				acc_description[positionContainer] = acc_position_description;
				props.setAttributes({ description: acc_description });
			}

			function addlinkdata(event, optCol, optIdx) {
				var positionContainer = optCol;
				var position = optIdx;

				if (positionContainer === undefined || position === undefined) {
					if ($ && event && event.target) {
						var element_ = $(event.target);
						var item = element_;
						var mainContainer = element_.closest(".accordion-col");
						var topContainer = mainContainer.parent();
						var masterTopContainer = mainContainer.closest(".menu-accordion-double-block, .menu-accordion-block");
						var all_Itens = topContainer.find('input[type="button"][value="+"]');
						if (all_Itens.length === 0) {
							all_Itens = topContainer.find('input[type="button"][ value="+"]');
						}
						var allContainer = masterTopContainer.find(".accordion-col");
						position = all_Itens.index(item);
						positionContainer = allContainer.index(mainContainer);
					}
				}

				if (positionContainer === undefined || position === undefined || positionContainer < 0 || position < 0) {
					return;
				}

				var acc_title = props.attributes.title.map(function(arr) { return [...arr]; });
				if (!acc_title[positionContainer]) {
					acc_title[positionContainer] = [];
				}
				var acc_position_title = [...acc_title[positionContainer]];
				acc_position_title.splice(position + 1, 0, "");
				acc_title[positionContainer] = acc_position_title;

				var acc_description = props.attributes.description.map(function(arr) { return [...arr]; });
				if (!acc_description[positionContainer]) {
					acc_description[positionContainer] = [];
				}
				var acc_position_description = [...acc_description[positionContainer]];
				acc_position_description.splice(position + 1, 0, "");
				acc_description[positionContainer] = acc_position_description;

				props.setAttributes({
					title: acc_title,
					description: acc_description
				});
			}

			function removelinkdata(event, optCol, optIdx) {
				var positionContainer = optCol;
				var position = optIdx;
				var canRemove = true;

				if (positionContainer === undefined || position === undefined) {
					if ($ && event && event.target) {
						var element_ = $(event.target);
						var item = element_;
						var mainContainer = element_.closest(".accordion-col");
						var topContainer = mainContainer.parent();
						var masterTopContainer = mainContainer.closest(".menu-accordion-double-block, .menu-accordion-block");
						var all_Itens = topContainer.find('input[type="button"][value="-"]');
						if (all_Itens.length === 0) {
							all_Itens = topContainer.find('input[type="button"][ value="-"]');
						}
						if (all_Itens.length > 1) {
							var allContainer = masterTopContainer.find(".accordion-col");
							position = all_Itens.index(item);
							positionContainer = allContainer.index(mainContainer);
						} else {
							canRemove = false;
						}
					}
				} else {
					if (!props.attributes.title[positionContainer] || props.attributes.title[positionContainer].length <= 1) {
						canRemove = false;
					}
				}

				if (canRemove && positionContainer !== undefined && position !== undefined && positionContainer >= 0 && position >= 0) {
					var acc_title = props.attributes.title.map(function(arr) { return [...arr]; });
					var acc_position_title = [...(acc_title[positionContainer] || [])];
					acc_position_title.splice(position, 1);
					acc_title[positionContainer] = acc_position_title;

					var acc_description = props.attributes.description.map(function(arr) { return [...arr]; });
					var acc_position_description = [...(acc_description[positionContainer] || [])];
					acc_position_description.splice(position, 1);
					acc_description[positionContainer] = acc_position_description;

					props.setAttributes({
						title: acc_title,
						description: acc_description
					});
				}
			}

			var titlesAttr = (props.attributes.title && props.attributes.title.length > 0) ? props.attributes.title : defaultTitle;
			var descAttr = (props.attributes.description && props.attributes.description.length > 0) ? props.attributes.description : defaultDesc;
			var timenumberAttr = (props.attributes.timenumber && props.attributes.timenumber.length > 0) ? props.attributes.timenumber : ["0_left", "0_right"];

			var sizecols = 2;
			var cols_edit = [];

			for (var index_col = 0; index_col < sizecols; index_col++) {
				var timenumber = (timenumberAttr && timenumberAttr[index_col]) ? timenumberAttr[index_col] : (uniqueId + (index_col === 0 ? "_left" : "_right"));
				var lines_editor = [];
				var idAccordionSection = "accordionSection_" + timenumber + "_" + index_col;
				var selectorIdAccordionSection = "#accordionSection_" + timenumber + "_" + index_col;
				var colTitles = titlesAttr[index_col] || ["", ""];
				var colDescs = descAttr[index_col] || ["", ""];
				var sizelines = Math.round((colDescs.length + colTitles.length) / 2);

				for (var index = 0; index < sizelines; index++) {
					(function(colI, itemI) {
						var itemCollapseId = "collapse_" + timenumber + "_" + colI + "_" + itemI;

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
													collapseEl.classList.toggle("show");
												}
											}
										}
									},
										el('input', {
											type: "text",
											value: (colTitles[itemI] !== undefined) ? colTitles[itemI] : "",
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
									"data-bs-parent": selectorIdAccordionSection
								},
									el('div', { className: "accordion-body bg-0 color-1" },
										el(
											RichText, {
												tagName: 'div',
												multiline: true,
												onChange: function(newdata) { updateDescription(newdata, colI, itemI); },
												value: (colDescs[itemI] !== undefined) ? colDescs[itemI] : "",
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
					})(index_col, index);
				}

				cols_edit.push(
					el('div', { className: ((index_col === 0) ? "w-50 ps-0 pe-2 col-12 col-md-6" : "w-50 ps-2 pe-0 col-12 col-md-6"), key: "col_" + index_col },
						el('div', {
								className: 'accordion w-100 accordion-col',
								id: idAccordionSection
							},
							lines_editor
						)
					)
				);
			}

			return el('div', { className: 'row menu-accordion-block menu-accordion-double-block w-100 d-flex m-0' },
				cols_edit
			);
		},

		save: function(props) {
			var titlesAttr = (props.attributes.title && props.attributes.title.length > 0) ? props.attributes.title : [["", ""], ["", ""]];
			var descAttr = (props.attributes.description && props.attributes.description.length > 0) ? props.attributes.description : [["", ""], ["", ""]];
			var timenumberAttr = (props.attributes.timenumber && props.attributes.timenumber.length > 0) ? props.attributes.timenumber : ["0_left", "0_right"];

			var sizecols = 2;
			var cols_save = [];

			for (var index_col = 0; index_col < sizecols; index_col++) {
				var lines_save = [];
				var timenumber = timenumberAttr[index_col] || (index_col === 0 ? "0_left" : "0_right");
				var idAccordionSection = "accordionSection_" + timenumber + "_" + index_col;
				var selectorIdAccordionSection = "#accordionSection_" + timenumber + "_" + index_col;
				var colTitles = titlesAttr[index_col] || ["", ""];
				var colDescs = descAttr[index_col] || ["", ""];
				var sizelines = Math.round((colDescs.length + colTitles.length) / 2);

				for (var index = 0; index < sizelines; index++) {
					var descContent = (colDescs[index] !== undefined) ? colDescs[index] : "";
					var renderedBody;
					if (typeof window !== 'undefined' && typeof window.HTMLReactParser === 'function') {
						renderedBody = window.HTMLReactParser(descContent);
					} else {
						renderedBody = el(wp.element.RawHTML, null, descContent);
					}

					var itemCollapseId = "collapse_" + timenumber + "_" + index_col + "_" + index;

					lines_save.push(
						el('div', { className: "accordion-item accordion-flush bg-3", key: "save_item_" + index_col + "_" + index },
							el('h2', { className: "accordion-header accordion text-uppercase" },
								el('button', {
									type: "button",
									className: "accordion-button collapsed bg-3 color-1",
									"data-bs-toggle": "collapse",
									"data-bs-target": "#" + itemCollapseId,
									"aria-controls": itemCollapseId,
									"aria-expanded": "false"
								},
									(colTitles[index] !== undefined) ? colTitles[index] : ""
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

				cols_save.push(
					el('div', { className: "w-50 col-12 col-md-6" + ((index_col === 0) ? " ps-0 pe-2" : " ps-2 pe-0"), key: "save_col_" + index_col },
						el('div', {
								className: 'accordion w-100 accordion-col',
								id: idAccordionSection
							},
							lines_save
						)
					)
				);
			}

			return el('div', { className: 'row menu-accordion-block menu-accordion-double-block w-100 d-flex m-0' },
				cols_save
			);
		}
	};

	// Register double column block
	wp.blocks.registerBlockType('luiz0067/accordion-double', blockConfigDouble);

})(window.wp, window.jQuery);
