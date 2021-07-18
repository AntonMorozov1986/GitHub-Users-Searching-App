<template>
  <div>
    <search-block></search-block>

    <user-list v-if="$store.getters.users.length > 0"></user-list>
    <div v-else-if="!$store.getters.wasAlreadySearching" class="greeting">
      <h2 class="greeting-title">Добро пожаловать в приложение по поиску пользователей в GitHub</h2>
      <p class="greeting-text">Это приложение позволяет искать пользователей GitHub по логину, а также сортировать их по количеству репозиториев</p>
      <p class="greeting-text">Для начала поиска введите логин пользователя в строку поиска наверху и нажмите кнопку поиск</p>
    </div>
    <div v-else-if="!$store.getters.isLoading" class="not-found">
      <h2 class="not-found-text">К сожалению по вашему запросу ничего не найдено. Попробуйте ввести другой запрос.</h2>
    </div>

    <loader v-if="$store.getters.isLoading"></loader>
  </div>
</template>

<script>
import SearchBlock from './components/SearchBlock';
import UserList from "./components/UserList";
import Loader from "./components/Loader";

export default {
  name: "App",
  components: {
    SearchBlock,
    UserList,
    Loader
  },

  computed: {
  },

  methods: {
  }
}
</script>

<style lang="scss">
  body {
    margin: 0;
    padding: 0;
  }

  .greeting {
    padding: 30px;

    text-align: center;

    font-family: Arial, sans-serif;
    font-size: 22px;
    font-weight: bold;

    &-text {
      font-weight: normal;
    }
  }

  .not-found {
    padding: 30px;

    text-align: center;

    font-family: Arial, sans-serif;
    font-size: 22px;
    font-weight: bold;
  }
</style>
