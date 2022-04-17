<template>
  <b-container fluid>
    <b-row>
      <b-col>
        <div>
          <b-card no-body style="width: 100%">
            <b-tabs class="tab" pills card vertical nav-wrapper-class="col-3">
              <b-tab title="Poster">
                <div style="height: 100vh; width: 100%">
                  <div class="movie-grid">
                    <div class="movie" v-for="(movie, i) in movies" :key="i">
                      <div id="title" style="heigth: 30px">
                        {{
                          movie.title.length > 21
                            ? movie.title.substring(0, 13) + "..."
                            : movie.title
                        }}
                      </div>
                      <img
                        :src="`https://image.tmdb.org/t/p/w200/${movie.poster_path}`"
                        alt=""
                      />
                      <p>Rating : {{ movie.vote_average }}</p>
                      <div class="button-wrapper">
                        <b-button size="sm" pill @click="openModal(movie.id)">
                          Add Rating</b-button
                        >
                        <b-button
                          size="sm"
                          pill
                          variant="danger"
                          @click="removeRating(movie.id)"
                          >Remove Vote</b-button
                        >
                      </div>
                    </div>
                  </div>
                </div>
                <b-alert :show="alert" variant="success">{{ message }}</b-alert>
              </b-tab>
              <b-tab title-link-class="tabs" title="Logout" @click="logout()">
              </b-tab>
            </b-tabs>
          </b-card>
        </div>
      </b-col>
    </b-row>
    <b-modal
      hide-footer
      hide-header
      centered
      ref="modal-rating"
      size="sm"
      class="modal"
    >
      <form ref="form">
        <b-form-select
          v-model="selected"
          :options="options"
          size="sm"
          class="mt-3"
          @change="postRating(selected)"
        ></b-form-select>
      </form>
    </b-modal>
  </b-container>
</template>

<script>
import axios from "axios";
import { signOut } from "firebase/auth";
import { auth } from "@/firebase";

export default {
  data() {
    return {
      items: [],
      movies: [],
      token: "",
      token_session: "",
      sessionId: "",
      alert: false,
      point_rating: "",
      id_film: "",
      message: "",
      selected: null,
      options: [
        { value: null, text: "Please vote rating" },
        { value: 1, text: 1 },
        { value: 2, text: 2 },
        { value: 3, text: 3 },
        { value: 4, text: 4 },
        { value: 5, text: 5 },
        { value: 6, text: 6 },
        { value: 7, text: 7 },
        { value: 8, text: 8 },
        { value: 9, text: 9 },
        { value: 10, text: 10 },
      ],
    };
  },
  mounted() {
    this.getMovies();
    this.getSession();
  },
  methods: {
    async getMovies() {
      let vm = this;
      const data = axios.get(
        "https://api.themoviedb.org/3/movie/now_playing?api_key=86645b8894e221228fe7a74707880117&language=en-US&page=1"
      );
      const result = await data;
      vm.movies = result.data.results;
    },
    async getSession() {
      const data = axios.get(
        "https://api.themoviedb.org/3/authentication/guest_session/new?api_key=86645b8894e221228fe7a74707880117"
      );
      let result = await data;
      this.sessionId = result.data.guest_session_id;
      console.log(this.token);
    },
    openModal(id) {
      this.$refs["modal-rating"].show();
      this.id_film = id;
      console.log(this.id_film);
    },
    async postRating(val) {
      let vm = this;
      const data = axios.post(
        `https://api.themoviedb.org/3/movie/${vm.id_film}/rating?api_key=86645b8894e221228fe7a74707880117&guest_session_id=${this.sessionId}`,
        {
          value: val,
        }
      );
      let result = await data;
      this.message = result.data.status_message;
      this.alert = true;
      setTimeout(() => {
        this.alert = false;
      }, 2000);
      this.$refs["modal-rating"].hide();
      this.getMovies();
    },
    removeRating(ids) {
      for (let i = 0; i < this.movies.length; i++) {
        if (this.movies[i].id === ids) {
          this.movies.splice(i, 1);
        }
      }
    },
    async logout() {
      await signOut(auth);
      this.$router.push("/");
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
.modal {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
.button-wrapper {
  display: flex;
  flex-direction: row;
  justify-content: space-around;
}
.tabs {
  background-color: darkgray;
}

.btnActive {
  color: grey;
}
</style>
