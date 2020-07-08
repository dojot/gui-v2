import { createSelector } from 'reselect'

const dashboardDataSelector = (state) => state.dashboard

const layoutSelector = createSelector(dashboardDataSelector, (payload) => payload.get('layout'))
const dataSelector = createSelector(dashboardDataSelector, (payload) => payload.get('data'))
const configsSelector = createSelector(dashboardDataSelector, (payload) => payload.get('configs'))

export const dashboardLayout = (state) => ({
  layout: layoutSelector(state),
})

export const dashboardData = (state) => ({
  data: dataSelector(state),
})

export const dashboardConfig = (state) => ({
  configs: configsSelector(state),
})
