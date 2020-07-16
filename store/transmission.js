import { getField, updateField } from 'vuex-map-fields'

export const state = () => ({
  // When do you think you contracted COVID19? 1-2 days ago, 3-7 days ago, 1+ week ago, Unknown
  lag: '',
  // Where do you think you contracted COVID19? 
  location: '',
  // How often did you wear a mask around people indoors? Very often, often, rarely, never
  // How often did you wear a mask around people outdoors? Very often, often, rarely, never
  maskIn: '',
  maskOut: '',
  // What type of home do you live in? single-family, townhome, small apartment/condominium complex, large apartment/condominium complex
  housing: '',
  // How many others live in your household? 0, 1, 2, 3+
  roommates: '',
  work: '',
  // Roughly how many people have you been in close contact with in the last week? 0-5, 6-10, 11-20, 21+
  contacts: '',
  // Have you been on an airplane in the past two weeks? boolean
  airplane: false,
  // Have you stayed in a hotel in the past two weeks? boolean
  hotel: false,
  // How often do you exercise indoors? 0-1 times per week, 2-3 times per week, 4-5 times per week, 6-7 times per week
  exercise: '',
  // Have you been in a gym in the past two weeks? boolean
  gym: false,
  // Generally speaking, how cautious are you? Very cautious, cautious, not cautious      
  cautiousness: '',
});

export const getters = { getField };

export const mutations = { updateField };
