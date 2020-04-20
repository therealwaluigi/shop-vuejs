<template>
    <div>
        <router-link to="/">Produkte</router-link> |
        <router-link to="/warenkorb">Warenkorb</router-link>
        <div class="detail" v-if="product">
            <img :src="product.image" :alt="product.name" style="width:100%">
            <h2>{{ product.name }}</h2>
            <p class="price">{{ product.description }}</p>
            <p class="price">{{ product.price }} CHF</p>
            <p><button :class="{ 'success': added }" v-on:click="addToCart()">Zum Warenkorb hinzufügen</button></p>
        </div>
    </div>
</template>

<script>
import axios from 'axios'
export default {
    name: "ProductDetail",
    data() {
        return {
            added: false,
            id: this.$route.params.id,
            product: null
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
    },
    mounted() {
        axios
            .get('http://localhost:8000/product/'+this.id)
            .then(response => (this.product = response.data[0]))
    }
}
</script>

<style scoped>
    .detail {

        height: auto;
        width: 750px;
        box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
        margin: auto;
        text-align: center;
    }
    .detail img {
        height: 250px;
        width: auto;
        object-fit: contain;
    }
    .detail {
        color: grey;
        font-size: 22px;
    }

    .detail button {
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
    .detail button:hover {
        opacity: 0.7;
    }
    a {
        color: #42b983;
    }
</style>