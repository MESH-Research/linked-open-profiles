import { __ } from '@wordpress/i18n';
import {
	addressMarkup,
	bioMarkup,
	dateMarkup,
	degreeMarkup,
	departmentMarkup,
	doiMarkup,
	issnMarkup,
	journalMarkup,
	nameMarkup,
	organizationMarkup,
	researcherUrlMarkup,
	reviewSourceMarkup,
	roleMarkup,
	titleMarkup,
	typeMarkup,
	urlMarkup,
} from './markupfunctions';
const bio = function ( data, attributes ) {
	return (
		<>
			{ nameMarkup( data, attributes ) }
			{ bioMarkup( data, attributes ) }
			{ researcherUrlMarkup( data, attributes ) }
		</>
	);
};
const distinction = function ( data ) {
	return (
		<>
			{ roleMarkup( data, true ) }
			{ organizationMarkup( data ) }
			{ departmentMarkup( data ) }
			{ addressMarkup( data ) }
			{ dateMarkup( data ) }
		</>
	);
};
const education = function ( data ) {
	return (
		<>
			{ organizationMarkup( data, true ) }
			{ degreeMarkup( data ) }
			{ addressMarkup( data ) }
			{ dateMarkup( data ) }
		</>
	);
};
const employment = function ( data ) {
	return (
		<>
			{ roleMarkup( data, true ) }
			{ organizationMarkup( data ) }
			{ departmentMarkup( data ) }
			{ addressMarkup( data ) }
			{ dateMarkup( data ) }
		</>
	);
};
const funding = function ( data ) {
	return (
		<>
			{ titleMarkup( data, true ) }
			{ organizationMarkup( data ) }
			{ typeMarkup( data ) }
			{ dateMarkup( data ) }
			{ doiMarkup( data ) }
		</>
	);
};
const invitedPosition = function ( data ) {
	return (
		<>
			{ roleMarkup( data, true ) }
			{ organizationMarkup( data ) }
			{ departmentMarkup( data ) }
			{ addressMarkup( data ) }
			{ dateMarkup( data ) }
		</>
	);
};

const membership = function ( data ) {
	return (
		<>
			{ roleMarkup( data, true ) }
			{ organizationMarkup( data ) }
			{ departmentMarkup( data ) }
			{ addressMarkup( data ) }
			{ dateMarkup( data ) }
		</>
	);
};
const peerReview = function ( data ) {
	return (
		<>
			{ organizationMarkup( data, true ) }
			{ roleMarkup( data ) }
			{ departmentMarkup( data ) }
			{ addressMarkup( data ) }
			{ doiMarkup( data ) }
			{ urlMarkup( data ) }
			{ issnMarkup( data ) }
			{ reviewSourceMarkup( data ) }
			{ dateMarkup( data ) }
		</>
	);
};
const qualification = function ( data ) {
	return (
		<>
			{ roleMarkup( data, true ) }
			{ organizationMarkup( data ) }
			{ departmentMarkup( data ) }
			{ addressMarkup( data ) }
			{ doiMarkup( data ) }
			{ dateMarkup( data ) }
		</>
	);
};
const service = function ( data ) {
	return (
		<>
			{ organizationMarkup( data, true ) }
			{ roleMarkup( data ) }
			{ doiMarkup( data ) }
			{ addressMarkup( data ) }
			{ dateMarkup( data ) }
		</>
	);
};
const work = function ( data ) {
	return (
		<>
			{ titleMarkup( data, true ) }
			{ journalMarkup( data ) }
			{ typeMarkup( data ) }
			{ dateMarkup( data ) }
			{ doiMarkup( data ) }
			{ urlMarkup( data ) }
		</>
	);
};

