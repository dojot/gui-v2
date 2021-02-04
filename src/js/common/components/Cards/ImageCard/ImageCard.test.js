import React from 'react';

import { render, fireEvent } from '@testing-library/react';
import Bar from 'Assets/images/bar.png';
import '@testing-library/jest-dom/extend-expect';
import { ImageCard } from 'Components/Cards';

describe('ImageCard', () => {
  const title = 'Gráfico de Barras';
  const description = 'Representa os dados por barras';

  it('should to able simple render ', () => {
    const { container, getByTestId } = render(
      <ImageCard
        title={title}
        image={Bar}
        description={description}
        handleClick={() => {}}
      />,
    );

    expect(container).toBeInTheDocument();
    expect(getByTestId('title').innerHTML).toEqual(title);
    expect(getByTestId('description').innerHTML).toEqual(description);
  });

  it('should to able to click on card ', () => {
    const mockedHandleClick = jest.fn();

    const { getByTestId } = render(
      <ImageCard
        title={title}
        image={Bar}
        description={description}
        handleClick={mockedHandleClick}
      />,
    );

    const cardAction = getByTestId('card-action');
    fireEvent.click(cardAction);
    expect(mockedHandleClick).toHaveBeenCalled();
  });
});
