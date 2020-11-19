<template>
  <vs-navbar center-collapsed fixed>
    <template #left>
      <img src="/logo2.png" alt="" />
    </template>
    <!--         <vs-navbar-item :active="active == 'guide'" id="guide">
            Guide
        </vs-navbar-item>
        <vs-navbar-item :active="active == 'docs'" id="docs">
            Documents
        </vs-navbar-item>
        <vs-navbar-item :active="active == 'components'" id="components">
            Components
        </vs-navbar-item>
        <vs-navbar-item :active="active == 'license'" id="license">
            license
        </vs-navbar-item> -->
    <template #right>
      <Search />
      <div class="forPrint">
        <i class="bx bxs-dashboard"></i>
        <span style="margin-left: 5px">Craig List</span>
      </div>
      <vs-button
        class="noPrint"
        border
        @click="registerOpen = !registerOpen"
        v-if="!user"
        >S'inscrire
      </vs-button>

      <vs-button class="noPrint" @click="open = !open" v-if="!user">
        Connexion
      </vs-button>

      <vs-button class="noPrint" danger v-if="user" border @click="logout">
        Deconnexion
      </vs-button>
    </template>

    <vs-dialog :loading="loginLoading" blur v-model="open">
      <template #header>
        <div
          style="
            display: flex;
            flex-direction: column;
            justify-content: center;
            justify-items: center;
            padding-top: 20px;
          "
        >
          <div style="font-size: 110%; text-align: center; color: lightgrey">
            Bienvenue sur
          </div>
          <div style="font-size: 150%; display: flex; align-items: center">
            <i class="bx bxs-dashboard"></i>
            <span style="margin-left: 5px">Craig List</span>
          </div>
        </div>
      </template>

      <div class="con-form">
        <div style="">
          <vs-input
            color="#195BFF"
            type="email"
            label-placeholder="Email"
            v-model="form.email"
          >
            <template #icon>
              <i class="bx bx-user"></i>
            </template>
          </vs-input>
          <div style="padding: 5px" v-if="$v.form.email.$error">
            <small class="error" v-if="!$v.form.email.required"
              >email obligatoire</small
            >
            <small class="error" v-if="!$v.form.email.email"
              >email non conforme</small
            >
          </div>
        </div>
        <div style="padding-top: 20px">
          <vs-input
            color="#195BFF"
            type="password"
            label-placeholder="Password"
            v-model="form.password"
          >
            <template #icon>
              <i class="bx bx-lock"></i>
            </template>
          </vs-input>
          <div style="padding: 5px" v-if="$v.form.password.$error">
            <small class="error" v-if="!$v.form.password.required"
              >mot de passe obligatoire</small
            >
          </div>
          <div
            @click="
              open = !open;
              registerOpen = !registerOpen;
            "
            style="
              text-align: right;
              padding-top: 15px;
              color: grey;
              cursor: pointer;
              text-decoration: underline;
            "
          >
            <span>Vous n'avez pas de compte?</span>
          </div>
          <div
            v-if="showErrorLog"
            style="text-align: center; padding-top: 15px"
          >
            <small style="color: tomato">
              Vos identifiants sont incorrect
            </small>
          </div>
          <div style="text-align: right; padding-top: 10px">
            <vs-button block @click="submit"> Se connecter </vs-button>
          </div>
        </div>
      </div>
    </vs-dialog>

    <vs-dialog :loading="registerLoading" blur v-model="registerOpen">
      <template #header>
        <div
          style="
            display: flex;
            flex-direction: column;
            justify-content: center;
            justify-items: center;
            padding-top: 20px;
          "
        >
          <div style="font-size: 110%; text-align: center; color: lightgrey">
            Inscrivez-vous sur
          </div>
          <div style="font-size: 150%; display: flex; align-items: center">
            <i class="bx bxs-dashboard"></i>
            <span style="margin-left: 5px">Craig List</span>
          </div>
        </div>
      </template>
      <div class="con-form">
        <div style="">
          <vs-input
            color="#195BFF"
            type="email"
            label-placeholder="Nom"
            v-model="register.name"
          >
            <template #icon>
              <i class="bx bx-user"></i>
            </template>
          </vs-input>
          <div style="padding: 5px" v-if="$v.register.name.$error">
            <small class="error" v-if="!$v.register.name.required"
              >nom obligatoire</small
            >
          </div>
        </div>

        <div style="">
          <vs-input
            style="padding-top: 30px"
            color="#195BFF"
            type="email"
            label-placeholder="Email"
            v-model="register.email"
          >
            <template #icon> @ </template>
          </vs-input>
          <div style="padding: 5px" v-if="$v.register.email.$error">
            <small class="error" v-if="!$v.register.email.required"
              >email obligatoire</small
            >
            <small class="error" v-if="!$v.register.email.email"
              >email non conforme</small
            >
          </div>
        </div>

        <div style="padding-top: 30px">
          <vs-select
            label-placeholder="Ville par défaut"
            v-model="register.city"
          >
            <vs-option
              v-for="(city, index) in cities"
              :label="city.name"
              :value="city.slug"
              :key="index"
            >
              {{ city.name }}
            </vs-option>
          </vs-select>

          <div style="padding: 5px" v-if="$v.register.city.$error">
            <small class="error" v-if="!$v.register.city.required"
              >Ville obligatoire</small
            >
          </div>
        </div>

        <div style="padding-top: 30px">
          <vs-input
            color="#195BFF"
            type="password"
            label-placeholder="Password"
            v-model="register.password"
          >
            <template #icon>
              <i class="bx bx-lock"></i>
            </template>
          </vs-input>
          <div style="padding: 5px" v-if="$v.register.password.$error">
            <small class="error" v-if="!$v.register.password.required"
              >mot de passe obligatoire</small
            >
          </div>
        </div>
        <div style="text-align: right; padding-top: 30px">
          <vs-button block @click="submitregister"> S'inscrire </vs-button>
        </div>
      </div>
    </vs-dialog>
  </vs-navbar>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
