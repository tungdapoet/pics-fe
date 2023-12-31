// @mui
import {Button, Container, Input, InputAdornment} from '@mui/material';
// hooks
import {useEffect, useState} from "react";
import {styled} from "@mui/material/styles";
import useSettings from "../../../hooks/useSettings";
// components
import Page from "../../../components/Page";
import MasonryGallery from "../../../components/MasonryGallery";
import {getAllPost, getPostByTitle} from "../../../api/posts";
import Iconify from "../../../components/Iconify";
import cssStyles from "../../../utils/cssStyles";

// ----------------------------------------------------------------------

const APPBAR_MOBILE = 64;
const APPBAR_DESKTOP = 92;

const SearchbarStyle = styled('div')(({ theme }) => ({
    ...cssStyles(theme).bgBlur(),
    marginBottom: 50,
    zIndex: 99,
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    height: APPBAR_MOBILE,
    padding: theme.spacing(0, 3),
}));


export default function Home() {
    const { themeStretch } = useSettings();

    const [search, setSearch] = useState('')

    const [items, setItems] = useState([])

    useEffect(async () => {
        const res = await getAllPost({
            pageSize: 10,
            pageNumber: 1
        })
        setItems(res.data)
    }, []);


    const fetchPost = () => {
        if(!search) {
            getAllPost({
                pageNumber: 1,
                pageSize: 10
            }).then((res) => {
                setItems(res.data)
            })
        } else {
            getPostByTitle({
                title: search
            }).then((res) => {
                setItems(res.data)
            })
        }
    }

    return (
        <Page title="Home">
            <SearchbarStyle>
                <Input
                    autoFocus
                    fullWidth
                    disableUnderline
                    placeholder="Search…"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    startAdornment={
                        <InputAdornment position="start">
                            <Iconify
                                icon={'eva:search-fill'}
                                sx={{ color: 'text.disabled', width: 20, height: 20 }}
                            />
                        </InputAdornment>
                    }
                    sx={{ mr: 1, fontWeight: 'fontWeightBold' }}
                />
                <Button variant="contained" onClick={fetchPost}>
                    Search
                </Button>
            </SearchbarStyle>
            <Container maxWidth={themeStretch ? false : 'xl'}>
                <MasonryGallery items={items} />
            </Container>
        </Page>
    );
}