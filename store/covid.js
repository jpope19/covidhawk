import { getField, updateField } from 'vuex-map-fields'

export const state = () => ({
  testing: {
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
  },
  symptoms: {
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
  },
  transmission: {
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
  },
  personal: {
    age: '',
    gender: '',
    race: '',
  },
  location: {
    zipcode: '',
    coords: {
      latitude: null,
      longitude: null,
    },
  },
});

export const getters = { getField };

export const mutations = { updateField };
