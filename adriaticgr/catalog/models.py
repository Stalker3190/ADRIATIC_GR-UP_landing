from django.db import models

# Create your models here.

#информация о зарегистрированных компаниях

class Company(models.Model):
    name = models.CharField(max_length=255)
    city = models.ForeignKey('City', on_delete=models.CASCADE)
    address = models.CharField(max_length=255)
    description = models.TextField()
    phone_number = models.CharField(max_length=15, blank=True)
    email = models.EmailField(blank=True)
    website = models.URLField(blank=True)

    def __str__(self):
        return self.name
    
#информация о городах, где расположены компании

class City(models.Model):
    name = models.CharField(max_length=255)

    def __str__(self):
        return self.name
    
#информация о товарах

class Product(models.Model):
    name = models.CharField(max_length=255)
    description = models.TextField(blank=True)

    def __str__(self):
        return self.name
    
#связывание компаний и их товаров

class CompanyProduct(models.Model):
    company = models.ForeignKey(Company, on_delete=models.CASCADE)
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    price = models.DecimalField(max_digits=10, decimal_places=2)

    def __str__(self):
        return f"{self.company.name} - {self.product.name}"