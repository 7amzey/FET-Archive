from django.contrib import admin
from .models import Calendar, Major, Subjects_category, Subject, Resource, Team, Video, Teacher, Department

# Register your models here.

def make3Hours(modeladmin, request, queryset):
    queryset.update(hours=3)
def make1Hour(modeladmin, request, queryset):
    queryset.update(hours=1)

def makeMyteam(modeladmin, request, queryset):
    queryset.update(team=9)

class SubjectAdmin(admin.ModelAdmin):
    list_display = ('id', 'subject', 'category',)
    filter_horizontal = ('major',)
    list_filter = ('major', 'category', )
    search_fields = ('subject', )
    actions = [make3Hours, make1Hour]

def make_book(modeladmin, request, queryset):
    queryset.update(is_book=True)

def make_exam(modeladmin, request, queryset):
    queryset.update(is_exam=True)

def make_summary(modeladmin, request, queryset):
    queryset.update(is_summary=True)

class ResourceAdmin(admin.ModelAdmin):
    list_display = ('id', 'source', 'team', 'subject', )
    list_filter = ('is_exam', 'team', 'fav', 'subject', )
    search_fields = ('source', )
    actions = [make_book, make_exam, make_summary, makeMyteam]

class TeamAdmin(admin.ModelAdmin):
    list_display = ('id', 'short')

class VideoAdmin(admin.ModelAdmin):
    list_display = ('id', 'source', 'team', 'subject', )
    list_filter = ('team', 'subject', )
    search_fields = ('source', )

class TeacherAdmin(admin.ModelAdmin):
    list_display = ('id', 'name', 'department', )
    list_filter = ('department', )
    search_fields = ('name', )

class DepartmentAdmin(admin.ModelAdmin):
    list_display = ('id', 'name', )    

admin.site.register(Calendar)
admin.site.register(Major)
admin.site.register(Subjects_category)
admin.site.register(Subject, SubjectAdmin)
admin.site.register(Team, TeamAdmin)
admin.site.register(Resource, ResourceAdmin)
admin.site.register(Video, VideoAdmin)
admin.site.register(Teacher, TeacherAdmin)
admin.site.register(Department, DepartmentAdmin)

