<?php
/**
 * Plugin Name:       ORCID Data Block 2
 * Description:       Display public profile data from multiple ORCID profiles
 * Requires at least: 6.6
 * Requires PHP:      7.2
 * Version:           0.2.1
 * Author:            ebengran
 * License:           GPL-2.0-or-later
 * License URI:       https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain:       orcid-data-block-2
 *
 * @package CreateBlock
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly.
}

// Include the custom API file
require_once plugin_dir_path(__FILE__) . 'orcid_api.php';

/**
 * Registers the block using the metadata loaded from the `block.json` file.
 * Behind the scenes, it registers also all assets so they can be enqueued
 * through the block editor in the corresponding context.
 *
 * @see https://developer.wordpress.org/reference/functions/register_block_type/
 */

 function create_block_orcid_data_block_2_block_init() {
    wp_register_script(
        'orcid-data-block-2-script',
        plugins_url( 'build/index.js', __FILE__ ),
        array( 'wp-blocks', 'wp-element', 'wp-editor', 'wp-i18n' ),
        filemtime( plugin_dir_path( __FILE__ ) . 'build/index.js' )
    );
    wp_set_script_translations( 'orcid-data-block-2-script', 'orcid-data-block-2', plugin_dir_path( __FILE__ ) . 'languages' );
	register_block_type( __DIR__ . '/build' );
}
add_action( 'init', 'create_block_orcid_data_block_2_block_init' );
