<template>
  <div>
    <Wtitle
      :title="$route.params.id ? 'Éditer vôtre annonce' : 'Créer vôtre annonce'"
    />
    <form enctype="multipart/form-data" class="form">
      <div class="forSelect">
        <label>Choisir une catégorie</label>
        <select @change="annonce.subcategory = ''" v-model="annonce.category">
          <option value="" disabled selected hidden>Catégorie</option>
          <option
            v-for="(cat, index) in categories"
            :key="index"
            :label="cat.name"
            :value="cat"
          >
            {{ cat.name }}
          </option>
        </select>
        <div style="padding: 5px" v-if="$v.annonce.category.$error">
          <small class="error" v-if="!$v.annonce.category.required"
            >Catégorie obligatoire</small
          >
        </div>
      </div>
      <div v-if="annonce.category" class="forSelect">
        <label>Choisir une sous-catégorie</label>

        <select v-model="annonce.subcategory">
          <option value="" disabled selected hidden>
            Choisir une sous-catégorie
          </option>
          <option
            v-for="(cat, index) in annonce.category.sub_category"
            :key="index"
            :label="cat.name"
            :value="cat"
          >
            {{ cat.name }}
          </option>
        </select>
        <div style="padding: 5px" v-if="$v.annonce.subcategory.$error">
          <small class="error" v-if="!$v.annonce.subcategory.required"
            >Sous-catégorie obligatoire</small
          >
        </div>
      </div>
      <div
        v-if="(annonce.category && annonce.subcategory) || isEdit"
        class="forSelect"
      >
        <label>Titre de l'annonce <span style="color: tomato">*</span></label>
        <vs-input
          color="#195BFF"
          type="text"
          placeholder="Titre de l'annonce"
          v-model="annonce.title"
        >
        </vs-input>
        <div style="padding: 5px" v-if="$v.annonce.title.$error">
          <small class="error" v-if="!$v.annonce.title.required"
            >titre obligatoire</small
          >
        </div>

        <div style="margin-top: 20px">
          <label>Description de l'annonce</label>
          <textarea v-model="annonce.description" placeholder="Description">
          </textarea>
        </div>
        <UploaderImg @delete="removeNewImg" @action="forImages" />
        <div v-if="annonce.id">
          <div class="oldImages" v-if="oldImages">
            <div class="inside" v-for="(img, index) in oldImages" :key="index">
              <img :src="`http://127.0.0.1:8000/thumbnail/${img.url_path}`" />
              <span @click="trashOld(img, index)" id="forTrash">
                <i class="bx bxs-trash-alt"></i>
              </span>
            </div>
          </div>
        </div>
        <div style="text-align: right; padding-top: 20px">
          <button v-if="annonce.id" class="sendBut" @click.prevent="trySubmit">
            Éditer
          </button>
          <button v-else class="sendBut" @click.prevent="trySubmit">
            Publier
          </button>
        </div>
      </div>
    </form>
    <Loading v-if="isLoad" />
  </div>
</template>

