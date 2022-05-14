import { Dialog, DialogContent, DialogTitle } from '@mui/material';
import { ReactElement, memo, FC } from 'react';

interface PhotoDialogProps{
    children: ReactElement,
    title: string,
    handleOpen:(state:boolean)=>void,
    open:boolean
}

const PhotoDialog: FC<PhotoDialogProps> = ({
 children, handleOpen, title, open,
}) => (
        <>

            <Dialog onClose={() => handleOpen(false)} open={open}>
                <DialogTitle>{title}</DialogTitle>
                <DialogContent>
                    {children}
                </DialogContent>
            </Dialog>
        </>
    );

export default memo(PhotoDialog);
