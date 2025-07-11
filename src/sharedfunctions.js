import {
	__experimentalItemGroup as ItemGroup,
	__experimentalItem as Item,
} from '@wordpress/components';

export function isSectionShown( section, sections, attributes ) {
	return attributes[ `${ sections[ section ].id }_show` ];
}

export function isSubSectionShown( subsection, section, attributes ) {
	return attributes[ `${ section }_${ subsection }_show` ];
}

export function hasNoItems( section, items ) {
	if ( ! items[ section ] ) {
		return true;
	}
	return items[ section ].length === 0;
}

export function canExclude( section, sections ) {
	return sections[ section ].can_exclude_items;
}

export function excludedItems( section, sections, attributes ) {
	let i = [];
	if ( canExclude( section, sections ) ) {
		i = attributes[ `${ sections[ section ].id }_excluded` ] || {};
	}
	return i;
}

export function isHeadingShown( section, attributes ) {
	return attributes?.[ `${ section }_heading_show` ];
}

export function areSectionItemsLimited( section, sections, attributes ) {
	return attributes[ `${ sections[ section ].id }_limit_items` ];
}

export function renderSectionItems( section, sections, items, attributes ) {
	let markup = '';
	if ( section === 'bio' ) {
		markup = sections[ section ].model( items[ section ][ 0 ], attributes );
	}
	if ( section !== 'bio' ) {
		const remainingItems = items[ section ].filter( ( item ) => {
			return (
				excludedItems( section, sections, attributes )[ item.path ] !==
				false
			);
		} );
		const limitedItems = areSectionItemsLimited(
			section,
			sections,
			attributes
		)
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
