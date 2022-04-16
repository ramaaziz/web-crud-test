<template>
  <b-container class="container">
    <b-row>
      <b-col>
        <div>
          <b-card no-body style="width: 100%">
            <b-tabs class="tab" pills card vertical nav-wrapper-class="col-3">
              <b-tab title="Movie" active>
                <div>
                  <b-table
                    class="table"
                    striped
                    hover
                    :items="items"
                    :field="field"
                  >
                    <template slot="action" slot-scope="props">
                      <b-button @click="doRating(props.row.movie_id)"
                        >Rating</b-button
                      >
                    </template>
                  </b-table>
                </div>
              </b-tab>
              <b-tab title="Poster">
                <div tyle="height: 100vh; width: 100%">
                  <div class="movie-grid">
                    <div class="movie" v-for="(movie, i) in movies" :key="i">
                      <img
                        :src="`https://image.tmdb.org/t/p/w200/${movie.poster_path}`"
                        alt=""
                      />
                    </div>
                  </div>
                </div>
              </b-tab>
              <b-tab title="Logout" @click="logout()"> </b-tab>
            </b-tabs>
          </b-card>
        </div>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import axios from "axios";

const field = [
  {
    key: "no",
    label: "No",
  },
  {
    key: "title",
    label: "Movie Title",
  },
  {
    key: "overview",
    label: "Overview",
  },
  {
    key: "vote_average",
    label: "Avarage Rating",
  },
  {
    key: "rating",
    label: "Rating",
  },
  {
    key: "action",
    label: "Action",
  },
];
export default {
  data() {
    return {
      movies: [],
      field,
      items: [],
    };
  },
  mounted() {
    this.getMovies();
  },
  methods: {
    async getMovies() {
      let vm = this;
      const data = axios.get(
        "https://api.themoviedb.org/3/movie/now_playing?api_key=86645b8894e221228fe7a74707880117&language=en-US&page=1"
      );
      const result = await data;
      result.data.results.forEach((movie) => {
        vm.movies.push(movie);
      });
      vm.items = vm.movies.map((movie, i) => {
        return {
          no: i + 1,
          title: movie.title,
          overview: movie.overview,
          avarage_rating: movie.vote_average,
        };
      });
      vm.items.id = vm.movies.id;
    },
  },
};
</script>

<style>
.container {
  position: absolute;
  width: 100%;
  height: 100%;
}
.table {
  overflow-y: auto;
  max-height: 100vh;
  width: 100%;
}
.movie-grid {
  display: grid;
  column-gap: 32px;
  row-gap: 64px;
  grid-template-columns: auto auto auto auto;
}
</style>
