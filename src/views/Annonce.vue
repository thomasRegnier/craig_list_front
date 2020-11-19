<template>
  <div id="annonce" v-if="annonce">
    <Wtitle title="Annonce" />
    <BreadCrumb />
    <template v-if="annonce && annonce.images.length">
      <Carrousel :images="annonce.images" />
    </template>
    <div
      style="
        padding-top: 20px;
        border-bottom: 1px solid lightgrey;
        display: flex;
        align-items: center;
      "
    >
      <span style="font-weight: bold; font-size: 24px; margin-right: 15px">
        {{ annonce.title }}
      </span>

      <span
        v-if="annonce.category"
        :style="{ background: annonce.category.color }"
        style="
          color: white;
          font-size: 70%;
          padding: 0px 4px;
          border-radius: 16px;
        "
      >
        <i :class="annonce.category.icon"></i>
        {{ annonce.category.name }}/
        <span class="span"> {{ annonce.sub_category.name }} </span>
      </span>
    </div>
    <div style="padding-top: 10px; color: dodgerblue">
      <small>Publié {{ moment(annonce.created_at).calendar() }} </small>
      <small v-if="annonce.created_at != annonce.updated_at"
        >Modifié {{ moment(annonce.updated_at).calendar() }}
      </small>
    </div>
    <div style="padding-top: 10px">
      {{ annonce.description ? annonce.description : "Aucune description" }}
    </div>
    <div class="noPrint" style="text-align: right">
      <a
        class="noPrint"
        :href="`mailto:${annonce.user.email}?subject=Réponse à votre annonce ${annonce.title} sur CraigList&body=Je suis intéréssé par vôtre annonce ${annonce.title} publié sur ${location} `"
      >
        <button class="mailto">
          <i class="bx bx-mail-send"></i> Répondre par mail
        </button>
      </a>

      <a
        class="noPrint"
        :href="`mailto:?subject=Je partage l'annonce ${annonce.title} sur CraigList&body=Cette annonce vous interressera : ${annonce.title} publié sur ${location} `"
      >
        <button class="mailto2">
          <i class="bx bx-send"></i> Partager à un ami
        </button>
      </a>
      <!-- <a
        class="noPrint"
        :href="`mailto:${annonce.user.email}?subject=Réponse à votre annonce ${annonce.title} sur CraigList&body=Je suis intéréssé par vôtre annonce ${annonce.title} publié sur ${location} `"
      >
        <button class="mailto2">
          <i class="bx bx-send"></i> Partager à un ami
        </button>
      </a> -->

      <button class="printButton" @click="toPrint">
        <i class="bx bx-printer"></i> Imprimer l'annonce
      </button>
    </div>
    <div class="ifPrint">
      <vue-qrious :value="location" />
    </div>
  </div>
</template>

<script>
import { offers } from "../api/offers";
import Carrousel from "../components/Carrousel";
import BreadCrumb from "../components/BreadCrumb";
import Wtitle from "../components/Wtitle";
import VueQrious from "vue-qrious";

export default {
  name: "annonce",
  components: {
    Carrousel,
    BreadCrumb,
    Wtitle,
    VueQrious,
  },
  data() {
    return {
      annonce: "",
      location: "",
    };
  },
  mounted() {
    this.location = window.location.href;
    console.log(this.location);
    console.log(this.$route.params.id);
    offers.getOffer(this.$route.params.id).then((response) => {
      console.log(response.data.offer[0]);
      this.annonce = response.data.offer[0];
    });
  },
  methods: {
    toPrint() {
      window.print();
    },
    //  mailto:?body=tisbody&subject=thisbethesubject
  },
};
</script>

<style scoped>
.printButton {
  background: dodgerblue;
  color: white;
  border: none;
  padding: 8px 12px;
  border-radius: 12px;
  transition: ease 0.3s;
  border: 1px solid dodgerblue;
  box-shadow: 0px 0px 4px lightgray;
}
.mailto:hover,
.mailto2:hover,
.printButton:hover {
  transform: translateY(-2px);
}

.mailto {
  background: orange;
  color: white;
  padding: 8px 12px;
  border-radius: 12px;
  transition: linear 0.2s;
  border: 1px solid orange;

  margin-right: 10px;
}

.mailto2 {
  background: rgb(12, 99, 187);
  color: white;
  padding: 8px 12px;
  border-radius: 12px;
  transition: linear 0.2s;
  border: 1px solid rgb(12, 99, 187);

  margin-right: 10px;
}

.mailto a {
  color: white;
  text-decoration: none;
}
@media print {
  .vs-navbar {
    display: none !important;
  }
}
</style>