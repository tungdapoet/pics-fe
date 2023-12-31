import { paramCase } from 'change-case';
import {useEffect, useState} from 'react';
import { useNavigate } from 'react-router-dom';
// @mui
import {
    Box,
    Card,
    Table,
    Divider,
    TableBody,
    Container,
    TableContainer,
    TablePagination,
} from '@mui/material';
// routes
import { PATH_DASHBOARD } from '../../../routes/paths';
// hooks
import useSettings from '../../../hooks/useSettings';
import useTable, { emptyRows } from '../../../hooks/useTable';
// components
import Page from '../../../components/Page';
import Scrollbar from '../../../components/Scrollbar';
import { TableEmptyRows, TableHeadCustom, TableNoData } from '../../../components/table';
// sections
import { UserTableToolbar, UserTableRow } from '../../../sections/@dashboard/user/list';
import {deleteUser, getAllUser, getUserByName} from "../../../api/user";

// ----------------------------------------------------------------------


const TABLE_HEAD = [
    { id: 'fullName', label: 'Full name', align: 'center' },
    { id: 'roleName', label: 'Role', align: 'center' },
    { id: 'email', label: 'Email', align: 'center' },
    { id: 'userStatusName', label: 'Status', align: 'center' },
    { id: '', label: 'Action', align: 'right' },
];

// ----------------------------------------------------------------------

export default function ManageUser() {
    const {
        page,
        order,
        orderBy,
        rowsPerPage,
        setPage,
        //
        onChangePage,
        onChangeRowsPerPage,
    } = useTable();

    const { themeStretch } = useSettings();

    const navigate = useNavigate();

    const [tableData, setTableData] = useState([]);

    const [filterName, setFilterName] = useState('');

    const fetchDataFromServer = async () => {
        try {
            if(!filterName) {
                const response = await getAllUser({
                    pageNumber: page + 1,
                    pageSize: rowsPerPage,
                });
                setTableData(response.data);
            } else {
                const response = await getUserByName({
                    pageNumber: page + 1,
                    pageSize: rowsPerPage,
                    name: filterName,
                });
                setTableData(response.data);
            }

        } catch (error) {
            // Xử lý lỗi khi gọi API
            console.error('Error fetching data:', error);
        }
    };

    useEffect(() => {
        fetchDataFromServer();
    }, [filterName, page, rowsPerPage]);

    const handleFilterName = (filterName) => {
        setFilterName(filterName);
        setPage(0);
    };


    const handleDeleteRow = async (id) => {
        const res = await deleteUser(id);
        navigate(0)
    };

    const handleEditRow = (id) => {
        navigate(PATH_DASHBOARD.user.edit(paramCase(id)));
    };



    const isNotFound =
        (!tableData.length && !!filterName)

    return (
        <Page title="Manage Users">
            <Container maxWidth={themeStretch ? false : 'lg'}>
                <Card>
                    <Divider />

                    <UserTableToolbar
                        filterName={filterName}
                        onFilterName={handleFilterName}
                    />

                    <Scrollbar>
                        <TableContainer sx={{ minWidth: 800, position: 'relative' }}>
                            <Table>
                                <TableHeadCustom
                                    order={order}
                                    orderBy={orderBy}
                                    headLabel={TABLE_HEAD}
                                />

                                <TableBody>
                                    {tableData.map((row) => (
                                        <UserTableRow
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


