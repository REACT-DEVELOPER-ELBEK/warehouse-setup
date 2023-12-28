import { configureStore } from "@reduxjs/toolkit";
import addStaffSlicer from "../slicers/addStaff";
import getIncomingSlicer from "../slicers/getIncoming";
import getStockSlicer from "../slicers/getStock";
import addStockItemSlicer from "../slicers/addStockItem";
import loginSlicer from "../slicers/login";
import getInfoSlicer from "../slicers/getInfo";

export const store = configureStore({
  reducer: {
    getIncoming: getIncomingSlicer,
    addStaff: addStaffSlicer,
    getStock: getStockSlicer,
    addStockItem: addStockItemSlicer,
    login: loginSlicer,
    info: getInfoSlicer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
