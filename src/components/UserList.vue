<template>
<div class="users-list">
  <user-card
      v-for="user of usersList"
      :key="user.id"
      :user="user"
  ></user-card>
  <loader v-if="isLoading"></loader>
</div>
</template>

<script>
import UserCard from "./UserCard";
import Loader from "./Loader";

export default {
  name: "UserList",

  components: {
    UserCard,
    Loader
  },

  computed: {
    usersList () {
      return this.$store.getters.users
    },
    isLoading () {
      return this.$store.getters.isLoading;
    }
  },

  mounted() {
    window.onscroll = () => {
      const bottomOfWindow = document.documentElement.scrollTop + window.innerHeight === document.documentElement.offsetHeight;
      if (bottomOfWindow) {
        this.$store.commit('setPageNumber', this.$store.getters.pageNumber + 1);
        this.$store.dispatch('loadUsers');
      }
    }
  }
}
</script>

<style scoped lang="scss">
  .users-list {
    width: 90%;
    margin: 0 auto;

    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;

    font-family: Arial, sans-serif;
  }


</style>
