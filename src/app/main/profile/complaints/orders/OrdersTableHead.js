import React, {useState} from 'react';
import {TableHead, TableSortLabel, TableCell, TableRow, Checkbox, Tooltip, IconButton, Icon, Menu, MenuList, MenuItem, ListItemIcon, ListItemText,} from '@material-ui/core';
import clsx from 'clsx';
import {makeStyles} from '@material-ui/styles';

const rows = [
    {
        id            : 'item',
        align         : 'left',
        disablePadding: false,
        label         : 'Item',
        sort          : true
    },
    {
        id            : 'subject',
        align         : 'left',
        disablePadding: false,
        label         : 'Subject',
        sort          : true
    },
    {
        id            : 'date',
        align         : 'left',
        disablePadding: false,
        label         : 'Date',
        sort          : true
    }
];

const useStyles = makeStyles(theme => ({
    actionsButtonWrapper: {
        background: theme.palette.background.paper
    }
}));

function OrdersTableHead(props)
{
    const classes = useStyles(props);
    const [selectedOrdersMenu, setSelectedOrdersMenu] = useState(null);

    const createSortHandler = property => event => {
        props.onRequestSort(event, property);
    };

    function openSelectedOrdersMenu(event)
    {
        setSelectedOrdersMenu(event.currentTarget);
    }

    function closeSelectedOrdersMenu()
    {
        setSelectedOrdersMenu(null);
    }

    function removeSelectedComplaints()
    {
        console.log(selectedOrdersMenu);
    }
    // const {onSelectAllClick, order, orderBy, numSelected, rowCount} = props;

    return (
        <TableHead>
            <TableRow className="h-64">
                {rows.map(row => {
                    return (
                        <TableCell
                            key={row.id}
                            align={row.align}
                            padding={row.disablePadding ? 'none' : 'default'}
                            sortDirection={props.order.id === row.id ? props.order.direction : false}
                        >
                            {row.sort && (
                                <Tooltip
                                    title="Sort"
                                    placement={row.align === "right" ? 'bottom-end' : 'bottom-start'}
                                    enterDelay={300}
                                >
                                    <TableSortLabel
                                        active={props.order.id === row.id}
                                        direction={props.order.direction}
                                        onClick={createSortHandler(row.id)}
                                    >
                                        {row.label}
                                    </TableSortLabel>
                                </Tooltip>
                            )}
                        </TableCell>
                    );
                }, this)}
            </TableRow>
        </TableHead>
    );
}

export default OrdersTableHead;
