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
	console.log( section, value );
	setAttributes( { [ `${ section }_limit_items` ]: value } );
}
function setLimitItemsCount( section, value, setAttributes ) {
	setAttributes( { [ `${ section }_limit_items_count` ]: value } );
}

function modifyExcludedItems(
	section,
	item,
	attributes,
	setAttributes,
	value
) {
	const excluded = { ...excludedItems( section, sections, attributes ) };
	excluded[ item.path ] = value;
	setAttributes( { [ `${ sections[ section ].id }_excluded` ]: excluded } );
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
				excludedItems( section, sections, attributes )[ item.path ] !==
				false
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
	const show = isSectionShown( section, sections, attributes );
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
			{ section == 'bio' && attributes[ 'bio_show' ] && (
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
							'Excluding this heading could compromise the semantic structure of this content and negatively impact its accessibility. If this change was made while mindful of this, you may disregard this warning.',
							'linked-open-profiles'
						) }
					</p>
				</Snackbar>
			) }
			{ show &&
				canExclude( section, sections ) &&
				! hasNoItems( section, items ) && (
					<div>
						<CheckboxControl
							__nextHasNoMarginBottom={ true }
							checked={ areSectionItemsLimited(
								section,
								sections,
								attributes
							) }
							className="odb-medium-margin-top"
							label="Limit Items"
							onChange={ ( value ) => {
								toggleLimitItems(
									section,
									value,
									setAttributes
								);
							} }
						/>
						{ areSectionItemsLimited(
							section,
							sections,
							attributes
						) && (
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
						label={ __( 'ORCID iD', 'linked-open-profiles' ) }
						value={ orcidId }
						onChange={ ( value ) => {
							setInvalidId( false );
							setAttributes( { orcidId: value } );
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
					<Panel header={ __( 'Sections', 'linked-open-profiles' ) }>
						{ Object.keys( sections ).map( function ( section ) {
							return (
								<PanelBody
									key={ section.id }
									initialOpen={ false }
									icon={
										! isSectionShown(
											section,
											sections,
											attributes
										)
											? 'hidden'
											: ''
									}
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
