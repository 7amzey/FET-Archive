# Generated by Django 4.2 on 2024-05-14 21:29

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('majorsweb', '0023_department_teacher'),
    ]

    operations = [
        migrations.AddField(
            model_name='team',
            name='union_logo',
            field=models.ImageField(blank=True, upload_to='unions/logo/'),
        ),
    ]
