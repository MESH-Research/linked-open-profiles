import { Spinner } from "@wordpress/components";
export default function LoadingSpinner() {
    return (
        <div>
            <Spinner /> <span>Loading ORCID Data</span>
        </div>
    );
}
