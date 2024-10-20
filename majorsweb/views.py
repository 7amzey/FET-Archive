from django.shortcuts import render
# Create your views here.
from django.conf import settings
from django.core.mail import send_mail

from .models import Calendar, Major, Subjects_category, Subject, Resource,Team, Video, Teacher, Department
from django.http import HttpResponseRedirect, JsonResponse
from django.urls import reverse
from django import  forms
from django.views.decorators.csrf import csrf_exempt
from django.core import serializers
from django.db.models import Q



# Function to load the home page
def index(request):
    subjects = Subject.objects.all()
    majors = Major.objects.all()
    calendar_img = Calendar.objects.all()
    return render(request, "major/index.html", {
        'calendars': calendar_img,
        'majors': majors,
        'subjects': subjects,
    })

# Function to load major page
def major_page(request, major_id):
    major = Major.objects.get(pk=major_id)
    subjects = Subject.objects.all()
    resources = []


    return render(request, "major/major_page.html", {
        "majors": Major.objects.all(),
        "major": major,
        "subject_category": Subjects_category.objects.filter(pk=3).all(),
        "subjects": subjects,
        "resources": Resource.objects.values_list('subject', flat=True),
    })

# Function to load the resource page
def resource_page(request, major_id, subject_id):
    major = Major.objects.get(pk=major_id)
    subject = Subject.objects.get(pk=subject_id)
    resources = Resource.objects.filter(subject= subject_id).exclude(team=2).order_by('-fav').all()
    videos = Video.objects.filter(subject=subject_id).order_by('-fav').all()

    return render(request, "major/resource_page.html", {
        "majors": Major.objects.all(),
        "resources": resources,
        "subject": subject,
        "mj": major,
        "videos": videos,
    })

# Functino to send help email to the admin
def help(request, major_id, subject_id):
    major = Major.objects.get(pk=major_id)
    subject = Subject.objects.get(pk=subject_id)
    videos = Video.objects.filter(subject=subject_id).all()
    
    if request.method == "POST":
        emailField = request.POST.get('email', "")
        sourceField = request.POST.get('source', "")
        subjectName = subject.subject

        email_to = settings.EMAIL_HOST_USER
        
        send_mail(
            "Error in a link",
            f"Contact Email: {emailField}\n\nSubject: {subjectName}\n\nSubject ID: {subject_id}\n\nSource: {sourceField}",
            email_to,
            [email_to,],
            fail_silently=False,
        )
        
        return HttpResponseRedirect(reverse('help', kwargs={'major_id': major.id, 'subject_id': subject.id}))


    return render(request, "major/resource_page.html", {
        "majors": Major.objects.all(),
        "resources": Resource.objects.filter(subject= subject_id).all(),
        "subject": subject,
        "mj": major,
        "msg": True,
        "videos": videos
    })

# Functino to load all unions 
def unions_page(request):
    return render(request, "major/unions.html", {
        "majors": Major.objects.all(),
        "teams": Team.objects.exclude(id=2).exclude(id=9).all(),
    })

# Function for dircet result for search queries
def dirSearch(request):
    value = request.GET.get("data", "")
    subjects = Subject.objects.all()
    data = {"more": "", "info": ""}
    for sub in subjects:
        if not sub.sec_name:
            subjects_found = Subject.objects.filter((Q(subject__icontains=value) | Q(sec_name__icontains=value)) & Q(resource__isnull=False)).distinct().all()
            info = serializers.serialize("json", subjects_found)
            data = {"more": "1st condition", "info": info}
            break
        else:
            subjects_found = Subject.objects.filter(Q(subject__icontains=value) & Q(resource__isnull=False)).all()
            info = serializers.serialize("json", subjects_found)
            data = {"more": "3rd condition", "info": info}
            break
    return JsonResponse(data, safe=False)

# Function to load all majors 
def majorsPage(request):
    return render(request, "major/majors.html", {
        "majors": Major.objects.all(),
    })

# Function to load University links page
def uniLinksPage(request):
    return render(request, "major/uni_links.html", {})

# Function to load maps page
def mapsPage(request):
    return render(request, "major/maps_page.html", {})

def teacherPage(request):
    return render(request, "major/teachers_page.html", {
        "teachers": Teacher.objects.all(),
        "departments": Department.objects.all(),
    })