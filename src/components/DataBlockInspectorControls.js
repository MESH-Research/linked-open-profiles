import { __ } from '@wordpress/i18n';
import { sections } from './../sections';
import {
	canExclude,
	excludedItems,
	hasNoItems,
	isHeadingShown,
	areSectionItemsLimited,
	isSectionShown,
	isSubSectionShown,
} from './../sharedfunctions.js';
import {
	BlockControls,
	HeadingLevelDropdown,
	InspectorControls,
} from '@wordpress/block-editor';
import {
	Button,
	CheckboxControl,
	Disabled,
	Panel,
	PanelBody,
	Snackbar,
	TextControl,
	__experimentalNumberControl as NumberControl,
} from '@wordpress/components';
import LoadingSpinner from './LoadingSpinner.js';

function toggleSection( section, value, setAttributes ) {
	setAttributes( { [ `${ section }_show` ]: value } );
}
function toggleSubSection( section, subsection, value, setAttributes ) {
	setAttributes( { [ `${ section }_${ subsection }_show` ]: value } );
}
function toggleLimitItems( section, value, setAttributes ) {
	setAttributes( { [ `${ section }_limit_items` ]: value } );
}
function setLimitItemsCount( section, value, setAttributes ) {
	setAttributes( { [ `${ section }_limit_items_count` ]: value } );
}
function toggleVisibleOrcidId( value, setAttributes ) {
	setAttributes( { visibleOrcidId: value } );
}
function toggleAllSections( value, setAttributes, items ) {
	setAttributes( { all_sections_toggle: value } );
	Object.keys( sections ).map( ( section ) => {
		if ( ! hasNoItems( section, items ) ) {
			setAttributes( { [ `${ section }_show` ]: value } );
		}
		return false;
	} );
}

function modifyExcludedItems(
	section,
	item,
	attributes,
	setAttributes,
	value
) {
	const excluded = { ...excludedItems( section, attributes ) };
	excluded[ item.path ] = value;
	setAttributes( { [ `${ section }_excluded` ]: excluded } );
}

function getItemCheckboxes( section, items, attributes, setAttributes ) {
	if ( ! items[ section ] ) {
		return <></>;
	}
	return items[ section ].map( ( item ) => (
		<CheckboxControl
			key={ item.path }
			__nextHasNoMarginBottom={ true }
			checked={
				excludedItems( section, attributes )[ item.path ] !== false
			}
			className="odb-medium-margin-top"
			label={ item.display_label }
			onChange={ ( value ) => {
				modifyExcludedItems(
					section,
					item,
					attributes,
					setAttributes,
					value
				);
			} }
		/>
	) );
}

function getSectionDashicon( section, items, attributes ) {
	if (
		! isSectionShown( section, attributes ) ||
		hasNoItems( section, items )
	) {
		return 'hidden';
	}
	return 'saved';
}

function getSectionTitle( section, items ) {
	if ( ! section || items[ section ] === undefined ) {
		return '';
	}
	if ( sections[ section ].term === 'Biography' ) {
		return sections[ section ].term;
	}
	return `${ sections[ section ].term } (${ items[ section ].length })`;
}

function toggleSectionHeading( section, value, setAttributes ) {
	setAttributes( { [ `${ section }_heading_show` ]: value } );
}

function getSectionControls( section, items, attributes, setAttributes ) {
	const show = isSectionShown( section, attributes );
	let sectionControls = (
		<div style={ { opacity: hasNoItems( section, items ) ? 0.5 : 1 } }>
			<CheckboxControl
				__nextHasNoMarginBottom={ true }
				checked={ show }
				className="odb-medium-margin-top"
				label={ sections[ section ].include }
				onChange={ ( value ) => {
					toggleSection( section, value, setAttributes );
				} }
			/>
			{ show && (
				<CheckboxControl
					__nextHasNoMarginBottom={ true }
					checked={ isHeadingShown( section, attributes ) }
					label={ __( 'Include Heading', 'linked-open-profiles' ) }
					onChange={ ( value ) => {
						toggleSectionHeading( section, value, setAttributes );
					} }
				/>
			) }
			{ show && ! isHeadingShown( section, attributes ) && (
				<Snackbar>
					<p>
						{ __(
							'Excluding this heading could make your content misleading and less accessible.',
							'linked-open-profiles'
						) }
					</p>
				</Snackbar>
			) }
			{ section === 'bio' && attributes.bio_show && (
				<PanelBody
					initialOpen={ false }
					title={ __( 'Customize Items', 'linked-open-profiles' ) }
				>
					{ sections.bio.subsections.map( function ( subsection ) {
						return (
							<>
								<CheckboxControl
									__nextHasNoMarginBottom={ true }
									checked={ isSubSectionShown(
										subsection.id,
										section,
										attributes
									) }
									className="odb-medium-margin-top"
									label={ subsection.label }
									onChange={ ( value ) => {
										toggleSubSection(
											section,
											subsection.id,
											value,
											setAttributes
										);
									} }
								/>
							</>
						);
					} ) }
				</PanelBody>
			) }
			{ show &&
				canExclude( section ) &&
				! hasNoItems( section, items ) && (
					<div>
						<CheckboxControl
							__nextHasNoMarginBottom={ true }
							checked={ areSectionItemsLimited(
								section,
								attributes
							) }
							className="odb-medium-margin-top"
							label={ __(
								'Limit Items',
								'linked-open-profiles'
							) }
							onChange={ ( value ) => {
								toggleLimitItems(
									section,
									value,
									setAttributes
								);
							} }
						/>
						{ areSectionItemsLimited( section, attributes ) && (
							<NumberControl
								label={ __(
									'Items to Show',
									'linked-open-profiles'
								) }
								min={ 1 }
								__next40pxDefaultSize
								isShiftStepEnabled={ false }
								onChange={ ( value ) => {
									setLimitItemsCount(
										section,
										value,
										setAttributes
									);
								} }
								shiftStep={ 1 }
								value={
									attributes[
										`${ section }_limit_items_count`
									]
								}
							/>
						) }
						<PanelBody
							initialOpen={ false }
							title={ __(
								'Customize Items',
								'linked-open-profiles'
							) }
						>
							{ getItemCheckboxes(
								section,
								items,
								attributes,
								setAttributes
							) }
						</PanelBody>
					</div>
				) }
		</div>
	);
	if ( hasNoItems( section, items ) ) {
		sectionControls = <Disabled>{ sectionControls }</Disabled>;
	}
	return sectionControls;
}

