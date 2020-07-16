import { getField, updateField } from 'vuex-map-fields'

export const state = () => ({
  // Fever above 100F?
  fever: false,
  // Congestion or runny nose
  congestion: false,
  // Loss of taste or smell
  senses: false,
  // Shortness of breath or difficulty breathing
  breathing: false,
  // Cough
  cough: false,
  // Unusual fatigue
  fatigue: false,
  // Chills or body aches
  aches: false,
  // Vomiting or diarrhea
  diarrhea: false,
  // Loss of appetite
  appetite: false,
});

export const getters = { getField };

export const mutations = { updateField };
