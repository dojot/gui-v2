import { createSelector } from 'reselect'

const dashboardDataSelector = (state) => state.dashboard

const layoutSelector = createSelector(dashboardDataSelector, (payload) => payload.get('layout'))
const dataSelector = createSelector(dashboardDataSelector, (payload) => payload.get('data'))

export const dashboardLayout = (state) => ({
  layout: layoutSelector(state),
})

export const dashboardData = (state) => ({
  data: dataSelector(state),
})
