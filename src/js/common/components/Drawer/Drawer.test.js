/* eslint-disable no-undef */
import React from 'react';

import { DevicesOther, FilterNone, ExitToApp, HelpOutline } from '@material-ui/icons';
import { render } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Router } from 'react-router-dom';

import { Drawer } from '.';

const initialProps = {
  isOpen: false,
  primaryItems: [
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
  secondaryItems: [
    {
      visible: true,
      label: 'Ajuda',
      path: '/help',
      icon: HelpOutline,
    },
    {
      visible: true,
      label: 'Sair',
      path: '/logout',
      icon: ExitToApp,
    },
  ],
};

describe('DrawerComponent', () => {
  it('should be able simple render with primary and secondary items', () => {
    const history = createMemoryHistory();

    const { container } = render(
      <Router history={history}>
        <Drawer {...initialProps} />
      </Router>,
    );
    const groupItens = container.querySelectorAll('ul');
    const itemsPrimaryGroupItens = groupItens[0].querySelectorAll('a');
    const itemsSecondaryGroupItens = groupItens[1].querySelectorAll('a');

    expect(container.querySelector('.MuiDrawer-root').outerHTML).toContain('drawerClose');
    expect(groupItens.length).toBe(2);
    expect(itemsPrimaryGroupItens.length).toBe(2);
    expect(itemsSecondaryGroupItens.length).toBe(2);
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

  it('should be able simple render with help menu selected', () => {
    const history = createMemoryHistory();
    history.location.pathname = '/help';

    const { container } = render(
      <Router history={history}>
        <Drawer {...initialProps} />
      </Router>,
    );
    const selectedItem = container
      .querySelector('.Mui-selected')
      .querySelectorAll('div')[1]
      .querySelector('span');

    expect(selectedItem.innerHTML).toEqual('Ajuda');
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

  it('should be able simple render with primary items only', () => {
    const history = createMemoryHistory();
    const { container } = render(
      <Router history={history}>
        <Drawer {...initialProps} secondaryItems={[]} />
      </Router>,
    );
    const groupItens = container.querySelectorAll('ul');
    const itemsPrimaryGroupItens = groupItens[0].querySelectorAll('li');
    const itemsSecondaryGroupItens = groupItens[1].querySelectorAll('li');

    expect(groupItens.length).toBe(2);
    expect(itemsPrimaryGroupItens.length).toBe(2);
    expect(itemsSecondaryGroupItens.length).toBe(0);
  });

  it('should be able to render menu items from primary and secondary items', () => {
    const history = createMemoryHistory();
    const { container } = render(
      <Router history={history}>
        <Drawer {...initialProps} />
      </Router>,
    );
    const groupItens = container.querySelectorAll('ul');
    const itemsPrimaryGroupItens = groupItens[0].querySelectorAll('a');
    const itemsSecondaryGroupItens = groupItens[1].querySelectorAll('a');

    expect(groupItens.length).toBe(2);

    // Primary Items assertions
    expect(itemsPrimaryGroupItens.length).toBe(2);
    expect(itemsPrimaryGroupItens[0].href).toContain('/devices');
    expect(itemsPrimaryGroupItens[1].href).toContain('/templates');
    expect(
      itemsPrimaryGroupItens[0].querySelector('li').querySelectorAll('div')[1].querySelector('span')
        .innerHTML,
    ).toBe('Dispositivos');
    expect(
      itemsPrimaryGroupItens[1].querySelector('li').querySelectorAll('div')[1].querySelector('span')
        .innerHTML,
    ).toBe('Modelos');

    // Secondary Items assertions
    expect(itemsSecondaryGroupItens.length).toBe(2);
    expect(itemsSecondaryGroupItens[0].href).toContain('/help');
    expect(itemsSecondaryGroupItens[1].href).toContain('/logout');
    expect(
      itemsSecondaryGroupItens[0]
        .querySelector('li')
        .querySelectorAll('div')[1]
        .querySelector('span').innerHTML,
    ).toBe('Ajuda');
    expect(
      itemsSecondaryGroupItens[1]
        .querySelector('li')
        .querySelectorAll('div')[1]
        .querySelector('span').innerHTML,
    ).toBe('Sair');
  });
});
