import { mapState } from "vuex";

export const storeStuffMixin = {

    computed: {
        ...mapState({
            storeAllProducts(state) {
                return state.storeAllProducts;
            }
        }),
        findProductIndex() {
            const vm = this;
            return this.storeAllProducts.findIndex(
                x => x.productID == vm.$route.params.productID
            );
        },
        findProductIndexAdd() {
            const vm = this;
            return this.storeAllProducts.findIndex(
                x => x.productID == vm.product.productID
            );
        },
    },
}

export const add = {
    data() {
        return {
            isProductInCart: false,
            quantityKey: 0
        }
    },
}

export const loadingCategoryProducts = {
    data() {
        return {
            loading: true
        }
    }
}