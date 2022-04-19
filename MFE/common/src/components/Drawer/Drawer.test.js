import React from 'react';

import { DevicesOther, FilterNone } from '@material-ui/icons';
import { render } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Router } from 'react-router-dom';

import { Drawer } from './index';

const devicesMenuItem = {
  visible: true,
  name: 'devices',
  path: '/devices',
  icon: DevicesOther,
};

const templatesMenuItem = {
  visible: true,
  name: 'templates',
  path: '/templates',
  icon: FilterNone,
};

const initialProps = {
  isOpen: false,
  menuItems: [devicesMenuItem, templatesMenuItem],
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
    history.location.pathname = devicesMenuItem.path;

    const { container } = render(
      <Router history={history}>
        <Drawer {...initialProps} />
      </Router>,
    );

    const selectedItem = container
      .querySelector('.Mui-selected')
      .querySelectorAll('div')[1]
      .querySelector('span');

    expect(selectedItem.innerHTML).toEqual(devicesMenuItem.name);
  });

  it('should be able simple render with template menu selected', () => {
    const history = createMemoryHistory();
    history.location.pathname = templatesMenuItem.path;

    const { container } = render(
      <Router history={history}>
        <Drawer {...initialProps} />
      </Router>,
    );

    const selectedItem = container
      .querySelector('.Mui-selected')
      .querySelectorAll('div')[1]
      .querySelector('span');

    expect(selectedItem.innerHTML).toEqual(templatesMenuItem.name);
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
    expect(menuItems[0].href).toContain(devicesMenuItem.path);
    expect(menuItems[1].href).toContain(templatesMenuItem.path);

    expect(
      menuItems[0].querySelector('li').querySelectorAll('div')[1].querySelector('span').innerHTML,
    ).toBe(devicesMenuItem.name);

    expect(
      menuItems[1].querySelector('li').querySelectorAll('div')[1].querySelector('span').innerHTML,
    ).toBe(templatesMenuItem.name);
  });
});
