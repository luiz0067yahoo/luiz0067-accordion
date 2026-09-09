<?php
/**
 * Plugin Name:       luiz0067 Accordion
 * Plugin URI:        https://github.com/luiz0067yahoo/luiz0067-accordion
 * Description:       WordPress Gutenberg Block for responsive Bootstrap 5 Accordions, FAQs and collapsible panels, compatible with any theme.
 * Version:           1.0.0
 * Requires at least: 6.0
 * Tested up to:      7.1
 * Requires PHP:      7.4
 * Author:            Luiz Fernando Brogliatto Ferreira
 * License:           GPL-2.0-or-later
 * License URI:       https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain:       luiz0067-accordion
 *
 * @package           Luiz0067_Accordion
 */

// Exit if accessed directly.
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Enqueue styles and scripts for block frontend and editor canvas
 */
function luiz0067_accordion_enqueue_block_assets() { 
	// Bootstrap 5 CSS (local)
	wp_enqueue_style( 'luiz0067-accordion-bootstrap', plugin_dir_url( __FILE__ ) . 'assets/bootstrap/css/bootstrap.min.css', array(), '5.3.8' );
	
	// Font Awesome (local)
	wp_enqueue_style( 'luiz0067-accordion-fontawesome', plugin_dir_url( __FILE__ ) . 'assets/fontawesome/css/all.min.css', array(), '6.5.2' );
	
	// Custom Plugin Styles
	wp_enqueue_style( 'luiz0067-accordion-style', plugin_dir_url( __FILE__ ) . 'style.css', array( 'luiz0067-accordion-bootstrap' ), filemtime( plugin_dir_path( __FILE__ ) . 'style.css' ) );

	// Bootstrap 5 JS Bundle (includes Popper, local)
	wp_enqueue_script( 'luiz0067-accordion-bootstrap-bundle', plugin_dir_url( __FILE__ ) . 'assets/bootstrap/js/bootstrap.bundle.min.js', array(), '5.3.8', true );

	// Frontend helper script for robust click and chevron rotation handling
	$frontend_js = plugin_dir_path( __FILE__ ) . 'js/frontend-accordion.js';
	if ( file_exists( $frontend_js ) ) {
		wp_enqueue_script( 'luiz0067-accordion-frontend', plugin_dir_url( __FILE__ ) . 'js/frontend-accordion.js', array( 'luiz0067-accordion-bootstrap-bundle' ), filemtime( $frontend_js ), true );
	}
}
// Enqueue on frontend and inside Gutenberg canvas iframe
add_action( 'enqueue_block_assets', 'luiz0067_accordion_enqueue_block_assets' );

/**
 * Register editor styles support for block themes / iframed Gutenberg canvas
 */
function luiz0067_accordion_add_editor_styles() {
	add_theme_support( 'editor-styles' );
	add_editor_style( 'assets/bootstrap/css/bootstrap.min.css' );
	add_editor_style( 'assets/fontawesome/css/all.min.css' );
	add_editor_style( 'style.css' );
}
add_action( 'after_setup_theme', 'luiz0067_accordion_add_editor_styles' );

require_once plugin_dir_path( __FILE__ ) . 'plugin/settings.php';
require_once plugin_dir_path( __FILE__ ) . 'plugin/blocks.php';
