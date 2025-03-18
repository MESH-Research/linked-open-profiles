<?php
/**
 * Plugin Name:       Linked Open Profiles
 * Plugin URI:        https://github.com/MESH-Research/linked-open-profiles
 * Description:       Display public profile data from multiple ORCID profiles
 * Requires at least: 6.7
 * Requires PHP:      7.2
 * Version:           0.3.0
 * Author:            ebengran
 * License:           GPL-2.0-or-later
 * License URI:       https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain:       linked-open-profiles
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
        'linked-open-profiles-script',
        plugins_url( 'build/index.js', __FILE__ ),
        array( 'wp-blocks', 'wp-element', 'wp-editor', 'wp-i18n' ),
        filemtime( plugin_dir_path( __FILE__ ) . 'build/index.js' ),
        array( 'in_footer' => false )
    );
    wp_set_script_translations( 'linked-open-profiles-script', 'linked-open-profiles', plugin_dir_path( __FILE__ ) . 'languages' );
	register_block_type( __DIR__ . '/build' );
}
add_action( 'init', 'create_block_orcid_data_block_2_block_init' );
