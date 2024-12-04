<?php
function handle_orcid_proxy_request(WP_REST_Request $request) {
    $orcid_id = $request->get_param('orcid_id');
    if (!$orcid_id) {
        return new WP_Error('missing_orcid_id', 'Missing ORCID ID', array('status' => 400));
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
    register_rest_route('custom/v1', '/orcid-proxy', array(
        'methods' => 'GET',
        'callback' => 'handle_orcid_proxy_request',
    ));
});
