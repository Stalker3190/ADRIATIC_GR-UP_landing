from django.shortcuts import render
from .models import Company, Product

# Create your views here.

#представление для рендеринга основной страницы
def index(request):
    return render(request, 'catalog/index.html')


#представление для поиска товаров

def search(request):
    query = request.GET.get('q')
    if query:
        results = Company.objects.filter(companyproduct__product__name__icontains=query).distinct()
    else:
        results = Company.objects.none()
    return render(request, 'catalog/search_results.html', {'results': results, 'query': query})