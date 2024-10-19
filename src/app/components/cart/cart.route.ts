import { Routes } from '@angular/router';

export default[
    {
        path:'',
        loadComponent: () => 
            import('./list-cart/list-cart.component').then(
                (m) =>m.ListCartComponent
            )
    },
    {
        path:':id',
        loadComponent: () => 
            import('./list-cart/list-cart.component').then(
                (m) =>m.ListCartComponent
            )
    }
]as Routes;