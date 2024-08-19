from django.shortcuts import render
from .models import Product, CompanyProduct

# Create your views here.

#представление для поиска товаров

def search_products(request):
    query = request.GET.get('q')
    products = Product.objects.filter(name__icontains=query)
    results = []

    for product in products:
        company_products = CompanyProduct.objects.filter(product=product)
        for company_product in company_products:
            results.append(company_product)

    context = {
        'results': results,
        'query': query,
    }

    return render(request, 'search_results.html', context)