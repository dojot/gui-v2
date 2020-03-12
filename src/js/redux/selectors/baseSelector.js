import { createSelector } from 'reselect'

const baseDataSelector = (state) => state.base

const resultSelector = createSelector(baseDataSelector, (payload) => payload.get('isMenuOpen'))

export const menuSelector = (state) => ({
  isMenuOpen: resultSelector(state),
})
