// @mui
import {Button, Container, Divider, Input, InputAdornment} from '@mui/material';
// hooks
import {useEffect, useRef, useState} from "react";
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

const SearchbarStyle = styled('div')(({theme}) => ({
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
    const {themeStretch} = useSettings();

    const [search, setSearch] = useState('')
    const [searchContent, setSearchContent] = useState('')
    const [page, setPage] = useState(1)
    const [hasNext, setHasNext] = useState(false)
    const [items, setItems] = useState([])
    const pageEndRef = useRef(null);

    useEffect(async () => {
        const res = await getAllPost({
            pageSize: 10,
            pageNumber: 1
        })
        setItems(res.data)
        setHasNext(res.hasNext)
    }, []);

    useEffect( () => {
        console.log('update hasnext')
        if (!hasNext) {
            return;
        }

        const observerCallback = async (entries) => {
            if (entries[0].isIntersecting && hasNext) { // If the observed element is in viewport
                setPage((prev) => prev + 1); // Increment the page number
            }
        };

        console.log('create')
        const observer = new IntersectionObserver(observerCallback);

        if (pageEndRef.current) {
            console.log('observe')
            observer.observe(pageEndRef.current);
        }

        return () => {
            if (pageEndRef.current) {
                console.log('unobserve')
                observer.unobserve(pageEndRef.current);
            }
        };
    }, [hasNext]);

    useEffect(async () => {
        await fetchPost()
    }, [page, searchContent])

    const fetchPost = async () => {
        if (!searchContent) {
            const res = await getAllPost({
                pageNumber: page,
                pageSize: 10
            })
            if(page === 1) {
                setItems(res.data)
            } else {
                setItems((prevItems) => [...prevItems, ...res.data])
            }
            setHasNext(res.hasNext)
        } else {
            const res = await getPostByTitle({
                title: searchContent,
                pageNumber: page,
                pageSize: 10
            })
            if(page === 1) {
                setItems(res.data)
            } else {
                setItems((prevItems) => [...prevItems, ...res.data])
            }
            setHasNext(res.hasNext)
        }
    }

    const searchPostByName = () => {
        setSearchContent(search)
        setPage(1)
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
                                sx={{color: 'text.disabled', width: 20, height: 20}}
                            />
                        </InputAdornment>
                    }
                    sx={{mr: 1, fontWeight: 'fontWeightBold'}}
                />
                <Button variant="contained" onClick={searchPostByName}>
                    Search
                </Button>
            </SearchbarStyle>
            <Container maxWidth={themeStretch ? false : 'xl'}>
                <MasonryGallery items={items}/>
            </Container>
            {hasNext ? <div ref={pageEndRef}>Load more</div> : <div>End of content</div>}
        </Page>
    );
}