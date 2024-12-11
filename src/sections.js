export const verifyOrcidId = (orcidId) => {
    if (orcidId === undefined || orcidId === null || orcidId === "") {
        return false;
    }
    if (orcidId.length > 4) {
        return true;
    }
    return false;
};

export const sections = {
    bio: {
        term: "Biography",
        id: "bio",
        format: "person",
        summary_name: null,
        date_name: null,
        can_exclude: false,
    },
    distinctions: {
        term: "Distinctions",
        id: "distinctions",
        format: "affiliation-group",
        summary_name: "distinction-summary",
        date_name: "start-date",
        can_exclude: true,
    },
    educations: {
        term: "Education",
        id: "educations",
        format: "affiliation-group",
        summary_name: "education-summary",
        date_name: "start-date",
        can_exclude: true,
    },
    employments: {
        term: "Employment",
        id: "employments",
        format: "affiliation-group",
        summary_name: "employment-summary",
        date_name: "start-date",
        can_exclude: true,
    },
    fundings: {
        term: "Fundings",
        id: "fundings",
        format: "group",
        summary_name: "funding-summary",
        date_name: "start-date",
        can_exclude: true,
    },
    "invited-positions": {
        term: "Invited Positions",
        id: "invited-positions",
        format: "affiliation-group",
        summary_name: "invited-position-summary",
        date_name: "start-date",
        can_exclude: true,
    },
    memberships: {
        term: "Memberships",
        id: "memberships",
        format: "affiliation-group",
        summary_name: "membership-summary",
        date_name: "",
        can_exclude: true,
    },
    "peer-reviews": {
        term: "Peer Reviews",
        id: "peer-reviews",
        format: "peer-review",
        summary_name: "peer-review-summary",
        date_name: "completion-date",
        can_exclude: true,
    },
    qualifications: {
        term: "Qualifications",
        id: "qualifications",
        format: "affiliation-group",
        summary_name: "qualification-summary",
        date_name: "start-date",
        can_exclude: true,
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
        term: "Services",
        id: "services",
        format: "affiliation-group",
        summary_name: "service-summary",
        can_exclude: true,
    },
    works: {
        term: "Works",
        id: "works",
        format: "group",
        summary_name: "work-summary",
        can_exclude: true,
    },
};
