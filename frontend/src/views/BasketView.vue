<script setup>
import state from '@/store/store';

const increment = (item) => {
  item.counter += 1;
}

const decrement = (item) => {
  if(item.counter == 1) {
    const idx = state.findIndex(item => item == item)
    state.splice(idx, 1);
    return
  }
  item.counter -= 1;
}

</script>

<template>
  <div class="about">
    <h1>Ваша корзина</h1>
    <div v-for="item of state" class="card">
      <div>
        <span>Размер: </span>
        <span class="colorText">{{ item.size }}</span>
      </div>
      <div>
        <span>Число напитков: </span>
        <span class="colorText">{{ item.cups }}</span>
      </div>
      <div>
        <span>Всего кофемашин: </span>
        <span class="colorText">{{ item.counter }}</span>
      </div>

      <div class="actions">
        <button @click="() => increment(item)">Добавить 1</button>
        <button @click="() => decrement(item)">Удалить 1</button>
      </div>
    </div>
  </div>
</template>

<style scoped>

.card {
  padding: 10px;
  border-radius: 8px;
  border: 1px solid hsla(160, 100%, 37%, 1);
  margin: 10px 0;
}

button {
  border: none;
  padding: 4px;
  margin-right: 5px;
  border-radius: 4px;
  cursor: pointer;
  font-weight: 700;
  transition: all .3s;
  text-transform: capitalize;
  background-color: hsla(160, 100%, 37%, 1);
  color: black;
}


button:hover {
  background-color: hsla(160, 100%, 50%, 1);
}

.colorText {
  color: hsla(160, 100%, 37%, 1);
  text-transform: capitalize;

}

</style>
