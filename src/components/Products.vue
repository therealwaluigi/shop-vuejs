<template>
    <div>
        <router-link to="/warenkorb">Zum Warenkorb</router-link>
        <h1>Produkte</h1>
        <div class="products" v-if="products">
            <ProductCard v-for="product in products" :key="product.id" :id="product.id" :name="product.name" :img="product.image" :price="product.price"></ProductCard>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
import ProductCard from './ProductCard'

export default {
    name: 'Products',
    components: {
        ProductCard
    },
    data() {
        return {
            added: false,
            products: null
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
            .get('http://localhost:8000/products')
            .then(response => (this.products = response.data))
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    .products {
        width: 80%;
        margin: 0 auto;
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(400px, 3fr));
        grid-row-gap: 100px;

    }
    h3 {
        margin: 40px 0 0;
    }

    ul {
        list-style-type: none;
        padding: 0;
    }

    li {
        display: inline-block;
        margin: 0 10px;
    }

    a {
        color: #42b983;
    }
</style>
