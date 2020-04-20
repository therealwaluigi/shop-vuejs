<template>
    <div class="cart">
        <router-link to="/">Zu den Produkten</router-link>
        <h1>Warenkorb</h1>
        <table>
            <thead>
                <tr>
                    <th>Bild</th>
                    <th>Produktname</th>
                    <th>Anzahl</th>
                    <th>Preis pro Stück</th>
                    <th>Preis Total</th>
                </tr>
            </thead>
            <tr v-for="item in cart" :key="item.id">
                <td><img :src="item.image" height="25px"></td>
                <td>{{ item.name }}</td>
                <td>{{ item.amount }} x</td>
                <td>{{ item.price }} CHF </td>
                <td>{{ item.priceTotal }}0 CHF</td>
            </tr>
            <tr>
                <td colspan="4"><b>Total</b></td>
                <td colspan="1"><b>{{ this.sumTotal(cart)}}0 CHF</b></td>
            </tr>
        </table>
    </div>
</template>

<script>
import axios from 'axios'
export default {
    name: "Cart",
    data() {
        return {
            cart: null,
        }
    },
    methods: {
        sumTotal: function (cart) {
            var total = 0;
            for (var item in cart){
                total += cart[item].priceTotal;
            }
            return Math.round(total * 100) / 100;
        }
    },
    mounted() {
        axios
            .get('http://localhost:8000/cart')
            .then(response => (this.cart = response.data))
    }
}
</script>

<style scoped>
    .cart {
        margin-top: 50px;
    }
    .cart table{
        text-align: left;
        width: 800px;
        margin: 0 auto;
        border-collapse: collapse;
    }
    .cart td{
        border-top: 1px solid black;
    }
    a {
        color: #42b983;
    }
</style>