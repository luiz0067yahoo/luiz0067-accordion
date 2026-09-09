=== luiz0067 Bootstrap Accordion ===
Contributors: luiz0067yahoo
Donate link: https://github.com/luiz0067yahoo/luiz0067-accordion
Tags: accordion, menu, bootstrap, collapsible, gutenberg
Requires at least: 6.0
Tested up to: 7.1
Stable tag: 1.0.0
Requires PHP: 7.4
License: GPLv2 or later
License URI: https://www.gnu.org/licenses/gpl-2.0.html

WordPress Gutenberg blocks for creating responsive Bootstrap 5 Retractable Menus (Menu Retrátil, Menu Retrátil Duplo, and Menu Retrátil Triplo).

== Description ==

**luiz0067 Bootstrap Accordion** is a modern and intuitive WordPress plugin that adds native Gutenberg blocks for creating and managing responsive collapsible menus (1 column, 2 columns, and 3 columns) using Bootstrap 5.3.

### Features
* **Three Dedicated Menu Types**:
  * **Menu Retrátil**: Single-column full width collapsible menu.
  * **Menu Retrátil Duplo**: Two-column side-by-side collapsible menu.
  * **Menu Retrátil Triplo**: Three-column responsive grid collapsible menu.
* **100% WYSIWYG Visual Editing**: Real-time preview inside Gutenberg matches frontend appearance.
* **Native Bootstrap 5.3**: Uses standard Bootstrap `.accordion`, `.accordion-item`, `.accordion-button` and collapse functionality.
* **Isolated Block Instances**: Unique IDs for each item preventing any conflicts across blocks in the same post.
* **Easy Item Management**: Add and remove items dynamically per column.
* **Multilingual (i18n)**: Support for Português (Brasil), English and Español.
* **Zero External Dependencies**: Bundles Bootstrap 5.3 and Font Awesome 6 locally.

== Installation ==

1. Upload the plugin folder to the `/wp-content/plugins/` directory, or install the ZIP file via WordPress Plugins screen.
2. Activate the plugin through the 'Plugins' menu in WordPress.
3. Open any Page or Post in the block editor (Gutenberg).
4. Search for **"Menu Retrátil"** in the block inserter.
5. Add items, customize titles and contents, then publish!

== Frequently Asked Questions ==

= Does this plugin require Bootstrap in my theme? =
No. The plugin includes local, minified Bootstrap 5.3 CSS and JS bundle, ensuring it works in any theme out of the box.

= Does it support multiple menus on the same page? =
Yes! Every block generates unique instance IDs, ensuring that opening an item in one menu will never trigger or interfere with another menu on the same page.

== Changelog ==

= 1.0.0 =
* Initial release with Single, Double, and Triple Retractable Menu blocks.
