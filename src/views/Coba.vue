<template>
  <b-container>
    <b-row>
      <b-col>
        <b-navbar variant="dark">
          <b-navbar-brand>Welcome</b-navbar-brand>
          <b-button v-b-modal.modal-create>create list</b-button>
          <b-button>logout</b-button>
        </b-navbar>
        <b-row>
          <b-col class="left">
            <b-button>movie list</b-button>
            <b-button>profile</b-button>
          </b-col>
          <b-col>
            <div>
              <h3>{{ title_list }}</h3>
              <h4>{{ description }}</h4>
            </div>
            <div>
              <button>Add Movie</button>
            </div>
            <b-table
              :items="items"
              :fields="fields"
              :per-page="perPage"
              stacked="md"
              responsive
              show-empty
              small
              bordered
              striped
              hover
              :busy="tableBusy"
            >
              <template #cell(actions)="item">
                <b-button
                  variant="warning"
                  class="mr-1"
                  v-c-tooltip.hover.click="'Edit Data'"
                  v-b-modal.modal-edit
                  @click="(data = item.item), (edit = !edit)"
                  ><CIcon name="cil-pencil" /> {{ item.actions }}</b-button
                >

                <b-button
                  variant="danger"
                  class="mr-1"
                  v-c-tooltip.hover.click="'Hapus Data'"
                  v-b-modal.modal-delete
                  @click="data = item.item"
                  ><CIcon name="cil-trash" /> {{ item.actions }}</b-button
                >
              </template>
              <template #cell(id_feeder)="item">
                <div class="adaFeeder" v-if="item.item.id_feeder">V</div>
                <span v-else class="tdkAdaFeeder">X</span>
              </template>

              <template #cell(last_sync)="item">
                <span>{{
                  item.item.last_sync
                    ? moment(item.item.last_sync).format("LL")
                    : null
                }}</span>
              </template>
            </b-table>
          </b-col>
        </b-row>
        <b-modal
          hide-footer
          hide-header
          centered
          id="modal-create"
          title="Create New Movie List"
          size="md"
        >
          <form ref="form">
            <b-form-group
              label="Title Movie List"
              label-for="name-input"
              invalid-feedback="Name is required"
              :state="nameState"
            >
              <b-form-input
                id="name-input"
                v-model="title_list"
                required
              ></b-form-input>
            </b-form-group>
            <b-form-group
              label="Description Movie List"
              label-for="name-input"
              invalid-feedback="Name is required"
            >
              <b-form-input
                id="name-input"
                v-model="description"
                required
              ></b-form-input>
            </b-form-group>
          </form>
          <b-button @click="createList()">Ok</b-button>
          <b-button @click="$bvModal.hide('bv-modal-create')">Cancel</b-button>
        </b-modal>
        <b-modal
          hide-footer
          hide-header
          centered
          id="modal-movie"
          title="Create New Movie List"
          size="md"
        >
          <form ref="form">
            <b-form-group
              label="Title Movie List"
              label-for="name-input"
              invalid-feedback="Name is required"
              :state="nameState"
            >
              <b-form-input
                id="name-input"
                v-model="title_list"
                required
              ></b-form-input>
            </b-form-group>
            <b-form-group
              label="Description Movie List"
              label-for="name-input"
              invalid-feedback="Name is required"
            >
              <b-form-input
                id="name-input"
                v-model="description"
                required
              ></b-form-input>
            </b-form-group>
          </form>
        </b-modal>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      fields: [
        {
          key: "no",
          label: "Nomer",
        },
        {
          key: "title",
          label: "Title",
        },
        {
          key: "overview",
          label: "Overview",
        },
        {
          key: "release_date",
          label: "Release Date",
        },
        {
          key: "actions",
          label: "Action",
        },
      ],
      items: [],
      list_id: "",
    };
  },
  async mounted() {
    await this.getToken();
    await this.getSession();
  },
  methods: {
    async getToken() {
      const data = axios.get(
        "https://api.themoviedb.org/3/authentication/token/new?api_key=86645b8894e221228fe7a74707880117"
      );
      let result = await data;
      this.token = result.data.request_token;
    },
    async getSession() {
      const data = axios.get(
        "https://api.themoviedb.org/3/authentication/guest_session/new?api_key=86645b8894e221228fe7a74707880117",
        { request_token: this.token }
      );
      let result = await data;
      this.sessionId = result.data.guest_session_id;
      console.log(this.token);
    },
    createList() {
      let vm = this;
      const data = axios.post(
        `https://api.themoviedb.org/3/list?api_key=86645b8894e221228fe7a74707880117&session_id=${this.token}`,
        {
          name: vm.title_list,
          description: vm.description,
          language: "en",
        }
      );
      const result = data;
      this.$bvModal.hide("modal-create");
      console.log(result);
    },
  },
};
</script>

<style>
.left {
  display: flex;
  flex-direction: column;
  width: 20%;
}
</style>
