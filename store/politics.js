import { getField, updateField } from 'vuex-map-fields'

export const state = () => ({
  // Who do you plan on voting for in the 2020 election? Biden, Trump
  election: '',
  // Where do you think you contracted COVID19? 
  news: '',
});

export const getters = { getField };

export const mutations = { updateField };
