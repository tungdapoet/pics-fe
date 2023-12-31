import { format } from 'date-fns';
import { useState, useEffect } from 'react';
// @mui
import {
    Card,
    Table,
    TableBody,
    Container,
    TableContainer,
    TableCell, TableRow, TableHead,
} from '@mui/material';

import useSettings from '../../../hooks/useSettings';

import Page from '../../../components/Page';
import Scrollbar from '../../../components/Scrollbar';

import {getAllReport} from "../../../api/report";


// ----------------------------------------------------------------------

const TABLE_HEAD = [
    { id: 'userReportedName', label: 'Reported', align: 'center' },
    { id: 'userReportName', label: 'Report', align: 'center' },
    { id: 'reason', label: 'Reason', align: 'center' },
    { id: 'createAt', label: 'Created At', align: 'center' },
    { id: 'reportType', label: 'Report type', align: 'center' },
];

// ----------------------------------------------------------------------

const formatDate = (isoDate) => {
    const date = new Date(isoDate);
    return format(date, 'dd/MM/yyyy');
};

export default function Report() {

    const { themeStretch } = useSettings();

    const [tableData, setTableData] = useState([]);


    useEffect(async () => {
        getAllReport().then((res) => {
            setTableData(res.data)
        })
    }, []);




    return (
        <Page title="Manage Reports">
            <Container maxWidth={themeStretch ? false : 'lg'}>
                <Card>

                    <Scrollbar>
                        <TableContainer sx={{ minWidth: 800 }}>

                            <Table>
                                <TableHead>
                                    <TableRow>
                                        {TABLE_HEAD.map((header) => (
                                            <TableCell key={header.id} align={header.align}>
                                                {header.label}
                                            </TableCell>
                                        ))}
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {/* Render your table rows using data */}
                                    {/* Example: */}
                                    {tableData.map((row, index) => (
                                        <TableRow key={index}>
                                            <TableCell align="center">{row.postId ? `Post with Id ${row.postId}` : row.userReportedName}</TableCell>
                                            <TableCell align="center">{row.userReportName}</TableCell>
                                            <TableCell align="center">{row.reason}</TableCell>
                                            <TableCell align="center">{formatDate(row.createAt)}</TableCell>
                                            <TableCell align="center">{row.reportType}</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Scrollbar>

                </Card>
            </Container>
        </Page>
    );
}

// ----------------------------------------------------------------------

