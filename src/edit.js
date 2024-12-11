/**
 * Retrieves the translation of text.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-i18n/
 */
import { __ } from "@wordpress/i18n";
import { useEffect, useState } from "@wordpress/element";

/**
 * React hook that is used to mark the block wrapper element.
 * It provides all the necessary props like the class name.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-block-editor/#useblockprops
 */
import { InspectorControls, useBlockProps } from "@wordpress/block-editor";

/**
 * Lets webpack process CSS, SASS or SCSS files referenced in JavaScript files.
 * Those files can contain any CSS code that gets applied to the editor.
 *
 * @see https://www.npmjs.com/package/@wordpress/scripts#using-css
 */
import "./editor.scss";

import {
    Button,
    CheckboxControl,
    Disabled,
    DropdownMenu,
    Panel,
    PanelBody,
    TextControl,
    __experimentalHeading as Heading,
    __experimentalItemGroup as ItemGroup,
    __experimentalItem as Item,
    __experimentalNumberControl as NumberControl,
} from "@wordpress/components";

import { sections, verifyOrcidId } from "./sections";
import { getProcessedData } from "./processdata";
import { BlockControls, HeadingLevelDropdown } from "@wordpress/block-editor";
import LoadingSpinner from "./components/LoadingSpinner.js";

/**
 * The edit function describes the structure of your block in the context of the
 * editor. This represents what the editor will render when the block is used.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-edit-save/#edit
 *
 * @return {Element} Element to render.
 */
