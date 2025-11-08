<?php
if ( ! defined( 'ABSPATH' ) ) {
    exit; // Exit if accessed directly.
}
function mesh_research_linked_open_profiles_handle_orcid_proxy_request(WP_REST_Request $request) 
{
    $orcid_id = sanitize_title_with_dashes($request->get_param('orcidId'), '', 'save');
    if (!isset($orcid_id) || empty($orcid_id)) {
        return new WP_Error('missing_orcid_id', 'Missing ORCID ID', array('status' => 400));
    }

    if (!mesh_research_linked_open_profiles_validate_orcid_id($orcid_id)) {
        return new WP_Error('invalid_orcid_id', 'Invalid ORCID ID', array('status' => 400));
    }

    $response = wp_remote_get("https://orcid.org/{$orcid_id}", array(
        'headers' => array(
            'Accept' => 'application/json',
        ),
    ));
    if (is_wp_error($response)) {
        return new WP_Error('request_failed', 'Failed to fetch data from ORCID', array('status' => 500));
    }

    $body = wp_remote_retrieve_body($response);
    return rest_ensure_response(json_decode($body));
}
add_action('rest_api_init', function () {
    register_rest_route('mesh_research_linked_open_profiles/v1', '/orcid-proxy', array(
        'methods' => 'GET',
        'callback' => 'mesh_research_linked_open_profiles_handle_orcid_proxy_request',
        'permission_callback' => '__return_true',
    ));
});

/**
 * Validate an ORCID iD
 *
 * @param string $value
 * @return bool
 */
function mesh_research_linked_open_profiles_validate_orcid_id($value) 
{
    $correct_length = false;
    $number_only = false;

    // Must be an expected length
    if (strlen($value) === 19 || strlen($value) === 16) {
        $correct_length = true;
    }
    // Must be a number which may end with the character 'X'
    // Further reading: <https://support.orcid.org/hc/en-us/articles/360053289173-Why-does-my-ORCID-iD-have-an-X>
    if (preg_match('/^[0-9]{15}[0-9X]$/i', str_replace('-', '', $value))) {
        $number_only = true;
    }

    return $number_only && $correct_length;
}