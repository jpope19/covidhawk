import { getField, updateField } from 'vuex-map-fields'

export const state = () => ({
  step: 1,
  totalSteps: 1,
  recaptcha: ''
});

export const getters = { getField };

export const mutations = { updateField };