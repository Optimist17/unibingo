import { AllTitles } from './helper/titles';
import { Component } from '@angular/core';
import { IBingoGame } from './models/service/ibingo-game';
import { IBingoItem } from './models/service/ibingo-item';
import { IBingoItemRow } from './models/service/ibingo-item-row';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent extends AllTitles {
  public bingoGame: IBingoGame;
  public finished: boolean;
  //public blub: string[] = Titles;
  
  constructor() {
    super();
    this.loadData();
  }

  loadData() {
    this.bingoGame = this.generateBingoGame(3,3);
  }

  generateBingoGame(height,width): IBingoGame {
    let game: IBingoGame = {
      id: 1,
      rows: new Array(),
      rowAmount: height,
      columnAmount: width
    }

    for (let i = 0; i < height; i++) {
      let row: IBingoItemRow = {
        id: i,
        items: new Array()
      }
      for(let j = 0; j < width; j++) {
        let item: IBingoItem = {
          id: i*height,
          title: this.titles[Math.floor(Math.random()*this.titles.length)],
          isSelected: false
        }
        row.items.push(item);
      }
      game.rows.push(row);
    }

    return game;
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
