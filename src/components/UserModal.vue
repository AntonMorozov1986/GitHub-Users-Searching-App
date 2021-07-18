<template>
  <div class="user-modal" v-if="isModalOpen" @click="closeModal">
    <div class="user-modal-info modal-not-close" v-if="!isLoading">
      <span class="user-modal-title modal-not-close">Логин:</span>
      <p class="user-modal-login modal-not-close">{{ userInfo.login }}</p>
      <span class="user-modal-title modal-not-close">Имя пользователя:</span>
      <p class="user-modal-name modal-not-close">{{ userInfo.name }}</p>
      <span class="user-modal-title modal-not-close">Количество подписчиков:</span>
      <p class="user-modal-followers modal-not-close">{{ userInfo.followers }}</p>
      <span class="user-modal-title modal-not-close">Количество подписок:</span>
      <p class="user-modal-following modal-not-close">{{ userInfo.following}}</p>
      <span class="user-modal-title modal-not-close">Количество публичных репозиториев</span>
      <p class="user-modal-repos modal-not-close">{{ userInfo.public_repos }}</p>
      <a class="user-modal-link modal-not-close" :href="userInfo.html_url">Перейти на страницу пользователя</a>
      <div class="user-modal-location modal-not-close">
        <p class="modal-not-close">Местоположение пользователя: {{ userInfo.location }}</p>
        <iframe class="user-modal-map modal-not-close"
                v-if="userInfo.location !== null"
                width="350"
                height="250"
                frameborder="0" style="border:0"
                :src="`https://www.google.com/maps/embed/v1/place?key=AIzaSyCg83Gna_Oul8GJuqGYBBqatYKZQe_nmRY&q=${userInfo.location}`" allowfullscreen>
        </iframe>
        <p v-else class="modal-not-close">Пользователь не указал свое местоположение</p>
      </div>
      <button class="user-modal-btn" @click="closeModal">закрыть</button>
    </div>

    <loader v-if="isLoading"></loader>
  </div>
</template>

<script>
export default {
  name: "UserModal",
  props: ['isModalOpen'],
  computed: {
    isLoading () {
      return this.$store.getters.isLoading;
    },
    userInfo () {
      return this.$store.getters.userInfo;
    }
  },

  methods: {
    closeModal (evt) {
      if (evt.target.classList.contains('modal-not-close')) {
        return;
      }
      this.$emit('closeModal');
      document.querySelector('body').style.overflow = 'visible';
    }
  }
}
</script>

<style scoped lang="scss">
.user-modal {
  box-sizing: border-box;
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  justify-content: center;
  align-items: center;

  z-index: 99;

  background-color: rgba(0, 0, 0, 0.4);

  &-info {
    padding: 30px;
    background-color: #fff;
  }

  &-title {
    display: block;
    font-size: 18px;
    font-weight: bold;
  }

  &-link {
    display: block;
    width: 100%;
    padding: 6px;

    background-color: #36A1FF;
    color: white;

    text-decoration: none;
    text-align: center;
    font-size: 18px;

    &:hover {
      background-color: #ffe0a6;
      color: black;
    }

    &:active {
      background-color: white;
    }

  }

  &-location {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  &-map {
    background: #36A1FF url(http://hello-site.ru//main/images/preloads/three-dots.svg) center center no-repeat;
  }

  &-btn {
    display: block;
    width: 100%;
    margin: 10px 0 0 0;
    padding: 6px;

    background-color: #36A1FF;
    border: none;
    color: white;

    text-align: center;
    font-size: 18px;
    text-transform: uppercase;

    &:hover {
      background-color: #ffe0a6;
      color: black;
    }

    &:active {
      background-color: white;
    }
  }
}
</style>
