import React from 'react';

import { DevicesOther, FilterNone } from '@material-ui/icons';
import { render } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Router } from 'react-router-dom';

import { Drawer } from '.';

const initialProps = {
  isOpen: false,
  menuItems: [
    {
      visible: true,
      label: 'Dispositivos',
      path: '/devices',
      icon: DevicesOther,
    },
    {
      visible: true,
      label: 'Modelos',
      path: '/templates',
      icon: FilterNone,
    },
  ],
};

describe('DrawerComponent', () => {
  it('should be able to render the menu items', () => {
    const history = createMemoryHistory();

    const { container } = render(
      <Router history={history}>
        <Drawer {...initialProps} />
      </Router>,
    );

    const menuList = container.querySelector('ul');
    const menuItems = menuList.querySelectorAll('a');

    expect(container.querySelector('.MuiDrawer-root').outerHTML).toContain('drawerClose');
    expect(menuItems.length).toBe(2);
  });

  it('should be able simple render with device menu selected', () => {
    const history = createMemoryHistory();
    history.location.pathname = '/devices';

    const { container } = render(
      <Router history={history}>
        <Drawer {...initialProps} />
      </Router>,
    );

    const selectedItem = container
      .querySelector('.Mui-selected')
      .querySelectorAll('div')[1]
      .querySelector('span');

    expect(selectedItem.innerHTML).toEqual('Dispositivos');
  });

  it('should be able simple render with template menu selected', () => {
    const history = createMemoryHistory();
    history.location.pathname = '/templates';

    const { container } = render(
      <Router history={history}>
        <Drawer {...initialProps} />
      </Router>,
    );

    const selectedItem = container
      .querySelector('.Mui-selected')
      .querySelectorAll('div')[1]
      .querySelector('span');

    expect(selectedItem.innerHTML).toEqual('Modelos');
  });

  it('should be able simple render opened drawer', () => {
    const history = createMemoryHistory();

    const { container } = render(
      <Router history={history}>
        <Drawer {...initialProps} isOpen />
      </Router>,
    );

    expect(container.querySelector('.MuiDrawer-root').outerHTML).toContain('drawerOpen');
  });

  it('should be able to render all menu items', () => {
    const history = createMemoryHistory();

    const { container } = render(
      <Router history={history}>
        <Drawer {...initialProps} />
      </Router>,
    );

    const menuList = container.querySelector('ul');
    const menuItems = menuList.querySelectorAll('a');

    expect(menuItems.length).toBe(2);
    expect(menuItems[0].href).toContain('/devices');
    expect(menuItems[1].href).toContain('/templates');

    expect(
      menuItems[0].querySelector('li').querySelectorAll('div')[1].querySelector('span').innerHTML,
    ).toBe('Dispositivos');

    expect(
      menuItems[1].querySelector('li').querySelectorAll('div')[1].querySelector('span').innerHTML,
    ).toBe('Modelos');
  });
});
