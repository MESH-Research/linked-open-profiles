export function isSectionShown( section, sections, attributes ) {
	return attributes[ `${ sections[ section ].id }_show` ];
}

export function hasNoItems( section, items ) {
	if ( ! items[ section ] ) {
		return true;
	}
	return items[ section ].length === 0;
}

export function canExclude( section, sections ) {
	return sections[ section ].can_exclude;
}

export function excludedItems( section, sections, attributes ) {
	let i = [];
	if ( canExclude( section, sections ) ) {
		i = attributes[ `${ sections[ section ].id }_excluded` ] || {};
	}
	return i;
}
