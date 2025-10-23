import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ProductService} from "../../shared/services/product.service";
import {ActivatedRoute, Params, Router} from "@angular/router";

@Component({
  selector: 'order-component',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})
export class OrderComponent implements OnInit {
  formOrder!: FormGroup;
  product: string = "";
  isActiveForm: boolean = true;
  isErrorResponse: boolean = false;
  isSubmitting: boolean = false

  constructor(private formBuilder: FormBuilder,
              private productService: ProductService,
              private activatedRoute: ActivatedRoute,
              private router: Router
  ) {  }

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe((params: Params): void => {
      this.product = params['product'] || '';

      this.formOrder = this.formBuilder.group({
        "product": [{value: this.product, disabled: true}],
        "userName": ["", [Validators.required, Validators.pattern(/^[А-ЯA-zа-яa-z]+$/)]],
        "lastName": ["", [Validators.required, Validators.pattern(/^[А-ЯA-zа-яa-z]+$/)]],
        "phone": ["", [Validators.required, Validators.pattern(/^[+]?[0-9]{11}$/)]],
        "addressDetails": this.formBuilder.group({
          "country": ["", [Validators.required]],
          "zip": ["", [Validators.required]],
          "address": ["", [Validators.required, Validators.pattern(/^[А-ЯA-zа-яa-z0-9\-\/\s]+$/)]],
        }),
        "comment": [""],
      });
    })
  }

  get _userName() {
    return this.formOrder.get('userName');
  }

  get _lastName() {
    return this.formOrder.get('lastName');
  }

  get _phone() {
    return this.formOrder.get('phone');
  }

  get _country() {
    return this.formOrder.get('addressDetails')?.get('country');
  }

  get _zip() {
    return this.formOrder.get('addressDetails')?.get('zip');
  }

  get _address() {
    return this.formOrder.get('addressDetails')?.get('address');
  }

  get _comment() {
    return this.formOrder.get('comment');
  }

  submit(): void {
    if (this.formOrder.invalid) {
      this.formOrder.markAllAsTouched();
      return;
    }

    this.isSubmitting = true;

    this.productService.createOrder({
      name: this._userName?.value,
      last_name: this._lastName?.value,
      phone: this._phone?.value,
      country: this._country?.value,
      zip: this._zip?.value,
      product: this.product,
      address: this._address?.value,
      comment: this._comment?.value,
    })
      .subscribe({
      next: (res: { success: number, message?: string }): void => {
        if (res.success && !res.message) {
          this.isActiveForm = false;
          setTimeout(() => {
            this.isActiveForm = true;
            this.router.navigate(['/']);
          }, 3000)
        } else {
          this.showTemporaryError();
        }
      },
      error: (): void => {
        this.showTemporaryError();
      },
      complete: (): void => {
        this.isSubmitting = false;
      }
    });
  }

  private showTemporaryError(): void {
    this.isErrorResponse = true;

    setTimeout(() => {
      this.isErrorResponse = false;
    }, 3000);
  }
}
