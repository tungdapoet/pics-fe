// @mui
import { Container } from '@mui/material';
// hooks
import {useEffect, useState} from "react";
import useSettings from "../../../hooks/useSettings";
// components
import Page from "../../../components/Page";
import MasonryGallery from "../../../components/MasonryGallery";
import {getAllPost} from "../../../api/posts";

// ----------------------------------------------------------------------

export default function Home() {
    const { themeStretch } = useSettings();

    const [items, setItems] = useState([])
    useEffect(async () => {
        const res = await getAllPost({
            pageSize: 10,
            pageNumber: 1
        })
        setItems(res.data)
    }, []);


    return (
        <Page title="Home">
            <Container maxWidth={themeStretch ? false : 'xl'}>
                <MasonryGallery items={items} />
            </Container>
        </Page>
    );
}