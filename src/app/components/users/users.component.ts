import { Component, OnInit, OnDestroy } from '@angular/core';
import { UsersService } from '../../services/users/users.service';
import { FilteringService } from '../../services/filtering/filtering.service';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  dtOptions: DataTables.Settings = {};
  allUsers: any = [];
  form = this.fb.group({
    id: ['', [Validators.required]],
    name: ['', [Validators.required]],
    username: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]],
    phone: ['', [Validators.required]],
  });
  userSelected: any = {};
  constructor(private service: UsersService, private filtering: FilteringService, private fb: FormBuilder) { }

  ngOnInit(): void {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 5,
      serverSide: true,
      processing: true,
      responsive: true,
      ajax: (dataTablesParameters: any, callback) => {
        this.service
          .users()
          .subscribe((response: any) => {
            var filter = this.filtering.filter(dataTablesParameters, response);
            this.allUsers = filter.list;
            callback({
              recordsTotal: response.length,
              recordsFiltered: filter.filtered ? filter.length : response.length,
              data: [{id: '', name: '', username: '', email: '', phone: ''}],
            });
          });
      },
      // Set column title and data field
      columns: [
        {
          title: 'Id',
          data: 'id',
        },
        {
          title: 'Name',
          data: 'name',
        },
        {
          title: 'Username',
          data: 'username',
        },
        {
          title: 'Email',
          data: 'email',
        },
        {
          title: 'Phone number',
          data: 'phone',
        }
      ],
    };
  }

  selectUser(user: any) {
    // check if userSelected is empty, before assigning a selected user
      this.userSelected = user;

      this.form.patchValue({
        id: user.id,
        name: user.name,
        username: user.username,
        email: user.email,
        phone: user.phone
      })
  }
  update() {
    // gets the index of the user we need to update
    let index = this.allUsers.map((u: any) => u.id).indexOf(this.userSelected.id);

    // updates the user at the index selected
    this.allUsers[index] = {
      id: this.userSelected.id,
      username: this.form.value.username!,
      name: this.form.value.name!,
      email: this.form.value.email!,
      phone: this.form.value.phone!
    };

    // clean up
    this.userSelected = {};
    this.form.reset();
  }
}
