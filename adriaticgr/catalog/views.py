from django.shortcuts import render
from .models import Company, Product

# Create your views here.

#представление для поиска товаров

def search(request):
    query = request.GET.get('q')
    results = Company.objects.filter(companyproduct__product__name__icontains=query).distinct()
    return render(request, 'catalog/search_results.html', {'results': results, 'query': query})