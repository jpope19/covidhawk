import { getField, updateField } from 'vuex-map-fields'

export const state = () => ({
  // Did you receive an antibody test?
  antibody: {
    tested: false,
    date: null,
    result: '',
  },
  // Did you receive a viral test?
  viral: {
    tested: false,
    date: null,
    result: '',
  },
  start: null,
  recovery: '',
  // Did you see a doctor?
  doctors: [],
});

export const getters = { getField };

export const mutations = { updateField };
