import { ThemeOptions } from '@mui/material/styles';

const lightThemeOptions: ThemeOptions = {
    palette: {
        mode: 'light',
        // @ts-ignore
        danger: {
            light: 'rgba(255,0,0,0.66)',
            main: '#ff0000',
            // dark: will be calculated from palette.secondary.main,
            contrastText: '#ffcc00',
        },
        // @ts-ignore
        white: {
            light: 'rgba(255,255,255,0.66)',
            main: '#ffffff',
            // dark: will be calculated from palette.secondary.main,
            contrastText: '#ffcc00',
        },
    },
    components: {
        MuiButton: {
            styleOverrides: {
                root: {
                    fontSize: '1rem',
                },
            },
        },
        MuiDialog: {
            styleOverrides: {
                paper: {
                    minWidth: 'fit-content',
                },
            },
        },
    },
};

export default lightThemeOptions;
