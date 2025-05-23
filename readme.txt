=== Linked Open Profiles ===
Contributors: ebengran
Tags: block, widget, orcid
Requires at least: 6.6.2
Tested up to: 6.8.1
Requires PHP: 7.0
Stable tag: 0.3.14
License: GPLv2 or later
License URI: https://www.gnu.org/licenses/gpl-2.0.html

Display public data from multiple ORCID profiles on pages, posts, and sites.

== Description ==

This is a WordPress plugin for displaying public data from multiple ORCID records on pages, posts, and sites. It's a successor to [ORCID Data Block][orcid_data_block].

This plugin is developed and maintained by [Mesh Research Lab][mesh].

This work is funded by the [ORCID Global Participation Fund][awardees].

[orcid_data_block]: <https://github.com/MESH-Research/orcid-data-block>
[mesh]: <https://meshresearch.commons.msu.edu>
[awardees]: <https://info.orcid.org/global-participation-fund-announces-fourth-round-of-awardees/>

= Features =

* Provides a Gutenberg block in the WordPress block editor that allows users to
    * specify which sections are shown from specified ORCID records
    * specify which items are shown within sections
* Allows different ORCID records to be used in multiple blocks on the same post/page/site
* Info will remain automatically up-to-date with ORCID
* All languages currently supported by ORCID will be supported (in progress)
    * Translated
        * Arabic
        * Chinese (Simplified)
        * Chinese (Traditional)
        * Czech
        * French
        * German
        * Italian
        * Japanese
        * Korean
        * Polish
        * Portuguese
        * Russian
        * Spanish
    * Pending Translation
        * Turkish
* Accessible to those with disabilities

== Screenshots ==

1. Screenshot of the plugin in use in a Gutenberg editor, featuring the Biography and Education sections excluded, the Employment section partially included, and the Works section fully included
2. Screenshot of the plugin in use in a Gutenberg editor with the language set to Arabic
3. Screenshot of the plugin in use in a Gutenberg editor with the language set to Spanish
4. Screenshot of the plugin in use in a Gutenberg editor with the language set to Japanese
5. Screenshot of the plugin on a published post with the Feelin'Good theme activated, demonstrating the minimalistic design of the plugin respects and preserves the theme's styling

== Usage ==

1. Make sure the plugin is activated on your WordPress installation.
    * This can be done on the Plugins screen.
2. In a Gutenberg block editor, add a new block.
    * There are [multiple ways][adding_blocks] to add blocks.
3. Search "Linked Open Profiles" in the block browser and select it.
4. With the new block selected, provide an ORCID iD in the ORCID iD text input.
    * This text input can be found in the sidebar (also known as the inspector controls).
    * An ORCID iD [can be found][finding_ids] on a user's ORCID record page.
5. Click the "Apply" button.
6. Make customizations as you see fit.
    * Customize which sections are shown.
    * Customize which items within sections are shown.
7. Save as a draft or publish.

[adding_blocks]: [https://wordpress.org/documentation/article/adding*a*new*block/]
[finding_ids]: [https://support.orcid.org/hc/en*us/articles/360042767454*I*don*t*know*my*ORCID*ID]

== Functionality ==

This WordPress plugin uses the third party public REST API on <https://orcid.org> to query publicly available information for any ORCID record hosted on <https://orcid.org> and display this on a WordPress page, post, or site. Only publicly available data is retrieved from ORCID. You may provide multiple, different ORCID iDs for use with multiple, different blocks of this plugin within a Gutenberg editor. Registration and authentication with ORCID are not necessary to do this. The only necessity is to provide a [valid 16-digit ORCID iD][orcid_ids].

=== Disclosure of Data Sent ===

* **What:** ORCID iDs users provide
* **Where:** <https://orcid.org>
* **Why:** to query the public data of an ORCID record users wish to use with this plugin
* **Under What Circumstances:**
    * whenever a user provides an ORCID iD to a block instance of this plugin
    * whenever a post, page, or site that includes a block instance of this plugin is loaded

User-provided ORCID iDs are sent to the public third party REST API on <https://orcid.org>. This plugin uses the REST API located at `https://orcid.org/####-####-####-####`. It is necessary to provide an ORCID iD to identify an ORCID record you wish to use when displaying ORCID record information on a WordPress post, page, or site.

[orcid_ids]: <https://support.orcid.org/hc/en-us/articles/360006897674-Structure-of-the-ORCID-Identifier>

* [ORCID Privacy Policy](https://info.orcid.org/privacy-policy/)
* [ORCID Terms of Use](https://info.orcid.org/terms-of-use/)

== Support ==

Send an email for general support: <mesh@msu.edu>

Submit tech issues on GitHub:
<https://github.com/MESH-Research/linked-open-profiles/issues>

== Development ==

To contribute to the development of this plugin, visit the GitHub repository:
<https://github.com/MESH-Research/linked-open-profiles>

== Changelog ==

Refer to the Releases page on this plugin's GitHub repository:
<https://github.com/MESH-Research/linked-open-profiles/releases>

