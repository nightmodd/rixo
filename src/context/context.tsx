import React, {  useState } from 'react';
import { any } from 'zod';


const Context = React.createContext({
    dropdown: false,
    dropdownWord: any,
    handleClick: (event: React.MouseEvent<HTMLButtonElement>) => {
        console.log(event.currentTarget);
    },
});

export default Context;

interface ContextProviderProps {
    children: React.ReactNode;
}

export const ContextProvider = (props: ContextProviderProps) => {
    const [dropdown, setDropdown] = useState(false);
    let dropdownWord: any;

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setDropdown(!dropdown);
        dropdownWord = event.currentTarget.childNodes[0].textContent;
        console.log(dropdownWord);
    };

    const value = {
        dropdown,
        dropdownWord,
        handleClick,
    };
    return <Context.Provider value={value}>{props.children}</Context.Provider>;
};
