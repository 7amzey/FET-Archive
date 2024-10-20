from django.urls import path
from django.conf import settings
from django.conf.urls.static import static

from . import views

urlpatterns = [
    path('', views.index, name="index"),
    path('<int:major_id>', views.major_page, name="major_page"),
    path('<int:major_id>/<int:subject_id>', views.resource_page, name="resource_page"),
    path('<int:major_id>/<int:subject_id>/help/?alert=success', views.help, name="help"),
    path('unions', views.unions_page, name="unions"),
    path('dir_search/', views.dirSearch, name="dirSearch"),
    path('majors', views.majorsPage, name="majors"),
    path('unilinks', views.uniLinksPage, name="uniLinks"),
    path('maps', views.mapsPage, name="maps"),
    path('teachers', views.teacherPage, name="teachers")
]
if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)