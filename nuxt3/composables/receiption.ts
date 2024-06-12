import type { InsertFormReceiption } from "~/interface";

export function useReceiption() {
  const insertFormReceiption = ref<InsertFormReceiption>({
    product_id: null,
    sku_id: null,
    qty: 0,
    cost: 0,
    title: "",
    description: "",
  });

  async function insertReceiption(): Promise<null | number> {
    if (
      Object.values(insertFormReceiption.value).some(
        (x) => x === null || x === "" || (typeof x === "number" && x <= 0)
      )
    ) {
      alert("เกิดข้อผิดพลาด");
      return null;
    }
    try {
      const res: number = await $fetch("http://localhost:5000/receipt", {
        method: "POST",
        body: { ...insertFormReceiption.value },
      });
      return res;
    } catch (ex) {
      alert("เกิดข้อผิดพลาด");
      console.log(ex);
      return null;
    }
  }
  function resetState() {
    insertFormReceiption.value = {
      product_id: null,
      sku_id: null,
      qty: 0,
      cost: 0,
      title: "",
      description: "",
    };
  }
  return {
    insertFormReceiption,
    insertReceiption,
    resetState,
  };
}
