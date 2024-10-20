from django.db import models
from django.core.validators import FileExtensionValidator

# Create your models here.
class Calendar(models.Model):
    id = models.AutoField(primary_key=True)
    img = models.ImageField(upload_to='calendar/', blank=True)
    alt = models.CharField(max_length=100, blank=True)

    def __str__(self):
        return f"{self.alt}"

class Major(models.Model):
    id = models.AutoField(primary_key=True)
    major = models.CharField(max_length=100, blank=False)
    plan_img = models.ImageField(upload_to='plans/', blank=False)
    second_plan_img = models.ImageField(upload_to='plans/', blank=True)
    darkLogo = models.FileField(upload_to='logo/', validators=[FileExtensionValidator(['png', 'jpg', 'svg'])], blank=True)
    lightLogo = models.FileField(upload_to='logo/', validators=[FileExtensionValidator(['png', 'jpg', 'svg'])], blank=True)

    def __str__(self):
        return f"{self.major}"
    
class Subjects_category(models.Model):
    id = models.AutoField(primary_key=True)
    category = models.CharField(max_length=150)

    def __str__(self):
        return f"{self.category}"

class Subject(models.Model):
    id = models.AutoField(primary_key=True)
    subject = models.CharField(max_length=150)
    sec_name = models.CharField(max_length=150, blank=True, null=True)
    category = models.ForeignKey(Subjects_category, on_delete=models.PROTECT)
    major = models.ManyToManyField(Major, related_name='subject',blank=True)
    hours = models.IntegerField(blank=True, null=True)

    def __str__(self):
        return f'{self.subject}'
    
class Team(models.Model):
    id = models.AutoField(primary_key=True)
    short = models.CharField(max_length=150)
    long = models.CharField(max_length=150, blank=True)
    description = models.CharField(max_length=700, blank=True)
    face_link = models.CharField(max_length=150, blank=True)
    tele_link = models.CharField(max_length=150, blank=True)
    youtube_link = models.CharField(max_length=150, blank=True)
    website_link = models.CharField(max_length=150, blank=True)
    bot_link = models.CharField(max_length=150, blank=True)
    insta_link = models.CharField(max_length=150, blank=True)
    linkedin_link = models.CharField(max_length=150, blank=True)
    union_img = models.ImageField(upload_to='unions/', blank=True)
    union_dark_logo = models.ImageField(upload_to='unions/logo/dark', blank=True)
    union_light_logo = models.ImageField(upload_to="unions/logo/light/", blank=True)

    def __str__(self):
        return f"{self.short}"

class Resource(models.Model):
    id = models.AutoField(primary_key=True)
    source = models.CharField(max_length=200)
    team = models.ForeignKey(Team, on_delete=models.PROTECT, null=True, blank=True)
    link = models.CharField(max_length=500)
    subject = models.ForeignKey(Subject, on_delete=models.PROTECT, related_name="resource")
    is_exam = models.BooleanField(default=False)
    is_book = models.BooleanField(default=False)
    is_summary = models.BooleanField(default=False)
    fav = models.BooleanField(default=False)

class Video(models.Model):
    id = models.AutoField(primary_key=True)
    source = models.CharField(max_length=150)
    team = models.ForeignKey(Team, on_delete=models.PROTECT, null=True, blank=True)
    link = models.CharField(max_length=500)
    subject = models.ForeignKey(Subject, on_delete=models.PROTECT, related_name="videos")
    fav = models.BooleanField(default=False)

    def __str__(self):
        return f"{self.source}"

class Department(models.Model):
    id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=150)

    def __str__(self):
        return f"{self.name}"

class Teacher(models.Model):
    id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=150)
    email = models.EmailField(max_length=150)
    phone = models.CharField(max_length=150, blank=True)
    office = models.CharField(max_length=150, blank=True)
    department = models.ForeignKey(Department, on_delete=models.PROTECT)
    
    def __str__(self):
        return f"{self.name}"