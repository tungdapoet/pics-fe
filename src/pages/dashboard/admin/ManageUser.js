import { paramCase } from 'change-case';
import {useEffect, useState} from 'react';
import { useNavigate } from 'react-router-dom';
// @mui
import {
    Box,
    Card,
    Table,
    Tooltip,
    Divider,
    TableBody,
    Container,
    IconButton,
    TableContainer,
    TablePagination,
} from '@mui/material';
// routes
import { PATH_DASHBOARD } from '../../../routes/paths';
// hooks
import useSettings from '../../../hooks/useSettings';
import useTable, { getComparator, emptyRows } from '../../../hooks/useTable';
// components
import Page from '../../../components/Page';
import Scrollbar from '../../../components/Scrollbar';
import { TableEmptyRows, TableHeadCustom, TableNoData } from '../../../components/table';
// sections
import { UserTableToolbar, UserTableRow } from '../../../sections/@dashboard/user/list';
import {deleteUser, getAllUser} from "../../../api/user";

// ----------------------------------------------------------------------

const ROLE_OPTIONS = [
    'all',
    'Người dùng',
    'Quản trị viên'
];

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
        onSort,
        onChangePage,
        onChangeRowsPerPage,
    } = useTable();

    const { themeStretch } = useSettings();

    const navigate = useNavigate();

    const [tableData, setTableData] = useState([]);

    const [filterName, setFilterName] = useState('');

    const [filterRole, setFilterRole] = useState('all');

    const fetchDataOnInit = async () => {
        getAllUser({
            pageNumber: page + 1,
            pageSize: rowsPerPage
        }).then((res) => {
            setTableData(res.data)
        });
    }

    useEffect(async () => {
        fetchDataOnInit()
    }, []);

    const handleFilterName = (filterName) => {
        setFilterName(filterName);
        setPage(0);
    };

    const handleFilterRole = (event) => {
        setFilterRole(event.target.value);
    };

    const handleDeleteRow = async (id) => {
        const res = await deleteUser(id);
        navigate(0)
    };

    const handleEditRow = (id) => {
        navigate(PATH_DASHBOARD.user.edit(paramCase(id)));
    };

    const dataFiltered = applySortFilter({
        tableData,
        comparator: getComparator(order, orderBy),
        filterName,
        filterRole,
    });

    const isNotFound =
        (!dataFiltered.length && !!filterName) ||
        (!dataFiltered.length && !!filterRole)

    return (
        <Page title="Manage Users">
            <Container maxWidth={themeStretch ? false : 'lg'}>
                <Card>
                    <Divider />

                    <UserTableToolbar
                        filterName={filterName}
                        filterRole={filterRole}
                        onFilterName={handleFilterName}
                        onFilterRole={handleFilterRole}
                        optionsRole={ROLE_OPTIONS}
                    />

                    <Scrollbar>
                        <TableContainer sx={{ minWidth: 800, position: 'relative' }}>
                            <Table>
                                <TableHeadCustom
                                    order={order}
                                    orderBy={orderBy}
                                    headLabel={TABLE_HEAD}
                                    onSort={onSort}

                                />

                                <TableBody>
                                    {dataFiltered.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => (
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
                            count={dataFiltered.length}
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

// ----------------------------------------------------------------------

function applySortFilter({ tableData, comparator, filterName, filterRole }) {
    const stabilizedThis = tableData.map((el, index) => [el, index]);

    stabilizedThis.sort((a, b) => {
        const order = comparator(a[0], b[0]);
        if (order !== 0) return order;
        return a[1] - b[1];
    });

    tableData = stabilizedThis.map((el) => el[0]);

    if (filterName) {
        tableData = tableData.filter((item) => item.name.toLowerCase().indexOf(filterName.toLowerCase()) !== -1);
    }

    if (filterRole !== 'all') {
        tableData = tableData.filter((item) => item.role === filterRole);
    }

    return tableData;
}