<script>
import Wtitle from "../components/Wtitle";
import { required } from "vuelidate/lib/validators";
import { categories } from "../api/categories";
import UploaderImg from "../components/UploaderImg";
import { mapGetters, mapActions } from "vuex";
import { offers } from "../api/offers";
import { images } from "../api/images";
import Loading from "../components/Loading";
export default {
  components: {
    Wtitle,
    UploaderImg,
    Loading,
  },
  data() {
    return {
      isEdit: false,
      oldImages: "",
      isLoad: false,
      categories: "",
      selected_cat: "",
      annonce: {
        title: "",
        description: "",
        category: "",
        subcategory: "",
        city: "",
        images: [],
      },
    };
  },
  validations() {
    return {
      annonce: {
        title: { required },
        category: { required },
        subcategory: { required },
      },
    };
  },
  computed: {
    ...mapGetters(["user"]),
  },
  mounted() {
    this.getCategories();
    if (this.$route.params.id) {
      this.isEdit = true;
      console.log(this.$route.params.id);
      offers.getOffer(this.$route.params.id).then((response) => {
        console.log(response.data);
        this.annonce = { ...response.data.offer[0] };
        console.log(this.annonce);
        console.log(this.annonce.subcategory);
        this.annonce.subcategory = { ...response.data.offer[0].sub_category };

        console.log(this.annonce.images);
        if (this.annonce.images && this.annonce.images.length) {
          this.oldImages = [...this.annonce.images];
          console.log(this.oldImages);
          this.annonce.images = [];
        }
      });
    }
  },
  methods: {
    trashOld(image, index) {
      images.deleteImage(this.user.token, image).then((response) => {
        this.oldImages.splice(index, 1);
      });
    },
    removeNewImg(index) {
      this.annonce.images.splice(index, 1);
    },
    forImages(img) {
      console.log(img);
      this.annonce.images = img;
      /*       for (let i = 0; i < img.length; i++) {
        console.log(img[i].name);
        this.annonce.images.append('images', img[i]);

      }

      for (let value of this.annonce.images.values()) {
        console.log(value);
      }
      console.log(this.annonce.images._boundary) */
    },
    getCategories() {
      categories.getCategories().then((response) => {
        this.categories = response.data.categories;
      });
    },
    catSelect(elem) {
      this.selected_cat = elem;
    },
    trySubmit() {
      this.$v.$touch();
      if (this.$v.$invalid) {
        console.log("error");
        return;
      }

      this.annonce.city = this.user.city_id;
      console.log(this.annonce);
      let data = new FormData();
      data.append("description", this.annonce.description);
      data.append("title", this.annonce.title);
      data.append("category", this.annonce.category.id);
      data.append("subcategory", this.annonce.subcategory.id);
      data.append("city", this.user.city_id);

      if (this.annonce.images.length) {
        for (let i = 0; i < this.annonce.images.length; i++) {
          data.append("images[]", this.annonce.images[i]);
        }
      }

      for (let value of data.values()) {
        console.log(value);
      }

      this.isLoad = true;

      if (this.annonce.id) {
        data.append("id", this.annonce.id);
        offers.update(this.user.token, data).then((response) => {
          console.log(response);
          this.isLoad = false;
          this.$router.push({ path: "/ads" });
        });
      } else {
        offers
          .addOffer(this.user.token, data)
          .then((response) => {
            console.log(response.data.offer[0]);
            this.isLoad = false;
            console.log(response.data.offer[0].city.slug);
            this.$router.push({
              path: `/${response.data.offer[0].city.slug}/${response.data.offer[0].category.slug}/${response.data.offer[0].sub_category.slug}/${response.data.offer[0].slug}/${response.data.offer[0].id}`,
            });
          })
          .catch((error) => {
            console.log(error.response.data.error);
            this.isLoad = false;
            this.openNotification(
              "top-left",
              "danger",
              "Erreur",
              `error : ${error.response.data.error}`
            )
          });
      }
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
.form {
  margin-top: 20px;
  background: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0px 0px 2px lightgray;
}
select {
  width: 100%;
  padding: 10px;
  outline: none;
  border-radius: 10px;
  border: none;
  background: #f4f7f8;
  color: grey;
  cursor: pointer;
}
.forSelect {
  margin-bottom: 20px;
}

textarea {
  width: calc(100% - 20px);
  height: 200px;
  padding: 10px;
  outline: none;
  border-radius: 10px;
  border: none;
  background: #f4f7f8;
  color: grey;
}

label {
  margin-bottom: 5px;
}

.sendBut {
  border-radius: 12px;
  background: dodgerblue;
  color: white;
  border: none;
  padding: 8px 12px;
  font-size: 100%;
  transition: 0.2s ease;
  box-shadow: 0px 0px 3px lightgray;
}
.sendBut:hover {
  box-shadow: 0px 0px 6px lightgray;
}

.sendBut:active {
  transform: scale(1.05);
}

.oldImages {
  display: flex;
  flex-wrap: wrap;
  padding-top: 20px;
}

.oldImages img {
  width: 130px;
  height: 77px;
  object-fit: cover;
  border-radius: 8px;
}
.inside {
  margin-right: 10px;
  margin-bottom: 10px;
  position: relative;
}

#forTrash {
  color: tomato;
  padding-top: 10px;
  cursor: pointer;
}
</style>