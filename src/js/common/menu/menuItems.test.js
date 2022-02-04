import { MENU_ITEMS } from '.';

describe('Drawer Menu Items', () => {
  it('should all item names be different from each other', () => {
    const names = [];

    MENU_ITEMS.forEach(item => {
      names.push(item.name);

      if (item.subItems) {
        item.subItems.forEach(subItem => {
          names.push(subItem.name);
        });
      }
    });

    expect(new Set(names).size).toBe(names.length);
  });
});
