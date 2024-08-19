from django.contrib import admin
from .models import City, Company, Product, CompanyProduct

# Register your models here.

admin.site.register(City)
admin.site.register(Company)
admin.site.register(Product)
admin.site.register(CompanyProduct)