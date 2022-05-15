import { Menu, MenuItem } from '@mui/material';
import {
 useImperativeHandle, useState, MouseEvent, forwardRef, FC, memo,
} from 'react';

interface menuItemType{
    title: string,
    onClick: ()=>void,
}

interface PhotoMenuProps{
    menuItems : menuItemType[]
}

const PhotoMenu: FC<PhotoMenuProps> = ({ menuItems }, ref) => {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const handleClick = (event: MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    useImperativeHandle(ref, () => ({
        handleClose,
        handleClick,
    }));

    return (
        <>
            <Menu
                id="demo-positioned-menu"
                aria-labelledby="demo-positioned-button"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'left',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'left',
                }}
            >
                {
                    menuItems.map((item:menuItemType) => <MenuItem onClick={item.onClick}>{item.title}</MenuItem>)
                }
            </Menu>
        </>
    );
};

export default memo(forwardRef(PhotoMenu));
