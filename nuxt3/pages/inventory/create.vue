<template>
  <BlockContent>
    <template #title>Create New Product And Sku</template>
    <template #content ref="detailElement">
      <div class="h-full" ref="mainElement">
        <div ref="detailElement">
          <v-text-field
            density="compact"
            v-model="productFormInsert.product_name"
            label="Product Name"
          />

          <v-text-field
            density="compact"
            v-model="productFormInsert.category"
            label="Product Category"
          />
          <v-textarea
            density="compact"
            v-model="productFormInsert.description"
            label="Product Description"
          />
          <div class="flex justify-between mb-4">
            <b>Specific Detail</b>
            <button
              class="rounded-full text-white bg-blue-700 hover:bg-blue-800 focus:ring focus:ring-white focus:outline-none font-medium text-sm px-4 py-2 text-center"
              @click="addSku"
            >
              New Sku
            </button>
          </div>
        </div>
        <div
          v-if="productFormInsert.sku.length > 0"
          :style="{
            maxHeight: `calc(${
              mainElement?.clientHeight -
              detailElement?.clientHeight -
              actionElement?.clientHeight
            }px - 2rem)`,
            height: '100%',
          }"
          class="overflow-auto scroll-smooth"
        >
          <div
            class="border-black border p-4 rounded-lg mb-4"
            v-for="(sku, index) in productFormInsert.sku"
          >
            <v-text-field
              density="compact"
              v-model="sku.sku_id"
              label="Sku Id"
            />
            <v-textarea
              density="compact"
              v-model="sku.description"
              label="Description"
            />
            <div class="flex justify-end">
              <button
                class="rounded-full shadow-md bg-red-700 hover:bg-red-800 focus:ring focus:ring-white font-medium text-sm text-white px-4 py-2"
                @click="removeSku(index)"
              >
                remove Sku
              </button>
            </div>
          </div>
        </div>
        <div class="flex justify-end gap-4 mt-4" ref="actionElement">
          <button
            class="rounded-full shadow-md bg-red-700 hover:bg-red-800 focus:ring focus:ring-white font-medium text-sm text-white px-4 py-2"
          >
            close
          </button>
          <button
            class="rounded-full text-white bg-blue-700 hover:bg-blue-800 focus:ring focus:ring-white focus:outline-none font-medium text-sm px-4 py-2 text-center"
            @click="create"
          >
            submit
          </button>
        </div>
      </div>
    </template>
  </BlockContent>
</template>
<script setup lang="ts">
const detailElement = ref();
const mainElement = ref();
const actionElement = ref();
const router = useRouter();
const { insertProduct, productFormInsert, addSku, removeSku } = useProduct();
async function create() {
  const productId = await insertProduct();
  console.log(productId);
  if (productId) {
    router.push({ path: "/inventory", query: { productId: productId } });
  }
}
</script>