export default function Edit({ attributes, setAttributes }) {
    const { orcid_id, starting_heading_level, verified_orcid_id } = attributes;
    const [items, setItems] = useState({});
    const [invalidId, setInvalidId] = useState(false);
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

    function buttonHandler() {
        const verification = verifyOrcidId(orcid_id);
        setAttributes({ verified_orcid_id: verification });
        if (!verification) {
            setInvalidId(true);
        } else {
            setLoading(true);
            setInvalidId(false);
        }
    }

    const HeadingLevelToolbar = () => (
        <BlockControls group="block">
            <HeadingLevelDropdown
                options={[2, 3, 4, 5, 6]}
                value={starting_heading_level}
                onChange={(newTag) =>
                    setAttributes({ starting_heading_level: newTag })
                }
            />
        </BlockControls>
    );

    const MyDropdownMenu = () => (
        <DropdownMenu
            icon={more}
            label="Select a direction"
            controls={[
                {
                    title: "H2",
                    icon: () => (
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            width="24"
                            height="24"
                            aria-hidden="true"
                            focusable="false"
                        >
                            <path d="M9 11.1H5v-4H3v10h2v-4h4v4h2v-10H9v4zm8 4c.5-.4.6-.6 1.1-1.1.4-.4.8-.8 1.2-1.3.3-.4.6-.8.9-1.3.2-.4.3-.8.3-1.3 0-.4-.1-.9-.3-1.3-.2-.4-.4-.7-.8-1-.3-.3-.7-.5-1.2-.6-.5-.2-1-.2-1.5-.2-.4 0-.7 0-1.1.1-.3.1-.7.2-1 .3-.3.1-.6.3-.9.5-.3.2-.6.4-.8.7l1.2 1.2c.3-.3.6-.5 1-.7.4-.2.7-.3 1.2-.3s.9.1 1.3.4c.3.3.5.7.5 1.1 0 .4-.1.8-.4 1.1-.3.5-.6.9-1 1.2-.4.4-1 .9-1.6 1.4-.6.5-1.4 1.1-2.2 1.6v1.5h8v-2H17z"></path>
                        </svg>
                    ),
                    onClick: () => console.log("up"),
                },
            ]}
        />
    );

    function isSectionShown(section) {
        return attributes[`${sections[section].id}_show`];
    }

    function toggleSection(section, value) {
        setAttributes({ [`${sections[section].id}_show`]: value });
    }

    function hasNoItems(section) {
        if (!items[section]) {
            return true;
        }
        return items[section].length == 0;
    }

    function canExclude(section) {
        return sections[section].can_exclude;
    }

    function excludedItems(section) {
        let i = [];
        if (canExclude(section)) {
            i = attributes[`${sections[section].id}_excluded`] || {};
        }
        return i;
    }

    function getSectionTitle(section) {
        if (!section || items[section] === undefined) {
            return "";
        }
        return __(
            `${sections[section].term} (${items[section].length})`,
            "orcid-data-2",
        );
    }

    function modifyExcludedItems(section, item, value) {
        let excluded = { ...excludedItems(section) };
        excluded[item.path] = value;
        setAttributes({ [`${sections[section].id}_excluded`]: excluded });
    }

    function getItemCheckboxes(section) {
        if (!items[section]) {
            return <></>;
        }
        return items[section].map((item) => (
            <CheckboxControl
                __nextHasNoMarginBottom={true}
                checked={excludedItems(section)[item.path] !== false}
                className="odb-medium-margin-top"
                label={item.display_label}
                onChange={(value) => {
                    modifyExcludedItems(section, item, value);
                }}
            />
        ));
    }

    function getSectionControls(section) {
        const show = isSectionShown(section);
        let sectionControls = (
            <div style={{ opacity: hasNoItems(section) ? 0.5 : 1 }}>
                <CheckboxControl
                    __nextHasNoMarginBottom={true}
                    checked={show}
                    className="odb-medium-margin-top"
                    label={__(
                        `Include ${sections[section].term}`,
                        "orcid-data-2",
                    )}
                    onChange={(value) => {
                        toggleSection(section, value);
                    }}
                />
                {show && canExclude(section) && !hasNoItems(section) && (
                    <PanelBody initialOpen={false} title="Customize Items">
                        {getItemCheckboxes(section)}
                    </PanelBody>
                )}
            </div>
        );
        if (hasNoItems(section)) {
            sectionControls = <Disabled>{sectionControls}</Disabled>;
        }
        return sectionControls;
    }

    return (
        <>
            <InspectorControls>
                <Panel>
                    <PanelBody>
                        <TextControl
                            __nextHasNoMarginBottom={true}
                            className="odb-small-margin-bottom"
                            label={__("ORCID iD", "orcid-data-2")}
                            value={orcid_id}
                            onChange={(value) => {
                                setInvalidId(false);
                                setAttributes({ orcid_id: value });
                            }}
                        />
                        <Button
                            variant="primary"
                            onClick={() => buttonHandler()}
                            text="Set"
                        />
                        <div role="alert" aria-atomic="true">
                            {invalidId && (
                                <p style={{ marginTop: "16px" }}>
                                    <i
                                        style={{
                                            backgroundColor: "red",
                                            display: "inline-block",
                                            height: "20px",
                                            textAlign: "center",
                                            width: "20px",
                                            fontStyle: "normal",
                                        }}
                                        role="presentation"
                                    >
                                        ❕
                                    </i>{" "}
                                    <span>
                                        Please provide a valid ORCID iD.
                                    </span>
                                </p>
                            )}
                        </div>
                    </PanelBody>
                </Panel>
                {loading ? (
                    <PanelBody>
                        <LoadingSpinner />
                    </PanelBody>
                ) : (
                    <>
                        <HeadingLevelToolbar />
                        <Panel header="Sections">
                            {Object.keys(sections).map(function (section) {
                                return (
                                    <PanelBody
                                        initialOpen={false}
                                        icon={
                                            !isSectionShown(section)
                                                ? "hidden"
                                                : ""
                                        }
                                        title={getSectionTitle(section)}
                                    >
                                        {hasNoItems(section) && (
                                            <p>No items detected.</p>
                                        )}
                                        {getSectionControls(section)}
                                    </PanelBody>
                                );
                            })}
                        </Panel>
                        {/*
                        <Panel header="Headings">
                            <PanelBody>
                                <NumberControl
                                    className="odb-small-margin-bottom"
                                    isShiftStepEnabled={true}
                                    shiftStep={1}
                                    min={2}
                                    max={6}
                                    label={__(
                                        "Starting Heading Level",
                                        "orcid-data-2",
                                    )}
                                    value={starting_heading_level}
                                    onChange={(value) => {
                                        setAttributes({ starting_heading_level: value });
                                    }}
                                />
                                <Button
                                    variant="primary"
                                    onClick={() => buttonHandler()}
                                    text="Set"
                                />
                            </PanelBody>
                        </Panel>
*/}
                    </>
                )}
            </InspectorControls>

            <div {...useBlockProps()}>
                {!verified_orcid_id && !dataFetched && !loading ? (
                    <p
                        style={{
                            padding: "2rem",
                            border: "1px solid #ddd",
                        }}
                        role="alert"
                    >
                        Please provide your ORCID iD
                    </p>
                ) : (
                    <>
                        {!loading ? (
                            Object.keys(sections).map(
                                (section) =>
                                    isSectionShown(section) &&
                                    !hasNoItems(section) && (
                                        <section
                                            style={{ marginBottom: "2rem" }}
                                            key={section}
                                        >
                                            <Heading
                                                level={starting_heading_level}
                                            >
                                                {sections[section].term}
                                            </Heading>
                                            <ItemGroup>
                                                {items[section].map(
                                                    (item) =>
                                                        excludedItems(section)[
                                                            item.path
                                                        ] !== false && (
                                                            <Item
                                                                key={item.path}
                                                            >
                                                                {
                                                                    item.display_label
                                                                }
                                                            </Item>
                                                        ),
                                                )}
                                            </ItemGroup>
                                        </section>
                                    ),
                            )
                        ) : (
                            <LoadingSpinner />
                        )}
                    </>
                )}
            </div>
        </>
    );
}