import axios from "axios";
import { required, email } from "vuelidate/lib/validators";
import Search from "./Search";
export default {
  components: {
    Search,
  },
  data() {
    return {
      open: false,
      loginLoading: false,
      registerOpen: false,
      showErrorLog: false,
      registerLoading: false,
      cities: "",
      form: {
        email: "",
        password: "",
      },
      register: {
        name: "",
        email: "",
        password: "",
        city: "",
      },
    };
  },
  validations: {
    form: {
      email: {
        required,
        email,
      },
      password: {
        required,
      },
    },
    register: {
      name: {
        required,
      },
      email: {
        required,
        email,
      },
      password: {
        required,
      },
      city: {
        required,
      },
    },
  },
  computed: {
    ...mapGetters(["user"]),
    active: {
      get() {
        console.log(this.$route.name);
        return this.$route.name;
      },
    },
  },
  watch: {
    open: function () {
      if (!this.open) {
        this.$v.form.$reset();
      }
      console.log(this.open);
    },
    registerOpen: function () {
      if (!this.registerOpen) {
        this.$v.register.$reset();
      }
      console.log(this.registerOpen);
    },
  },
  mounted() {
    console.log(this.user);
    this.getCities();
  },
  methods: {
    ...mapActions(["LOGIN_USER", "LOGOUT_USER"]),
    getCities() {
      axios.get("http://127.0.0.1:8000/api/cities").then((response) => {
        this.cities = response.data.cities;
      });
    },
    submit() {
      this.showErrorLog = false;

      this.$v.form.$touch();
      if (this.$v.form.$invalid) {
        console.log("error");
        this.loginLoading = false;
        return;
      }

      this.loginLoading = true;

      this.LOGIN_USER(this.form)
        .then((response) => {
          console.log(response);
          setTimeout(() => {
            this.open = false;
            this.loginLoading = false;
          }, 600);
          this.$router.push({ path: `/${response.data.user.city_id}` });
        })
        .catch((error) => {
          setTimeout(() => {
            this.loginLoading = false;
            this.showErrorLog = true;
            /*             this.openNotification(
              "top-left",
              "danger",
              "Erreur",
              "Vos identifiants sont incorrect"
            ); */
          }, 600);
        });
    },
    logout() {
      this.LOGOUT_USER(this.user).then((response) => {
        this.$router.push({ path: "/" });
      });
    },

    submitregister() {
      console.log(this.register);
      this.$v.register.$touch();
      console.log(this.$v.register);
      if (this.$v.register.$invalid) {
        console.log("error");
        return;
      }
      this.registerUser();
    },
    registerUser() {
      this.registerLoading = true;

      axios
        .post("http://127.0.0.1:8000/api/register", this.register)
        .then((response) => {
          console.log(response.data);
          setTimeout(() => {
            this.registerLoading = false;
          }, 600);
          this.registerOpen = false;
          this.open = true;
          this.register.email = "";
          this.register.name = "";
          this.register.password = "";
          this.openNotification(
            "top-left",
            "success",
            "Inscription réussie",
            `Bonjour ${response.data.message.name}, vous pouvez vous connecter`
          );
        })
        .catch((error) => {
          for (const err in error.response.data.error) {
            this.openNotification(
              "top-left",
              "danger",
              "Erreur",
              `${err}: ${error.response.data.error[err]}`
            );
          }

          setTimeout(() => {
            this.registerLoading = false;
          }, 600);
        });
    },
    openNotification(position = null, border, title, text) {
      const noti = this.$vs.notification({
        border,
        position,
        title,
        text,
      });
    },
  },
};
</script>

<style scoped>
.error {
  color: tomato;
}
</style>