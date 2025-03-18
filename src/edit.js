/**
 * Retrieves the translation of text.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-i18n/
 */
import { __ } from '@wordpress/i18n';
import { useEffect, useState } from '@wordpress/element';

/**
 * React hook that is used to mark the block wrapper element.
 * It provides all the necessary props like the class name.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-block-editor/#useblockprops
 */
import { useBlockProps } from '@wordpress/block-editor';

/**
 * Lets webpack process CSS, SASS or SCSS files referenced in JavaScript files.
 * Those files can contain any CSS code that gets applied to the editor.
 *
 * @see https://www.npmjs.com/package/@wordpress/scripts#using-css
 */
import './editor.scss';

import {
	Card,
	CardBody,
	__experimentalHeading as Heading,
	__experimentalItemGroup as ItemGroup,
	__experimentalItem as Item,
} from '@wordpress/components';

import { sections } from './sections';
import { getProcessedData } from './processdata';
import {
	isSectionShown,
	hasNoItems,
	excludedItems,
} from './sharedfunctions.js';
import LoadingSpinner from './components/LoadingSpinner.js';
import DataBlockInspectorControls from './components/DataBlockInspectorControls.js';

import apiFetch from '@wordpress/api-fetch';
import { addQueryArgs } from '@wordpress/url';

/**
 * The edit function describes the structure of your block in the context of the
 * editor. This represents what the editor will render when the block is used.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-edit-save/#edit
 *
 * @return {Element} Element to render.
 */
export default function Edit( { attributes, setAttributes } ) {
	const { orcid_id, starting_heading_level, verified_orcid_id } = attributes;
	const [ items, setItems ] = useState( {} );
	const [ invalidId, setInvalidId ] = useState( false );
	const [ dataFetched, setDataFetched ] = useState( false );
	const [ loading, setLoading ] = useState( true );
	const [ fetchError, setFetchError ] = useState( false );

	useEffect( () => {
		if ( orcid_id && verifyOrcidId( orcid_id ) ) {
			fetchData();
		}
		if ( ! orcid_id ) {
			setLoading( false );
		}
	}, [] );

	async function fetchData() {
		setFetchError( false );
		setDataFetched( false );
		const queryParams = { orcid_id: `${ orcid_id }` };
		apiFetch( {
			path: addQueryArgs( '/custom/v1/orcid-proxy', queryParams ),
		} )
			.then( ( data ) => {
				setItems( getProcessedData( data ) );
				setDataFetched( true );
			} )
			.catch( ( error ) => {
				setFetchError( true );
				console.error( error );
			} )
			.finally( () => {
				setLoading( false );
			} );
	}

	const verifyOrcidId = ( orcidId ) => {
		if ( orcidId === undefined || orcidId === null || orcidId === '' ) {
			return false;
		}
		if ( orcidId.length > 4 ) {
			return true;
		}
		return false;
	};

	function buttonHandler() {
		setLoading( true );
		const verification = verifyOrcidId( orcid_id );
		setAttributes( { verified_orcid_id: verification } );
		if ( ! verification ) {
			setInvalidId( true );
			setLoading( false );
		} else {
			setInvalidId( false );
			fetchData();
		}
	}

	return (
		<>
			<DataBlockInspectorControls
				orcid_id={ orcid_id }
				invalidId={ invalidId }
				setInvalidId={ setInvalidId }
				buttonHandler={ buttonHandler }
				loading={ loading }
				attributes={ attributes }
				setAttributes={ setAttributes }
				items={ items }
				starting_heading_level={ starting_heading_level }
			/>
			<div { ...useBlockProps() }>
				{ fetchError && (
					<div role="alert">
						<Card>
							<CardBody>
								<p>
									{ __(
										'An error occurred while fetching the data from ORCID',
										'linked-open-profiles'
									) }
								</p>
							</CardBody>
						</Card>
					</div>
				) }
				{ loading && <LoadingSpinner /> }
				{ ! verified_orcid_id &&
				! dataFetched &&
				! loading &&
				! fetchError ? (
					<div role="alert">
						<Card>
							<CardBody isShady={ true }>
								<p>
									{ __(
										'Please provide an ORCID iD',
										'linked-open-profiles'
									) }
								</p>
							</CardBody>
						</Card>
					</div>
				) : (
					<>
						{ ! loading &&
							! fetchError &&
							Object.keys( sections ).map(
								( section ) =>
									isSectionShown(
										section,
										sections,
										attributes
									) &&
									! hasNoItems( section, items ) && (
										<section
											style={ { marginBottom: '2rem' } }
											className={ `lop-section lop-section-${ section }` }
											key={ section }
										>
											<Heading
												level={ starting_heading_level }
											>
												{ sections[ section ].term }
											</Heading>
											{ sections[ section ].id ===
												'bio' &&
												sections[ section ].model(
													items[ section ][ 0 ]
												) }
											{ sections[ section ].id !==
												'bio' && (
												<ItemGroup>
													{ items[ section ].map(
														( item ) =>
															excludedItems(
																section,
																sections,
																attributes
															)[ item.path ] !==
																false && (
																<Item
																	key={
																		item.path
																	}
																>
																	{ sections[
																		section
																	].model(
																		item
																	) }
																</Item>
															)
													) }
												</ItemGroup>
											) }
										</section>
									)
							) }
					</>
				) }
			</div>
		</>
	);
}
