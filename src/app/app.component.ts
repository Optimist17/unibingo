import { Component } from '@angular/core';
import { IBingoGame } from './models/service/ibingo-game';
import { IBingoItem } from './models/service/ibingo-item';
import { IBingoItemRow } from './models/service/ibingo-item-row';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  public bingoGame: IBingoGame;
  public finished: boolean;

  //public blub: string[] = Titles;
  
  constructor() {
    this.loadData();
  }

  loadData() {

    const bingoRow1: IBingoItemRow = {
      id: 1,
      items: [
        {
          id: 1,
          title: 'hallo',
          isSelected: false
        },
        {
          id: 2,
          title: 'moin',
          isSelected: false
        },
        {
          id: 3,
          title: 'blub',
          isSelected: false
        }
      ]
    }

    const bingoRow2: IBingoItemRow = {
      id: 2,
      items: [
        {
          id: 4,
          title: 'hallo',
          isSelected: false
        },
        {
          id: 5,
          title: 'moin',
          isSelected: false
        },
        {
          id: 6,
          title: 'blub',
          isSelected: false
        }
      ]
    }

    const bingoRow3: IBingoItemRow = {
      id: 3,
      items: [
        {
          id: 7,
          title: 'hallo',
          isSelected: false
        },
        {
          id: 8,
          title: 'moin',
          isSelected: false
        },
        {
          id: 9,
          title: 'blub',
          isSelected: false
        }
      ]
    }

    const bingoGame: IBingoGame = {
      id: 1,
      rows: [bingoRow1,bingoRow2,bingoRow3],
      columnAmount: 3,
      rowAmount: 3
    };

    this.bingoGame = bingoGame;
  }

  clickBingoItem(item: IBingoItem) {
    this.finished = false;
    (!item.isSelected) ? item.isSelected = true : item.isSelected = false;

    let itemCounterHorizontal: number = 0;
    let itemCounterVertical: number[] = new Array();
    let itemCounterVertical2: number[] = new Array();
    this.bingoGame.rows.forEach(row => {
      row.items.forEach(item => {
        if (item.id == 1) {
          itemCounterHorizontal = 0;
        }

        (item.isSelected) ? itemCounterHorizontal++ : itemCounterHorizontal = 0;
        if (itemCounterHorizontal == row.items.length) {
          this.finished = true;
        }

        if (row.id == 1) {
          if (item.isSelected) itemCounterVertical.push(row.items.indexOf(item));
        } else {
          if (item.isSelected && itemCounterVertical.includes(row.items.indexOf(item))) {
            itemCounterVertical2.push(row.items.indexOf(item));
          }
        }
      });

      if (row.id != 1) {
        itemCounterVertical = new Array();
        itemCounterVertical2.forEach(item => {
          itemCounterVertical.push(item);
        });
        itemCounterVertical2 = new Array();
      }
    });

    if (itemCounterVertical.length != 0) {
      this.finished = true;
    }
  }
}