export const sections = {
	bio: {
		term: __( 'Biography', 'linked-open-profiles' ),
		include: __( 'Include Biography', 'linked-open-profiles' ),
		subsections: [
			{
				id: 'given_name',
				label: __( 'Given Name', 'linked-open-profiles' ),
			},
			{
				id: 'family_name',
				label: __( 'Family Name', 'linked-open-profiles' ),
			},
			{
				id: 'credit_name',
				label: __( 'Credit Name', 'linked-open-profiles' ),
			},
			{
				id: 'other_names',
				label: __( 'Other Names', 'linked-open-profiles' ),
			},
			{
				id: 'bio_info',
				label: __( 'Biographical Information', 'linked-open-profiles' ),
			},
			{
				id: 'urls',
				label: __( 'Websites & Social Links', 'linked-open-profiles' ),
			},
		],
		id: 'bio',
		format: 'person',
		summaryName: null,
		dateName: null,
		can_exclude_items: false,
		model: bio,
	},
	distinctions: {
		term: __( 'Distinctions', 'linked-open-profiles' ),
		include: __( 'Include Distinctions', 'linked-open-profiles' ),
		id: 'distinctions',
		format: 'affiliation-group',
		summaryName: 'distinction-summary',
		dateName: 'start-date',
		can_exclude_items: true,
		model: distinction,
	},
	educations: {
		term: __( 'Education', 'linked-open-profiles' ),
		include: __( 'Include Education', 'linked-open-profiles' ),
		id: 'educations',
		format: 'affiliation-group',
		summaryName: 'education-summary',
		dateName: 'start-date',
		can_exclude_items: true,
		model: education,
	},
	employments: {
		term: __( 'Employment', 'linked-open-profiles' ),
		include: __( 'Include Employment', 'linked-open-profiles' ),
		id: 'employments',
		format: 'affiliation-group',
		summaryName: 'employment-summary',
		dateName: 'start-date',
		can_exclude_items: true,
		model: employment,
	},
	fundings: {
		term: __( 'Fundings', 'linked-open-profiles' ),
		include: __( 'Include Fundings', 'linked-open-profiles' ),
		id: 'fundings',
		format: 'group',
		summaryName: 'funding-summary',
		dateName: 'start-date',
		can_exclude_items: true,
		model: funding,
	},
	'invited-positions': {
		term: __( 'Invited Positions', 'linked-open-profiles' ),
		include: __( 'Include Invited Positions', 'linked-open-profiles' ),
		id: 'invited-positions',
		format: 'affiliation-group',
		summaryName: 'invited-position-summary',
		dateName: 'start-date',
		can_exclude_items: true,
		model: invitedPosition,
	},
	memberships: {
		term: __( 'Memberships', 'linked-open-profiles' ),
		include: __( 'Include Memberships', 'linked-open-profiles' ),
		id: 'memberships',
		format: 'affiliation-group',
		summaryName: 'membership-summary',
		dateName: '',
		can_exclude_items: true,
		model: membership,
	},
	'peer-reviews': {
		term: __( 'Peer Reviews', 'linked-open-profiles' ),
		include: __( 'Include Peer Reviews', 'linked-open-profiles' ),
		id: 'peer-reviews',
		format: 'group',
		summaryName: 'peer-review-summary',
		dateName: 'completion-date',
		can_exclude_items: true,
		model: peerReview,
	},
	qualifications: {
		term: __( 'Qualifications', 'linked-open-profiles' ),
		include: __( 'Include Qualifications', 'linked-open-profiles' ),
		id: 'qualifications',
		format: 'affiliation-group',
		summaryName: 'qualification-summary',
		dateName: 'start-date',
		can_exclude_items: true,
		model: qualification,
	},
	// "research-resources": {
	//  term: __('Research Resources', 'linked-open-profiles'),
	//  include: __('Include Research Resources', 'linked-open-profiles'),
	// 	id: "research-resources",
	// 	format: "affiliation-group", // unknown; this is a guess
	// 	summaryName: "resource-resource-summary", // guess
	// 	dateName: "start-date", // guess
	//  can_exclude_items: true,
	// },
	services: {
		term: __( 'Services', 'linked-open-profiles' ),
		include: __( 'Include Services', 'linked-open-profiles' ),
		id: 'services',
		format: 'affiliation-group',
		summaryName: 'service-summary',
		can_exclude_items: true,
		model: service,
	},
	works: {
		term: __( 'Works', 'linked-open-profiles' ),
		include: __( 'Include Works', 'linked-open-profiles' ),
		id: 'works',
		format: 'group',
		summaryName: 'work-summary',
		can_exclude_items: true,
		model: work,
	},
};
