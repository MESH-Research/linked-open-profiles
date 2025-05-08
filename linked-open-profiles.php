<?php
/**
 * Plugin Name:       Linked Open Profiles
 * Plugin URI:        https://github.com/MESH-Research/linked-open-profiles
 * Description:       Display public profile data from multiple ORCID profiles
 * Requires at least: 6.6.2
 * Requires PHP:      7.0
 * Version:           0.3.12
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
require_once plugin_dir_path(__FILE__) . 'orcid-api.php';

/**
 * Registers the block using the metadata loaded from the `block.json` file.
 * Behind the scenes, it registers also all assets so they can be enqueued
 * through the block editor in the corresponding context.
 *
 * @see https://developer.wordpress.org/reference/functions/register_block_type/
 */

function mesh_research_linked_open_profiles_block_init() {
    wp_register_script(
        'linked-open-profiles-script',
        plugins_url( 'build/index.js', __FILE__ ),
        array( 'wp-blocks', 'wp-element', 'wp-editor', 'wp-i18n' ),
        filemtime( plugin_dir_path( __FILE__ ) . 'build/index.js' ),
        array( 'in_footer' => false )
    );
    register_block_type( __DIR__ . '/build' );
}
add_action( 'init', 'mesh_research_linked_open_profiles_block_init' );

function mesh_research_linked_open_profiles_set_script_translations() {
    wp_set_script_translations(
        'mesh-research-linked-open-profiles-editor-script',
        'linked-open-profiles',
        plugin_dir_path( __FILE__ ) . 'languages'
    );
    wp_set_script_translations(
        'mesh-research-linked-open-profiles-view-script',
        'linked-open-profiles',
        plugin_dir_path( __FILE__ ) . 'languages'
    );
}
add_action( 'init', 'mesh_research_linked_open_profiles_set_script_translations' );
