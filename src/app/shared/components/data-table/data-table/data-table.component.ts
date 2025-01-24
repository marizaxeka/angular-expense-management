import { Component, EventEmitter, Input, Output } from '@angular/core';
import { TableColumn } from '../table-config.interface.ts/table-column.interface';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { RouterModule } from '@angular/router';
import { MatTooltipModule } from '@angular/material/tooltip';
import { Trip } from '../../../../core/interfaces/trip.interface';
import { RefundStatus } from '../../../../core/enums/refund-status.enum';
import { MatPaginatorModule } from '@angular/material/paginator';
import { TripStatus } from '../../../../core/enums/trip-status.enum';

@Component({
  selector: 'app-data-table',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatTooltipModule,
    MatPaginatorModule,
  ],
  templateUrl: './data-table.component.html',
  styleUrl: './data-table.component.scss',
})
export class DataTableComponent {
  @Input() data: Trip[] = [];
  @Input() columns: TableColumn[] = [];
  columnKeys: string[] = [];
  @Input() userRole: 'END_USER' | 'APPROVER' | 'FINANCE' = 'END_USER';
  @Input() calculateTotalFn!: (item: Trip) => number;
  @Input() getStatusClassFn!: (status: string) => string;
  @Input() getStatusIconFn!: (status: string) => string;
  @Input() getStatusClass: (status: string) => string = () => '';
  @Output() sendForApproval = new EventEmitter<Trip>();
  @Output() approve = new EventEmitter<Trip>();
  @Output() reject = new EventEmitter<Trip>();
  @Output() view = new EventEmitter<Trip>();

  @Output() updateRefundStatus = new EventEmitter<{
    trip: Trip;
    status: RefundStatus;
  }>();
  RefundStatus = RefundStatus;
  TripStatus = TripStatus;

  ngOnInit() {
    this.columnKeys = this.columns.map((col) => col.key);
  }

  get displayedColumns(): string[] {
    return this.columns.map((col) => col.key);
  }
}
