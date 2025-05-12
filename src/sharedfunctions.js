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
