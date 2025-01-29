import { __ } from "@wordpress/i18n";
import { sections } from "./../sections";
import {
    isSectionShown,
    hasNoItems,
    excludedItems,
    canExclude,
} from "./../sharedfunctions.js";
import { InspectorControls } from "@wordpress/block-editor";
import { BlockControls, HeadingLevelDropdown } from "@wordpress/block-editor";
import {
    Button,
    CheckboxControl,
    Disabled,
    DropdownMenu,
    Panel,
    PanelBody,
    TextControl,
    __experimentalNumberControl as NumberControl,
} from "@wordpress/components";
import LoadingSpinner from "./LoadingSpinner.js";

function toggleSection(section, value, setAttributes) {
    setAttributes({ [`${sections[section].id}_show`]: value });
}

function modifyExcludedItems(
    section,
    sections,
    item,
    attributes,
    setAttributes,
    value,
) {
    let excluded = { ...excludedItems(section, sections, attributes) };
    excluded[item.path] = value;
    setAttributes({ [`${sections[section].id}_excluded`]: excluded });
}

function getItemCheckboxes(section, items, attributes, setAttributes) {
    if (!items[section]) {
        return <></>;
    }
    return items[section].map((item) => (
        <CheckboxControl
            __nextHasNoMarginBottom={true}
            checked={
                excludedItems(section, sections, attributes)[item.path] !==
                false
            }
            className="odb-medium-margin-top"
            label={item.display_label}
            onChange={(value) => {
                modifyExcludedItems(
                    section,
                    sections,
                    item,
                    attributes,
                    setAttributes,
                    value,
                );
            }}
        />
    ));
}

function getSectionTitle(section, sections, items) {
    if (!section || items[section] === undefined) {
        return "";
    }
    if (sections[section].term === "Biography") {
        return __(sections[section].term, "orcid-data-block-2");
    }
    return __(
        `${sections[section].term} (${items[section].length})`,
        "orcid-data-block-2",
    );
}

function getSectionControls(
    section,
    sections,
    items,
    attributes,
    setAttributes,
) {
    const show = isSectionShown(section, sections, attributes);
    let sectionControls = (
        <div style={{ opacity: hasNoItems(section, items) ? 0.5 : 1 }}>
            <CheckboxControl
                __nextHasNoMarginBottom={true}
                checked={show}
                className="odb-medium-margin-top"
                label={__(
                    `Include ${sections[section].term}`,
                    "orcid-data-block-2",
                )}
                onChange={(value) => {
                    toggleSection(section, value, setAttributes);
                }}
            />
            {show &&
                canExclude(section, sections) &&
                !hasNoItems(section, items) && (
                    <PanelBody
                        initialOpen={false}
                        title={__("Customize Items", "orcid-data-block-2")}
                    >
                        {getItemCheckboxes(
                            section,
                            items,
                            attributes,
                            setAttributes,
                        )}
                    </PanelBody>
                )}
        </div>
    );
    if (hasNoItems(section, items)) {
        sectionControls = <Disabled>{sectionControls}</Disabled>;
    }
    return sectionControls;
}

const HeadingLevelToolbar = ({ starting_heading_level, setAttributes }) => (
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

const DataBlockInspectorControls = ({
    orcid_id,
    invalidId,
    setInvalidId,
    buttonHandler,
    loading,
    attributes,
    setAttributes,
    items,
    starting_heading_level,
}) => {
    return (
        <InspectorControls>
            <Panel>
                <PanelBody>
                    <TextControl
                        __nextHasNoMarginBottom={true}
                        className="odb-small-margin-bottom"
                        label={__("ORCID iD", "orcid-data-block-2")}
                        value={orcid_id}
                        onChange={(value) => {
                            setInvalidId(false);
                            setAttributes({ orcid_id: value });
                        }}
                    />
                    <Button
                        variant="primary"
                        onClick={() => buttonHandler()}
                        text={__("Set", "orcid-data-block-2")}
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
                                    {__(
                                        "Please provide a valid ORCID iD.",
                                        "orcid-data-block-2",
                                    )}
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
                    <HeadingLevelToolbar
                        starting_heading_level={starting_heading_level}
                        setAttributes={setAttributes}
                    />
                    <Panel header={__("Sections", "orcid-data-block-2")}>
                        {Object.keys(sections).map(function (section) {
                            return (
                                <PanelBody
                                    initialOpen={false}
                                    icon={
                                        !isSectionShown(
                                            section,
                                            sections,
                                            attributes,
                                        )
                                            ? "hidden"
                                            : ""
                                    }
                                    title={getSectionTitle(
                                        section,
                                        sections,
                                        items,
                                    )}
                                >
                                    {hasNoItems(section, items) && (
                                        <p>No items detected.</p>
                                    )}
                                    {getSectionControls(
                                        section,
                                        sections,
                                        items,
                                        attributes,
                                        setAttributes,
                                    )}
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
                                        "orcid-data-block-2",
                                    )}
                                    value={starting_heading_level}
                                    onChange={(value) => {
                                        setAttributes({ starting_heading_level: value });
                                    }}
                                />
                                <Button
                                    variant="primary"
                                    onClick={() => buttonHandler()}
                                    text={__("Set", "orcid-data-block-2")}
                                />
                            </PanelBody>
                        </Panel>
*/}
                </>
            )}
        </InspectorControls>
    );
};

export default DataBlockInspectorControls;
