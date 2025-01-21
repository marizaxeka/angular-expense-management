import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { MatTableModule } from '@angular/material/table';


@Component({
  selector: 'app-approvals-list',
  standalone: true,
  imports: [    
    CommonModule,
    RouterModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule],
  templateUrl: './approvals-list.component.html',
  styleUrl: './approvals-list.component.scss'
})
export class ApprovalsListComponent {

}
