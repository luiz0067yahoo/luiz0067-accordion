<?php
/**
 * Gutenberg Block Assets Registration
 *
 * @package Luiz0067_Accordion
 */

// Exit if accessed directly.
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Get the active language code for the plugin
 *
 * @return string Language code (pt-br, en, es)
 */
function luiz0067_accordion_get_current_language() {
	$saved_lang = get_option( 'luiz0067_accordion_language', 'auto' );
	if ( 'auto' !== $saved_lang && in_array( $saved_lang, array( 'pt-br', 'en', 'es' ), true ) ) {
		return $saved_lang;
	}

	$locale = function_exists( 'get_user_locale' ) ? get_user_locale() : get_locale();
	$locale = strtolower( str_replace( '_', '-', $locale ) );

	if ( strpos( $locale, 'pt' ) === 0 ) {
		return 'pt-br';
	} elseif ( strpos( $locale, 'es' ) === 0 ) {
		return 'es';
	}
	return 'en';
}

/**
 * Register block type and editor script
 */
function luiz0067_accordion_register_block() {
	$main_file    = dirname( dirname( __FILE__ ) ) . '/luiz0067-accordion.php';
	$accordion_js = dirname( dirname( __FILE__ ) ) . '/js/blocks/accordion.js';

	if ( file_exists( $accordion_js ) ) {
		wp_register_script(
			'luiz0067-accordion-block-editor',
			plugins_url( 'js/blocks/accordion.js', $main_file ),
			array( 'wp-blocks', 'wp-element', 'wp-block-editor', 'wp-editor', 'wp-components', 'wp-i18n' ),
			filemtime( $accordion_js ),
			true
		);

		$lang      = luiz0067_accordion_get_current_language();
		$i18n_file = dirname( dirname( __FILE__ ) ) . '/languages/' . $lang . '.json';
		if ( ! file_exists( $i18n_file ) ) {
			$i18n_file = dirname( dirname( __FILE__ ) ) . '/languages/pt-br.json';
		}
		$i18n_data = array();
		if ( file_exists( $i18n_file ) ) {
			$json_content = file_get_contents( $i18n_file );
			$decoded      = json_decode( $json_content, true );
			if ( is_array( $decoded ) ) {
				$i18n_data = $decoded;
			}
		}
		wp_localize_script( 'luiz0067-accordion-block-editor', 'luiz0067_accordion_i18n', $i18n_data );
	}

	register_block_type( 'luiz0067/accordion', array(
		'editor_script' => 'luiz0067-accordion-block-editor',
		'style'         => 'luiz0067-accordion-style',
	) );
}
add_action( 'init', 'luiz0067_accordion_register_block' );
