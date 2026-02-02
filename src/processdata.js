import { sections } from './sections';

export function getItems( type, profile ) {
	const records = profile[ 'activities-summary' ][ type ];
	let items;
	switch ( sections[ type ].format ) {
		case 'affiliation-group':
			items = records[ 'affiliation-group' ];
			break;
		case 'group':
		case 'peer-review':
			items = records.group;
			break;
		case 'person':
			items = profile.person;
			break;
		default:
			return [];
	}
	return items;
}

export function getSortedItems( type, profile ) {
	const cat = sections[ type ];
	const items = getItems( type, profile );
	if ( type === 'bio' ) {
		return items;
	}
	return items.sort( ( a, b ) => {
		return (
			makeDate( b, cat.summaryName, cat.dateName, cat.format ) -
			makeDate( a, cat.summaryName, cat.dateName, cat.format )
		);
	} );
}

function makeDate( item, summaryName, dateName, format ) {
	let dateObj;
	let response = new Date();
	if ( format === 'affiliation-group' ) {
		dateObj = item.summaries[ 0 ][ summaryName ][ dateName ];
	} else if ( format === 'group' ) {
		dateObj = item[ summaryName ][ 0 ][ dateName ];
	} else if ( format === 'peer-review' ) {
		dateObj =
			item[ 'peer-review-group' ][ 0 ][ summaryName ][ 0 ][ dateName ];
	}
	if ( dateObj ) {
		const year = dateObj.year?.value;
		const month = dateObj.month?.value;
		const day = dateObj.day?.value;
		response = new Date(
			year ? year : new Date().getFullYear(),
			month ? month - 1 : 6,
			day ? day : 1
		);
	}
	return response;
}

function processRecordBio( data ) {
	return {
		given_names: data.name?.[ 'given-names' ]?.value,
		family_name: data.name?.[ 'family-name' ]?.value,
		credit_name: data.name?.[ 'credit-name' ]?.value,
		other_names: data[ 'other-names' ]?.[ 'other-name' ],
		biography: data?.biography?.content,
		urls: data[ 'researcher-urls' ]?.[ 'researcher-url' ],
	};
}

function processRecordDistinction( record ) {
	const data = record?.summaries[ 0 ]?.[ sections.distinctions.summaryName ];
	if ( ! data ) {
		return {};
	}
	return {
		address: data.organization.address,
		display_label: data[ 'role-title' ],
		department: data[ 'department-name' ],
		organization: data.organization.name,
		path: data.path,
		role: data[ 'role-title' ],
		end_date: data?.[ 'end-date' ],
		start_date: data?.[ 'start-date' ],
	};
}

function processRecordEducation( record ) {
	const data = record?.summaries[ 0 ]?.[ sections.educations.summaryName ];
	if ( ! data ) {
		return {};
	}
	return {
		display_label: data.organization.name,
		path: data.path,
		degree: data?.[ 'role-title' ],
		department: data[ 'department-name' ],
		address: data.organization.address,
		organization: data.organization.name,
		end_date: data[ 'end-date' ],
		start_date: data[ 'start-date' ],
	};
}

function processRecordEmployment( record ) {
	const data = record?.summaries[ 0 ]?.[ sections.employments.summaryName ];
	if ( ! data ) {
		return {};
	}
	return {
		display_label: data[ 'role-title' ],
		path: data.path,
		department: data[ 'department-name' ],
		end_date: data[ 'end-date' ],
		address: data.organization.address,
		organization: data.organization.name,
		role: data[ 'role-title' ],
		start_date: data[ 'start-date' ],
	};
}

function processRecordFunding( record ) {
	const data = record?.[ sections.fundings.summaryName ][ 0 ];
	if ( ! data ) {
		return {};
	}
	return {
		display_label: data.title.title.value,
		path: data.path,
		end_date: data[ 'end-date' ],
		address: data.organization.address,
		organization: data.organization.name,
		title: data.title.title.value,
		start_date: data[ 'start-date' ],
	};
}

function processRecordInvitedPositions( record ) {
	const data =
		record?.summaries[ 0 ]?.[ sections[ 'invited-positions' ].summaryName ];
	if ( ! data ) {
		return {};
	}
	return {
		display_label: data[ 'role-title' ],
		path: data.path,
		department: data[ 'department-name' ],
		end_date: data[ 'end-date' ],
		address: data.organization.address,
		organization: data.organization.name,
		role: data[ 'role-title' ],
		start_date: data[ 'start-date' ],
	};
}

