import { Component, Input } from '@angular/core';
import { AdminService } from '../../../../providers/admin/admin.service';


@Component({
    selector: 'app-staff-info',
    templateUrl: './staffInfo.component.html'
})


export class StaffInfoComponent {
    staff: any;
    editable: boolean;
    @Input() set id(id: number) {
        this.adminService.getStaffById(id).subscribe((staff: any) => {
            this.staff = staff;
        });
    }

    @Input() set update(update: boolean) {
        this.editable = update;
    }
    constructor(private adminService: AdminService) {

    }

    hideViewPanel() {
        this.adminService.viewPanel.next(false);
    }
}
