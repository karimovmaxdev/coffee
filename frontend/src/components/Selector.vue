<script setup>
import {ref, reactive, computed, watch, defineEmits} from 'vue';
import state from '@/store/store';

const CONFIG = reactive([
  {
    id: 1,
    size: 'normal',
    cups: [6, 8],
  },
  {
    id: 2,
    size: 'big',
    cups: [6, 8, 12],
  }
]);
const emit = defineEmits(['addToBasket']);
const size = ref('normal'); // normal | big
const cups = ref(null);

const fecthForNewModel = async () => {
  try {
    
    const response = await fetch('http://localhost:3001');
    const data = await response.json();
    CONFIG.push(data)
  } catch (error) {
    console.log(error)
  }
}


const allSizes = computed(() => {
  return CONFIG.map(item => item.size);
});


const allCups = computed(() => {
  return CONFIG.find(item => item.size == size.value).cups
});

const allreadyAdded = computed(() => {
  return state.find(item => {
    return item.size == size.value && item.cups == cups.value;
  })
})

watch(size, () => {
  cups.value = null;
})




</script>

<template>
  <p>Выберите размер кофеварки:</p>
  <div class="actions">
    <button v-for="item of allSizes" 
      :class="{active: item == size}" 
      @click="size = item">
        {{ item }}
    </button>
  </div>

  <div class="image">
    <img :src="`./src/assets/${size}.jpg`">
  </div>

  <p>Выберите кол-во напитков:</p>
  <div class="cups">
    <button 
      v-for="cup of allCups" 
      :class="{active: cups == cup}"
      @click="cups = cup">
        {{ cup }} напитков
      </button>
  </div>

  <div class="description">
    <div>
      <span>Выбранный размер кофеварки: </span>
      <span class="size">{{ size }}</span>
    </div>

    <div>
      <span>Выбранное кол-во напитков: </span>
      <span class="size">{{ cups || 'Не выбрано' }}</span>
    </div>
  </div>
  
  <div class="addToBasket">
    <button v-if="!allreadyAdded" @click="state.push({size, cups, counter: 1})" :disabled="!cups">Добавить в корзину</button>
    <button v-else 
      @click="() => {
        allreadyAdded.counter += 1;
      }" 
      :disabled="!cups">
        {{ `Добавить еще +1 (Всего: ${allreadyAdded.counter})` }}
      </button>

    </div>
    <button :disabled="CONFIG.length > 2" class="fetch" @click="fecthForNewModel">Подгрузить последнюю модель</button>


</template>

<style scoped>

.description {
  margin: 20px 0;
  border: 1px solid hsla(160, 100%, 37%, 1);
  padding: 20px;
  border-radius: 8px;
}
.actions, .cups {
  display: flex;
  gap: 10px;
}
button {
  border: none;
  padding: 4px;
  border-radius: 4px;
  cursor: pointer;
  font-weight: 700;
  transition: all .3s;
  text-transform: capitalize;
}

button.active {
  background-color: hsla(160, 100%, 37%, 1);
  color: black;
}

button:hover {
  background-color: hsla(160, 100%, 50%, 1);;
}

.image {
  margin-top: 20px;
  width: 300px;
  height: 300px;
}

.image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  aspect-ratio: 1/1;
}

.size {
  color: hsla(160, 100%, 37%, 1);
  text-transform: capitalize;
}

.addToBasket {
  margin: 0 auto;
}

.fetch {
  margin-top: 30px;
}
</style>
