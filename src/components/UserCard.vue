<template>
<div class="user">
  <div class="user-info">
    <img class="user-info-ava" :src="user.avatar_url" alt="Аватар пользователя" height="150" width="150">
    <span class="user-info-login">{{ user.login }}</span>
    <div class="user-info-hover"><button @click="openModal">подробнее</button></div>
  </div>

  <user-modal :isModalOpen="isModalOpen" @closeModal="isModalOpen = false"></user-modal>
</div>
</template>

<script>
import UserModal from "./UserModal";

export default {
  name: "UserCard",
  props: ['user'],
  components: {
    UserModal
  },
  data () {
    return {
      isModalOpen: false,
    }
  },

  computed: {
    userInfo () {
      return this.$store.getters.userInfo;
    },
    isLoading () {
      return this.$store.getters.isLoading;
    }
  },

  methods: {
    async openModal () {
      await this.$store.dispatch('loadUserInfo', this.user);
      this.isModalOpen = true;
      document.querySelector('body').style.overflow = 'hidden';
    }
  }
}
</script>

<style scoped lang="scss">
  .user {
    &-info {
      width: 200px;
      margin: 10px;
      padding: 15px;
      position: relative;
      display: flex;
      align-items: center;
      flex-direction: column;


      border: 1px solid #36A1FF;

      font-family: Arial, sans-serif;

      &-ava {
        margin: 0 0 15px 0;

        border: 1px solid black;
      }

      &-login {

        font-size: 18px;
        font-weight: bold;
        text-align: center;
      }

      &-hover {
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;

        display: none;
        justify-content: center;
        align-items: center;

        background-color: rgba(0, 0, 0, 0.3);
        text-transform: uppercase;

        & button {
          padding: 10px 15px;
          border: 2px solid #36A1FF;
          background-color: #fff;

          font-size: 15px;
          font-weight: bold;

          text-transform: uppercase;

          &:hover {
            background-color: #FF36A1;
            color: white;
          }

          &:active {
            background-color: #fff;
            color: black;
          }

        }
      }

      &:hover &-hover {
        display: flex;
      }
    }
  }
</style>
