import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { DrillOp } from '../models/ui-models/drillops.model';
import { DrillingopsService } from './drillingops.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-drillingops',
  templateUrl: './drillingops.component.html',
  styleUrls: ['./drillingops.component.scss']
})
export class DrillingopsComponent implements OnInit {
  drillops: DrillOp[] = [];

  displayedColumns: string[] = ['id', 'startPoint', 'endPoint', 'eventName'];
  dataSource: MatTableDataSource<DrillOp> = new MatTableDataSource<DrillOp>();
  @ViewChild(MatPaginator) matPaginator!: MatPaginator;

  @ViewChild('canvas', { static: true }) myCanvas!: ElementRef;
  constructor(public drillingopsService: DrillingopsService) { }
  ngOnInit(): void {

    const canvas: HTMLCanvasElement = this.myCanvas.nativeElement;
    const context = canvas.getContext('2d');

    //Fetch Drilling Ops
    this.drillingopsService.getDrillingOps()
      .subscribe(
        (successResponse) => {
          //console.log(successResponse);
          this.drillops = successResponse;
          this.dataSource = new MatTableDataSource<DrillOp>(this.drillops);


          if (this.matPaginator) {
            this.dataSource.paginator = this.matPaginator;
          }

          if (this.drillops.length != 0) {
            if (context) {
              // SETUP  START
              this.#drawRectangle(context);
              this.#drawText(context);

              let positiony = 1;

              for (let i = 50; i < 1500; i = i + 50) {
                positiony = positiony + 50;
                context.fillText(i + "-", 50, positiony);
              }
              // UI SETUP END

              //stuck pipe
              console.log("RAM:::" + this.drillops.length);
              for (let i = 0; i < this.drillops.length; i++) {
                if (this.drillops[i].eventName == 'Stuck Pipe') {
                  this.#drawRectangle1(context, this.drillops[i].startPoint, this.drillops[i].endPoint);
                }
                if (this.drillops[i].eventName == 'Mud Loss') {
                  this.#drawRectangleMud(context, this.drillops[i].startPoint, this.drillops[i].endPoint)
                }
                if (this.drillops[i].eventName == 'Circulation Loss') {
                  this.#drawRectangleCL(context, this.drillops[i].startPoint, this.drillops[i].endPoint)
                }
              }
            }

          }
        },
        (errorResponse) => {
          console.log(errorResponse);
        }
      )
  }


  #drawRectangle(context: CanvasRenderingContext2D) {
    context.strokeStyle = 'black';
    context.fillStyle = 'rgba(255, 0, 0)';
    context.strokeRect(80, 50, 100, 900);
  }

  #drawText(context: CanvasRenderingContext2D) {
    context.shadowColor = 'rgba(0, 0, 0, 0.5)';
    context.fillStyle = 'black';
    context.font = '10px Arial';
    let postiony = 20;
  }

  #drawRectangle1(context: CanvasRenderingContext2D, x: number, y: number) {
    context.strokeStyle = 'black';
    context.fillStyle = 'rgba(255, 0, 0)';
    context.fillRect(80, x, 100, y - x);
    let y1 = y- 10;
    context.fillText("Stuck Pipe (x- " + x + ", y -" + y + ")", 200, y1);
  }

  #drawRectangleMud(context: CanvasRenderingContext2D, x: number, y: number) {
    context.strokeStyle = 'black';
    context.fillStyle = 'rgba(110,100,90)';
    context.fillRect(100, x, 60, y - x);
    let y1 = y- 10;
    context.fillText("Mud Loss (x- " + x + ", y -" + y + ")", 200, y1);
  }

  #drawRectangleCL(context: CanvasRenderingContext2D, x: number, y: number) {
    context.strokeStyle = 'black';
    context.fillStyle = 'rgba(0,0,0)';
    context.fillRect(120, x, 20, y - x);    
    context.fillText("Circulation Loss (x- " + x + ", y -" + y + ")", 200, y);
  }
}