function processRecordMemberships( record ) {
	const data = record?.summaries[ 0 ]?.[ sections.memberships.summaryName ];
	if ( ! data ) {
		return {};
	}
	return {
		display_label: data[ 'role-title' ],
		path: data.path,
		department: data[ 'department-name' ],
		end_date: data[ 'end-date' ],
		address: data.organization.address,
		organization: data.organization.name,
		role: data[ 'role-title' ],
		start_date: data[ 'start-date' ],
	};
}

function processRecordPeerReviews( record ) {
	const data =
		record?.[ 'peer-review-group' ][ 0 ][
			sections[ 'peer-reviews' ].summaryName
		][ 0 ];
	if ( ! data ) {
		return {};
	}
	return {
		display_label: data[ 'convening-organization' ].name,
		path: data.path,
		date: data[ 'completion-date' ],
		address: data[ 'convening-organization' ].address,
		organization: data[ 'convening-organization' ].name,
		role: data[ 'reviewer-role' ],
		url: data[ 'review-url' ]?.value,
		issn: data[ 'review-group-id' ],
		review_source: data.source?.[ 'source-name' ]?.value,
	};
}

function processRecordQualifications( record ) {
	const data =
		record?.summaries[ 0 ]?.[ sections.qualifications.summaryName ];
	if ( ! data ) {
		return {};
	}
	return {
		display_label: data[ 'role-title' ],
		path: data.path,
		department: data[ 'department-name' ],
		end_date: data[ 'end-date' ],
		address: data.organization.address,
		organization: data.organization.name,
		role: data[ 'role-title' ],
		start_date: data[ 'start-date' ],
	};
}

function processRecordService( record ) {
	const data = record?.summaries[ 0 ]?.[ sections.services.summaryName ];
	if ( ! data ) {
		return {};
	}
	return {
		display_label: data[ 'role-title' ],
		path: data.path,
		department: data[ 'department-name' ],
		end_date: data[ 'end-date' ],
		address: data.organization.address,
		organization: data.organization.name,
		role: data[ 'role-title' ],
		start_date: data[ 'start-date' ],
	};
}

function processRecordWork( record ) {
	const data = record?.[ sections.works.summaryName ][ 0 ];
	if ( ! data ) {
		return {};
	}
	return {
		display_label: data.title.title.value,
		journal_title: data[ 'journal-title' ]?.value,
		date: data[ 'publication-date' ],
		doi_url:
			data[ 'external-ids' ]?.[ 'external-id' ][ 0 ]?.[
				'external-id-value'
			],
		path: data.path,
		source: data.source[ 'source-name' ]?.value,
		subtitle: data.title.subtitle?.value,
		title: data.title.title.value,
		type: data?.type,
		url: data.url?.value,
	};
}

export function getProcessedData( profile ) {
	const a = Object.keys( sections );
	const o = {};
	a.map( ( item ) => {
		const sorted = getSortedItems( item, profile );
		return ( o[ item ] = sorted );
	} );
	if ( o.bio ) {
		const b = [ processRecordBio( o.bio ) ];
		o.bio = b;
	}
	if ( o?.distinctions ) {
		const d = o.distinctions.map( ( item ) => {
			return processRecordDistinction( item );
		} );
		o.distinctions = d;
	}
	if ( o?.educations ) {
		const ed = o.educations.map( ( item ) => {
			return processRecordEducation( item );
		} );
		o.educations = ed;
	}
	if ( o?.employments ) {
		const em = o.employments.map( ( item ) => {
			return processRecordEmployment( item );
		} );
		o.employments = em;
	}
	if ( o?.fundings ) {
		const f = o.fundings.map( ( item ) => {
			return processRecordFunding( item );
		} );
		o.fundings = f;
	}
	if ( o?.[ 'invited-positions' ] ) {
		const inv = o[ 'invited-positions' ].map( ( item ) => {
			return processRecordInvitedPositions( item );
		} );
		o[ 'invited-positions' ] = inv;
	}
	if ( o?.memberships ) {
		const mem = o.memberships.map( ( item ) => {
			return processRecordMemberships( item );
		} );
		o.memberships = mem;
	}
	if ( o?.[ 'peer-reviews' ] ) {
		const pr = o[ 'peer-reviews' ].map( ( item ) => {
			return processRecordPeerReviews( item );
		} );
		o[ 'peer-reviews' ] = pr;
	}
	if ( o?.qualifications ) {
		const q = o.qualifications.map( ( item ) => {
			return processRecordQualifications( item );
		} );
		o.qualifications = q;
	}
	if ( o?.services ) {
		const s = o.services.map( ( item ) => {
			return processRecordService( item );
		} );
		o.services = s;
	}
	if ( o?.works ) {
		const w = o.works.map( ( item ) => {
			return processRecordWork( item );
		} );
		o.works = w;
	}
	return o;
}
