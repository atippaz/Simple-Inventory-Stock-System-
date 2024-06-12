<template>
  <BlockContent>
    <template #title>
      <div class="flex justify-between">Create A Receiption</div>
    </template>
    <template #content>
      <v-row>
        <v-col cols="11">
          <v-select
            label="Select Product"
            :model-value="insertFormReceiption.product_id"
            :items="productDropdown"
            item-title="product_name"
            item-value="product_id"
            @update:modelValue="
              (e) => {
                getSkuDropdown(e);
              }
            "
          ></v-select>
        </v-col>
        <v-col>
          <div class="mt-3">
            <button
              @click="dialogProduct = true"
              class="disabled:bg-slate-400 rounded-full text-white bg-blue-700 hover:bg-blue-800 focus:ring focus:ring-white focus:outline-none font-medium text-sm px-4 py-2 text-center"
            >
              New Product
            </button>
          </div>
        </v-col>
      </v-row>

      <div>
        {{
          skuDropdown.length <= 0 && insertFormReceiption.product_id > 0
            ? "ยังไม่มี sku "
            : ""
        }}
        <v-row>
          <v-col cols="11">
            <v-select
              :items="skuDropdown"
              v-model="insertFormReceiption.sku_id"
              label="Select Sku"
              @update:modelValue="
                (e) => {
                  insertFormReceiption.sku_id = e;
                }
              "
              :disabled="skuDropdown.length == 0"
            ></v-select
          ></v-col>
          <v-col>
            <div class="mt-3">
              <button
                :disabled="!(insertFormReceiption.product_id > 0)"
                @click="dialogSku = true"
                class="disabled:bg-slate-400 rounded-full text-white bg-blue-700 hover:bg-blue-800 focus:ring focus:ring-white focus:outline-none font-medium text-sm px-4 py-2 text-center"
              >
                New Sku
              </button>
            </div>
          </v-col>
        </v-row>
      </div>

      <div>
        <v-text-field
          label="title"
          density="compact"
          v-model="insertFormReceiption.title"
        ></v-text-field>
      </div>
      <div>
        <v-textarea
          label="description"
          v-model="insertFormReceiption.description"
        ></v-textarea>
      </div>

      <div>
        <v-row>
          <v-col>
            <v-text-field
              label="qty"
              density="compact"
              type="number"
              v-model="insertFormReceiption.qty"
            ></v-text-field>
          </v-col>
          <v-col>
            <v-text-field
              label="cost"
              type="number"
              density="compact"
              v-model="insertFormReceiption.cost"
            ></v-text-field>
          </v-col>
        </v-row>
      </div>
      <div class="flex justify-end">
        <div class="flex gap-2">
          <button
            class="rounded-full shadow-md bg-red-700 hover:bg-red-800 focus:ring focus:ring-white font-medium text-sm text-white px-4 py-2"
            @click="router.back()"
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
      <v-dialog width="500" v-model="dialogSku">
        <v-card width="500">
          <v-card-title>Add new Sku</v-card-title>
          <v-card-text>
            <v-text-field
              density="compact"
              v-model="skuForm.sku_id"
              label="Sku Id" />
            <v-textarea
              density="compact"
              v-model="skuForm.description"
              label="Description"
          /></v-card-text>
          <v-card-actions>
            <button
              class="rounded-full shadow-md bg-red-700 hover:bg-red-800 focus:ring focus:ring-white font-medium text-sm text-white px-4 py-2"
              @click="closeSkuDialog"
            >
              Close
            </button>
            <button
              class="rounded-full text-white bg-blue-700 hover:bg-blue-800 focus:ring focus:ring-white focus:outline-none font-medium text-sm px-4 py-2 text-center"
              @click="addNewSku"
            >
              submit
            </button></v-card-actions
          >
        </v-card>
      </v-dialog>
      <v-dialog width="500" v-model="dialogProduct">
        <v-card width="500">
          <v-card-title>Add new Product</v-card-title>
          <v-card-text>
            <v-text-field
              density="compact"
              v-model="productFormInsert.product_name"
              label="Product Name" />

            <v-text-field
              density="compact"
              v-model="productFormInsert.category"
              label="Product Category" />
            <v-textarea
              density="compact"
              v-model="productFormInsert.description"
              label="Product Description"
          /></v-card-text>
          <v-card-actions>
            <button
              class="rounded-full shadow-md bg-red-700 hover:bg-red-800 focus:ring focus:ring-white font-medium text-sm text-white px-4 py-2"
              @click="closeProductDialog"
            >
              Close
            </button>
            <button
              class="rounded-full text-white bg-blue-700 hover:bg-blue-800 focus:ring focus:ring-white focus:outline-none font-medium text-sm px-4 py-2 text-center"
              @click="addNewProduct"
            >
              submit
            </button>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </template>
  </BlockContent>
</template>
<script lang="ts" setup>
import type { ProductDropdown, SkuInsert } from "~/interface";
const router = useRouter();
const { insertFormReceiption, insertReceiption } = useReceiption();
const skuDropdown = ref<string[]>([]);
const dialogSku = ref(false);
const dialogProduct = ref(false);
const { insertProduct, productFormInsert, addSku, resetState } = useProduct();

const skuForm = ref<SkuInsert>({ sku_id: "", description: "", product_id: -1 });
const { data: productDropdown, refresh } = useLazyFetch<ProductDropdown[]>(
  `http://localhost:5000/product/dropdown`
);
async function create() {
  insertFormReceiption.value.cost = parseFloat(
    `${insertFormReceiption.value.cost}`
  );
  insertFormReceiption.value.qty = parseFloat(
    `${insertFormReceiption.value.qty}`
  );
  const res = await insertReceiption();
  if (res != null) {
    router.push({ path: `/receiption/${res}` });
  }
}
function closeProductDialog() {
  dialogProduct.value = false;
  resetState();
}
function closeSkuDialog() {
  dialogSku.value = false;
  skuForm.value = {
    description: "",
    product_id: null,
    sku_id: "",
  };
}
async function addNewSku() {
  if (Object.values(skuForm.value).some((x) => x === "" || x == null)) {
    alert("กรอกให้ครบทุกช่อง");
    return;
  }
  try {
    const res: string = await $fetch("http://localhost:5000/sku", {
      method: "POST",
      body: { ...skuForm.value },
    });
    console.log(res);
    if (res) {
      await getSkuDropdown(skuForm.value.product_id);
      insertFormReceiption.value.sku_id = res;
      dialogSku.value = false;
    }
  } catch (ex) {
    console.log(ex);
    alert("เพิ่มไม่สำเร็จ");
  }
}
async function addNewProduct() {
  const productId = await insertProduct();
  if (!productId) {
    alert("เพิ่มไม่สำเร็จ");
    return;
  }
  await refresh();
  dialogProduct.value = false;
  getSkuDropdown(productId);
}
async function getSkuDropdown(productId: number) {
  skuDropdown.value = [];
  skuForm.value.product_id = productId;
  insertFormReceiption.value.sku_id = null;
  insertFormReceiption.value.product_id = productId;
  const result = await $fetch<string[]>(
    `http://localhost:5000/sku/${productId}/dropdown`
  );
  skuDropdown.value = result;
}
</script>
