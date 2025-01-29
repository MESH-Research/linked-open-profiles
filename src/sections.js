import { __ } from "@wordpress/i18n";
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
} from "./markupfunctions";
const bio = function (data) {
    return (
        <>
            {nameMarkup(data)}
            {bioMarkup(data)}
            {researcherUrlMarkup(data)}
        </>
    );
};
const distinction = function (data) {
    return (
        <>
            {roleMarkup(data, true)}
            {organizationMarkup(data)}
            {departmentMarkup(data)}
            {addressMarkup(data)}
            {dateMarkup(data)}
        </>
    );
};
const education = function (data) {
    return (
        <>
            {organizationMarkup(data, true)}
            {degreeMarkup(data)}
            {addressMarkup(data)}
            {dateMarkup(data)}
        </>
    );
};
const employment = function (data) {
    return (
        <>
            {roleMarkup(data, true)}
            {organizationMarkup(data)}
            {departmentMarkup(data)}
            {addressMarkup(data)}
            {dateMarkup(data)}
        </>
    );
};
const funding = function (data) {
    return (
        <>
            {titleMarkup(data, true)}
            {organizationMarkup(data)}
            {typeMarkup(data)}
            {dateMarkup(data)}
            {doiMarkup(data)}
        </>
    );
};
const invitedPosition = function (data) {
    return (
        <>
            {roleMarkup(data, true)}
            {organizationMarkup(data)}
            {departmentMarkup(data)}
            {addressMarkup(data)}
            {dateMarkup(data)}
        </>
    );
};

const membership = function (data) {
    return (
        <>
            {roleMarkup(data, true)}
            {organizationMarkup(data)}
            {departmentMarkup(data)}
            {addressMarkup(data)}
            {dateMarkup(data)}
        </>
    );
};
const peerReview = function (data) {
    return (
        <>
            {organizationMarkup(data, true)}
            {roleMarkup(data)}
            {departmentMarkup(data)}
            {addressMarkup(data)}
            {doiMarkup(data)}
            {urlMarkup(data)}
            {issnMarkup(data)}
            {reviewSourceMarkup(data)}
            {dateMarkup(data)}
        </>
    );
};
const qualification = function (data) {
    return (
        <>
            {roleMarkup(data, true)}
            {organizationMarkup(data)}
            {departmentMarkup(data)}
            {addressMarkup(data)}
            {doiMarkup(data)}
            {dateMarkup(data)}
        </>
    );
};
const service = function (data) {
    return (
        <>
            {organizationMarkup(data, true)}
            {roleMarkup(data)}
            {doiMarkup(data)}
            {addressMarkup(data)}
            {dateMarkup(data)}
        </>
    );
};
const work = function (data) {
    return (
        <>
            {titleMarkup(data, true)}
            {journalMarkup(data)}
            {typeMarkup(data)}
            {dateMarkup(data)}
            {doiMarkup(data)}
        </>
    );
};

export const sections = {
    bio: {
        term: __("Biography", "orcid-data-block-2"),
        id: "bio",
        format: "person",
        summary_name: null,
        date_name: null,
        can_exclude: false,
        model: bio,
    },
    distinctions: {
        term: __("Distinctions", "orcid-data-block-2"),
        id: "distinctions",
        format: "affiliation-group",
        summary_name: "distinction-summary",
        date_name: "start-date",
        can_exclude: true,
        model: distinction,
    },
    educations: {
        term: __("Education", "orcid-data-block-2"),
        id: "educations",
        format: "affiliation-group",
        summary_name: "education-summary",
        date_name: "start-date",
        can_exclude: true,
        model: education,
    },
    employments: {
        term: __("Employment", "orcid-data-block-2"),
        id: "employments",
        format: "affiliation-group",
        summary_name: "employment-summary",
        date_name: "start-date",
        can_exclude: true,
        model: employment,
    },
    fundings: {
        term: __("Fundings", "orcid-data-block-2"),
        id: "fundings",
        format: "group",
        summary_name: "funding-summary",
        date_name: "start-date",
        can_exclude: true,
        model: funding,
    },
    "invited-positions": {
        term: __("Invited Positions", "orcid-data-block-2"),
        id: "invited-positions",
        format: "affiliation-group",
        summary_name: "invited-position-summary",
        date_name: "start-date",
        can_exclude: true,
        model: invitedPosition,
    },
    memberships: {
        term: __("Memberships", "orcid-data-block-2"),
        id: "memberships",
        format: "affiliation-group",
        summary_name: "membership-summary",
        date_name: "",
        can_exclude: true,
        model: membership,
    },
    "peer-reviews": {
        term: __("Peer Reviews", "orcid-data-block-2"),
        id: "peer-reviews",
        format: "group",
        summary_name: "peer-review-summary",
        date_name: "completion-date",
        can_exclude: true,
        model: peerReview,
    },
    qualifications: {
        term: __("Qualifications", "orcid-data-block-2"),
        id: "qualifications",
        format: "affiliation-group",
        summary_name: "qualification-summary",
        date_name: "start-date",
        can_exclude: true,
        model: qualification,
    },
    // "research-resources": {
    // 	term: "Research Resources",
    // 	id: "research-resources",
    // 	format: "affiliation-group", // unknown; this is a guess
    // 	summary_name: "resource-resource-summary", // guess
    // 	date_name: "start-date", // guess
    //  can_exclude: true,
    // },
    services: {
        term: __("Services", "orcid-data-block-2"),
        id: "services",
        format: "affiliation-group",
        summary_name: "service-summary",
        can_exclude: true,
        model: service,
    },
    works: {
        term: __("Works", "orcid-data-block-2"),
        id: "works",
        format: "group",
        summary_name: "work-summary",
        can_exclude: true,
        model: work,
    },
};
