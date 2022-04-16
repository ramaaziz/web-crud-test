<template>
  <b-container fluid>
    <b-row>
      <b-col>
        <div class="wrapper">
          <div class="block">
            <b-card
              class="card"
              title="Welcome"
              sub-title="Register new account"
              style="max-width: 40rem"
            >
              <b-row class="input-1">
                <div class="input">
                  <label>Email :</label>
                  <b-form-input
                    style="
                      margin: 5px;
                      width: 200px;
                      border: 0;
                      border-radius: 0;
                      outline: 0;
                      background: transparent;
                      border-bottom: 1px solid black;
                    "
                    size="sm"
                    placeholder="Enter your email"
                    type="email"
                    v-model="email"
                  ></b-form-input>
                </div>
              </b-row>
              <b-row class="input-1">
                <div class="input">
                  <label>Password :</label>
                  <b-form-input
                    style="
                      margin: 5px;
                      width: 200px;
                      border: 0;
                      border-radius: 0;
                      outline: 0;
                      background: transparent;
                      border-bottom: 1px solid black;
                    "
                    size="sm"
                    placeholder="*******"
                    type="password"
                    v-model="password"
                  ></b-form-input>
                </div>
              </b-row>
              <b-row>
                <b-col class="button">
                  <b-button
                    @click="register()"
                    style="width: 100px"
                    size="sm"
                    variant="secondary"
                    >Register</b-button
                  >
                </b-col>
              </b-row>
              <b-alert :show="alert" variant="danger">{{ error }}</b-alert>
              <b-alert :show="alert2" variant="success">{{ success }}</b-alert>
            </b-card>
          </div>
        </div>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import { createUserWithEmailAndPassword } from "@firebase/auth";
import { auth } from "../firebase";

export default {
  data() {
    return {
      email: "",
      password: "",
      alert: false,
      alert2: false,
      error: "",
    };
  },
  methods: {
    async register() {
      try {
        await createUserWithEmailAndPassword(auth, this.email, this.password);
        this.success = "Account created";
        this.alert2 = true;
        setTimeout(() => {
          this.alert2 = false;
          this.$router.push("/");
        }, 2000);
      } catch (err) {
        this.error = err.message;
        this.alert = true;
        setTimeout(() => {
          this.alert = false;
        }, 2000);
        return;
      }
    },
  },
};
</script>

<style>
.wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
}
.block {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  width: 80rem;
  box-shadow: 0 0px 18px 0 rgba(0, 0, 0, 0.2), 0 0px 40px 0 rgba(0, 0, 0, 0.19);
  background-image: url("../assets/black.jpg");
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
}
.card {
  width: 450px;
  box-shadow: 0 0px 8px 0 rgba(255, 255, 255, 0.2),
    0 0px 20px 0 rgba(255, 245, 245, 0.19);
}
.input-1 {
  display: flex;
  justify-content: flex-start;
  align-items: center;
}
.input {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-left: 100px;
  padding: 10px;
}
.button {
  padding: 10px;
}
.alert {
  position: absolute;
  z-index: 6;
  margin-bottom: 100px;
  min-width: 150px;
  margin-left: 45px;
}
</style>
