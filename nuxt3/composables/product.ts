import type { InsertFormReceiption, ProductInsert } from "~/interface";

export function useProduct() {
  const productFormInsert = ref<ProductInsert>({
    category: "",
    description: "",
    product_name: "",
    sku: [],
  });

  async function insertProduct(): Promise<null | number> {
    if (
      Object.values(productFormInsert.value).some((x) => x === null || x === "")
    ) {
      alert("เกิดข้อผิดพลาด");
      return null;
    }
    if (productFormInsert.value.sku.some((x) => x.sku_id == "")) {
      alert("เกิดข้อผิดพลาด");
      return null;
    }
    try {
      const res: { id: number } = await $fetch(
        "http://localhost:5000/product",
        {
          method: "POST",
          body: { ...productFormInsert.value },
        }
      );
      return res.id;
    } catch (ex) {
      alert("เกิดข้อผิดพลาด");
      console.log(ex);
      return null;
    }
  }
  function addSku() {
    const len = productFormInsert.value.sku.length;
    if (
      productFormInsert.value.sku.length > 0 &&
      Object.values(productFormInsert.value.sku[len - 1]).some(
        (x) => x === null || x === ""
      )
    ) {
      alert("กรอกข้อมูลอันเก่าให้ครบก่อน !!");
      return;
    }
    productFormInsert.value.sku.push({
      description: "",
      sku_id: "",
    });
  }
  function removeSku(indexSku: number) {
    productFormInsert.value.sku.splice(indexSku, 1);
  }
  function resetState() {
    productFormInsert.value = {
      category: "",
      description: "",
      product_name: "",
      sku: [],
    };
  }

  return {
    productFormInsert,
    insertProduct,
    resetState,
    addSku,
    removeSku,
  };
}
