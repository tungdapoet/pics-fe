// @mui
import {Container, Typography} from '@mui/material';
// hooks
import useSettings from "../../../hooks/useSettings";
// components
import Page from "../../../components/Page";
// sections
import PinCreateForm from "../../../sections/@dashboard/pins/PinCreateForm";

// ----------------------------------------------------------------------

export default function CreatePin() {
    const { themeStretch } = useSettings();

    return (
        <Page title="Create Pic">
            <Container maxWidth={themeStretch ? false : 'lg'}>
                <Typography variant="h3" component="h1" paragraph>
                    Create a Pic
                </Typography>
                <PinCreateForm />
            </Container>
        </Page>
    );
}
