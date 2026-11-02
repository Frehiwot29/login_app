import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

interface UserItem {
  id: number;
  name: string;
  email: string;
  role: string;
}

@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.scss' // Make sure extension is .scss
})
export class UserListComponent {
  // Using Signals to hold our reactive array list
  users = signal<UserItem[]>([
    { id: 1, name: 'John Doe', email: 'john@example.com', role: 'Administrator' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'Editor' },
    { id: 3, name: 'Alex Jones', email: 'alex@example.com', role: 'Subscriber' }
  ]);

  // Form Model Properties
  userId: number | null = null;
  userName = '';
  userEmail = '';
  userRole = 'Subscriber';
  isEditing = false;

  saveUser() {
    if (!this.userName || !this.userEmail) return;

    if (this.isEditing && this.userId !== null) {
      // Update existing item
      this.users.update(currentList => 
        currentList.map(u => u.id === this.userId 
          ? { ...u, name: this.userName, email: this.userEmail, role: this.userRole } 
          : u
        )
      );
    } else {
      // Add new item
      const newId = this.users().length > 0 ? Math.max(...this.users().map(u => u.id)) + 1 : 1;
      const newUser: UserItem = {
        id: newId,
        name: this.userName,
        email: this.userEmail,
        role: this.userRole
      };
      this.users.update(currentList => [...currentList, newUser]);
    }

    this.resetForm();
  }

  editUser(user: UserItem) {
    this.isEditing = true;
    this.userId = user.id;
    this.userName = user.name;
    this.userEmail = user.email;
    this.userRole = user.role;
  }

  deleteUser(id: number) {
    if (confirm('Are you sure you want to remove this user?')) {
      this.users.update(currentList => currentList.filter(u => u.id !== id));
    }
  }

  resetForm() {
    this.isEditing = false;
    this.userId = null;
    this.userName = '';
    this.userEmail = '';
    this.userRole = 'Subscriber';
  }
}
