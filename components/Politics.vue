<template>
  <v-container fluid>
    <v-row>
      <v-col cols="12" md="4">
        <v-select
          v-model="election"
          :items="electionOptions"
          label="Select"
          hint="Who do you plan on voting for in the 2020 election?"
          persistent-hint
        ></v-select>
      </v-col>
      <v-col cols="12" md="4">
        <v-select
          v-model="news"
          :items="newsOptions"
          label="Select"
          hint="Where do you get most of your news?"
          persistent-hint
        ></v-select>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
  import { mapFields } from 'vuex-map-fields';

  export default {
    computed: {
      ...mapFields('politics', [
        'election',
        'news',
      ]),
    },
    data: () => ({
      electionOptions: [
        'Biden',
        'Trump',
      ],
      newsOptions: [
        'Yahoo! News',
        'Google News',
        'Huffington Post',
        'CNN',
        'The New York Times',
        'Fox News',
        'NBC News',
        'WSJ',
      ],
    })
  }
</script>