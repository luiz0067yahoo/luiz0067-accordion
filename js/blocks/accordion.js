(function(wp) {
	'use strict';

	if (!wp || !wp.blocks || !wp.blocks.registerBlockType || !wp.element) {
		return;
	}

	var el = wp.element.createElement;
	var Fragment = wp.element.Fragment;
	var useState = wp.element.useState;
	var useEffect = wp.element.useEffect;

	var blockEditor = wp.blockEditor || wp.editor;
	var RichText = blockEditor.RichText;
	var InspectorControls = blockEditor.InspectorControls;

	var components = wp.components || {};
	var PanelBody = components.PanelBody;
	var ToggleControl = components.ToggleControl;
	var SelectControl = components.SelectControl;
	var TextControl = components.TextControl;
	var Button = components.Button;
	var Tooltip = components.Tooltip;
	var ColorPalette = components.ColorPalette;

	var i18n = window.luiz0067_accordion_i18n || {};
	function __(key, fallback) {
		return (i18n && i18n[key]) ? i18n[key] : (fallback || key);
	}

	function getRandomId(prefix) {
		return (prefix || 'accordion') + '-' + Math.floor(Math.random() * 89999 + 10000);
	}

	var accordionIcon = el('svg', {
		width: 24,
		height: 24,
		viewBox: '0 0 24 24',
		fill: 'none',
		stroke: 'currentColor',
		strokeWidth: 2,
		strokeLinecap: 'round',
		strokeLinejoin: 'round'
	},
		el('rect', { x: 3, y: 3, width: 18, height: 18, rx: 2 }),
		el('line', { x1: 3, y1: 9, x2: 21, y2: 9 }),
		el('line', { x1: 3, y1: 15, x2: 21, y2: 15 }),
		el('polyline', { points: '16 6 18 7.5 16 9' }),
		el('polyline', { points: '16 12 18 13.5 16 15' })
	);

	wp.blocks.registerBlockType('luiz0067/accordion', {
		title: __('block_title', 'luiz0067 Bootstrap Accordion'),
		description: __('block_description', 'Crie acordeões e seções recolhíveis (FAQ, sanfona) responsivas com Bootstrap 5 no WordPress.'),
		icon: accordionIcon,
		category: 'design',
		keywords: ['accordion', 'acordeon', 'bootstrap', 'faq', 'collapse'],
		supports: {
			html: false,
			anchor: true,
			align: ['wide', 'full']
		},
		attributes: {
			accordionId: {
				type: 'string',
				default: ''
			},
			isFlush: {
				type: 'boolean',
				default: false
			},
			alwaysOpen: {
				type: 'boolean',
				default: false
			},
			headerTag: {
				type: 'string',
				default: 'h2'
			},
			activeBgColor: {
				type: 'string',
				default: ''
			},
			activeTextColor: {
				type: 'string',
				default: ''
			},
			items: {
				type: 'array',
				default: [
					{
						id: 'item-1',
						title: __('example_item_1_title', 'Primeiro Item do Acordeão'),
						content: __('example_item_1_desc', '<p>Este é o conteúdo do primeiro item do acordeão. Você pode adicionar qualquer texto formatado, listas e links aqui.</p>'),
						isOpen: true
					},
					{
						id: 'item-2',
						title: __('example_item_2_title', 'Segundo Item do Acordeão'),
						content: __('example_item_2_desc', '<p>Conteúdo do segundo item do acordeão. Totalmente compatível com Bootstrap 5 e qualquer tema.</p>'),
						isOpen: false
					},
					{
						id: 'item-3',
						title: __('example_item_3_title', 'Terceiro Item do Acordeão'),
						content: __('example_item_3_desc', '<p>Conteúdo do terceiro item com animação suave e acessibilidade completa.</p>'),
						isOpen: false
					}
				]
			}
		},
		example: {
			attributes: {
				accordionId: 'accordion-preview',
				isFlush: false,
				alwaysOpen: false,
				headerTag: 'h2',
				items: [
					{
						id: 'item-1',
						title: 'O que é o luiz0067 Bootstrap Accordion?',
						content: '<p>Um bloco Gutenberg completo para WordPress que cria acordeões responsivos utilizando as classes e JavaScript nativos do Bootstrap 5.</p>',
						isOpen: true
					},
					{
						id: 'item-2',
						title: 'É compatível com qualquer tema?',
						content: '<p>Sim! Os assets do Bootstrap 5 e estilos complementares são carregados de forma segura e autônoma pelo plugin.</p>',
						isOpen: false
					}
				]
			}
		},

		edit: function(props) {
			var attributes = props.attributes;
			var setAttributes = props.setAttributes;
			var accordionId = attributes.accordionId;
			var isFlush = attributes.isFlush;
			var alwaysOpen = attributes.alwaysOpen;
			var headerTag = attributes.headerTag || 'h2';
			var activeBgColor = attributes.activeBgColor;
			var activeTextColor = attributes.activeTextColor;
			var items = attributes.items || [];

			// Estado local para controle de abertura/recolhimento no modo de edição
			var openStates = useState(function() {
				var initial = {};
				items.forEach(function(item, idx) {
					initial[item.id || ('item-' + idx)] = !!item.isOpen;
				});
				return initial;
			});
			var openMap = openStates[0];
			var setOpenMap = openStates[1];

			// Garantir ID único ao inicializar o bloco
			useEffect(function() {
				if (!accordionId) {
					setAttributes({ accordionId: getRandomId('luiz0067-accordion') });
				}
			}, []);

			function toggleItem(itemId) {
				setOpenMap(function(prev) {
					var next = {};
					if (alwaysOpen) {
						// No modo alwaysOpen, mantém os outros e inverte o clicado
						for (var k in prev) {
							next[k] = prev[k];
						}
						next[itemId] = !prev[itemId];
					} else {
						// No modo padrão, abre o clicado e fecha os demais
						var willOpen = !prev[itemId];
						for (var k2 in prev) {
							next[k2] = false;
						}
						next[itemId] = willOpen;
					}
					return next;
				});

				// Sincronizar o estado isOpen no primeiro item ou estado salvo
				var updatedItems = items.map(function(it) {
					var itId = it.id || '';
					if (alwaysOpen) {
						if (itId === itemId) {
							return Object.assign({}, it, { isOpen: !it.isOpen });
						}
						return it;
					} else {
						return Object.assign({}, it, { isOpen: itId === itemId ? !it.isOpen : false });
					}
				});
				setAttributes({ items: updatedItems });
			}

			function updateItemTitle(index, newTitle) {
				var nextItems = items.slice();
				nextItems[index] = Object.assign({}, nextItems[index], { title: newTitle });
				setAttributes({ items: nextItems });
			}

			function updateItemContent(index, newContent) {
				var nextItems = items.slice();
				nextItems[index] = Object.assign({}, nextItems[index], { content: newContent });
				setAttributes({ items: nextItems });
			}

			function addItem() {
				var newId = 'item-' + (items.length + 1) + '-' + Math.floor(Math.random() * 1000);
				var newItem = {
					id: newId,
					title: __('title_placeholder', 'Novo Item do Acordeão'),
					content: '<p>' + __('content_placeholder', 'Digite aqui o conteúdo do item...') + '</p>',
					isOpen: true
				};
				var nextItems = items.concat([newItem]);
				setAttributes({ items: nextItems });

				setOpenMap(function(prev) {
					var next = {};
					if (!alwaysOpen) {
						for (var k in prev) { next[k] = false; }
					} else {
						for (var k2 in prev) { next[k2] = prev[k2]; }
					}
					next[newId] = true;
					return next;
				});
			}

			function duplicateItem(index) {
				var src = items[index];
				var newId = 'item-' + (items.length + 1) + '-' + Math.floor(Math.random() * 1000);
				var newItem = {
					id: newId,
					title: (src.title || '') + ' (Cópia)',
					content: src.content || '',
					isOpen: true
				};
				var nextItems = items.slice();
				nextItems.splice(index + 1, 0, newItem);
				setAttributes({ items: nextItems });

				setOpenMap(function(prev) {
					var next = {};
					for (var k in prev) { next[k] = prev[k]; }
					next[newId] = true;
					return next;
				});
			}

			function moveItem(index, direction) {
				var newIndex = index + direction;
				if (newIndex < 0 || newIndex >= items.length) {
					return;
				}
				var nextItems = items.slice();
				var temp = nextItems[index];
				nextItems[index] = nextItems[newIndex];
				nextItems[newIndex] = temp;
				setAttributes({ items: nextItems });
			}

			function deleteItem(index) {
				if (items.length <= 1) {
					return;
				}
				var nextItems = items.filter(function(_, idx) {
					return idx !== index;
				});
				setAttributes({ items: nextItems });
			}

			var customCssVars = {};
			if (activeBgColor) {
				customCssVars['--bs-accordion-active-bg'] = activeBgColor;
			}
			if (activeTextColor) {
				customCssVars['--bs-accordion-active-color'] = activeTextColor;
				customCssVars['--bs-accordion-btn-focus-box-shadow'] = '0 0 0 0.25rem ' + activeBgColor + '40';
			}

			var colorPaletteOptions = [
				{ name: 'Bootstrap Primary', color: '#0d6efd' },
				{ name: 'Bootstrap Success', color: '#198754' },
				{ name: 'Bootstrap Danger', color: '#dc3545' },
				{ name: 'Bootstrap Warning', color: '#ffc107' },
				{ name: 'Bootstrap Info', color: '#0dcaf0' },
				{ name: 'Bootstrap Dark', color: '#212529' },
				{ name: 'Bootstrap Subtle Blue', color: '#e7f1ff' },
				{ name: 'Bootstrap Subtle Gray', color: '#f8f9fa' }
			];

			return el(
				Fragment,
				null,
				el(
					InspectorControls,
					null,
					el(
						PanelBody,
						{
							title: __('inspector_accordion_settings', 'Configurações do Acordeão'),
							initialOpen: true
						},
						el(TextControl, {
							label: 'ID do Acordeão (HTML id)',
							value: accordionId,
							onChange: function(val) { setAttributes({ accordionId: val }); },
							help: 'Identificador único HTML para os seletores de colapso.'
						}),
						el(ToggleControl, {
							label: __('inspector_flush_label', 'Estilo Flush (accordion-flush)'),
							checked: !!isFlush,
							onChange: function(val) { setAttributes({ isFlush: val }); },
							help: __('inspector_flush_help', 'Remove as bordas externas e cantos arredondados para alinhamento limpo.')
						}),
						el(ToggleControl, {
							label: __('inspector_always_open_label', 'Sempre Aberto (Always Open)'),
							checked: !!alwaysOpen,
							onChange: function(val) { setAttributes({ alwaysOpen: val }); },
							help: __('inspector_always_open_help', 'Permite que múltiplos itens fiquem abertos ao mesmo tempo sem fechar os outros.')
						}),
						el(SelectControl, {
							label: __('inspector_header_tag_label', 'Tag do Cabeçalho (SEO)'),
							value: headerTag,
							options: [
								{ label: 'H2 (Padrão)', value: 'h2' },
								{ label: 'H3', value: 'h3' },
								{ label: 'H4', value: 'h4' },
								{ label: 'H5', value: 'h5' },
								{ label: 'H6', value: 'h6' },
								{ label: 'DIV', value: 'div' }
							],
							onChange: function(val) { setAttributes({ headerTag: val }); },
							help: __('inspector_header_tag_help', 'Tag HTML semântica para os títulos do acordeão.')
						})
					),
					el(
						PanelBody,
						{
							title: __('inspector_style_settings', 'Cores e Estilos Personalizados'),
							initialOpen: false
						},
						el('p', { style: { marginBottom: 8, fontWeight: 600 } }, __('inspector_active_bg_label', 'Fundo do Cabeçalho Ativo')),
						el(ColorPalette, {
							colors: colorPaletteOptions,
							value: activeBgColor,
							onChange: function(color) { setAttributes({ activeBgColor: color || '' }); }
						}),
						el('p', { style: { marginTop: 16, marginBottom: 8, fontWeight: 600 } }, __('inspector_active_color_label', 'Texto do Cabeçalho Ativo')),
						el(ColorPalette, {
							colors: colorPaletteOptions,
							value: activeTextColor,
							onChange: function(color) { setAttributes({ activeTextColor: color || '' }); }
						})
					)
				),
				el(
					'div',
					{
						className: 'luiz0067-accordion-editor-container',
						style: customCssVars
					},
					el(
						'div',
						{
							className: 'accordion' + (isFlush ? ' accordion-flush' : ''),
							id: accordionId || 'accordion-editor'
						},
						items.map(function(item, index) {
							var itemId = item.id || ('item-' + index);
							var isItemOpen = openMap[itemId] !== undefined ? openMap[itemId] : !!item.isOpen;

							return el(
								'div',
								{
									className: 'accordion-item' + (isItemOpen ? ' is-open' : ''),
									key: itemId
								},
								el(
									'div',
									{ className: 'accordion-header-editor-wrapper' },
									el(
										headerTag,
										{ className: 'accordion-header m-0 p-0' },
										el(
											'div',
											{
												className: 'accordion-button' + (isItemOpen ? '' : ' collapsed'),
												style: {
													backgroundColor: isItemOpen && activeBgColor ? activeBgColor : undefined,
													color: isItemOpen && activeTextColor ? activeTextColor : undefined,
													display: 'flex',
													alignItems: 'center',
													justifyContent: 'space-between',
													gap: '12px',
													cursor: 'default'
												}
											},
											el(
												'div',
												{
													style: {
														display: 'flex',
														alignItems: 'center',
														gap: '10px',
														flexGrow: 1
													}
												},
												el(
													'span',
													{
														className: 'badge bg-secondary',
														style: { fontSize: '0.75rem', padding: '4px 7px' }
													},
													__('item_badge_prefix', 'Item') + ' ' + (index + 1)
												),
												el(RichText, {
													tagName: 'span',
													value: item.title,
													allowedFormats: ['core/bold', 'core/italic'],
													placeholder: __('title_placeholder', 'Título do item do acordeão...'),
													onChange: function(val) { updateItemTitle(index, val); },
													style: { flexGrow: 1, fontWeight: 600 }
												})
											),
											el(
												'div',
												{
													className: 'accordion-item-actions',
													style: {
														display: 'flex',
														alignItems: 'center',
														gap: '4px'
													}
												},
												el(
													Tooltip,
													{ text: isItemOpen ? __('status_closed', 'Recolher') : __('status_open', 'Expandir') },
													el(Button, {
														icon: isItemOpen ? 'arrow-up-alt2' : 'arrow-down-alt2',
														size: 'small',
														isTertiary: true,
														onClick: function(e) {
															e.stopPropagation();
															toggleItem(itemId);
														},
														'aria-label': __('btn_toggle_item', 'Alternar item')
													})
												),
												el(
													Tooltip,
													{ text: __('btn_move_up', 'Mover para Cima') },
													el(Button, {
														icon: 'arrow-up',
														size: 'small',
														isTertiary: true,
														disabled: index === 0,
														onClick: function(e) {
															e.stopPropagation();
															moveItem(index, -1);
														},
														'aria-label': __('btn_move_up', 'Mover para Cima')
													})
												),
												el(
													Tooltip,
													{ text: __('btn_move_down', 'Mover para Baixo') },
													el(Button, {
														icon: 'arrow-down',
														size: 'small',
														isTertiary: true,
														disabled: index === items.length - 1,
														onClick: function(e) {
															e.stopPropagation();
															moveItem(index, 1);
														},
														'aria-label': __('btn_move_down', 'Mover para Baixo')
													})
												),
												el(
													Tooltip,
													{ text: __('btn_duplicate_item', 'Duplicar Item') },
													el(Button, {
														icon: 'admin-page',
														size: 'small',
														isTertiary: true,
														onClick: function(e) {
															e.stopPropagation();
															duplicateItem(index);
														},
														'aria-label': __('btn_duplicate_item', 'Duplicar Item')
													})
												),
												items.length > 1 ? el(
													Tooltip,
													{ text: __('btn_delete_item', 'Excluir Item') },
													el(Button, {
														icon: 'trash',
														size: 'small',
														isDestructive: true,
														isTertiary: true,
														onClick: function(e) {
															e.stopPropagation();
															deleteItem(index);
														},
														'aria-label': __('btn_delete_item', 'Excluir Item')
													})
												) : null
											)
										)
									)
								),
								isItemOpen ? el(
									'div',
									{
										className: 'accordion-collapse collapse show',
										style: { display: 'block' }
									},
									el(
										'div',
										{ className: 'accordion-body' },
										el(RichText, {
											tagName: 'div',
											multiline: 'p',
											value: item.content,
											placeholder: __('content_placeholder', 'Digite aqui o conteúdo do item...'),
											onChange: function(val) { updateItemContent(index, val); }
										})
									)
								) : null
							);
						})
					),
					el(
						'div',
						{
							className: 'luiz0067-accordion-add-bar',
							style: { marginTop: '16px', textAlign: 'center' }
						},
						el(Button, {
							variant: 'primary',
							icon: 'plus-alt2',
							onClick: addItem,
							style: {
								borderRadius: '6px',
								padding: '8px 18px',
								display: 'inline-flex',
								alignItems: 'center',
								gap: '6px'
							}
						}, __('btn_add_item', 'Adicionar Novo Item'))
					)
				)
			);
		},

		save: function(props) {
			var attributes = props.attributes;
			var accordionId = attributes.accordionId || 'accordion-' + Math.floor(Math.random() * 90000 + 10000);
			var isFlush = attributes.isFlush;
			var alwaysOpen = attributes.alwaysOpen;
			var headerTag = attributes.headerTag || 'h2';
			var activeBgColor = attributes.activeBgColor;
			var activeTextColor = attributes.activeTextColor;
			var items = attributes.items || [];

			var customCssVars = {};
			if (activeBgColor) {
				customCssVars['--bs-accordion-active-bg'] = activeBgColor;
			}
			if (activeTextColor) {
				customCssVars['--bs-accordion-active-color'] = activeTextColor;
				customCssVars['--bs-accordion-btn-focus-box-shadow'] = '0 0 0 0.25rem ' + activeBgColor + '40';
			}

			return el(
				'div',
				{
					className: 'luiz0067-accordion-wrapper' + (activeBgColor || activeTextColor ? ' has-custom-colors' : ''),
					style: Object.keys(customCssVars).length > 0 ? customCssVars : undefined
				},
				el(
					'div',
					{
						className: 'accordion' + (isFlush ? ' accordion-flush' : ''),
						id: accordionId
					},
					items.map(function(item, index) {
						var itemKey = item.id || ('item-' + index);
						var headingId = accordionId + '-heading-' + (index + 1);
						var collapseId = accordionId + '-collapse-' + (index + 1);
						var isItemOpen = !!item.isOpen;
						var parentAttr = alwaysOpen ? null : ('#' + accordionId);

						return el(
							'div',
							{
								className: 'accordion-item',
								key: itemKey
							},
							el(
								headerTag,
								{
									className: 'accordion-header',
									id: headingId
								},
								el(
									'button',
									{
										className: 'accordion-button' + (isItemOpen ? '' : ' collapsed'),
										type: 'button',
										'data-bs-toggle': 'collapse',
										'data-bs-target': '#' + collapseId,
										'aria-expanded': isItemOpen ? 'true' : 'false',
										'aria-controls': collapseId
									},
									el(RichText.Content, {
										tagName: 'span',
										value: item.title
									})
								)
							),
							el(
								'div',
								{
									id: collapseId,
									className: 'accordion-collapse collapse' + (isItemOpen ? ' show' : ''),
									'aria-labelledby': headingId,
									'data-bs-parent': parentAttr
								},
								el(
									'div',
									{ className: 'accordion-body' },
									el(RichText.Content, {
										tagName: 'div',
										value: item.content
									})
								)
							)
						);
					})
				)
			);
		}
	});
})(window.wp);
