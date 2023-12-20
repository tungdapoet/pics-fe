// @mui
import { Container } from '@mui/material';
// hooks
import useSettings from "../../../hooks/useSettings";
// components
import Page from "../../../components/Page";
import MasonryGallery from "../../../components/MasonryGallery";

// ----------------------------------------------------------------------

export default function Home() {
    const { themeStretch } = useSettings();

    const items = [
        {
            title: 'Image Title 1',
            author: 'Author Name 1',
            image: 'https://picsum.photos/720/1080',
        },
        {
            title: 'Image Title 2',
            author: 'Author Name 2',
            image: 'https://picsum.photos/1080/1920',
        },
        {
            title: 'Image Title 3',
            author: 'Author Name 3',
            image: 'https://picsum.photos/1440/2560',
        },
        {
            title: 'Image Title 4',
            author: 'Author Name 4',
            image: 'https://picsum.photos/1080/1920',
        },
        {
            title: 'Image Title 5',
            author: 'Author Name 5',
            image: 'https://picsum.photos/1080/1920',
        },{
            title: 'Image Title 1',
            author: 'Author Name 1',
            image: 'https://picsum.photos/720/1080',
        },
        {
            title: 'Image Title 2',
            author: 'Author Name 2',
            image: 'https://picsum.photos/1080/1920',
        },
        {
            title: 'Image Title 3',
            author: 'Author Name 3',
            image: 'https://picsum.photos/1440/2560',
        },
        {
            title: 'Image Title 4',
            author: 'Author Name 4',
            image: 'https://picsum.photos/1080/1920',
        },
        {
            title: 'Image Title 5',
            author: 'Author Name 5',
            image: 'https://picsum.photos/1080/1920',
        },
        // Add more items as needed
    ];

    return (
        <Page title="Home">
            <Container maxWidth={themeStretch ? false : 'xl'}>
                <MasonryGallery items={items} />
            </Container>
        </Page>
    );
}