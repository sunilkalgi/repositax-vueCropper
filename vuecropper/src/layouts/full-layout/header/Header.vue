<template>
  <v-app-bar app clipped-left clipped-right color="primary" dark>
    <!---Logo part -->
    <v-toolbar-title class="align-center d-flex">
      <!-- <span class="logo-icon">
        <img src="../../../assets/images/logo-light-icon.png" />
      </span> -->
      <!-- <span class="logo-text ml-2" :class="`${showLogo ? '' : 'hidelogo'}`">
        <img src="../../../assets/images/logo-light-text.png" class="mt-2" />
      </span> -->
      <router-link to="/filter">
        <img
          width="100px"
          src="../../../assets/images/repo-logo.png"
          class="mt-2"
        />
      </router-link>
    </v-toolbar-title>
    <!---Logo part -->
    <!---/Toggle sidebar part -->
    <div @click="showhideLogo">
      <v-app-bar-nav-icon
        @click="
          $vuetify.breakpoint.smAndDown
            ? setSidebarDrawer(!Sidebar_drawer)
            : $emit('input', !value)
        "
      />
    </div>
    <!---/Toggle sidebar part -->
    <!---Search part -->
    <!-- <v-btn dark icon class="mr-1 d-sm-block d-none" @click="searchbox">
      <v-icon>mdi-magnify</v-icon>
    </v-btn> -->

    <div v-if="showSearch" class="searchinput primary">
      <template>
        <v-text-field
          placeholder="Search & hit enter"
          class="mt-3 mb-0"
          append-icon="mdi-close"
          @click:append="searchbox"
        ></v-text-field>
      </template>
    </div>
    <!---/Search part -->
    <v-spacer />
   
    <!---User -->
  </v-app-bar>
</template>
<script>
// Utilities
import { mapState, mapMutations } from "vuex";
export default {
  name: "Header",

  components: {},

  props: {
    value: {
      type: Boolean,
      default: false,
    },
  },
  data: () => ({
    showLogo: true,
    showSearch: false,
    notifications: [
      {
        title: "Launch Admin",
        iconbg: "error",
        icon: "mdi-link-variant",
        desc: "Just see the my new admin!",
        time: "9:30AM",
      },
      {
        title: "Event today",
        iconbg: "success",
        icon: "mdi-calendar-check",
        desc: "Just a reminder that you have event",
        time: "10:30AM",
      },
      {
        title: "Settings",
        iconbg: "info",
        icon: "mdi-cog",
        desc: "You can customize this template as you want",
        time: "11:30AM",
      },
      {
        title: "Pavan Kumar",
        iconbg: "indigo",
        icon: "mdi-account",
        desc: "Sent you an notification",
        time: "12:30AM",
      },
    ],
    messages: [
      {
        title: "Sonu Nigam",
        avatar: "1",
        avatarstatus: "success",
        desc: "Singing Show tonigh at 9pm!",
        time: "9:30AM",
      },
      {
        title: "Sonu Nigam",
        avatar: "2",
        avatarstatus: "error",
        desc: "The greate malody songs ever sung",
        time: "10:30AM",
      },
      {
        title: "Arijit singh",
        avatar: "3",
        avatarstatus: "warning",
        desc: "You can customize this template as you want",
        time: "11:30AM",
      },
      {
        title: "Pavan Kumar",
        avatar: "4",
        avatarstatus: "success",
        desc: "Sent you an notification",
        time: "12:30AM",
      },
    ],
    userprofile: [
      { title: "My Contacts" },
      { title: "My Balance" },
      { title: "Inbox" },
      { title: "Account Setting" },
      { title: "Logout" },
    ],
    href() {
      return undefined;
    },
  }),

  computed: {
    ...mapState(["Sidebar_drawer"]),
  },

  methods: {
    ...mapMutations({
      setSidebarDrawer: "SET_SIDEBAR_DRAWER",
    }),
    showhideLogo: function() {
      this.showLogo = !this.showLogo;
    },
    searchbox: function() {
      this.showSearch = !this.showSearch;
    },
  },
};
</script>

<style lang="scss">
.hidelogo {
  display: none;
}
.searchinput {
  position: absolute;
  width: 100%;
  margin: 0;
  left: 0;
  z-index: 10;
  padding: 0 15px;
}
.descpart {
  max-width: 220px;
}
</style>
