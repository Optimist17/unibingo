import { AllTitles } from './helper/titles';
import { Component, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { IBingoGame } from './models/service/ibingo-game';
import { IBingoItem } from './models/service/ibingo-item';
import { IBingoItemRow } from './models/service/ibingo-item-row';
import { BingoDialogOptions } from './dialogs/bingo-dialog/bingo-dialog-options';
import { MatDialog } from '@angular/material';
import { BingoDialogComponent } from './dialogs/bingo-dialog/bingo-dialog.component';
import { Observable, Subject } from 'rxjs';
import { MediaMatcher } from '@angular/cdk/layout';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent extends AllTitles implements OnDestroy {
  public bingoGame: IBingoGame;
  public finished: boolean;
  private _bingo: Subject<boolean>;
  //public blub: string[] = Titles;

  mobileQuery: MediaQueryList;

  private _mobileQueryListener: () => void;
  
  constructor(
    private _dialog: MatDialog,
    changeDetectorRef: ChangeDetectorRef, 
    media: MediaMatcher
  ) {
    super();

    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);

    this.loadData();

    this._bingo.subscribe((result) => {
      this.openDialog();
    })
  }

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }

  loadData() {
    this._bingo = new Subject<boolean>();
    this.bingoGame = this.generateBingoGame(5,5);
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
          id: (i*height)+j,
          title: this.titles[Math.floor(Math.random()*this.titles.length)],
          isSelected: false,
          color: ''
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
    (item.isSelected) ? item.color = 'primary' : item.color = '';

    let itemCounterHorizontal: number = 0;
    let itemCounterVertical: number[] = new Array();
    let itemCounterVertical2: number[] = new Array();
    this.bingoGame.rows.forEach(row => {
      row.items.forEach(column => {
        if (column.id%row.items.length==0) {
          itemCounterHorizontal = 0;
        }

        (column.isSelected) ? itemCounterHorizontal++ : itemCounterHorizontal = 0;
        if (itemCounterHorizontal == row.items.length) {
          this.finished = true;
          this._bingo.next(true);
        }

        if (row.id == 0) {
          if (column.isSelected) itemCounterVertical.push(row.items.indexOf(column));
        } else {
          if (column.isSelected && itemCounterVertical.includes(row.items.indexOf(column))) {
            itemCounterVertical2.push(row.items.indexOf(column));
          }
        }
      });

      if (row.id != 0) {
        itemCounterVertical = new Array();
        itemCounterVertical2.forEach(item => {
          itemCounterVertical.push(item);
        });
        itemCounterVertical2 = new Array();
      }
    });

    if (itemCounterVertical.length != 0) {
      this.finished = true;
      this._bingo.next(true);
    }
  }

  openDialog(): void {
    const dialogOptions: BingoDialogOptions = {

    }
    const dialogRef = this._dialog.open(BingoDialogComponent, {
      data: dialogOptions
    });
  }
}
