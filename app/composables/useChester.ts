import { mockWarehouses } from "@/data/chester";
import type { StorageItem, Warehouse } from "@/data/chester";

/**
 * A composable which manages the data for the `Chester` warehouse application.
 */
export const useChester = () => {
  /**
   * Initialize the warehouses data from the local storage.
   */
  const initialize = (): Warehouse[] => {
    const localWarehouses = localStorage.getItem("warehouses");
    if (!localWarehouses) return mockWarehouses;

    // Parse the local warehouses data
    return JSON.parse(localWarehouses) as Warehouse[];
  };

  const previewingItem = ref<StorageItem | null>(null);
  const warehouses = useState<Warehouse[]>("warehouses", () => initialize());

  /**
   * Get all the items for a given storage unit.
   *
   * @param storageUnitId - The ID of the storage unit to get the items from.
   * @returns A list of items for the given storage unit.
   */
  const getItemsFromStorageUnit = (storageUnitId: string): StorageItem[] => {
    // Find the warehouse that contains the storage unit
    const warehouse = warehouses.value.find((wh) => wh.storageUnits.some((unit) => unit.id === storageUnitId));
    if (!warehouse) return [];

    // Find the storage unit in the warehouse
    const storageUnit = warehouse.storageUnits.find((su) => su.id === storageUnitId);
    if (!storageUnit) return [];

    return storageUnit.items || [];
  };

  /**
   * Get all the items for a given storage unit split into categories.
   *
   * @param storageUnitId - The ID of the storage unit to get the items from.
   * @returns A list of items for the given storage unit split into categories.
   */
  const getItemsFromStorageUnitCategorized = (storageUnitId: string): Record<string, StorageItem[]> => {
    const items = getItemsFromStorageUnit(storageUnitId);

    const categorizedItems: Record<string, StorageItem[]> = {};
    items.forEach((item) => {
      const category = item.category || "uncategorized";
      if (!categorizedItems[category]) categorizedItems[category] = [];
      categorizedItems[category]!.push(item);
    });

    return categorizedItems;
  };

  return {
    warehouses,
    getItemsFromStorageUnit,
    getItemsFromStorageUnitCategorized,
  };
};
