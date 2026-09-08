=== luiz0067 Bootstrap Accordion ===
Contributors: luiz0067yahoo
Donate link: https://github.com/luiz0067yahoo/luiz0067-acordion
Tags: accordion, bootstrap, faq, collapsible, gutenberg, block
Requires at least: 6.0
Tested up to: 6.6
Stable tag: 1.0.0
Requires PHP: 7.4
License: GPLv2 or later
License URI: https://www.gnu.org/licenses/gpl-2.0.html

WordPress Gutenberg block for creating responsive Bootstrap 5 Accordions, FAQs and collapsible panels.

== Description ==

**luiz0067 Bootstrap Accordion** is a modern and intuitive WordPress plugin that adds a native Gutenberg block for creating and managing responsive accordions using Bootstrap 5.3.

### Features
* **100% WYSIWYG Visual Editing**: Real-time preview inside Gutenberg matches frontend appearance.
* **Native Bootstrap 5.3**: Uses standard Bootstrap `.accordion`, `.accordion-item`, `.accordion-button` and collapse functionality.
* **Flush Accordion Option**: Edge-to-edge styling without outer borders (`accordion-flush`).
* **Always Open Mode**: Keep multiple accordion panels open at the same time by omitting `data-bs-parent`.
* **Flexible Heading Hierarchy**: Select your desired semantic tag (H2, H3, H4, H5, H6, DIV) for SEO and accessibility.
* **Easy Item Management**: Add, duplicate, reorder (move up/down) and delete items in seconds.
* **Multilingual (i18n)**: Out of the box support for Português (Brasil), English and Español, with settings page in WordPress admin.
* **Zero External Dependencies**: Bundles Bootstrap 5.3 and Font Awesome 6 locally.

== Installation ==

1. Upload the plugin folder to the `/wp-content/plugins/` directory, or install the ZIP file via WordPress Plugins screen.
2. Activate the plugin through the 'Plugins' menu in WordPress.
3. Open any Page or Post in the block editor (Gutenberg).
4. Search for **"luiz0067 Bootstrap Accordion"** or **"Accordion"** in the block inserter.
5. Customize titles, contents, and options in the inspector sidebar, then publish!

== Frequently Asked Questions ==

= Does this plugin require Bootstrap in my theme? =
No. The plugin includes local, minified Bootstrap 5.3 CSS and JS bundle, ensuring it works in any theme out of the box.

= Does it support Block Themes (Full Site Editing)? =
Yes! It supports `enqueue_block_assets` and `add_editor_style` for full compatibility with both classic themes and FSE block themes.

== Changelog ==

= 1.0.0 =
* Initial release of luiz0067 Bootstrap Accordion block.
