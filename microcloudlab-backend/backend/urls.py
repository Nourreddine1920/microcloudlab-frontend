"""
Root URL configuration for the MicroCloudLab backend project.

This module defines the main URL routing for the project. It includes the
paths for the Django admin site and the project's core API endpoints, which
are handled by the `api` application's URL configuration.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.0/topics/http/urls/
"""
from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    # Admin site URL, providing access to the Django administration interface.
    path('admin/', admin.site.urls),

    # API endpoints, delegating all URLs under 'api/' to the 'api' app's urls.py.
    path('api/', include('api.urls')),
]
