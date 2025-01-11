import {
    __experimentalItemGroup as ItemGroup,
    __experimentalItem as Item,
} from "@wordpress/components";
export function addressMarkup(data) {
    let city,
        comma1,
        region,
        comma2,
        country = "";

    if (data.address?.city) {
        city = data.address.city;
    }
    if (data.address?.region) {
        region = data.address.region;
    }
    if (data.address?.country) {
        country = data.address.country;
    }
    if (
        (data.address?.city && data.address?.region) ||
        (data.address?.city && data.address?.country)
    ) {
        comma1 = ", ";
    }
    if (data.address?.region && data.address?.country) {
        comma2 = ", ";
    }
    if (data?.address !== undefined) {
        return (
            <>
                <br />
                <span>
                    {city}
                    {comma1}
                    {region}
                    {comma2}
                    {country}
                </span>
            </>
        );
    } else {
        return <></>;
    }
}
export function bioMarkup(data) {
    let markup = "";
    if (data?.biography) {
        markup = (
            <>
                <br />
                <span>{data.biography}</span> <br />
            </>
        );
    }
    return markup;
}
export function dateMarkup(data) {
    let dateOnlyMarkup,
        startMarkup,
        endMarkup = "";

    // Date Only
    if (data?.date?.year?.value) {
        dateOnlyMarkup = data.date?.year?.value;
    }
    if (data?.date?.year?.value && data?.date?.month?.value) {
        dateOnlyMarkup += `-${data.date?.month?.value}`;
    }
    if (data?.date?.day?.value) {
        dateOnlyMarkup += `-${data.date?.day?.value}`;
    }
    if (data?.date?.year?.value) {
        return (
            <>
                <br />
                <span>{dateOnlyMarkup}</span>
            </>
        );
    }

    // Start Date Range
    if (data?.start_date?.year?.value) {
        startMarkup = data.start_date?.year?.value;
    }
    if (data?.start_date?.year?.value && data?.start_date?.month?.value) {
        startMarkup += `-${data.start_date?.month?.value}`;
    }
    if (data?.start_date?.day?.value) {
        startMarkup += `-${data.start_date?.day?.value}`;
    }

    // End Date Range
    if (data?.end_date?.year?.value) {
        endMarkup = ` – ${data.end_date?.year?.value}`;
    }
    if (data?.end_date?.year?.value && data?.end_date?.month?.value) {
        endMarkup += `-${data.end_date?.month?.value}`;
    }
    if (data?.end_date?.day?.value) {
        endMarkup += `-${data.end_date?.day?.value}`;
    }

    return (
        <>
            <br />
            <span>
                {startMarkup}
                {endMarkup}
            </span>
        </>
    );
}
export function degreeMarkup(data, firstline) {
    let markup,
        content = "";
    if (data?.department) {
        content = data.department;
    }
    if (data?.degree) {
        content = data.degree;
    }
    if (data?.degree && data?.department) {
        content = `${data.degree} (${data.department})`;
    }
    if ((data?.degree || data?.department) && !firstline) {
        markup = (
            <>
                <br />
                <span>{content}</span>
            </>
        );
    }
    if ((data?.degree || data?.department) && firstline) {
        markup = (
            <>
                <strong>{content}</strong>
            </>
        );
    }
    return markup;
}
export function departmentMarkup(data, firstline = false) {
    let markup = "";
    if (data?.department && firstline) {
        markup = (
            <>
                <strong>{data.department}</strong>
            </>
        );
    }
    if (data?.department && !firstline) {
        markup = (
            <>
                <br />
                <span>{data.department}</span>
            </>
        );
    }
    return markup;
}
export function doiMarkup(data) {
    let markup = "";
    if (data?.doi_url) {
        markup = (
            <>
                <br />
                <a
                    href={data.doi_url}
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    {data.doi_url}
                </a>
            </>
        );
    }
    return markup;
}
export function issnMarkup(data) {
    let markup = "";
    if (data?.issn) {
        markup = (
            <>
                <br />
                <span>{data.issn}</span>
            </>
        );
    }
    return markup;
}
export function journalMarkup(data) {
    let markup = "";
    if (data?.journal_title) {
        markup = (
            <>
                <br />
                <span>{data.journal_title}</span>
            </>
        );
    }
    return markup;
}
function nameGivenMarkup(data) {
    let markup = "";
    if (data?.given_names) {
        markup = (
            <>
                <strong>Given Name</strong>
                <br />
                <span>{data.given_names}</span>
                <br />
            </>
        );
    }
    return markup;
}
function nameFamilyMarkup(data) {
    let markup = "";
    if (data?.family_name) {
        markup = (
            <>
                <strong>Family Name</strong>
                <br />
                <span>{data.family_name}</span>
                <br />
            </>
        );
    }
    return markup;
}
function nameCreditMarkup(data) {
    let markup = "";
    if (data?.credit_name) {
        markup = (
            <>
                <strong>Credit Name</strong>
                <br />
                <span>{data.credit_name}</span>
                <br />
            </>
        );
    }
    return markup;
}
function nameOtherMarkup(data) {
    let markup = "";
    if (data?.other_names.length > 0) {
        markup = (
            <>
                <strong>Other Names</strong>
                <br />
                <ItemGroup>
                    {data.other_names.map((name) => (
                        <Item>
                            <span>{name}</span>
                        </Item>
                    ))}
                </ItemGroup>
            </>
        );
    }
    return markup;
}
export function nameMarkup(data) {
    let markup = "";
    markup = (
        <>
            {nameGivenMarkup(data)}
            {nameFamilyMarkup(data)}
            {nameCreditMarkup(data)}
            {nameOtherMarkup(data)}
        </>
    );
    return markup;
}
export function organizationMarkup(data, firstline = false) {
    let markup = "";
    if (data?.organization && firstline) {
        markup = (
            <>
                <strong>{data.organization}</strong>
            </>
        );
    }
    if (data?.organization && !firstline) {
        markup = (
            <>
                <br />
                <span>{data.organization}</span>
            </>
        );
    }
    return markup;
}
export function researcherUrlMarkup(data) {
    let markup = "";
    if (data?.urls.length > 0) {
        markup = (
            <>
                <br />
                <strong>Websites & social links</strong>
                <ItemGroup>
                    {data.urls.map((url) => (
                        <Item>
                            <a
                                href={url.url.value}
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                {url.url.value}
                            </a>
                        </Item>
                    ))}
                </ItemGroup>
            </>
        );
    }
    return markup;
}

