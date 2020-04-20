<template>
    <div class="card">
        <img :src="this.img" alt="Denim Jeans" style="width:100%">
        <router-link :to="'/produkt/'+this.id"><h2>{{ name }}</h2></router-link>
        <p class="price">{{ price }} CHF</p>
        <p><button :class="{ 'success': added }" v-on:click="addToCart()">Zum Warenkorb hinzufügen</button></p>
    </div>
</template>

<script>
import axios from 'axios';

export default {
    name: 'Products',
    props: {
        id: Number,
        price: String,
        name: String,
        img: String,
    },
    data() {
      return {
          added: false
      }
    },
    methods: {
        addToCart: function () {
            axios({
                method: 'post',
                url: 'http://localhost:8000/cart',
                data: {
                    product_id: this.id
                }
            }).then(() => {
                this.added = true;
                setTimeout(() => this.added = false, 1000)
            }, (error) => {
                console.log(error);
            });
        }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    .card {
        height: 400px;
        width: 250px;
        box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
        max-width: 300px;
        margin: auto;
        text-align: center;
    }
    .card img {
        height: 250px;
        width: auto;
        object-fit: contain;
    }
    .price {
        color: grey;
        font-size: 22px;
    }

    .card button {
        outline: 0;
        padding: 12px;
        color: white;
        background-color: #000;
        text-align: center;
        cursor: pointer;
        width: 100%;
        border: none;
        font-size: 18px;
        transition: background-color 4s ;
    }
    .success{
        transition: background-color 0.1s !important;
        background-color: green !important;
    }
    .card button:hover {
        opacity: 0.7;
    }
    a {
        color: #42b983;
    }
</style>
