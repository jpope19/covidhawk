<template>
  <v-layout column justify-center align-center>
    <v-flex xs12 sm8 md6>
      <v-card>
        <v-card-title class="headline">
          <v-img src="/CovidHawk_Logo_Navy_Horizontal-01.png" width="280"></v-img>
        </v-card-title>
        <v-card-text>
          <v-divider></v-divider>
          <v-layout justify-center align-center>
            <v-flex xs12 md8 text-center mt-4>
              <h3 class="pb-2">About Us</h3>
              <p>
                Our goal is to give the public a chance to help end the COVID pandemic.
                Currently, our testing situation has improved, but it is still not where it needs to be.
                Even if everyone who wanted a test, could get a test, we are still looking at a valuable 2 to 5 week time period from when first symptoms appear to when a person gets counted as a COVID positive.
              </p>
              <p>
                By working together, we can use historical data, as well as new symptomatic cases, to get rid of the lag. If we all anonymously input what we individually know about the virus, we can really make a difference.
                This application gives us the chance to document and give a voice to all 3.78 million and counting victims of COVID-19 in the United States.
              </p>
              <p>
                The data is tied to <a href="https://www.elastic.co/" target="blank">Elasticsearch</a>, so <a href="https://www.elastic.co/maps">geospatial</a> and time series data are immediately available to statisticians, epidemiologists, and government officials around the world through <a href="https://elastic.co/kibana" target="blank">Kibana</a> to help us act and act fast.
              </p>
              <p>
                Let's all unite and defeat COVID-19.
              </p>
              <p>
                These questions might not be the answer but the more knowledge we have, the better equipped we are. Please take next 10 minutes to give your experience a voice.
              </p>
            </v-flex>
          </v-layout>
        </v-card-text>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
export default {
  data: () => ({

  }),
}
</script>
