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
import { __ } from '@wordpress/i18n';
import {
	useCallback,
	useEffect,
	useState,
	createRoot,
} from '@wordpress/element';
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
	__experimentalItemGroup as ItemGroup,
	__experimentalItem as Item,
} from '@wordpress/components';
import {
	hasNoItems,
	isHeadingShown,
	isSectionShown,
	renderSectionItems,
	hasNoSectionsShown,
} from './sharedfunctions.js';
import LoadingSpinner from './components/LoadingSpinner.js';

import apiFetch from '@wordpress/api-fetch';
import { addQueryArgs } from '@wordpress/url';

import { sections } from './sections.js';
import { getProcessedData } from './processdata.js';

/**
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-edit-save/#save
 * @param {Object} root0
 * @param {Object} root0.attributes
 * @return {Element} Element to render.
 */
function LinkedOpenProfiles( { attributes } ) {
	const { orcidId, startingHeadingLevel, verifiedOrcidId, visibleOrcidId } =
		attributes;
	const [ items, setItems ] = useState( {} );
	const [ dataFetched, setDataFetched ] = useState( false );
	const [ loading, setLoading ] = useState( true );
	const [ fetchError, setFetchError ] = useState( false );
	const dontShowAnything = hasNoSectionsShown( attributes ) || ! orcidId;

	const fetchData = useCallback( async () => {
		setFetchError( false );
		setDataFetched( false );
		if ( ! dontShowAnything ) {
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
		}
	}, [ orcidId, dontShowAnything ] );

	useEffect( () => {
		if ( orcidId && verifiedOrcidId && ! dataFetched ) {
			fetchData();
		}
	}, [ orcidId, verifiedOrcidId, dataFetched, fetchData ] );

	return (
		<div { ...useBlockProps() }>
			{ dontShowAnything ? (
				<></>
			) : (
				<>
					{ fetchError ? (
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
							{ ! loading ? (
								Object.keys( sections ).map(
									( section ) =>
										isSectionShown( section, attributes ) &&
										! hasNoItems( section, items ) && (
											<section
												style={ {
													marginBottom: '2rem',
												} }
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
														{
															sections[ section ]
																.term
														}
													</Heading>
												) }
												{ renderSectionItems(
													section,
													items,
													attributes
												) }
											</section>
										)
								)
							) : (
								<LoadingSpinner />
							) }
						</>
					) }
				</>
			) }
		</div>
	);
}
window.addEventListener( 'DOMContentLoaded', () => {
	const blocks = document.querySelectorAll( '.linked-open-profiles' );
	blocks.forEach( ( block ) => {
		const root = createRoot( block );
		const attributes = JSON.parse(
			block.getAttribute( 'data-attributes' )
		);
		root.render( <LinkedOpenProfiles attributes={ attributes } /> );
	} );
} );
