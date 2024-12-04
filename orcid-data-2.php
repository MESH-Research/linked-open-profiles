<?php
/**
 * Plugin Name:       ORCID Data 2
 * Description:       Enables embedding public profile data from multiple ORCID profiles
 * Requires at least: 6.6
 * Requires PHP:      7.2
 * Version:           0.1.0
 * Author:            Grant Eben
 * License:           GPL-2.0-or-later
 * License URI:       https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain:       orcid-data-2
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
function create_block_orcid_data_2_block_init() {
	register_block_type( __DIR__ . '/build' );
}
add_action( 'init', 'create_block_orcid_data_2_block_init' );
