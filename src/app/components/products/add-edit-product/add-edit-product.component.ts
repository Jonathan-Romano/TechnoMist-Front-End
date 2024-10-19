import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import {ActivatedRoute, Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Product } from '../../../interfaces/product';
import { ProductService } from '../../../services/product.service';
import { ToastrService } from 'ngx-toastr';
import { ProgressBarComponent } from "../../../shared/progress-bar/progress-bar.component";

@Component({
  selector: 'app-add-edit-product',
  standalone: true,
  imports: [
    RouterModule,
    ReactiveFormsModule,
    CommonModule,
    ProgressBarComponent
],
  templateUrl: './add-edit-product.component.html',
  styleUrl: './add-edit-product.component.css'
})
export class AddEditProductComponent {
  form: FormGroup;
  loading: boolean = false;
  id: number;
  operacion: string = "Agregar ";

  constructor(private fb: FormBuilder,
    private _productService: ProductService, 
    private toastr: ToastrService,
    private router: Router,
    private aRouter: ActivatedRoute
  ){
    this.form = this.fb.group({
        name: ['',[Validators.required, Validators.maxLength(255)]],
        code: ['',Validators.required],
        marc: ['',Validators.required],
        price: [null ,Validators.required],
      }
    )
    this.id = Number(aRouter.snapshot.paramMap.get('id'));
   // console.log(this.id)
  }
  
  ngOnInit(): void {
    if (this.id != 0){
      //console.log(this.id != 0)
      this.operacion = 'Editar ';
      this.getProduct(this.id);
    }
  }

  getProduct(id: number) {
    this.loading = true;
    this._productService.getProductById(id).subscribe((response: Product) => {
      //console.log(response)
      this.form.setValue({
        name: response.nombre,
        code: response.codigo,
        marc: response.marca,
        price: response.precio
      })
      this.loading = false;
    })
  }


  saveProduct(){
    this.loading = true;
    const product: Product = {
      nombre:  this.form.value.name,
      codigo: this.form.value.code,
      marca: this.form.value.marc,
      precio: this.form.value.price
     }

     if (this.id != 0){
      //es Editar
      product.idP=this.id;
      this._productService.updateProduct(product).subscribe((response: Product) =>{
        this.toastr.info(`Producto ${product.nombre} actualizado correctamente`, "Technomist");
        this.loading = false;
        this.router.navigate(['/']);
      })
    } else{
      //es agregar
      this._productService.saveProduct(product).subscribe((response: string) => {
        this.toastr.success(`Producto ${product.nombre} guardado correctamente`, "Technomist");
        this.loading = false;
        this.router.navigate(['/']);
      });
    }
  }
}
