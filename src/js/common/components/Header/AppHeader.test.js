import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

import AppHeader from './AppHeader.jsx';


describe('AppHeader', () => {
    const isOpen = false;
    const mockedHandleClick = jest.fn();
    const title = "Titulo";
    it('should to able simple render ', ()=>{            
        const { container } = render(<AppHeader
            isOpen = {isOpen}
            title={title}
            handleClick = {mockedHandleClick}
          />);
        
        expect(container).toBeInTheDocument();
    });


    it('Should show the button', ()=>{       

        const { container, getByTestId } = render(<AppHeader
            isOpen = {isOpen}
            title={title}
            handleClick = {mockedHandleClick}
        />);
        expect(container).toBeInTheDocument();
        fireEvent.click(getByTestId('butonOpen'));
        expect(mockedHandleClick).toHaveBeenCalled();
        fireEvent.click(getByTestId('butonNotOpen'));
        expect(mockedHandleClick).toHaveBeenCalled();
    });
});