export function reviewSourceMarkup(data) {
    let markup = "";
    if (data?.review_source) {
        markup = (
            <>
                <br />
                <span>{data.review_source}</span>
            </>
        );
    }
    return markup;
}
export function roleMarkup(data, firstline = false) {
    let markup = "";
    if (data?.role && firstline) {
        markup = (
            <>
                <strong>{data.role}</strong>
            </>
        );
    }
    if (data?.role && !firstline) {
        markup = (
            <>
                <br />
                <span>{data.role}</span>
            </>
        );
    }
    return markup;
}
export function titleMarkup(data, firstline = false) {
    let markup = <strong>{data.title}</strong>;
    if (!data?.subtitle && !firstline) {
        markup = (
            <>
                <br />
                <span>{data.title}</span>
            </>
        );
    }
    if (data?.subtitle && firstline) {
        markup = (
            <>
                <strong>{data.title}</strong>
                <br />
                <span>{data.subtitle}</span>
            </>
        );
    }
    if (data?.subtitle && !firstline) {
        markup = (
            <>
                <br />
                <span>{data.title}</span>
                <br />
                <span>{data.subtitle}</span>
            </>
        );
    }
    return markup;
}
export function typeMarkup(data) {
    let markup = "";
    if (data?.type) {
        markup = (
            <>
                <br />
                {data.type}
            </>
        );
    }
    return markup;
}
export function urlMarkup(data, firstline) {
    let markup = "";
    if (data?.url) {
        markup = (
            <>
                <br />
                <a href={data.url} target="_blank" rel="noopener noreferrer">
                    {data.url}
                </a>
            </>
        );
    }
    if (data?.url && firstline) {
        markup = (
            <>
                <a href={data.url} target="_blank" rel="noopener noreferrer">
                    {data.url}
                </a>
            </>
        );
    }

    return markup;
}
