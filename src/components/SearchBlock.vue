<template>
  <header class="page-header">
    <form class="search" @submit="search">
      <span class="title">Search GitHub Users</span>
      <input type="text" class="search-input" v-model="searchInput">
      <button type="submit" class="search-btn"><span class="mdi mdi-account-search search-ico"></span>поиск</button>
    </form>
    <div class="users-list-sort">
      <span class="sort-title">Сортировка по количеству репозиториев:</span>
      <div class="sort-list">
        <div class="sort-list-item">
          <input type="radio" id="sort-default" name="sort-list" value="default" v-model="radioBtn" @change="search">
          <label for="sort-default">по умолчанию</label>
        </div>
        <div class="sort-list-item">
          <input type="radio" id="sort-ascending" name="sort-list" value="asc" v-model="radioBtn" @change="search">
          <label for="sort-ascending">по возрастанию</label>
        </div>
        <div class="sort-list-item">
          <input type="radio" id="sort-descending" name="sort-list" value="desc" v-model="radioBtn" @change="search">
          <label for="sort-descending">по убыванию</label>
        </div>
      </div>
    </div>
  </header>

</template>

<script>
export default {
  name: "SearchBlock",
  data () {
    return {
      searchInput: '',
      radioBtn: 'default',
      sortingType: '',
      sortingOrder: ''
    }
  },

  methods: {
    search (evt) {
      evt.preventDefault();
      switch (this.radioBtn) {
        case 'default':
          this.sortingType = '';
          this.sortingOrder = '';
          break;
        case 'asc':
          this.sortingType = 'repositories';
          this.sortingOrder = 'asc';
          break;
        case 'desc':
          this.sortingType = 'repositories';
          this.sortingOrder = 'desc';
          break;
      }
      this.$store.commit('setPageNumber', 1);
      this.$store.commit('setSearchingText', this.searchInput);
      this.$store.commit('setSortingType', this.sortingType);
      this.$store.commit('setSortingOrder', this.sortingOrder);
      this.$store.commit('clearUsers');
      this.$store.commit('clearUsersQuantity');
      this.$store.dispatch('loadUsers');
    }
  }
}
</script>

<style scoped lang="scss">
  $fontSize: 20px;

  .page-header {
    font-family:Arial, sans-serif;
    box-sizing: border-box;
    min-width: 900px;
    width: 100%;
    position: sticky;
    top: 0;
    z-index: 9;
  }

  .title {
    font-family:Arial, sans-serif;
    background-color: transparent;
    font-size: $fontSize;

    font-weight: bold;
    color: white;
  }

  .search {

    height: 50px;
    width: 100%;
    display: flex;
    align-items: center;
    box-sizing: border-box;
    padding: 10px 100px;
    background-color: #36A1FF;

    &-input {
      margin: 0 0 0 12px;
      flex-grow: 2;
      background-color: transparent;
      border: none;
      border-bottom: 2px solid white;
      color: white;
      font-size: $fontSize;
      font-weight: bold;

      &:focus {
        outline: none;
        border-bottom: 2px solid #FF36A1;
      }
    }

    &-btn {
      position: relative;
      margin: 0 0 0 12px;
      height: 100%;
      padding: 5px 12px;
      background-color: transparent;
      font-size: $fontSize;
      font-weight: bold;
      border: none;
      text-transform: uppercase;
      color: white;

      &:focus {
        outline: none;
        &:after {
          position: absolute;
          top: -9px;
          left: 0;
          content: '';
          display: block;
          width: 100%;
          height: 44px;
          border: 2px solid white;
          //background-color: rgba(0, 0, 0, 0.3);
        }
      }
      
      &:hover:after {
        position: absolute;
        top: -9px;
        left: 0;
        content: '';
        display: block;
        width: 100%;
        height: 44px;
        border: 2px solid transparent;
        background-color: rgba(0, 0, 0, 0.3);
        //background-color: #0F83EF;
      }
      
      &:active:after {
        position: absolute;
        top: -9px;
        left: 0;
        content: '';
        display: block;
        width: 100%;
        height: 44px;
        border: 2px solid #FF36A1;
        background-color: transparent;
      }


    }

    &-ico {
      margin: 0 12px 0 0;
    }
  }

  .users-list-sort {
    box-sizing: border-box;
    width: 100%;
    background-color: #0073cb;
    padding: 15px;
  }

  .sort-title{
    display: block;
    text-align: center;
    margin: 0 0 12px 0;

    font-size: $fontSize;
    text-transform: uppercase;
    color: white;
  }

  .sort-list {
    min-width: 600px;
    width: 100%;
    display: flex;
    justify-content: center;

    &-item {

      & input[type=radio] {
        display: none;
      }

      & label {
        cursor: pointer;
        padding: 5px 15px;
        font-size: 18px;
        border: 1px solid #999;
        border-right: none;
        user-select: none;
        text-transform: uppercase;
        color: white;
        background-color: #36A1FF;
      }
    }

    & &-item:first-child label {
      border-radius: 6px 0 0 6px;
    }

    & &-item:last-child label {
      border-radius: 0 6px 6px 0;
      border-right: 1px solid #999;
    }

    /*Checked*/
    & input[type=radio]:checked + label {
      background: #ffe0a6;
      color: black;
    }

    /*Hover*/
    & label:hover {
      color: #666;
    }
  }
</style>
