# Generated by Django 4.2 on 2023-04-19 17:47

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('majorsweb', '0001_initial'),
    ]

    operations = [
        migrations.RenameField(
            model_name='resource',
            old_name='Subject',
            new_name='subject',
        ),
    ]
