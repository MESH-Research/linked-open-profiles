import { Card, CardBody, Spinner } from "@wordpress/components";
export default function LoadingSpinner() {
    return (
        <Card>
            <CardBody>
                <p>
                    <Spinner /> <span>Loading ORCID Data</span>
                </p>
            </CardBody>
        </Card>
    );
}
