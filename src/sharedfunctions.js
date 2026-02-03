import {
	__experimentalItemGroup as ItemGroup,
	__experimentalItem as Item,
} from '@wordpress/components';
import { sections } from './sections';

export function isSectionShown( section, attributes ) {
	return attributes[ `${ section }_show` ];
}

export function isSubSectionShown( subsection, section, attributes ) {
	return attributes[ `${ section }_${ subsection }_show` ];
}

export function hasNoSectionsShown( items, attributes ) {
	return ! Object.keys( sections ).some( ( section ) => {
		if ( items[ section ].length === 0 ) {
			return false;
		}
		return attributes?.[ `${ section }_show` ] === true;
	} );
}

export function hasNoItems( section, items ) {
	if ( ! items[ section ] ) {
		return true;
	}
	return items[ section ].length === 0;
}

export function canExclude( section ) {
	return sections[ section ].can_exclude_items;
}

export function excludedItems( section, attributes ) {
	let i = [];
	if ( canExclude( section ) ) {
		i = attributes[ `${ section }_excluded` ] || {};
	}
	return i;
}

export function isHeadingShown( section, attributes ) {
	return attributes?.[ `${ section }_heading_show` ];
}

export function areSectionItemsLimited( section, attributes ) {
	return attributes[ `${ section }_limit_items` ];
}

export function renderSectionItems( section, items, attributes ) {
	let markup = '';
	if ( section === 'bio' ) {
		markup = sections[ section ].model( items[ section ][ 0 ], attributes );
	} else {
		const remainingItems = items[ section ].filter( ( item ) => {
			return excludedItems( section, attributes )[ item.path ] !== false;
		} );
		const limitedItems = areSectionItemsLimited( section, attributes )
			? remainingItems.slice(
					0,
					attributes?.[ `${ section }_limit_items_count` ]
			  )
			: remainingItems;

		markup = (
			<ItemGroup>
				{ limitedItems.map( ( item ) => (
					<Item key={ item.path }>
						{ sections[ section ].model( item, attributes ) }
					</Item>
				) ) }
			</ItemGroup>
		);
	}
	return markup;
}
