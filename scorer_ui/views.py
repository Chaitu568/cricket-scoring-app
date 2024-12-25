# from django.shortcuts import render

# Create your views here.

from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from .models import ClickEvent
import json

@csrf_exempt  # This decorator to exempt this view from CSRF verification, use cautiously
def log_click(request):
    if request.method == 'POST':
        try:
            data = json.loads(request.body)
            button_name = data.get('button_name')
            ClickEvent.objects.create(button_name=button_name)
            return JsonResponse({'status': 'success', 'message': 'Button click logged'})
        except (ValueError, KeyError):
            return JsonResponse({'status': 'error', 'message': 'Invalid data'}, status=400)
    return JsonResponse({'status': 'error', 'message': 'Only POST requests are allowed'}, status=405)