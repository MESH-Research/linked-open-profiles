/**
 * Retrieves the translation of text.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-i18n/
 */
import { __ } from '@wordpress/i18n';
import { useCallback, useEffect, useState } from '@wordpress/element';
import orcidIcon from './images/ORCID-iD_icon_unauth_vector.svg';

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
} from '@wordpress/components';

import { sections } from './sections';
import { getProcessedData } from './processdata';
import {
	hasNoItems,
	isHeadingShown,
	isSectionShown,
	renderSectionItems,
	hasNoSectionsShown,
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
 * @param {Object}   root0
 * @param {Object}   root0.attributes
 * @param {Function} root0.setAttributes
 * @return {Element} Element to render
 */
export default function Edit( { attributes, setAttributes } ) {
	const { orcidId, startingHeadingLevel, verifiedOrcidId, visibleOrcidId } =
		attributes;
	const [ items, setItems ] = useState( {} );
	const [ invalidId, setInvalidId ] = useState( false );
	const [ dataFetched, setDataFetched ] = useState( false );
	const [ loading, setLoading ] = useState( true );
	const [ fetchError, setFetchError ] = useState( false );

	const fetchData = useCallback( async () => {
		setFetchError( false );
		setDataFetched( false );
		const queryParams = { orcidId: `${ orcidId }` };
		apiFetch( {
			path: addQueryArgs(
				'/mesh_research_linked_open_profiles/v1/orcid-proxy',
				queryParams
			),
		} )
			.then( ( data ) => {
				setItems( getProcessedData( data ) );
				setDataFetched( true );
			} )
			.catch( () => {
				setFetchError( true );
			} )
			.finally( () => {
				setLoading( false );
			} );
	}, [ orcidId ] );

	useEffect( () => {
		if ( orcidId && verifiedOrcidId && ! dataFetched ) {
			fetchData();
		}
		if ( ! orcidId ) {
			setLoading( false );
		}
	}, [ orcidId, verifiedOrcidId, dataFetched, fetchData ] );

	const verifyOrcidId = ( thisOrcidId ) => {
		if (
			thisOrcidId === undefined ||
			thisOrcidId === null ||
			thisOrcidId === ''
		) {
			return false;
		}
		if ( thisOrcidId.length > 4 ) {
			return true;
		}
		return false;
	};

	function buttonHandler() {
		setLoading( true );
		const verification = verifyOrcidId( orcidId );
		setAttributes( { verifiedOrcidId: verification } );
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
				orcidId={ orcidId }
				invalidId={ invalidId }
				setInvalidId={ setInvalidId }
				buttonHandler={ buttonHandler }
				loading={ loading }
				attributes={ attributes }
				setAttributes={ setAttributes }
				items={ items }
				startingHeadingLevel={ startingHeadingLevel }
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
				{ ! verifiedOrcidId &&
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
						{ orcidId &&
							verifiedOrcidId &&
							dataFetched &&
							visibleOrcidId && (
								<div
									style={ {
										float: 'right',
										display: 'inline-flex',
										gap: '4px',
									} }
								>
									<a
										href={ `https://orcid.org/${ orcidId }` }
										style={ {
											display: 'inline-flex',
											alignItems: 'center',
											gap: '8px',
										} }
									>
										<img
											src={ orcidIcon }
											alt=""
											style={ {
												height: '24px',
												width: '24px',
											} }
										/>
										<span>{ orcidId }</span>
									</a>
									<span>
										(
										{ __(
											'unauthenticated',
											'linked-open-profiles'
										) }
										)
									</span>
								</div>
							) }
						{ ! loading &&
							! fetchError &&
							hasNoSectionsShown( attributes ) && (
								<div role="alert">
									<Card>
										<CardBody isShady={ true }>
											<p>
												{ __(
													'Please include at least one section.',
													'linked-open-profiles'
												) }
											</p>
										</CardBody>
									</Card>
								</div>
							) }
						{ ! loading &&
							! fetchError &&
							Object.keys( sections ).map(
								( section ) =>
									isSectionShown( section, attributes ) &&
									! hasNoItems( section, items ) && (
										<section
											style={ { marginBottom: '2rem' } }
											className={ `mesh-lop-section mesh-lop-section-${ section }` }
											key={ section }
										>
											{ isHeadingShown(
												section,
												attributes
											) && (
												<Heading
													level={
														startingHeadingLevel
													}
												>
													{ sections[ section ].term }
												</Heading>
											) }

											{ renderSectionItems(
												section,
												items,
												attributes
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
