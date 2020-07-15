<template>
  <v-container fluid>
    <v-row>
      <v-col cols="12">
        <header>COVID Contraction</header>
      </v-col>
    </v-row>
    <v-row>

    </v-row>
  </v-container>
</template>

<script>
  export default {
    data: () => ({
      // When do you think you contracted COVID19? 1-2 days ago, 3-7 days ago, 1+ week ago, Unknown
      lag: '',
      lagOptions: [
        '1-2 days ago',
        '3-7 days ago',
        '1+ week ago',
        'Unknown',
      ],
      // Where do you think you contracted COVID19? 
      location: '',
      locationOptions: [
        'airplane',
        'bar',
        'beach',
        'family',
        'grocery store',
        'hotel',
        'restaurant',
        'retail store',
      ],
      // How often did you wear a mask around people indoors? Very often, often, rarely, never
      // How often did you wear a mask around people outdoors? Very often, often, rarely, never
      maskIn: '',
      maskOut: '',
      maskOptions: [
        'Very often',
        'often',
        'rarely',
        'never',
      ],
      // What type of home do you live in? single-family, townhome, small apartment/condominium complex, large apartment/condominium complex
      housing: '',
      housingOptions: [
        'single-family',
        'townhome',
        'small apartment complex',
        'large apartment complex',
      ],
      // How many others live in your household? 0, 1, 2, 3+
      roommates: '',
      roommatesOptions: [ '0', '1', '2', '3+' ],
      // Are you currently working? no, remotely, in an office, other
      work: '',
      workOptions: [
        'no',
        'remotely',
        'in an office',
        'other',
      ],
      // Roughly how many people have you been in close contact with in the last week? 0-5, 6-10, 11-20, 21+
      contacts: '',
      contactsOptions: [ '0-5', '6-10', '11-20', '21+' ],
      // Have you been on an airplane in the past two weeks? boolean
      airplane: false,
      // Have you stayed in a hotel in the past two weeks? boolean
      hotel: false,
      // How often do you exercise indoors? 0-1 times per week, 2-3 times per week, 4-5 times per week, 6-7 times per week
      exercise: '',
      exerciseOptions: [
        '0-1 time per week',
        '2-3 times per week',
        '4-5 times per week',
        '6-7 times per week'
      ],
      // Have you been in a gym in the past two weeks? boolean
      gym: false,
      // Generally speaking, how cautious are you? Very cautious, cautious, not cautious      
      cautiousness: '',
      cautiousnessOptions: [
        'very cautious',
        'cautious',
        'semi cautious',
        'not cautious',
      ]
    })
  }
</script>