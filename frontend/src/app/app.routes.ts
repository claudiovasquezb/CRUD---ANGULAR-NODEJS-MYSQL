import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: 'notes',
        loadComponent: () => import("./notes/notes.component")
    },
    {
        path: '', 
        redirectTo: 'notes',
        pathMatch: 'full'
    }
];
