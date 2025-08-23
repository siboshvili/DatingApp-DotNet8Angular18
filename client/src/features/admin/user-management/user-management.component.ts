import {Component, inject, OnInit, signal} from '@angular/core';
import {AdminService} from '../../../core/services/admin.service';
import {User} from '../../../types/user';
@Component({
  selector: 'app-user-management',
  imports: [],
  templateUrl: './user-management.component.html',
  styleUrl: './user-management.component.css'
})
export class UserManagementComponent implements OnInit{
  private adminService = inject(AdminService);
  protected users = signal<User[]>([]);

  ngOnInit(): void {
    this.getUserWithRoles()
  }
  
  getUserWithRoles(){
    this.adminService.getUserWithRoles().subscribe({
      next: users => this.users.set(users)
    });
  }
  
}
