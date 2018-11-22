import { IBingoItemRow } from "./ibingo-item-row";

export interface IBingoGame {
    id: number;
    rows: IBingoItemRow[];
    rowAmount: number;
    columnAmount: number;
}
