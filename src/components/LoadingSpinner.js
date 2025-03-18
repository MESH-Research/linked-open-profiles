import { __ } from "@wordpress/i18n";
import { Card, CardBody, Spinner } from "@wordpress/components";
export default function LoadingSpinner() {
    return (
        <Card>
            <CardBody>
                <p>
                    <Spinner /> <span>{__("Loading ORCID Data","linked-open-profiles")}</span>
                </p>
            </CardBody>
        </Card>
    );
}
