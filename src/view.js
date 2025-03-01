/**
 * Use this file for JavaScript code that you want to run in the front-end
 * on posts/pages that contain this block.
 *
 * When this file is defined as the value of the `viewScript` property
 * in `block.json` it will be enqueued on the front end of the site.
 *
 * Example:
 *
 * ```js
 * {
 *   "viewScript": "file:./view.js"
 * }
 * ```
 *
 * If you're not making any changes to this file because your project doesn't need any
 * JavaScript running in the front-end, then you should delete this file and remove
 * the `viewScript` property from `block.json`.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-metadata/#view-script
 */

/**
 * Retrieves the translation of text.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-i18n/
 */
import { __ } from "@wordpress/i18n";
import { useEffect, useState, createRoot } from "@wordpress/element";

/**
 * React hook that is used to mark the block wrapper element.
 * It provides all the necessary props like the class name.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-block-editor/#useblockprops
 */
import { useBlockProps } from "@wordpress/block-editor";

/**
 * Lets webpack process CSS, SASS or SCSS files referenced in JavaScript files.
 * Those files can contain any CSS code that gets applied to the editor.
 *
 * @see https://www.npmjs.com/package/@wordpress/scripts#using-css
 */
import "./editor.scss";

import {
    __experimentalHeading as Heading,
    __experimentalItemGroup as ItemGroup,
    __experimentalItem as Item,
} from "@wordpress/components";
import {
    isSectionShown,
    hasNoItems,
    excludedItems,
} from "./sharedfunctions.js";
import LoadingSpinner from "./components/LoadingSpinner.js";

import { sections } from "./sections";
import { getProcessedData } from "./processdata";

/**
 * The edit function describes the structure of your block in the context of the
 * editor. This represents what the editor will render when the block is used.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-edit-save/#edit
 *
 * @return {Element} Element to render.
 */
function OrcidDataBlock2({ attributes }) {
    const { orcid_id, starting_heading_level, verified_orcid_id } = attributes;
    const [items, setItems] = useState({});
    const [dataFetched, setDataFetched] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (orcid_id && verified_orcid_id) {
            fetchData();
        }
    }, [orcid_id, verified_orcid_id]);

    async function fetchData() {
        try {
            setDataFetched(false);
            const response = await fetch(
                `/wp-json/custom/v1/orcid-proxy?orcid_id=${orcid_id}`,
            );
            if (!response.ok) {
                throw new Error("Network response was not ok");
            }
            const result = await response.json();
            setItems(getProcessedData(result));
            setDataFetched(true);
        } catch (error) {
            console.error("Error fetching data:", error);
        } finally {
            setLoading(false);
        }
    }

    return (
        <div {...useBlockProps()}>
            {!verified_orcid_id && !dataFetched && !loading ? (
                <p
                    style={{
                        padding: "2rem",
                        border: "1px solid #ddd",
                    }}
                    role="alert"
                >
                    {__("Please provide an ORCID iD", "mesh-research")}
                </p>
            ) : (
                <>
                    {!loading ? (
                        Object.keys(sections).map(
                            (section) =>
                                isSectionShown(section, sections, attributes) &&
                                !hasNoItems(section, items) && (
                                    <section
                                        style={{ marginBottom: "2rem" }}
                                        className={`odb2-section odb2-section-${section}`}
                                        key={section}
                                    >
                                        <Heading level={starting_heading_level}>
                                            {sections[section].term}
                                        </Heading>
                                        {sections[section].id === "bio" &&
                                            sections[section].model(
                                                items[section][0],
                                            )}
                                        {sections[section].id !== "bio" && (
                                            <ItemGroup>
                                                {items[section].map(
                                                    (item) =>
                                                        excludedItems(
                                                            section,
                                                            sections,
                                                            attributes,
                                                        )[item.path] !==
                                                            false && (
                                                            <Item
                                                                key={item.path}
                                                            >
                                                                {sections[
                                                                    section
                                                                ].model(item)}
                                                            </Item>
                                                        ),
                                                )}
                                            </ItemGroup>
                                        )}
                                    </section>
                                ),
                        )
                    ) : (
                        <LoadingSpinner />
                    )}
                </>
            )}
        </div>
    );
}
window.addEventListener("DOMContentLoaded", () => {
    const blocks = document.querySelectorAll(".orcid-data-block-2");
    blocks.forEach((block) => {
        const root = createRoot(block);
        const attributes = JSON.parse(block.getAttribute("data-attributes"));
        root.render(<OrcidDataBlock2 attributes={attributes} />);
    });
});
