import * as React from 'react';
import {Drawer, Icon, List, ListItem, ListItemIcon, ListItemText, withStyles} from '@material-ui/core';
import Link from 'next/link';

interface Props {
    readonly open: boolean;
    readonly onClose: () => void;
}

const decorate = withStyles((_) => ({
    list: {
        width: 250,
    },
}));

const items = [
    {name: 'Home page', route: '/', icon: 'home', divider: false},
    {name: 'Profile', route: '/profile', icon: 'info', divider: true},
    {name: 'Info', route: '/info', icon: 'info', divider: false},
];

export const LeftMenu = decorate<Props>(({open, onClose, classes}) => (
    <Drawer open={open} onClose={onClose}>
        <div tabIndex={0} role="button" onClick={onClose} onKeyDown={onClose}>
            <div className={classes.list}>
                <List>
                    {items.map((item) => (
                        <Link href={item.route} key={item.name}>
                            <ListItem button divider={item.divider}>
                                <ListItemIcon>
                                    <Icon>{item.icon}</Icon>
                                </ListItemIcon>
                                <ListItemText primary={item.name} />
                            </ListItem>
                        </Link>
                    ))}
                </List>
            </div>
        </div>
    </Drawer>
));