const HeadingLevelToolbar = ( { startingHeadingLevel, setAttributes } ) => (
	<BlockControls group="block">
		<HeadingLevelDropdown
			options={ [ 2, 3, 4, 5, 6 ] }
			value={ startingHeadingLevel }
			onChange={ ( newTag ) =>
				setAttributes( { startingHeadingLevel: newTag } )
			}
		/>
	</BlockControls>
);

const DataBlockInspectorControls = ( {
	orcidId,
	invalidId,
	setInvalidId,
	buttonHandler,
	loading,
	attributes,
	setAttributes,
	items,
	startingHeadingLevel,
} ) => {
	return (
		<InspectorControls>
			<Panel>
				<PanelBody>
					<TextControl
						__nextHasNoMarginBottom={ true }
						className="odb-small-margin-bottom"
						__next40pxDefaultSize="true"
						label={ __( 'ORCID iD', 'linked-open-profiles' ) }
						value={ orcidId }
						onChange={ ( value ) => {
							setInvalidId( false );
							setAttributes( { orcidId: value.toUpperCase() } );
						} }
					/>
					<Button
						variant="primary"
						onClick={ () => buttonHandler() }
						text={ __( 'Apply', 'linked-open-profiles' ) }
					/>
					<div role="alert" aria-atomic="true">
						{ invalidId && (
							<p style={ { marginTop: '16px' } }>
								<i
									style={ {
										backgroundColor: 'red',
										display: 'inline-block',
										height: '20px',
										textAlign: 'center',
										width: '20px',
										fontStyle: 'normal',
									} }
									role="presentation"
								>
									❕
								</i>{ ' ' }
								<span>
									{ __(
										'Please provide a valid ORCID iD.',
										'linked-open-profiles'
									) }
								</span>
							</p>
						) }
					</div>
				</PanelBody>
			</Panel>
			{ loading ? (
				<PanelBody>
					<LoadingSpinner />
				</PanelBody>
			) : (
				<>
					<HeadingLevelToolbar
						startingHeadingLevel={ startingHeadingLevel }
						setAttributes={ setAttributes }
					/>

					<Panel>
						<PanelBody>
							<CheckboxControl
								checked={ attributes.visibleOrcidId }
								className="odb-medium-margin-top"
								__nextHasNoMarginBottom={ true }
								label={ __(
									'Include ORCID iD link',
									'linked-open-profiles'
								) }
								onChange={ ( value ) => {
									toggleVisibleOrcidId(
										value,
										setAttributes
									);
								} }
							/>
						</PanelBody>
					</Panel>
					<Panel header={ __( 'Sections', 'linked-open-profiles' ) }>
						<PanelBody>
							<CheckboxControl
								checked={ attributes.all_sections_toggle }
								className="odb-medium-margin-top"
								__nextHasNoMarginBottom={ true }
								label={ __(
									'Toggle All Sections',
									'linked-open-profiles'
								) }
								onChange={ ( value ) => {
									toggleAllSections(
										value,
										setAttributes,
										items
									);
								} }
							/>
						</PanelBody>
						{ Object.keys( sections ).map( function ( section ) {
							return (
								<PanelBody
									key={ section.id }
									initialOpen={ false }
									icon={ getSectionDashicon(
										section,
										items,
										attributes
									) }
									title={ getSectionTitle( section, items ) }
								>
									{ hasNoItems( section, items ) && (
										<p>
											{ __(
												'No items detected.',
												'linked-open-profiles'
											) }
										</p>
									) }
									{ getSectionControls(
										section,
										items,
										attributes,
										setAttributes
									) }
								</PanelBody>
							);
						} ) }
					</Panel>
					{ /*
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
                                        "linked-open-profiles",
                                    )}
                                    value={startingHeadingLevel}
                                    onChange={(value) => {
                                        setAttributes({ startingHeadingLevel: value });
                                    }}
                                />
                                <Button
                                    variant="primary"
                                    onClick={() => buttonHandler()}
                                    text={__("Set", "linked-open-profiles")}
                                />
                            </PanelBody>
                        </Panel>
*/ }
				</>
			) }
		</InspectorControls>
	);
};

export default DataBlockInspectorControls;
