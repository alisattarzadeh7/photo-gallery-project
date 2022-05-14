import { cssTransition, toast } from 'react-toastify';

const bounce = cssTransition({
    enter: 'animate__animated animate__bounceInDown',
    exit: 'animate__animated animate__bounceOutUp',
});

export default (text:string, type:string) => toast(text, {
    transition: bounce,
    // @ts-ignore
    type: toast.TYPE[type.toUpperCase()],
});
