import { paramCase } from 'change-case';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
// @mui
import {
    Box,
    Card,
    Table,
    TableBody,
    Container,
    TableContainer,
    TablePagination,
} from '@mui/material';
// redux
import {useSnackbar} from "notistack";
// routes
import { PATH_DASHBOARD } from '../../../routes/paths';
// hooks
import useSettings from '../../../hooks/useSettings';
import useTable, { emptyRows } from '../../../hooks/useTable';
// components
import Page from '../../../components/Page';
import Scrollbar from '../../../components/Scrollbar';

import {
    TableNoData,
    TableEmptyRows,
    TableHeadCustom,
} from '../../../components/table';
// sections
import PinTableRow from "../../../sections/@dashboard/pins/PinTableRow";
import PinTableToolbar from "../../../sections/@dashboard/pins/PinToolBar";
import {deletePost, getAllPost, getPostByTitle} from "../../../api/posts";


// ----------------------------------------------------------------------

const TABLE_HEAD = [
    { id: 'name', label: 'Pic', align: 'left' },
    { id: 'description', label: 'Description', align: 'left' },
    { id: 'createdBy', label: 'createdBy', align: 'left' },
    { id: '' },
];

// ----------------------------------------------------------------------

export default function ManagePin() {
    const {
        page,
        rowsPerPage,
        setPage,
        //
        onChangePage,
        onChangeRowsPerPage,
    } = useTable();

    const {enqueueSnackbar} = useSnackbar();

    const { themeStretch } = useSettings();

    const navigate = useNavigate();

    const [tableData, setTableData] = useState([]);

    const [filterName, setFilterName] = useState('');

    const fetchDataOnInit = () => {
        if(!filterName) {
            getAllPost({
                pageNumber: page + 1,
                pageSize: rowsPerPage
            }).then((res) => {
                setTableData(res.data)
            })
        } else {
            getPostByTitle({
                title: filterName
            }).then((res) => {
                setTableData(res.data)
            })
        }
    }

    useEffect(() => {
        fetchDataOnInit()
    }, [filterName]);

    const handleFilterName = (filterName) => {
        setFilterName(filterName);
        setPage(0);
    };

    const handleDeleteRow = async (id) => {
        try {
            await deletePost(id);
            enqueueSnackbar('Delete post success');
            navigate(0);
        } catch (e) {
            enqueueSnackbar('Delete post error', {variant: 'error'});
        }
    };

    const handleEditRow = (id) => {
        navigate(PATH_DASHBOARD.eCommerce.edit(paramCase(id)));
    };

    const isNotFound = !tableData.length && !!filterName

    return (
        <Page title="Manage Pics">
            <Container maxWidth={themeStretch ? false : 'lg'}>
                <Card>
                    <PinTableToolbar filterName={filterName} onFilterName={handleFilterName} />

                    <Scrollbar>
                        <TableContainer sx={{ minWidth: 800 }}>

                            <Table>
                                <TableHeadCustom
                                    headLabel={TABLE_HEAD}
                                    rowCount={tableData.length}
                                />

                                <TableBody>
                                    {tableData.map((row) => (
                                        <PinTableRow
                                            key={row.id}
                                            row={row}
                                            onDeleteRow={() => handleDeleteRow(row.id)}
                                            onEditRow={() => handleEditRow(row.name)}
                                        />
                                    ))}

                                    <TableEmptyRows emptyRows={emptyRows(page, rowsPerPage, tableData.length)} />

                                    <TableNoData isNotFound={isNotFound} />
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Scrollbar>

                    <Box sx={{ position: 'relative' }}>
                        <TablePagination
                            rowsPerPageOptions={[5, 10, 25]}
                            component="div"
                            count={tableData.length}
                            rowsPerPage={rowsPerPage}
                            page={page}
                            onPageChange={onChangePage}
                            onRowsPerPageChange={onChangeRowsPerPage}
                        />
                    </Box>
                </Card>
            </Container>
        </Page>
    );
}
